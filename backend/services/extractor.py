import fitz
import pdfplumber
import pandas as pd
from typing import List, Dict
import io

class DocumentExtractor:
    def __init__(self):
        self.anchors = [
            "Consolidated Income Statement",
            "Consolidated Statement of Profit or Loss",
            "Consolidated Balance Sheet",
            "Consolidated Statement of Financial Position",
            "Cash Flows",
            "Notes to the Financial Statements",
            "Financial Highlights"
        ]

    def extract_text_smart(self, file_content: bytes, file_type: str) -> str:
        if "pdf" in file_type:
            return self._extract_pdf_smart(file_content)
        elif any(t in file_type for t in ["spreadsheet", "excel", "csv", "sheet"]):
            return self._extract_excel(file_content)
        elif "text" in file_type:
            return file_content.decode("utf-8")
        return "Unsupported file type"

    def _extract_pdf_smart(self, file_content: bytes) -> str:
        """Uses Smart Slicing to extract text from relevant pages in large PDFs."""
        doc = fitz.open(stream=file_content, filetype="pdf")
        full_text = ""
        relevant_pages = set()

        # Phase 1: Search for anchor keywords to identify relevant pages
        for page_num in range(min(len(doc), 300)): # Limit to first 300 pages for performance
            page = doc.load_page(page_num)
            text = page.get_text().lower()
            if any(anchor.lower() in text for anchor in self.anchors):
                # Don't just take the current page, take surroundings for context
                for p in range(max(0, page_num - 2), min(len(doc), page_num + 8)):
                    relevant_pages.add(p)

        # Phase 2: Extract text and tables from relevant pages
        if not relevant_pages:
            # Fallback to first 40 pages if no anchors found
            # (Increase if we want GPT to see the very beginning letters)
            relevant_pages = range(min(len(doc), 40))

        content_slices = []
        
        # Use pdfplumber for the actual extraction (better for tables)
        with pdfplumber.open(io.BytesIO(file_content)) as pl_pdf:
            for p_num in sorted(list(relevant_pages)):
                try:
                    p = pl_pdf.pages[p_num]
                    page_text = p.extract_text() or ""
                    
                    # Extract tables separately and format as pseudo-markdown/CSV
                    tables = p.extract_tables()
                    table_content = ""
                    for table in tables:
                        df = pd.DataFrame(table)
                        table_content += "\n--- [TABLE DATA] ---\n" + df.to_csv(index=False) + "\n"
                    
                    content_slices.append(f"\n--- [PAGE {p_num+1}] ---\n{page_text}\n{table_content}")
                except Exception as e:
                    print(f"Error on page {p_num}: {e}")
                    continue

        return "\n".join(content_slices)

    def _extract_excel(self, file_content: bytes) -> str:
        try:
            # Try as CSV first
            df = pd.read_csv(io.BytesIO(file_content))
            return df.to_csv(index=False)
        except:
            # Fallback to Excel
            xls = pd.read_excel(io.BytesIO(file_content))
            return xls.to_csv(index=False)
