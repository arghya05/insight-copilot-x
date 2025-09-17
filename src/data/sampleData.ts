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

CARRIER PERFORMANCE ANALYSIS:

TransLogistics Inc.:
- Total spend: $1,247,300
- Overcharges identified: $156,800
- Primary issues: Freight classification errors (67% of overcharges)

Detailed Freight Class Issues:
- 23 machinery shipments incorrectly classified as Class 85 instead of Class 60
- Cost per shipment impact: $2,056 average overcharge
- Recovery potential: $47,300 confirmed recoverable amount

Route Analysis:
Route A (New York-Miami): Performance within 5% of budget
Route B (Chicago-Atlanta): 340% cost increase vs Q2 baseline
Route C (Los Angeles-Dallas): 12% under budget due to carrier optimization

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

Meridian Supply Co. (Contract Value: $2.3M annually)
Violations This Quarter: 23
- Delivery delays: 8 instances (avg 5.2 days late)
- Quality failures: 12 cases (4.7% defect rate vs 0.8% standard)
- Pricing disputes: 3 instances

Cost Impact:
- Production delays: $89,400
- Quality rework: $34,500
- Expedited shipping: $23,100
Total Impact: $147,000

Global Parts Inc. (Contract Value: $1.8M annually)
Force Majeure Claims: 12 (vs industry avg 3-4)
Pattern Analysis: Suspect abuse of contract terms
Recommended Action: Contract renegotiation required

Performance Metrics:
- On-time delivery: 67% (Target: 95%)
- Quality rating: 2.3/5 (Target: 4.5/5)
- Cost adherence: 78% (Target: 98%)

FINANCIAL SUMMARY:
Total compliance-related costs Q3: $847,300
- Supplier penalties: $234,100
- Quality issues: $278,900
- Delivery delays: $189,700
- Administrative costs: $144,600

Projected annual impact: $3.2M
Industry average: $1.8M (78% higher than benchmark)`
  }
];