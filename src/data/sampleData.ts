// Comprehensive supply chain dataset for Enterprise Insight Copilot

export interface ChatMessage {
  id: string;
  type: 'answer' | 'anomaly';
  query: string;
  content: {
    what?: string;
    why?: string;
    recommendation?: string;
    answer?: string; // For Perplexity-style single answer
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
      answer: "The main freight cost anomalies this quarter include a 47% increase in Route B shipments, duplicate fuel surcharges totaling $127,400, and misclassified freight leading to $89,200 in overcharges. TransLogistics Inc. accounts for 67% of these anomalies, primarily due to incorrect Class 85 classifications instead of Class 60 for machinery shipments¹. The Chicago-Atlanta corridor shows the highest variance at 340% above baseline costs². Additionally, detention charges have spiked by 89% due to port congestion in Long Beach and Houston³.",
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
      answer: "Based on recent contract analysis, Meridian Supply Co. presents the highest compliance risk with 23 contract violations in Q3, including missed delivery deadlines and quality specification failures¹. Global Parts Inc. follows with 18 violations, primarily related to force majeure clause abuse and pricing discrepancies². Apex Manufacturing shows concerning trends with 15 late deliveries exceeding contractual SLA thresholds³. The automotive supply chain segment shows 67% higher non-compliance rates compared to electronics suppliers⁴.",
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
      answer: "Inventory holding costs have increased by 156% due to three primary factors: excess safety stock accumulation worth $2.3M in slow-moving SKUs¹, warehouse capacity constraints forcing premium storage rates², and prolonged cash conversion cycles averaging 89 days versus industry standard of 45 days³. The electronics category shows the highest impact with $890K in obsolete inventory⁴. Poor demand forecasting accuracy (67% vs target 85%) has led to overordering in Q2 and Q3⁵.",
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
      answer: "Port delays are costing the company $445K monthly through demurrage fees, detention charges, and expedited shipping¹. Long Beach port shows average delays of 6.2 days, while Houston averages 4.8 days². Container dwell time has increased 89% compared to pre-pandemic levels³. The automotive parts division is most affected, with 67% of inbound shipments experiencing delays⁴. Air freight costs have increased 234% as companies switch from ocean freight to meet delivery deadlines⁵.",
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
      answer: "Key contract risks include unlimited liability exposure in 34% of supplier agreements¹, inadequate force majeure clauses that don't cover cyber incidents², and pricing escalation terms without caps affecting $12.3M in annual spend³. IP indemnification gaps exist in 67% of technology supplier contracts⁴. Payment terms averaging 45 days are straining supplier relationships and increasing supply risk⁵. Currency hedging provisions are missing in 78% of international contracts⁶.",
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