FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for PyMuPDF/pdfplumber
RUN apt-get update && apt-get install -y \
    build-essential \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Use a shell-form for CMD to allow environment variable expansion
CMD gunicorn api.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$PORT --timeout 120
