import random
import numpy as np
from typing import List, Dict

class FinancialAnalyzer:
    """Core logic for ratio calculations and multi-iteration simulations."""
    
    @staticmethod
    def compute_ratios_manual(base: Dict) -> Dict:
        """
        Computes missing ratios if the LLM only found raw components.
        Provides a 'Mathematical Truth' layer.
        """
        res = {}
        rev = base.get("monthlyRevenue", 0) * 12
        ebit = base.get("operatingProfit", 0) # Assumes annual if not specified
        net = base.get("netIncome", 0)
        
        # Margins
        if rev > 0:
            res["operatingMargin"] = f"{round((ebit / rev) * 100, 2)}%" if ebit else "N/A"
            res["netMargin"] = f"{round((net / rev) * 100, 2)}%" if net else "N/A"
        
        return res

    @staticmethod
    def run_monte_carlo(metrics: Dict, iterations=1000, months=12) -> List[Dict]:
        """
        Performs 1000 simulations per month to predict business sustainability.
        Uses a ±5% revenue variance and ±3% cost variance.
        """
        results = []
        base_rev = float(metrics.get("monthlyRevenue", 0))
        base_exp = float(metrics.get("monthlyOperatingExpenses", 0))
        init_cash = float(metrics.get("currentCashReserves", 0))

        curr_cash_base = init_cash
        curr_cash_best = init_cash
        curr_cash_worst = init_cash

        for m in range(months + 1):
            if m == 0:
                results.append({
                    "month": "M0", 
                    "cashReserves": int(init_cash),
                    "bestCase": int(init_cash),
                    "worstCase": int(init_cash)
                })
                continue

            # Simulation for the current month
            sim_nets = []
            for _ in range(iterations):
                rev_var = 1 + (random.uniform(-0.05, 0.05)) # ±5%
                cost_var = 1 + (random.uniform(-0.03, 0.03)) # ±3%
                net_monthly = (base_rev * rev_var) - (base_exp * cost_var)
                sim_nets.append(net_monthly)

            sim_nets.sort()
            worst_net = sim_nets[0]
            best_net = sim_nets[-1]
            avg_net = sum(sim_nets) / iterations

            curr_cash_worst += worst_net
            curr_cash_best += best_net
            curr_cash_base += avg_net

            results.append({
                "month": f"M{m}",
                "cashReserves": int(max(curr_cash_base, -1000000000)), # Cap at 1B negative
                "bestCase": int(max(curr_cash_best, -1000000000)),
                "worstCase": int(max(curr_cash_worst, -1000000000))
            })

        return results
