// Comprehensive supply chain dataset for Enterprise Insight Copilot

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'trend';
  title: string;
  data: any[];
  config: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  type: 'answer' | 'anomaly';
  query: string;
  content: {
    what?: string;
    why?: string;
    recommendation?: string;
    answer?: string; // For Perplexity-style single answer
    charts?: ChartData[]; // New field for charts
    references?: Array<{
      id: number;
      document: string;
      title: string;
      excerpt: string;
      page?: number;
      url?: string;
    }>;
    anomalies?: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      impact: string;
    }>;
  };
  timestamp: Date;
}

export const supplyChainQAs: ChatMessage[] = [
  {
    id: "1",
    type: "answer",
    query: "What are the main freight cost anomalies this quarter?",
    content: {
      what: "Your freight costs exceeded budget by $542,100 (23.4% over) this quarter, with $156,800 in confirmed overcharges identified across 89 shipments. TransLogistics Inc. accounts for 67% of these anomalies through systematic misclassification of 23 machinery shipments as Class 85 instead of Class 60, resulting in $47,300 in recoverable overcharges.",
      why: "Root cause analysis reveals three critical failures: (1) TransLogistics lacks automated freight classification verification, leading to consistent Class 85 mis-categorization worth $2,056 per shipment, (2) Duplicate fuel surcharges totaling $127,400 indicate inadequate invoice controls, and (3) Route B costs increased 340% due to driver shortage premiums ($1.20/mile) and routing inefficiencies ($3.44/mile).",
      recommendation: "Execute immediately: (1) Issue formal dispute for $156,800 in overcharges to TransLogistics with 30-day recovery timeline, (2) Implement automated freight class verification system within 60 days (projected $428,700 annual savings), (3) Diversify carriers - add 2 alternative providers for Route B to reduce dependency and negotiate 15% rate reduction through competition, (4) Establish monthly freight audit process with CFO oversight.",
      charts: [
        {
          type: "bar",
          title: "Freight Overcharges by Carrier",
          data: [
            { name: "TransLogistics", overcharges: 156800, budget: 180000 },
            { name: "FastHaul", overcharges: 12300, budget: 85000 },
            { name: "GlobalShip", overcharges: 8900, budget: 120000 },
            { name: "RouteMax", overcharges: 5200, budget: 95000 }
          ],
          config: {
            overcharges: { label: "Overcharges ($)", color: "hsl(0, 65%, 51%)" },
            budget: { label: "Budget ($)", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "trend",
          title: "Monthly Freight Costs Trend",
          data: [
            { period: "Jan", actual: 285000, budget: 275000 },
            { period: "Feb", actual: 292000, budget: 275000 },
            { period: "Mar", actual: 318000, budget: 275000 },
            { period: "Apr", actual: 342000, budget: 275000 }
          ],
          config: {
            actual: { label: "Actual Cost ($)", color: "hsl(0, 65%, 51%)" },
            budget: { label: "Budget ($)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "freight-analysis-q3-2024.pdf",
          title: "Quarterly Freight Cost Analysis",
          excerpt: "TransLogistics Inc. freight class misclassification: Class 85 applied instead of Class 60, resulting in $47,300 overcharges across 23 shipments",
          page: 12
        },
        {
          id: 2,
          document: "route-performance-report.pdf", 
          title: "Route Performance Metrics",
          excerpt: "Chicago-Atlanta Route B: Average cost per mile increased from $2.34 to $10.30, 340% above Q2 baseline",
          page: 8
        },
        {
          id: 3,
          document: "port-congestion-impact.pdf",
          title: "Port Congestion Analysis",
          excerpt: "Long Beach and Houston port delays averaging 4.2 days, causing $156K in detention charges",
          page: 3
        }
      ]
    },
    timestamp: new Date("2024-03-15T10:30:00")
  },
  {
    id: "2",
    type: "answer", 
    query: "Which suppliers have the highest contract compliance risk?",
    content: {
      what: "Meridian Supply Co. presents immediate business risk with 23 contract violations this quarter ($2.3M annual contract value), including 8 missed delivery deadlines averaging 5.2 days each. This has caused $147,000 in direct costs: $89,400 in production delays, $34,500 in quality rework, and $23,100 in expedited shipping to recover schedules.",
      why: "Meridian lacks adequate production capacity and quality systems for current contract volume. Their 4.7% defect rate is 5x industry standard (0.8%), and 67% of delays stem from insufficient raw material inventory management. Global Parts Inc. exploits force majeure clauses 300% above industry average (12 times vs. 3-4 typical), indicating contract term abuse rather than legitimate disruptions.",
      recommendation: "Take decisive action within 30 days: (1) Issue formal breach notice to Meridian with 90-day performance improvement plan or contract termination, (2) Activate backup suppliers for 50% of Meridian volume immediately to reduce risk exposure, (3) Renegotiate Global Parts contract to limit force majeure to legitimate weather/labor events only, (4) Establish supplier scorecards with monthly CEO review for all contracts >$1M annually.",
      charts: [
        {
          type: "bar",
          title: "Contract Violations by Supplier",
          data: [
            { name: "Meridian Supply", violations: 23, contracts: 45 },
            { name: "Global Parts", violations: 12, contracts: 38 },
            { name: "Apex Mfg", violations: 8, contracts: 52 },
            { name: "TechSource", violations: 3, contracts: 29 }
          ],
          config: {
            violations: { label: "Violations", color: "hsl(0, 65%, 51%)" },
            contracts: { label: "Total Contracts", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "pie",
          title: "Cost Impact Breakdown",
          data: [
            { name: "Production Delays", value: 89400 },
            { name: "Quality Rework", value: 34500 },
            { name: "Expedited Shipping", value: 23100 }
          ],
          config: {
            value: { label: "Cost Impact ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "supplier-compliance-q3.pdf",
          title: "Supplier Compliance Report Q3 2024",
          excerpt: "Meridian Supply Co.: 23 violations including 8 missed delivery deadlines, 12 quality failures, 3 pricing disputes",
          page: 15
        },
        {
          id: 2,
          document: "contract-violation-analysis.pdf",
          title: "Contract Violation Analysis",
          excerpt: "Global Parts Inc. invoked force majeure 12 times in Q3, 300% above industry average",
          page: 7
        },
        {
          id: 3,
          document: "sla-performance-metrics.pdf",
          title: "SLA Performance Metrics",
          excerpt: "Apex Manufacturing: 15 deliveries exceeding 48-hour SLA threshold, average delay 72 hours",
          page: 22
        },
        {
          id: 4,
          document: "industry-compliance-benchmark.pdf",
          title: "Industry Compliance Benchmarks",
          excerpt: "Automotive suppliers: 34% non-compliance rate vs 20% electronics suppliers",
          page: 5
        }
      ]
    },
    timestamp: new Date("2024-03-14T14:20:00")
  },
  {
    id: "3",
    type: "answer",
    query: "What's causing the inventory holding cost spike?",
    content: {
      what: "Inventory holding costs increased 156% to $3.8M annually, driven primarily by $2.3M in slow-moving safety stock (turnover rate 0.8x vs. target 4.2x) and $890K in obsolete electronics inventory requiring immediate write-off. Cash conversion cycle deteriorated to 89 days versus industry benchmark of 45 days, tying up $5.2M in working capital.",
      why: "Demand forecasting accuracy dropped to 67% (target: 85%) due to outdated forecasting models that don't account for market volatility. This caused overordering in Q2-Q3 worth $1.2M. Electronics category shows highest risk with 23% of stock facing obsolescence due to 6-month product lifecycles. Warehouse capacity constraints at 95% utilization force premium storage at $4.20/sq ft vs. standard $2.80/sq ft.",
      recommendation: "Execute 90-day action plan: (1) Immediately write-off $890K obsolete electronics inventory and implement monthly obsolescence reviews, (2) Reduce safety stock by 40% for slow-moving SKUs to free $920K in cash within 60 days, (3) Upgrade demand forecasting system with AI/ML capabilities (ROI: 18 months, $2.1M annual savings), (4) Negotiate warehouse expansion or secure secondary location to eliminate premium storage costs ($168K annual savings).",
      references: [
        {
          id: 1,
          document: "inventory-analysis-2024.pdf",
          title: "Inventory Cost Analysis 2024",
          excerpt: "Slow-moving SKUs: $2.3M tied up in safety stock, turnover rate 0.8x vs target 4.2x",
          page: 18
        },
        {
          id: 2,
          document: "warehouse-capacity-report.pdf",
          title: "Warehouse Capacity Report",
          excerpt: "Premium storage rates: $4.20/sq ft vs standard $2.80/sq ft due to 95% capacity utilization",
          page: 11
        },
        {
          id: 3,
          document: "cash-conversion-analysis.pdf",
          title: "Cash Conversion Cycle Analysis", 
          excerpt: "Average cash conversion cycle: 89 days (Industry benchmark: 45 days)",
          page: 4
        },
        {
          id: 4,
          document: "electronics-inventory-review.pdf",
          title: "Electronics Inventory Review",
          excerpt: "Obsolete electronics inventory: $890K write-off potential, 23% of total electronics stock",
          page: 9
        },
        {
          id: 5,
          document: "demand-forecast-accuracy.pdf",
          title: "Demand Forecasting Accuracy Report",
          excerpt: "Forecast accuracy: 67% actual vs 85% target, leading to $1.2M overstock",
          page: 6
        }
      ]
    },
    timestamp: new Date("2024-03-13T09:15:00")
  },
  {
    id: "4",
    type: "answer",
    query: "How are port delays affecting our supply chain costs?",
    content: {
      what: "Port congestion costs the company $445,000 monthly through direct fees: $267K demurrage, $134K detention charges, and $44K expedited shipping. 67% of automotive parts shipments experience delays averaging 5.4 days, causing 23 production line stoppages worth $1.05M in lost production (at $45,600 per stoppage). Air freight usage increased 234% as emergency alternative, adding $278,900 in premium transportation costs.",
      why: "Long Beach port operates at 95% capacity with average delays of 6.2 days (vs. pre-pandemic 1.3 days), while Houston averages 4.8 days. Root causes: 33% staff shortage in longshoremen, 45% chassis shortage, and 22% documentation delays from customs clearance issues. Container dwell time increased 89% to 8.9 days, creating downstream bottlenecks across all inbound shipments.",
      recommendation: "Implement multi-port strategy immediately: (1) Divert 40% of West Coast volume to Savannah (7.1/10 efficiency vs. Long Beach 4.2/10) within 60 days, (2) Negotiate detention/demurrage caps with carriers to limit monthly exposure to $200K, (3) Increase automotive parts safety stock by 30 days to prevent production stoppages ($160K carrying cost vs. $1.05M stoppage cost), (4) Establish dedicated customs broker relationship to reduce documentation delays by 50%.",
      references: [
        {
          id: 1,
          document: "port-delay-cost-analysis.pdf",
          title: "Port Delay Cost Analysis",
          excerpt: "Monthly additional costs: $267K demurrage, $134K detention, $44K expedited shipping",
          page: 3
        },
        {
          id: 2,
          document: "port-performance-metrics.pdf",
          title: "Port Performance Metrics Q3",
          excerpt: "Long Beach average delay: 6.2 days, Houston: 4.8 days, vs pre-pandemic 1.3 days",
          page: 14
        },
        {
          id: 3,
          document: "container-dwell-time-report.pdf",
          title: "Container Dwell Time Report",
          excerpt: "Current dwell time: 8.9 days vs pre-pandemic 4.7 days (89% increase)",
          page: 7
        },
        {
          id: 4,
          document: "automotive-supply-impact.pdf",
          title: "Automotive Supply Chain Impact",
          excerpt: "Automotive parts: 67% shipments delayed, average impact 5.4 days per shipment",
          page: 12
        },
        {
          id: 5,
          document: "freight-mode-shift-analysis.pdf",
          title: "Freight Mode Shift Analysis",
          excerpt: "Air freight usage increased 234%, cost per kg: $12.40 vs ocean $2.10",
          page: 19
        }
      ]
    },
    timestamp: new Date("2024-03-12T16:45:00")
  },
  {
    id: "5",
    type: "answer",
    query: "What are the main risks in our contract terms with key suppliers?",
    content: {
      what: "Critical legal and financial exposure identified: 34% of supplier contracts ($15.3M annual value) contain unlimited liability clauses exposing company to potential $45M in damages. Currency fluctuation risk of $8.9M exists across international contracts with no hedging provisions. Additionally, 67% of technology supplier contracts lack adequate IP indemnification, creating patent litigation exposure worth potential $12M+ in damages.",
      why: "Contracts were negotiated during different market conditions without standardized risk assessment. Legal review identified three systemic failures: (1) Template contracts favor suppliers due to rushed negotiations during capacity shortages, (2) 78% of international contracts lack currency hedging because procurement team lacks forex expertise, (3) IP clauses are outdated and don't cover AI/software integration risks emerging in technology partnerships.",
      recommendation: "Execute comprehensive contract overhaul within 120 days: (1) Renegotiate unlimited liability clauses to cap exposure at 12 months contract value (target: $4.5M max vs. current unlimited), (2) Implement currency hedging program for all contracts >$500K annually (estimated $890K annual savings on FX volatility), (3) Mandate updated IP indemnification clauses for all technology suppliers before renewal, (4) Establish legal review requirement for all contracts >$1M with standardized risk scoring matrix.",
      references: [
        {
          id: 1,
          document: "contract-risk-assessment.pdf",
          title: "Contract Risk Assessment 2024",
          excerpt: "Unlimited liability clauses found in 34% of supplier contracts, potential exposure $45M",
          page: 23
        },
        {
          id: 2,
          document: "force-majeure-analysis.pdf",
          title: "Force Majeure Clause Analysis",
          excerpt: "89% of contracts lack cyber incident coverage in force majeure provisions",
          page: 8
        },
        {
          id: 3,
          document: "pricing-risk-review.pdf",
          title: "Pricing Risk Review",
          excerpt: "Uncapped pricing escalation affecting $12.3M annual spend, average increase 23%",
          page: 15
        },
        {
          id: 4,
          document: "ip-indemnification-gaps.pdf",
          title: "IP Indemnification Gap Analysis",
          excerpt: "Technology suppliers: 67% lack adequate IP indemnification clauses",
          page: 11
        },
        {
          id: 5,
          document: "payment-terms-impact.pdf",
          title: "Payment Terms Impact Study",
          excerpt: "45-day payment terms causing supplier cash flow stress, 23% requesting changes",
          page: 6
        },
        {
          id: 6,
          document: "currency-hedging-review.pdf",
          title: "Currency Hedging Review",
          excerpt: "International contracts: 78% lack hedging provisions, $8.9M exposure to FX volatility",
          page: 18
        }
      ]
    },
    timestamp: new Date("2024-03-11T11:30:00")
  },
  {
    id: "6",
    type: "answer",
    query: "What's driving our warehouse operating cost increases?",
    content: {
      what: "Warehouse operating costs surged 89% to $4.2M annually, with labor costs representing $2.8M (67% increase due to 23% wage inflation and 34% overtime premium). Facility costs increased $890K due to premium storage rates ($4.20/sq ft vs $2.80 standard) at 95% capacity utilization. Energy costs jumped 156% ($340K increase) due to refrigerated storage expansion and inefficient HVAC systems averaging 15 years old.",
      why: "Cost drivers stem from operational inefficiencies and market pressures: (1) Labor shortage forcing 23% wage premiums ($18.50/hr vs $15 target) and excessive overtime at 1.5x rates, (2) Warehouse space shortage requiring premium off-site storage for 25% of inventory, (3) Outdated automation requiring manual processes for 67% of pick/pack operations, and (4) Energy inefficiency with 40% higher consumption vs industry benchmarks due to aging infrastructure.",
      recommendation: "Execute 180-day cost optimization plan: (1) Implement warehouse automation system reducing labor requirements by 35% (ROI: 14 months, $1.8M annual savings), (2) Negotiate 3-year lease for additional 100K sq ft at standard rates to eliminate premium storage ($168K annual savings), (3) Upgrade HVAC and LED lighting systems (investment: $245K, energy savings: $127K annually), (4) Deploy workforce management system to optimize staffing and reduce overtime by 40%.",
      charts: [
        {
          type: "pie" as const,
          title: "Warehouse Cost Breakdown",
          data: [
            { name: "Labor", value: 2800000 },
            { name: "Facility", value: 890000 },
            { name: "Energy", value: 340000 },
            { name: "Equipment", value: 170000 }
          ],
          config: {
            value: { label: "Annual Cost ($)" }
          }
        },
        {
          type: "bar" as const,
          title: "Cost Increase by Category",
          data: [
            { name: "Labor", increase: 67, target: 25 },
            { name: "Facility", increase: 89, target: 25 },
            { name: "Energy", increase: 156, target: 25 },
            { name: "Equipment", increase: 23, target: 25 }
          ],
          config: {
            increase: { label: "Actual Increase (%)", color: "hsl(0, 65%, 51%)" },
            target: { label: "Budget Increase (%)", color: "hsl(142, 76%, 36%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "warehouse-cost-analysis-2024.pdf",
          title: "Warehouse Operating Cost Analysis",
          excerpt: "Total operating costs: $4.2M annually, 89% increase from previous year",
          page: 5
        },
        {
          id: 2,
          document: "labor-cost-breakdown.pdf",
          title: "Warehouse Labor Cost Breakdown",
          excerpt: "Labor costs: $2.8M, 23% wage inflation plus 34% overtime premium",
          page: 12
        }
      ]
    },
    timestamp: new Date("2024-03-10T14:20:00")
  },
  {
    id: "7", 
    type: "answer",
    query: "How is supplier performance affecting our production schedules?",
    content: {
      what: "Supplier delivery performance degraded to 73% on-time delivery (target: 95%), causing 47 production delays totaling 312 hours of downtime worth $1.89M in lost output ($6,058/hour average). Critical component shortages from Meridian Supply resulted in 23 emergency air shipments costing $178K premium vs standard ocean freight. Quality defects from 3 key suppliers required 89 hours of rework valued at $267K in additional labor and material costs.",
      why: "Performance decline attributed to supplier capacity constraints and quality control gaps: (1) Meridian Supply operating at 97% capacity with inadequate buffer for demand spikes, (2) TechSource Pro reduced quality inspections from 35% to 15% sample rate to meet cost targets, (3) 67% of suppliers lack real-time inventory visibility, preventing proactive shortage alerts, and (4) Supplier audit frequency reduced from quarterly to annual due to resource constraints, missing early warning indicators.",
      recommendation: "Implement supplier performance management overhaul: (1) Diversify critical components across 3+ suppliers to reduce single-source risk, (2) Establish supplier scorecards with monthly CEO review for relationships >$500K annually, (3) Require 48-hour inventory visibility from all Tier 1 suppliers with automated shortage alerts, (4) Institute quality improvement plans for suppliers below 95% performance with financial penalties for non-compliance ($10K per percentage point below target).",
      charts: [
        {
          type: "line" as const,
          title: "Supplier On-Time Delivery Trend",
          data: [
            { name: "Jan", performance: 89, target: 95 },
            { name: "Feb", performance: 82, target: 95 },
            { name: "Mar", performance: 76, target: 95 },
            { name: "Apr", performance: 73, target: 95 }
          ],
          config: {
            performance: { label: "Actual Performance (%)", color: "hsl(0, 65%, 51%)" },
            target: { label: "Target (%)", color: "hsl(142, 76%, 36%)" }
          }
        },
        {
          type: "bar" as const,
          title: "Production Downtime by Supplier",
          data: [
            { name: "Meridian Supply", hours: 156, cost: 945000 },
            { name: "TechSource Pro", hours: 89, cost: 538000 },
            { name: "Precision Inc", hours: 45, cost: 272000 },
            { name: "Others", hours: 22, cost: 133000 }
          ],
          config: {
            hours: { label: "Downtime Hours", color: "hsl(38, 92%, 50%)" },
            cost: { label: "Cost Impact ($)", color: "hsl(0, 65%, 51%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "supplier-delivery-performance.pdf",
          title: "Supplier Delivery Performance Analysis",
          excerpt: "On-time delivery: 73% actual vs 95% target, causing 312 hours downtime",
          page: 8
        },
        {
          id: 2,
          document: "production-impact-assessment.pdf",
          title: "Production Impact Assessment",
          excerpt: "47 production delays, $1.89M lost output at $6,058 per hour",
          page: 15
        }
      ]
    },
    timestamp: new Date("2024-03-09T10:45:00")
  },
  {
    id: "8",
    type: "answer", 
    query: "What's the financial impact of our quality control processes?",
    content: {
      what: "Quality control costs total $2.34M annually but prevent $8.9M in potential customer claims and returns. Current 3.2% defect rate costs $567K in rework, $234K in warranty claims, and $445K in customer credits. However, early detection saves $12.4M compared to post-shipment quality failures. ROI analysis shows every $1 spent on quality control prevents $3.80 in downstream costs, generating net benefit of $6.56M annually.",
      why: "Quality investment justification supported by data: (1) Statistical process control catches 89% of defects before shipment vs 34% with manual inspection alone, (2) Automated testing reduces inspection time by 67% while improving accuracy from 78% to 96%, (3) Supplier quality audits prevent 245% more defects than reactive quality checks, and (4) Customer retention improves 23% when defect rates stay below 2.5% threshold.",
      recommendation: "Optimize quality ROI through strategic investments: (1) Expand automated inspection to cover 95% of production lines (investment: $890K, annual savings: $1.2M), (2) Implement real-time SPC monitoring across all suppliers (cost: $340K, prevents $890K annual quality issues), (3) Increase supplier audit frequency to quarterly for critical suppliers (cost: $125K, prevents $456K in quality escapes), (4) Deploy predictive quality analytics to identify defect patterns before they occur (investment: $245K, prevents $678K annual rework).",
      charts: [
        {
          type: "bar" as const,
          title: "Quality Cost vs. Prevention Savings",
          data: [
            { name: "Quality Investment", cost: 2340000, savings: 8900000 },
            { name: "Rework Costs", cost: 567000, savings: 0 },
            { name: "Warranty Claims", cost: 234000, savings: 0 },
            { name: "Customer Credits", cost: 445000, savings: 0 }
          ],
          config: {
            cost: { label: "Cost ($)", color: "hsl(0, 65%, 51%)" },
            savings: { label: "Savings ($)", color: "hsl(142, 76%, 36%)" }
          }
        },
        {
          type: "line" as const,
          title: "Defect Rate Trend",
          data: [
            { name: "Jan", rate: 4.1, target: 2.5 },
            { name: "Feb", rate: 3.8, target: 2.5 },
            { name: "Mar", rate: 3.4, target: 2.5 },
            { name: "Apr", rate: 3.2, target: 2.5 }
          ],
          config: {
            rate: { label: "Actual Defect Rate (%)", color: "hsl(0, 65%, 51%)" },
            target: { label: "Target Rate (%)", color: "hsl(142, 76%, 36%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "quality-roi-analysis.pdf",
          title: "Quality Control ROI Analysis",
          excerpt: "Quality investment: $2.34M prevents $8.9M in customer claims, 3.8:1 ROI",
          page: 3
        },
        {
          id: 2,
          document: "defect-cost-analysis.pdf",
          title: "Defect Cost Analysis",
          excerpt: "Current defect rate: 3.2%, total cost $1.246M in rework and claims",
          page: 11
        }
      ]
    },
    timestamp: new Date("2024-03-08T13:15:00")
  },
  {
    id: "9",
    type: "answer",
    query: "How are currency fluctuations impacting our international procurement costs?",
    content: {
      what: "Currency volatility generated $2.89M in unexpected costs this quarter across international procurement contracts worth $34.2M total value. EUR strengthening 12.4% vs USD added $1.56M to European supplier payments, while JPY appreciation 8.9% increased Japanese component costs by $890K. CNY fluctuations created $441K variance in Chinese manufacturing contracts. Unhedged exposure across 67% of international contracts represents $23.1M at risk.",
      why: "FX impact stems from inadequate hedging strategy and contract structure: (1) Procurement team lacks forex expertise, resulting in 67% of contracts unhedged against currency risk, (2) Contracts denominated in supplier currencies without adjustment mechanisms expose company to full volatility, (3) Hedging instruments limited to 6-month forwards, insufficient for 18-month average contract terms, and (4) No centralized FX management creates inconsistent hedging decisions across business units.",
      recommendation: "Implement comprehensive currency risk management: (1) Establish centralized FX desk with dedicated treasury specialist within 60 days, (2) Mandate currency hedging for all contracts >$500K with 12-24 month coverage matching contract terms, (3) Renegotiate major supplier contracts to include currency adjustment clauses capping exposure at ±5% annually, (4) Deploy automated hedging system to execute forward contracts when volatility exceeds 3% threshold (estimated $890K annual savings on FX costs).",
      charts: [
        {
          type: "bar" as const,
          title: "FX Impact by Currency",
          data: [
            { name: "EUR", impact: 1560000, volume: 15600000 },
            { name: "JPY", impact: 890000, volume: 12300000 },
            { name: "CNY", impact: 441000, volume: 6300000 }
          ],
          config: {
            impact: { label: "FX Impact ($)", color: "hsl(0, 65%, 51%)" },
            volume: { label: "Contract Volume ($)", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "line" as const,
          title: "Currency Appreciation vs USD",
          data: [
            { name: "Jan", eur: 2.3, jpy: 1.2, cny: -0.8 },
            { name: "Feb", eur: 5.7, jpy: 3.4, cny: 1.2 },
            { name: "Mar", eur: 8.9, jpy: 6.1, cny: 2.8 },
            { name: "Apr", eur: 12.4, jpy: 8.9, cny: 3.1 }
          ],
          config: {
            eur: { label: "EUR Appreciation (%)", color: "hsl(217, 91%, 60%)" },
            jpy: { label: "JPY Appreciation (%)", color: "hsl(38, 92%, 50%)" },
            cny: { label: "CNY Appreciation (%)", color: "hsl(142, 76%, 36%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "fx-impact-analysis-q1.pdf",
          title: "FX Impact Analysis Q1 2024",
          excerpt: "Total FX impact: $2.89M across $34.2M international procurement volume",
          page: 6
        },
        {
          id: 2,
          document: "currency-hedging-assessment.pdf",
          title: "Currency Hedging Assessment",
          excerpt: "Unhedged exposure: 67% of contracts, representing $23.1M at risk",
          page: 14
        }
      ]
    },
    timestamp: new Date("2024-03-07T15:30:00")
  },
  {
    id: "10",
    type: "answer",
    query: "What's the cost-benefit analysis of our automation investments?",
    content: {
      what: "Automation investments totaling $4.8M over 18 months generated $7.2M in operational savings, achieving 150% ROI within payback period. Robotic process automation in procurement reduced processing time by 78% (from 45 to 10 minutes per PO), saving $890K annually in labor costs. Automated inventory management prevented $2.3M in stockouts and reduced carrying costs by $1.4M through optimized safety stock levels.",
      why: "Automation success driven by strategic implementation targeting high-impact processes: (1) Procurement automation eliminated manual data entry for 89% of standard purchase orders, reducing errors from 12% to 0.3%, (2) Automated demand forecasting improved accuracy from 67% to 84%, reducing both stockouts and overstock by $1.8M combined, (3) Robotic picking systems increased warehouse throughput by 156% during peak periods, and (4) Automated quality inspection detected 23% more defects than manual processes while reducing inspection time by 45%.",
      recommendation: "Accelerate automation roadmap based on proven ROI: (1) Expand RPA to accounts payable processing (investment: $245K, projected savings: $567K annually), (2) Deploy automated supplier onboarding system reducing 30-day process to 5 days (cost: $189K, efficiency gain worth $340K annually), (3) Implement predictive maintenance automation preventing $1.2M in unplanned downtime (investment: $890K, 16-month payback), (4) Automate compliance reporting reducing manual effort by 67% and improving accuracy to 99.2% (investment: $156K, saves $289K annually in compliance costs).",
      charts: [
        {
          type: "bar" as const,
          title: "Automation ROI by Process",
          data: [
            { name: "Procurement", investment: 1200000, savings: 1780000 },
            { name: "Inventory Mgmt", investment: 1800000, savings: 3700000 },
            { name: "Quality Control", investment: 900000, savings: 1340000 },
            { name: "Warehouse Ops", investment: 900000, savings: 1380000 }
          ],
          config: {
            investment: { label: "Investment ($)", color: "hsl(0, 65%, 51%)" },
            savings: { label: "Savings ($)", color: "hsl(142, 76%, 36%)" }
          }
        },
        {
          type: "line" as const,
          title: "Cumulative Savings Timeline",
          data: [
            { name: "Month 6", cumulative: 1200000, target: 1000000 },
            { name: "Month 12", cumulative: 3400000, target: 2800000 },
            { name: "Month 18", cumulative: 7200000, target: 5600000 },
            { name: "Month 24", cumulative: 10800000, target: 8400000 }
          ],
          config: {
            cumulative: { label: "Cumulative Savings ($)", color: "hsl(142, 76%, 36%)" },
            target: { label: "Target Savings ($)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "automation-roi-report.pdf",
          title: "Automation ROI Analysis 2024",
          excerpt: "Total investment: $4.8M, generated savings: $7.2M, 150% ROI achieved",
          page: 4
        },
        {
          id: 2,
          document: "process-improvement-metrics.pdf",
          title: "Process Improvement Metrics",
          excerpt: "Procurement processing time reduced 78%, inventory accuracy improved to 96.8%",
          page: 9
        }
      ]
    },
    timestamp: new Date("2024-03-06T09:45:00")
  },
  {
    id: "11",
    type: "answer",
    query: "How are raw material price volatilities affecting our margins?",
    content: {
      what: "Raw material costs increased 34.7% ($5.67M) over 12 months, compressing gross margins from 28.3% to 19.8%. Steel prices surged 67% adding $2.34M costs, aluminum up 45% ($1.89M impact), and rare earth elements jumped 156% ($890K increase). Commodity hedging covered only 23% of exposure, leaving $14.2M unhedged against price volatility. Current inventory carrying $3.1M in higher-cost materials requiring immediate pricing adjustments.",
      why: "Price volatility driven by supply/demand imbalances and inadequate hedging: (1) Global supply chain disruptions reduced steel availability by 23%, (2) Energy costs affecting aluminum production increased smelting costs 34%, (3) Geopolitical tensions restricted rare earth element exports from key suppliers, (4) Company's commodity hedging strategy covers only 6-month periods vs 12-18 month price cycles, and (5) Procurement lacks real-time commodity price monitoring, causing delayed sourcing decisions.",
      recommendation: "Deploy comprehensive commodity risk management: (1) Implement 12-24 month hedging strategy covering 75% of material exposure (estimated $2.1M annual volatility reduction), (2) Diversify suppliers across 3+ geographic regions for critical materials within 90 days, (3) Negotiate price escalation clauses with customers to pass through 50% of material cost increases above 15% threshold, (4) Establish commodity futures trading desk with dedicated analyst to optimize purchasing timing (projected $890K annual savings through strategic buying).",
      charts: [
        {
          type: "bar" as const,
          title: "Material Cost Increases by Category",
          data: [
            { name: "Steel", increase: 67, impact: 2340000 },
            { name: "Aluminum", increase: 45, impact: 1890000 },
            { name: "Rare Earth", increase: 156, impact: 890000 },
            { name: "Copper", increase: 23, impact: 550000 }
          ],
          config: {
            increase: { label: "Price Increase (%)", color: "hsl(0, 65%, 51%)" },
            impact: { label: "Cost Impact ($)", color: "hsl(38, 92%, 50%)" }
          }
        },
        {
          type: "line" as const,
          title: "Gross Margin Trend",
          data: [
            { name: "Jan", margin: 28.3, target: 25.0 },
            { name: "Feb", margin: 26.1, target: 25.0 },
            { name: "Mar", margin: 22.4, target: 25.0 },
            { name: "Apr", margin: 19.8, target: 25.0 }
          ],
          config: {
            margin: { label: "Actual Margin (%)", color: "hsl(0, 65%, 51%)" },
            target: { label: "Target Margin (%)", color: "hsl(142, 76%, 36%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "material-cost-analysis.pdf",
          title: "Raw Material Cost Impact Analysis",
          excerpt: "Material costs increased $5.67M, gross margin compressed from 28.3% to 19.8%",
          page: 7
        },
        {
          id: 2,
          document: "commodity-hedging-review.pdf",
          title: "Commodity Hedging Strategy Review",
          excerpt: "Current hedging covers 23% of exposure, $14.2M unhedged risk identified",
          page: 13
        }
      ]
    },
    timestamp: new Date("2024-03-05T11:20:00")
  },
  {
    id: "12",
    type: "answer",
    query: "What's the ROI analysis of our sustainability initiatives?",
    content: {
      what: "Sustainability investments of $3.2M over 24 months generated $4.8M in operational savings and $2.1M in regulatory incentives, achieving 216% ROI. Energy efficiency upgrades reduced consumption by 34% saving $1.89M annually, waste reduction programs eliminated $890K in disposal costs, and carbon offset initiatives secured $670K in tax credits. Green supplier certifications improved brand value contributing to 12% premium pricing on eco-friendly product lines worth $1.2M additional revenue.",
      why: "Strong sustainability ROI driven by operational efficiency and market differentiation: (1) LED lighting and smart HVAC systems reduced energy costs 34% with 18-month payback, (2) Waste-to-energy partnerships eliminated $890K disposal fees while generating $234K revenue from recyclables, (3) Carbon reduction efforts qualified for federal tax incentives worth $670K annually, (4) Sustainable packaging attracted 23% more premium customers willing to pay 8-15% price premiums, and (5) Green supply chain certification reduced insurance premiums by $156K annually.",
      recommendation: "Scale sustainability investments based on proven returns: (1) Expand renewable energy to cover 75% of operations (investment: $2.4M, savings: $1.67M annually, 17-month payback), (2) Implement circular economy principles reducing waste by 60% (cost: $567K, saves $1.2M annually), (3) Develop carbon-neutral product line capturing premium market segment (investment: $890K, revenue potential: $3.4M annually), (4) Establish sustainability metrics in all supplier contracts with performance bonuses (cost: $125K, operational savings: $445K annually through improved efficiency).",
      charts: [
        {
          type: "bar" as const,
          title: "Sustainability Investment Returns",
          data: [
            { name: "Energy Efficiency", investment: 1200000, returns: 1890000 },
            { name: "Waste Reduction", investment: 800000, returns: 1124000 },
            { name: "Carbon Programs", investment: 600000, returns: 670000 },
            { name: "Green Certification", investment: 600000, returns: 1316000 }
          ],
          config: {
            investment: { label: "Investment ($)", color: "hsl(0, 65%, 51%)" },
            returns: { label: "Annual Returns ($)", color: "hsl(142, 76%, 36%)" }
          }
        },
        {
          type: "pie" as const,
          title: "Sustainability Benefits Breakdown",
          data: [
            { name: "Energy Savings", value: 1890000 },
            { name: "Waste Cost Reduction", value: 890000 },
            { name: "Tax Incentives", value: 670000 },
            { name: "Premium Revenue", value: 1200000 }
          ],
          config: {
            value: { label: "Annual Value ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "sustainability-roi-analysis.pdf",
          title: "Sustainability ROI Analysis 2024",
          excerpt: "Total investment: $3.2M, returns: $4.8M savings + $2.1M incentives, 216% ROI",
          page: 5
        },
        {
          id: 2,
          document: "green-premium-pricing-study.pdf",
          title: "Green Premium Pricing Study",
          excerpt: "Premium customers pay 8-15% more for sustainable products, $1.2M additional revenue",
          page: 18
        }
      ]
    },
    timestamp: new Date("2024-03-04T16:10:00")
  },
  {
    id: "13",
    type: "answer",
    query: "How is our supplier diversity program impacting costs and performance?",
    content: {
      what: "Supplier diversity program encompasses 34% of total procurement spend ($8.9M) across 127 certified diverse suppliers, generating $1.67M in tax incentives and grants. Diverse suppliers demonstrate 23% faster delivery times (average 8.2 vs 10.6 days) and 15% lower defect rates (2.1% vs 2.5% traditional suppliers). However, pricing averages 12% higher ($890K annual premium) due to scale limitations, while payment terms are 34% longer creating $445K cash flow impact.",
      why: "Mixed performance results reflect program maturity and supplier development needs: (1) Diverse suppliers prioritize customer service excellence, resulting in superior delivery and quality metrics, (2) Limited production scale drives 12% cost premium as suppliers lack economies of scale of larger competitors, (3) Working capital constraints require extended payment terms affecting company cash flow, (4) Innovation partnerships with diverse suppliers generated 3 new product concepts worth $2.1M potential revenue, and (5) Brand enhancement from diversity commitment improved customer loyalty scores by 18%.",
      recommendation: "Optimize diversity program through strategic supplier development: (1) Implement supplier financing program providing working capital support to reduce payment terms from 45 to 30 days (cost: $200K, cash flow benefit: $445K), (2) Establish volume commitment guarantees enabling diverse suppliers to achieve scale economies (target: 8% cost reduction over 18 months), (3) Create innovation incubators with diverse suppliers to commercialize new products (investment: $340K, revenue potential: $1.8M annually), (4) Develop tier-2 diversity requirements for major suppliers to expand program reach without direct cost impact.",
      charts: [
        {
          type: "bar" as const,
          title: "Diverse vs Traditional Supplier Performance",
          data: [
            { name: "Delivery Time", diverse: 8.2, traditional: 10.6 },
            { name: "Defect Rate", diverse: 2.1, traditional: 2.5 },
            { name: "Cost Premium", diverse: 12, traditional: 0 }
          ],
          config: {
            diverse: { label: "Diverse Suppliers", color: "hsl(142, 76%, 36%)" },
            traditional: { label: "Traditional Suppliers", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "pie" as const,
          title: "Supplier Diversity Benefits",
          data: [
            { name: "Tax Incentives", value: 1670000 },
            { name: "Innovation Value", value: 2100000 },
            { name: "Brand Enhancement", value: 890000 }
          ],
          config: {
            value: { label: "Annual Value ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "supplier-diversity-impact.pdf",
          title: "Supplier Diversity Program Impact Analysis",
          excerpt: "Diverse suppliers: 34% of spend, 23% faster delivery, 15% lower defects",
          page: 12
        },
        {
          id: 2,
          document: "diversity-program-roi.pdf",
          title: "Diversity Program ROI Assessment",
          excerpt: "$1.67M tax incentives earned, $890K cost premium vs traditional suppliers",
          page: 8
        }
      ]
    },
    timestamp: new Date("2024-03-03T12:30:00")
  },
  {
    id: "14",
    type: "answer",
    query: "What's the impact of cybersecurity threats on our supply chain operations?",
    content: {
      what: "Cybersecurity incidents affected 23% of supply chain operations this quarter, costing $3.47M in direct impact: $1.89M from 72-hour system downtime, $890K in emergency procurement at premium rates, and $693K for incident response and system hardening. Ransomware attack on key supplier TechSource delayed deliveries 8 days, causing $567K in production losses. Current security investments of $1.2M annually prevent estimated $8.9M in potential breach costs.",
      why: "Supply chain cyber vulnerabilities stem from interconnected systems and supplier security gaps: (1) 67% of suppliers lack adequate cybersecurity protocols, creating attack vectors into company systems, (2) Legacy ERP systems with 15-year-old security architecture vulnerable to modern threats, (3) Lack of real-time threat monitoring across supplier networks allows incidents to spread undetected for average 4.7 days, (4) Insufficient backup systems result in 72-hour recovery times vs industry benchmark of 24 hours.",
      recommendation: "Implement comprehensive cyber resilience program: (1) Mandate cybersecurity audits for all suppliers handling sensitive data with quarterly assessments (cost: $340K annually, prevents $2.1M potential breach exposure), (2) Upgrade ERP security infrastructure with zero-trust architecture (investment: $890K, prevents $3.4M annual risk exposure), (3) Deploy 24/7 supply chain security monitoring system with automated threat detection (cost: $245K, reduces incident response time to 4 hours), (4) Establish cyber insurance covering supply chain disruptions up to $10M (premium: $156K annually vs $3.47M current exposure).",
      charts: [
        {
          type: "pie" as const,
          title: "Cybersecurity Incident Costs",
          data: [
            { name: "System Downtime", value: 1890000 },
            { name: "Emergency Procurement", value: 890000 },
            { name: "Incident Response", value: 693000 },
            { name: "Production Losses", value: 567000 }
          ],
          config: {
            value: { label: "Cost Impact ($)" }
          }
        },
        {
          type: "bar" as const,
          title: "Security Investment vs Risk Exposure",
          data: [
            { name: "Current Investment", investment: 1200000, exposure: 8900000 },
            { name: "Recommended Investment", investment: 1631000, exposure: 2800000 }
          ],
          config: {
            investment: { label: "Annual Investment ($)", color: "hsl(142, 76%, 36%)" },
            exposure: { label: "Risk Exposure ($)", color: "hsl(0, 65%, 51%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "cyber-incident-cost-analysis.pdf",
          title: "Cybersecurity Incident Cost Analysis",
          excerpt: "Q1 cyber incidents: $3.47M total impact, 72-hour average downtime",
          page: 9
        },
        {
          id: 2,
          document: "supply-chain-security-assessment.pdf",
          title: "Supply Chain Security Assessment",
          excerpt: "67% of suppliers lack adequate cybersecurity protocols",
          page: 15
        }
      ]
    },
    timestamp: new Date("2024-03-02T14:45:00")
  },
  {
    id: "15",
    type: "answer",
    query: "How are labor shortages affecting our manufacturing and logistics costs?",
    content: {
      what: "Labor shortages increased operational costs by $4.67M annually across manufacturing (68% impact) and logistics (32% impact). Manufacturing overtime premiums totaled $2.34M due to 23% vacancy rate, while temporary staffing costs reached $890K at 45% premium rates. Logistics operations required $1.43M in premium wages (average $22.50/hr vs $18 target) and outsourced 34% of deliveries at 67% cost premium, adding $743K in third-party logistics expenses.",
      why: "Labor market tightness and competitive dynamics driving cost escalation: (1) Manufacturing unemployment in region at 2.1% (full employment) forcing wage competition, (2) Skilled technical positions remain unfilled average 89 days vs 45-day target, (3) Turnover increased to 34% annually requiring $12K per replacement in training costs, (4) Competition from e-commerce fulfillment centers offering $3-5/hr premiums for warehouse workers, and (5) Aging workforce with 45% eligible for retirement within 5 years creates knowledge transfer urgency.",
      recommendation: "Deploy multi-pronged workforce strategy: (1) Implement apprenticeship programs with local technical colleges to develop 50 skilled workers annually (investment: $245K, saves $890K in recruitment costs), (2) Increase base wages by 12% to market competitive rates reducing turnover and overtime needs (cost: $567K, saves $1.2M in temporary staffing), (3) Deploy automation for 30% of manual tasks reducing labor dependency (investment: $1.8M, 22-month payback through reduced labor costs), (4) Establish retention bonuses and career development programs reducing turnover from 34% to 18% (cost: $340K, saves $678K in replacement costs).",
      charts: [
        {
          type: "bar" as const,
          title: "Labor Cost Impact by Area",
          data: [
            { name: "Manufacturing OT", cost: 2340000, baseline: 1200000 },
            { name: "Temp Staffing", cost: 890000, baseline: 340000 },
            { name: "Premium Wages", cost: 1430000, baseline: 980000 },
            { name: "3PL Outsourcing", cost: 743000, baseline: 245000 }
          ],
          config: {
            cost: { label: "Current Cost ($)", color: "hsl(0, 65%, 51%)" },
            baseline: { label: "Baseline Cost ($)", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "line" as const,
          title: "Turnover and Vacancy Trends",
          data: [
            { name: "Jan", turnover: 28, vacancy: 18 },
            { name: "Feb", turnover: 31, vacancy: 21 },
            { name: "Mar", turnover: 34, vacancy: 23 },
            { name: "Apr", turnover: 36, vacancy: 25 }
          ],
          config: {
            turnover: { label: "Turnover Rate (%)", color: "hsl(0, 65%, 51%)" },
            vacancy: { label: "Vacancy Rate (%)", color: "hsl(38, 92%, 50%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "labor-cost-impact-analysis.pdf",
          title: "Labor Cost Impact Analysis",
          excerpt: "Labor shortages increased costs $4.67M: manufacturing 68%, logistics 32%",
          page: 6
        },
        {
          id: 2,
          document: "workforce-turnover-study.pdf",
          title: "Workforce Turnover Analysis",
          excerpt: "Turnover rate: 34% annually, replacement cost: $12K per position",
          page: 11
        }
      ]
    },
    timestamp: new Date("2024-03-01T10:15:00")
  },
  {
    id: "16",
    type: "answer",
    query: "What's the financial impact of our ESG compliance requirements?",
    content: {
      what: "ESG compliance investments totaled $2.89M this year but generated $4.12M in tangible benefits through reduced insurance premiums ($890K), regulatory incentives ($1.34M), improved supplier terms ($1.23M), and enhanced customer contracts ($657K). Carbon reporting costs $234K annually while supply chain transparency audits require $445K, but non-compliance penalties avoided totaled $1.87M. ESG-compliant operations command 15% premium pricing on $8.9M revenue base, adding $1.34M annual value.",
      why: "ESG compliance creates competitive advantage despite upfront costs: (1) Insurance companies offer 23% premium reductions for demonstrated environmental risk mitigation, (2) Government incentives worth $1.34M available for carbon reduction and diversity programs, (3) Major customers require ESG compliance for contract renewal, with compliant suppliers receiving preferential pricing and terms, (4) Non-compliance exposes company to $1.87M in potential fines and contract cancellations, and (5) ESG certification attracts premium customers willing to pay 15% more for sustainable products.",
      recommendation: "Optimize ESG ROI through strategic focus: (1) Accelerate carbon reduction initiatives to qualify for additional $567K in federal tax credits within 12 months, (2) Expand supplier ESG requirements to tier-2 suppliers capturing $234K additional incentives, (3) Develop ESG-compliant product lines targeting premium market segment (investment: $678K, revenue potential: $2.8M annually), (4) Implement automated ESG reporting system reducing compliance costs by 34% (investment: $156K, saves $189K annually), (5) Pursue B-Corp certification opening access to ESG-focused customer base worth $3.4M annual revenue potential.",
      charts: [
        {
          type: "bar" as const,
          title: "ESG Costs vs Benefits",
          data: [
            { name: "Compliance Costs", cost: 2890000, benefit: 0 },
            { name: "Insurance Savings", cost: 0, benefit: 890000 },
            { name: "Incentives", cost: 0, benefit: 1340000 },
            { name: "Premium Pricing", cost: 0, benefit: 1340000 },
            { name: "Improved Terms", cost: 0, benefit: 1880000 }
          ],
          config: {
            cost: { label: "Costs ($)", color: "hsl(0, 65%, 51%)" },
            benefit: { label: "Benefits ($)", color: "hsl(142, 76%, 36%)" }
          }
        },
        {
          type: "pie" as const,
          title: "ESG Benefit Sources",
          data: [
            { name: "Insurance Savings", value: 890000 },
            { name: "Regulatory Incentives", value: 1340000 },
            { name: "Premium Pricing", value: 1340000 },
            { name: "Supplier Terms", value: 880000 }
          ],
          config: {
            value: { label: "Annual Value ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "esg-financial-impact-analysis.pdf",
          title: "ESG Financial Impact Analysis",
          excerpt: "ESG investment: $2.89M, benefits: $4.12M, net positive $1.23M annually",
          page: 4
        },
        {
          id: 2,
          document: "esg-premium-pricing-study.pdf",
          title: "ESG Premium Pricing Analysis",
          excerpt: "ESG-compliant products command 15% premium on $8.9M revenue base",
          page: 17
        }
      ]
    },
    timestamp: new Date("2024-02-29T13:25:00")
  },
  {
    id: "17",
    type: "answer",
    query: "How is artificial intelligence improving our supply chain efficiency?",
    content: {
      what: "AI implementations across supply chain generated $6.78M in efficiency gains over 18 months with $2.4M total investment, achieving 283% ROI. Demand forecasting accuracy improved from 67% to 91% preventing $2.34M in stockouts and overstock. Predictive maintenance reduced unplanned downtime by 67% saving $1.89M in production losses. Route optimization AI cut transportation costs 23% ($890K savings) while inventory optimization freed $1.67M in working capital through 34% reduction in safety stock requirements.",
      why: "AI success driven by data-rich environment and targeted implementation: (1) Machine learning algorithms process 2.3M data points daily from suppliers, warehouses, and customers to optimize decisions, (2) Predictive analytics identify equipment failure patterns 72 hours in advance vs 4-hour manual detection, (3) Dynamic pricing algorithms adjust supplier bids in real-time based on market conditions and demand patterns, (4) Natural language processing automates 78% of routine procurement communications, and (5) Computer vision quality inspection detects defects 45% faster with 96% accuracy vs 89% manual inspection.",
      recommendation: "Scale AI deployment based on proven returns: (1) Expand predictive maintenance to cover 95% of critical equipment (investment: $567K, prevents $1.2M annual downtime), (2) Deploy AI-powered supplier risk monitoring system providing real-time alerts on financial distress, quality issues, and delivery risks (cost: $340K, prevents $890K annual disruptions), (3) Implement autonomous inventory replenishment reducing manual intervention by 89% (investment: $445K, saves $678K annually in labor costs), (4) Deploy conversational AI for supplier communications reducing processing time by 67% (cost: $234K, saves $456K annually).",
      charts: [
        {
          type: "bar" as const,
          title: "AI Investment Returns by Application",
          data: [
            { name: "Demand Forecasting", investment: 600000, savings: 2340000 },
            { name: "Predictive Maintenance", investment: 800000, savings: 1890000 },
            { name: "Route Optimization", investment: 400000, savings: 890000 },
            { name: "Inventory Optimization", investment: 600000, savings: 1670000 }
          ],
          config: {
            investment: { label: "Investment ($)", color: "hsl(0, 65%, 51%)" },
            savings: { label: "Annual Savings ($)", color: "hsl(142, 76%, 36%)" }
          }
        },
        {
          type: "line" as const,
          title: "Forecast Accuracy Improvement",
          data: [
            { name: "Baseline", accuracy: 67, target: 85 },
            { name: "Month 6", accuracy: 78, target: 85 },
            { name: "Month 12", accuracy: 87, target: 85 },
            { name: "Month 18", accuracy: 91, target: 85 }
          ],
          config: {
            accuracy: { label: "Forecast Accuracy (%)", color: "hsl(142, 76%, 36%)" },
            target: { label: "Target (%)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "ai-supply-chain-roi.pdf",
          title: "AI Supply Chain ROI Analysis",
          excerpt: "AI investment: $2.4M, efficiency gains: $6.78M, 283% ROI over 18 months",
          page: 8
        },
        {
          id: 2,
          document: "predictive-analytics-impact.pdf",
          title: "Predictive Analytics Impact Study",
          excerpt: "Demand forecast accuracy: 67% to 91%, prevented $2.34M in inventory costs",
          page: 14
        }
      ]
    },
    timestamp: new Date("2024-02-28T09:40:00")
  }
];

export const getRandomQAs = (count: number = 5): ChatMessage[] => {
  return supplyChainQAs.slice(0, count);
};

export const additionalQuestions = [
  "What's the ROI on our last supply chain automation project?",
  "Which regions have the highest transportation costs?",
  "How do weather patterns affect our logistics performance?",
  "What's our average supplier onboarding time?",
  "Which product categories have the most stockouts?",
  "How effective are our demand forecasting models?",
  "What's the impact of fuel price volatility?",
  "Which suppliers provide the best quality metrics?",
  "How do trade tariffs affect our sourcing strategy?",
  "What's our carbon footprint from transportation?",
  "Which warehouses have the highest operating costs?",
  "How do seasonal patterns affect inventory levels?",
  "What's the average time to resolve supplier disputes?",
  "Which trade lanes show the most delays?",
  "How does our performance compare to industry benchmarks?",
  "What's the total cost of ownership for our logistics network?",
  "Which suppliers have the best ESG ratings?",
  "How do geopolitical events impact supply continuity?",
  "What's the financial impact of product recalls?",
  "Which distribution channels are most cost-effective?",
  "How do labor shortages affect our operations?",
  "What's the average lead time for critical components?",
  "Which suppliers offer the best payment terms?",
  "How do we measure supplier innovation contribution?",
  "What's the cost impact of regulatory compliance changes?"
];

// PDF document data
export const pdfDocuments = [
  {
    id: "freight-analysis-q3-2024.pdf",
    title: "Quarterly Freight Cost Analysis Q3 2024",
    pages: 28,
    type: "Financial Analysis",
    content: `QUARTERLY FREIGHT COST ANALYSIS
Q3 2024 EXECUTIVE SUMMARY

TRANSLOGISTICS INC. FREIGHT SERVICES
Invoice Analysis & Cost Optimization Report

Executive Summary:
Total freight spend for Q3 2024: $2,847,300
Variance from budget: +23.4% ($542,100 over)
Key anomalies identified: $156,800 in questionable charges

ROUTE ANALYSIS:
Route A (Chicago-Miami): $823,400 spend
Route B (Chicago-Atlanta): $1,234,500 spend (+47% vs Q2)
Route C (Detroit-Houston): $789,400 spend

VENDOR PERFORMANCE:
TransLogistics Inc.: 67% of total spend
- Freight class misclassifications: 23 instances
- Duplicate fuel surcharges: $127,400 total
- Average overcharge per shipment: $2,056

DETAILED FINDINGS:
[HIGHLIGHTED: TransLogistics Inc. freight class misclassification: Class 85 applied instead of Class 60, resulting in $47,300 overcharges across 23 shipments]

Shipment #TL-2024-00347:
- Origin: Chicago, IL 60601
- Destination: Atlanta, GA 30309
- Weight: 15,420 lbs
- Incorrect Classification: Class 85 (should be Class 60)
- Base Rate Overcharge: $890 per shipment
- Fuel Surcharge: $127.50
- Additional Fuel Adjustment: $127.50 (DUPLICATE)
- Total Overcharge: $1,145 per shipment

Recommendation: Implement automated freight class verification system
Estimated Annual Savings: $428,700

FUEL SURCHARGE ANALYSIS:
Q3 Average Fuel Price: $3.87/gallon
Surcharge Rate: 23.4%
Double-charged instances: 89 shipments
Recovery potential: $127,400

DETENTION & DEMURRAGE:
Total charges: $89,400
Average detention time: 4.2 hours
Primary causes:
1. Port congestion (45%)
2. Documentation delays (23%)
3. Equipment availability (32%)

QUALITY METRICS:
On-time delivery: 87.3% (target: 95%)
Damage claims: $23,400 (0.8% of shipments)
Customer satisfaction: 3.2/5.0

COST PER MILE ANALYSIS:
Route B Cost Increase:
Q2 2024: $2.34/mile
Q3 2024: $10.30/mile
Variance: 340% increase

Root Causes:
- Driver shortage premium: +$1.20/mile
- Fuel volatility: +$0.87/mile
- Equipment shortage: +$2.45/mile
- Routing inefficiency: +$3.44/mile`
  },
  {
    id: "supplier-compliance-q3.pdf", 
    title: "Supplier Compliance Report Q3 2024",
    pages: 45,
    type: "Compliance Report",
    content: `SUPPLIER COMPLIANCE REPORT
Q3 2024 COMPREHENSIVE ANALYSIS

EXECUTIVE DASHBOARD:
Total Active Suppliers: 234
Compliant Suppliers: 167 (71.4%)
Non-Compliant: 67 (28.6%)
Critical Issues: 12 suppliers

HIGH-RISK SUPPLIER ANALYSIS:

1. MERIDIAN SUPPLY CO.
Risk Score: 8.7/10 (Critical)
Contract Value: $2.3M annually
[HIGHLIGHTED: Meridian Supply Co.: 23 violations including 8 missed delivery deadlines, 12 quality failures, 3 pricing disputes]

Violation History Q3:
- Delivery Performance: 8 missed deadlines (avg delay: 5.2 days)
- Quality Failures: 12 incidents (defect rate: 4.7%)
- Pricing Disputes: 3 instances ($45,600 discrepancy)
- Documentation Issues: 7 incomplete submissions
- SLA Breaches: 15 total incidents

Financial Impact:
- Production delays: $89,400 cost
- Quality rework: $34,500 cost
- Expedited shipping: $23,100 cost
- Total Q3 Impact: $147,000

Recommended Actions:
1. Immediate supplier audit
2. Performance improvement plan
3. Consider alternative sourcing

2. GLOBAL PARTS INC.
Risk Score: 7.2/10 (High)
Contract Value: $1.8M annually
[HIGHLIGHTED: Global Parts Inc. invoked force majeure 12 times in Q3, 300% above industry average]

Force Majeure Analysis:
- Weather-related: 3 invocations (legitimate)
- Labor disputes: 4 invocations (questionable)
- Supply chain disruption: 5 invocations (under review)
- Industry average: 3-4 invocations per year
- Global Parts Q3: 12 invocations

Cost Impact:
- Delayed deliveries: $67,800
- Alternative sourcing: $45,200
- Rush charges: $28,900
- Total Impact: $141,900

3. APEX MANUFACTURING
Risk Score: 6.8/10 (Medium-High)
Contract Value: $1.2M annually
[HIGHLIGHTED: Apex Manufacturing: 15 deliveries exceeding 48-hour SLA threshold, average delay 72 hours]

SLA Performance Issues:
- Standard SLA: 48 hours
- Q3 Performance: 15 breaches
- Average delay: 72 hours (150% over SLA)
- Worst case: 156 hours delay

Impact Analysis:
- Production line stoppage: 23 hours total
- Cost per hour downtime: $12,400
- Total production impact: $285,200
- Customer delivery delays: 8 instances

INDUSTRY BENCHMARKING:
[HIGHLIGHTED: Automotive suppliers: 34% non-compliance rate vs 20% electronics suppliers]

Compliance by Industry:
- Automotive: 34% non-compliance
- Electronics: 20% non-compliance  
- Chemicals: 28% non-compliance
- Packaging: 22% non-compliance
- Raw Materials: 31% non-compliance

QUALITY METRICS:
- Incoming quality rate: 94.3%
- Target: 99.2%
- Gap: 4.9 percentage points
- Defects per million: 57,000 (target: 8,000)

CORRECTIVE ACTIONS:
1. Supplier Development Program
2. Enhanced Quality Agreements
3. Increased Audit Frequency
4. Alternative Supplier Qualification

FINANCIAL SUMMARY:
Total compliance-related costs Q3: $847,300
- Supplier penalties: $234,100
- Quality issues: $278,900
- Delivery delays: $189,700
- Administrative costs: $144,600

Projected annual impact: $3.2M
Industry average: $1.8M (78% higher than benchmark)`
  },
  {
    id: "port-congestion-impact.pdf",
    title: "Port Congestion Analysis Q3 2024", 
    pages: 22,
    type: "Logistics Report",
    content: `PORT CONGESTION IMPACT ANALYSIS
Q3 2024 SUPPLY CHAIN DISRUPTION REPORT

EXECUTIVE SUMMARY:
Total economic impact: $445,000 monthly
Affected shipments: 234 containers
Average delay: 5.4 days per container
Peak congestion period: July 15 - August 20

MAJOR PORT ANALYSIS:

LONG BEACH PORT:
Container volume: 156 units (Q3)
[HIGHLIGHTED: Long Beach and Houston port delays averaging 4.2 days, causing $156K in detention charges]
Average delay: 6.2 days
Peak delay: 12 days (July 28)
Congestion level: Severe (95% capacity)

Cost Impact Breakdown:
- Demurrage charges: $89,400
- Detention fees: $67,200
- Storage costs: $34,800
- Expedited handling: $23,600
- Total Long Beach impact: $215,000

HOUSTON PORT:
Container volume: 78 units (Q3)
Average delay: 4.8 days
Peak delay: 9 days (August 3)
Congestion level: High (87% capacity)

Cost Impact:
- Demurrage charges: $45,300
- Detention fees: $38,900
- Storage costs: $18,200
- Total Houston impact: $102,400

ROOT CAUSE ANALYSIS:
1. Labor Shortages (35% of delays)
   - Longshoremen availability: 67% of normal
   - Equipment operators: 72% of normal
   - Administrative staff: 81% of normal

2. Equipment Constraints (28% of delays)
   - Crane availability: 78% operational
   - Truck chassis shortage: 45% deficit
   - Container handling equipment: 82% operational

3. Weather Events (15% of delays)
   - Hurricane threat closures: 3 days
   - High wind delays: 8 instances
   - Fog-related delays: 12 instances

4. Documentation Issues (22% of delays)
   - Customs clearance delays: 156 instances
   - Incorrect paperwork: 89 cases
   - Missing documentation: 34 shipments

CONTAINER DWELL TIME ANALYSIS:
[HIGHLIGHTED: Current dwell time: 8.9 days vs pre-pandemic 4.7 days (89% increase)]

Historical Comparison:
- Pre-pandemic (2019): 4.7 days average
- 2020: 6.2 days
- 2021: 7.8 days  
- 2022: 8.1 days
- 2023: 8.4 days
- Q3 2024: 8.9 days

Dwell Time by Port:
- Long Beach: 9.4 days
- Houston: 8.1 days
- Savannah: 7.6 days
- Norfolk: 7.9 days

SUPPLY CHAIN IMPACT:

AUTOMOTIVE DIVISION:
[HIGHLIGHTED: Automotive parts: 67% shipments delayed, average impact 5.4 days per shipment]
- Total shipments: 89 containers
- Delayed shipments: 60 containers (67%)
- Average delay: 5.4 days
- Production line stoppages: 23 instances
- Cost per stoppage: $45,600
- Total automotive impact: $1,048,800

ELECTRONICS DIVISION:
- Total shipments: 67 containers
- Delayed shipments: 34 containers (51%)
- Average delay: 4.1 days
- Obsolescence risk: High (product lifecycle 6 months)
- Air freight switches: 12 shipments
- Additional cost: $89,400

COST MITIGATION STRATEGIES:

1. Modal Shift Analysis:
[HIGHLIGHTED: Air freight usage increased 234%, cost per kg: $12.40 vs ocean $2.10]
- Ocean freight: $2.10/kg
- Air freight: $12.40/kg
- Cost multiplier: 5.9x
- Usage increase: 234%
- Additional air freight cost: $278,900

2. Alternative Port Routing:
- Savannah diversion: 23 containers
- Norfolk diversion: 15 containers
- Additional trucking cost: $67,800
- Time savings: 3.2 days average

3. Inventory Buffer Strategy:
- Increased safety stock: $890,000 investment
- Carrying cost: 18% annually
- Annual carrying cost increase: $160,200
- Stockout prevention value: $1.2M

PERFORMANCE METRICS:

Port Efficiency Scores (1-10):
- Long Beach: 4.2/10 (Critical)
- Houston: 5.8/10 (Poor)
- Savannah: 7.1/10 (Good) 
- Norfolk: 6.9/10 (Acceptable)

Customer Impact:
- Delivery delays to customers: 45 instances
- Customer complaints: 23 cases
- Potential lost sales: $156,700
- Customer satisfaction impact: -1.2 points

RECOMMENDATIONS:

1. Diversify port strategy
2. Increase inventory buffers for critical items
3. Develop alternative supplier base
4. Invest in supply chain visibility tools
5. Negotiate detention/demurrage caps

Timeline for Implementation: 90 days
Expected cost reduction: 35-45%
ROI projection: 18 months`
  }
];