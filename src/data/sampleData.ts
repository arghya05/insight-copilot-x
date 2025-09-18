// Comprehensive supply chain dataset for Algonomy Supply Chain Control Tower

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
    query: "What's the ROI on our last supply chain automation project?",
    content: {
      what: "The Q2 2024 warehouse automation project delivered 247% ROI in 8 months, generating $1.87M in net benefits against $757K investment. Labor costs decreased 43% ($1.2M annual savings) while processing accuracy improved from 94.2% to 99.7%, eliminating $340K in error-related costs annually.",
      why: "Automated sorting systems eliminated 67% of manual handling processes, reducing labor hours from 2,400 to 800 per day. Real-time inventory tracking cut stockout incidents by 78% and reduced excess inventory carrying costs by $280K quarterly. The ROI exceeded projections due to unexpected efficiency gains in cross-docking operations (+23% throughput).",
      recommendation: "Scale automation to remaining 3 distribution centers within 12 months (projected $4.2M additional ROI). Prioritize Dallas facility next due to similar operational profile. Negotiate volume discount with AutoTech Solutions for multi-site deployment to reduce per-unit costs by 15-20%. Establish automation center of excellence to standardize implementations.",
      charts: [
        {
          type: "bar",
          title: "ROI Breakdown by Component",
          data: [
            { name: "Labor Savings", value: 1200000, percentage: 64 },
            { name: "Accuracy Gains", value: 340000, percentage: 18 },
            { name: "Inventory Optimization", value: 280000, percentage: 15 },
            { name: "Throughput Increase", value: 50000, percentage: 3 }
          ],
          config: {
            value: { label: "Annual Savings ($)", color: "hsl(142, 71%, 45%)" },
            percentage: { label: "% of Total ROI", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "trend",
          title: "Monthly Performance Metrics",
          data: [
            { period: "Pre-Auto", accuracy: 94.2, throughput: 12500, labor_hours: 2400 },
            { period: "Month 1", accuracy: 96.8, throughput: 13200, labor_hours: 1800 },
            { period: "Month 3", accuracy: 98.5, throughput: 14100, labor_hours: 1200 },
            { period: "Month 6", accuracy: 99.4, throughput: 15300, labor_hours: 900 },
            { period: "Month 8", accuracy: 99.7, throughput: 15400, labor_hours: 800 }
          ],
          config: {
            accuracy: { label: "Accuracy (%)", color: "hsl(142, 71%, 45%)" },
            throughput: { label: "Daily Throughput", color: "hsl(217, 91%, 60%)" },
            labor_hours: { label: "Labor Hours", color: "hsl(0, 65%, 51%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "automation-roi-analysis.pdf",
          title: "Warehouse Automation ROI Analysis Q2 2024",
          excerpt: "Total project investment: $757K. Realized savings: $1.87M over 8 months. Net ROI: 247%",
          page: 3
        },
        {
          id: 2,
          document: "labor-efficiency-report.pdf",
          title: "Labor Efficiency Impact Report",
          excerpt: "Daily labor requirements reduced from 2,400 hours to 800 hours, 67% reduction in manual processes",
          page: 12
        }
      ]
    },
    timestamp: new Date("2024-03-13T09:15:00")
  },
  {
    id: "4",
    type: "answer",
    query: "Which regions have the highest transportation costs?",
    content: {
      what: "West Coast operations drive 47% of total transportation spend at $3.2M quarterly, with Los Angeles-Portland corridor costing $4.67 per mile versus national average of $2.85. Northeast region follows at $2.8M quarterly, primarily due to New York metropolitan area surcharges averaging $127 per shipment and tunnel/bridge tolls adding $45K monthly overhead.",
      why: "California's driver shortage (23% below national average) forces premium rates up to $0.95/mile above base rates. Port congestion at Long Beach adds 3.2 days average detention time at $165/day. Northeast costs stem from urban delivery restrictions requiring smaller vehicles (reducing efficiency 34%) and mandatory overnight parking fees averaging $89 per driver per night in NYC area.",
      recommendation: "Implement regional cost optimization within 90 days: (1) Establish West Coast hub in Sacramento to reduce LA dependency and cut corridor costs 18%, (2) Negotiate annual contracts with 3 Northeast carriers for volume discounts targeting 12% rate reduction, (3) Deploy smaller electric vehicles for NYC last-mile delivery to avoid diesel restrictions and reduce per-mile costs by $0.43, (4) Optimize routing algorithms to minimize toll exposure, projected $180K annual savings.",
      charts: [
        {
          type: "pie",
          title: "Transportation Costs by Region",
          data: [
            { name: "West Coast", value: 3200000, percentage: 47 },
            { name: "Northeast", value: 2800000, percentage: 41 },
            { name: "Southeast", value: 540000, percentage: 8 },
            { name: "Midwest", value: 270000, percentage: 4 }
          ],
          config: {
            value: { label: "Quarterly Cost ($)" }
          }
        },
        {
          type: "bar",
          title: "Cost Per Mile by Corridor",
          data: [
            { name: "LA-Portland", cost: 4.67, volume: 1200 },
            { name: "NY-Boston", cost: 4.23, volume: 980 },
            { name: "Miami-Atlanta", cost: 2.45, volume: 1850 },
            { name: "Chicago-Detroit", cost: 2.12, volume: 2100 }
          ],
          config: {
            cost: { label: "Cost per Mile ($)", color: "hsl(0, 65%, 51%)" },
            volume: { label: "Monthly Shipments", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "regional-transport-analysis.pdf",
          title: "Regional Transportation Cost Analysis",
          excerpt: "West Coast transportation costs: $3.2M quarterly, LA-Portland corridor at $4.67/mile vs $2.85 national average",
          page: 8
        },
        {
          id: 2,
          document: "port-congestion-impact.pdf",
          title: "Port Congestion Impact Study",
          excerpt: "Long Beach port delays averaging 3.2 days, detention costs $165/day per container",
          page: 15
        }
      ]
    },
    timestamp: new Date("2024-03-12T11:45:00")
  },
  {
    id: "5",
    type: "answer",
    query: "How do weather patterns affect our logistics performance?",
    content: {
      what: "Severe weather events caused $1.24M in logistics disruptions this year, with winter storms accounting for 62% of delays (average 2.8 days per event) and hurricane season disrupting Gulf Coast operations for 23 total days. Q1 ice storms alone delayed 1,847 shipments, while Hurricane Ida backup created a 12-day backlog costing $387K in expedited recovery shipping.",
      why: "Weather dependency stems from concentrated routing through high-risk corridors: 67% of Northeast freight uses I-95 (ice storm vulnerable), and 43% of Southeast volume routes through hurricane-prone Gulf ports. Limited carrier diversity means single weather events cascade across the network. Predictive capabilities are insufficient - current 3-day forecasting misses 34% of disruptive events.",
      recommendation: "Build weather resilience within 6 months: (1) Diversify routes to avoid single-point-of-failure corridors, adding I-81 and I-77 alternatives for Northeast traffic, (2) Implement 10-day weather forecasting with AI predictive modeling to pre-position inventory before storms, (3) Establish strategic buffer inventory (5-7 days supply) in weather-safe inland locations, (4) Create rapid response carrier network with 48-hour activation capability for weather recovery, targeting 50% reduction in weather-related costs.",
      charts: [
        {
          type: "bar",
          title: "Weather Impact by Event Type",
          data: [
            { name: "Winter Storms", delays: 1847, cost: 768000, days: 45 },
            { name: "Hurricanes", delays: 892, cost: 387000, days: 23 },
            { name: "Flooding", delays: 234, cost: 67000, days: 8 },
            { name: "Extreme Heat", delays: 156, cost: 18000, days: 4 }
          ],
          config: {
            delays: { label: "Shipment Delays", color: "hsl(0, 65%, 51%)" },
            cost: { label: "Cost Impact ($)", color: "hsl(39, 98%, 52%)" },
            days: { label: "Total Disruption Days", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "trend",
          title: "Monthly Weather Disruption Costs",
          data: [
            { month: "Jan", cost: 234000, events: 3 },
            { month: "Feb", cost: 456000, events: 5 },
            { month: "Mar", cost: 123000, events: 2 },
            { month: "Aug", cost: 387000, events: 2 },
            { month: "Sep", cost: 89000, events: 1 }
          ],
          config: {
            cost: { label: "Disruption Cost ($)", color: "hsl(0, 65%, 51%)" },
            events: { label: "Weather Events", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "weather-impact-analysis.pdf",
          title: "Weather Impact Analysis 2024",
          excerpt: "Total weather-related logistics disruptions: $1.24M. Winter storms: 62% of delays, average 2.8 days per event",
          page: 4
        },
        {
          id: 2,
          document: "hurricane-ida-assessment.pdf",
          title: "Hurricane Ida Logistics Assessment",
          excerpt: "12-day operational backlog, $387K in expedited shipping costs for recovery operations",
          page: 7
        }
      ]
    },
    timestamp: new Date("2024-03-11T14:30:00")
  },
  {
    id: "6",
    type: "answer",
    query: "What's our average supplier onboarding time?",
    content: {
      what: "Current supplier onboarding averages 127 days from initial contact to first shipment, 73% longer than industry benchmark of 73 days. Critical component suppliers require 156 days due to extended qualification processes, while standard suppliers average 89 days. This delays new product launches by 4.2 months on average and has cost us $2.3M in delayed revenue this year.",
      why: "Bottlenecks occur in three phases: (1) Compliance verification takes 42 days versus industry standard 18 days due to manual document review and lack of digital certification platform, (2) Quality audits require 38 days with physical site visits when 67% could be virtual, (3) System integration averages 31 days due to legacy ERP limitations requiring custom API development for each new supplier.",
      recommendation: "Accelerate onboarding to 65-day target within 4 months: (1) Deploy digital supplier portal with automated compliance verification, reducing documentation phase from 42 to 15 days, (2) Implement virtual audit capability for low-risk suppliers (saving 21 days average), (3) Standardize ERP integration with pre-built API connectors for top 85% of supplier systems, (4) Create fast-track process for strategic suppliers with dedicated onboarding team, targeting 45-day completion for critical suppliers.",
      charts: [
        {
          type: "bar",
          title: "Onboarding Time by Supplier Category",
          data: [
            { name: "Critical Components", current: 156, target: 45, suppliers: 23 },
            { name: "Standard Suppliers", current: 89, target: 65, suppliers: 187 },
            { name: "Service Providers", current: 67, target: 30, suppliers: 45 },
            { name: "Raw Materials", current: 134, target: 55, suppliers: 34 }
          ],
          config: {
            current: { label: "Current Days", color: "hsl(0, 65%, 51%)" },
            target: { label: "Target Days", color: "hsl(142, 71%, 45%)" },
            suppliers: { label: "Active Suppliers", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "pie",
          title: "Onboarding Phase Breakdown",
          data: [
            { name: "Compliance Verification", value: 42, percentage: 33 },
            { name: "Quality Audits", value: 38, percentage: 30 },
            { name: "System Integration", value: 31, percentage: 24 },
            { name: "Contract Negotiation", value: 16, percentage: 13 }
          ],
          config: {
            value: { label: "Days" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "supplier-onboarding-analysis.pdf",
          title: "Supplier Onboarding Process Analysis",
          excerpt: "Average onboarding time: 127 days vs industry benchmark 73 days. Critical suppliers require 156 days average",
          page: 5
        },
        {
          id: 2,
          document: "onboarding-bottleneck-study.pdf",
          title: "Onboarding Bottleneck Assessment",
          excerpt: "Compliance verification: 42 days (vs 18-day standard). Manual review process identified as primary delay factor",
          page: 12
        }
      ]
    },
    timestamp: new Date("2024-03-10T16:20:00")
  },
  {
    id: "7",
    type: "answer",
    query: "Which product categories have the most stockouts?",
    content: {
      what: "Electronics components lead stockouts with 23.4% occurrence rate (147 SKUs affected), causing $1.87M in lost sales this quarter. Automotive parts follow at 18.7% (89 SKUs), while industrial equipment shows 15.2% stockout rate. High-demand consumer electronics account for 67% of critical stockouts, with semiconductor chips averaging 12.3 days out-of-stock per incident.",
      why: "Electronics volatility stems from supplier allocation challenges - key components from Taiwan face 45-day lead times versus forecasted 21 days, while demand spikes 340% above forecast during product launches. Automotive stockouts result from just-in-time inventory strategy with only 3.2 days safety stock versus recommended 7 days. Poor demand sensing misses 78% of sudden demand changes in consumer electronics.",
      recommendation: "Implement category-specific inventory strategies within 8 weeks: (1) Increase electronics safety stock to 14 days for A-class components and establish dual sourcing for top 50 critical semiconductors, (2) Deploy AI demand sensing for consumer electronics with real-time social media and market trend analysis, (3) Negotiate vendor-managed inventory agreements with automotive suppliers for 89% stockout reduction, (4) Create dynamic reorder points based on velocity changes, targeting sub-5% stockout rates across all categories.",
      charts: [
        {
          type: "bar",
          title: "Stockout Rates by Product Category",
          data: [
            { name: "Electronics", rate: 23.4, skus: 147, lost_sales: 1870000 },
            { name: "Automotive", rate: 18.7, skus: 89, lost_sales: 1245000 },
            { name: "Industrial", rate: 15.2, skus: 67, lost_sales: 890000 },
            { name: "Consumer Goods", rate: 12.8, skus: 234, lost_sales: 567000 },
            { name: "Raw Materials", rate: 8.9, skus: 45, lost_sales: 234000 }
          ],
          config: {
            rate: { label: "Stockout Rate (%)", color: "hsl(0, 65%, 51%)" },
            skus: { label: "Affected SKUs", color: "hsl(217, 91%, 60%)" },
            lost_sales: { label: "Lost Sales ($)", color: "hsl(39, 98%, 52%)" }
          }
        },
        {
          type: "trend",
          title: "Monthly Stockout Trends",
          data: [
            { month: "Jan", electronics: 19.2, automotive: 16.8, industrial: 12.4 },
            { month: "Feb", electronics: 21.7, automotive: 17.9, industrial: 14.1 },
            { month: "Mar", electronics: 23.4, automotive: 18.7, industrial: 15.2 },
            { month: "Apr", electronics: 25.1, automotive: 19.3, industrial: 16.8 }
          ],
          config: {
            electronics: { label: "Electronics (%)", color: "hsl(0, 65%, 51%)" },
            automotive: { label: "Automotive (%)", color: "hsl(39, 98%, 52%)" },
            industrial: { label: "Industrial (%)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "stockout-analysis-q1.pdf",
          title: "Q1 2024 Stockout Analysis",
          excerpt: "Electronics components: 23.4% stockout rate, 147 SKUs affected, $1.87M lost sales",
          page: 9
        },
        {
          id: 2,
          document: "demand-forecast-accuracy.pdf",
          title: "Demand Forecast Accuracy Report",
          excerpt: "Consumer electronics demand sensing accuracy: 22% (industry benchmark: 75-80%)",
          page: 14
        }
      ]
    },
    timestamp: new Date("2024-03-09T13:10:00")
  },
  {
    id: "8",
    type: "answer",
    query: "How effective are our demand forecasting models?",
    content: {
      what: "Current demand forecasting achieves 67.3% accuracy across all product lines, falling short of industry benchmark 78-82%. Consumer electronics show worst performance at 43.2% accuracy due to volatile market trends, while industrial products achieve 81.4% accuracy. Forecast errors cost $3.4M quarterly in excess inventory and stockouts, with electronics contributing $2.1M of this impact.",
      why: "Model limitations include: (1) Reliance on historical data without external factor integration - missing 89% of promotional impacts and competitor launches, (2) Monthly forecast updates versus recommended weekly refreshes for fast-moving categories, (3) Limited machine learning capabilities - current linear regression models can't capture seasonal interactions and trend changes that account for 34% of forecast variance.",
      recommendation: "Upgrade forecasting infrastructure within 12 weeks: (1) Deploy AI-powered demand sensing with external data integration (social media trends, weather, economic indicators) targeting 85% accuracy, (2) Implement daily forecast updates for electronics and weekly for other categories, (3) Add collaborative planning platform with sales team input for promotional and launch activities, (4) Create forecast accuracy KPIs with monthly business reviews, (5) Pilot machine learning ensemble models for top 200 SKUs with projected 23% accuracy improvement.",
      charts: [
        {
          type: "bar",
          title: "Forecast Accuracy by Product Category",
          data: [
            { name: "Industrial Products", accuracy: 81.4, target: 85, volume: 2.3 },
            { name: "Automotive Parts", accuracy: 72.8, target: 80, volume: 4.1 },
            { name: "Raw Materials", accuracy: 69.1, target: 78, volume: 1.8 },
            { name: "Consumer Goods", accuracy: 58.7, target: 75, volume: 3.7 },
            { name: "Electronics", accuracy: 43.2, target: 70, volume: 5.2 }
          ],
          config: {
            accuracy: { label: "Current Accuracy (%)", color: "hsl(0, 65%, 51%)" },
            target: { label: "Target Accuracy (%)", color: "hsl(142, 71%, 45%)" },
            volume: { label: "Volume ($M)", color: "hsl(217, 91%, 60%)" }
          }
        },
        {
          type: "trend",
          title: "Monthly Forecast Error Cost",
          data: [
            { month: "Jan", cost: 2890000, accuracy: 64.2 },
            { month: "Feb", cost: 3120000, accuracy: 66.8 },
            { month: "Mar", cost: 3400000, accuracy: 67.3 },
            { month: "Apr", cost: 3650000, accuracy: 65.9 }
          ],
          config: {
            cost: { label: "Error Cost ($)", color: "hsl(0, 65%, 51%)" },
            accuracy: { label: "Accuracy (%)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "forecast-accuracy-assessment.pdf",
          title: "Demand Forecasting Accuracy Assessment",
          excerpt: "Overall forecast accuracy: 67.3% vs industry benchmark 78-82%. Electronics worst at 43.2%",
          page: 6
        },
        {
          id: 2,
          document: "forecast-error-cost-analysis.pdf",
          title: "Forecast Error Cost Analysis",
          excerpt: "Quarterly forecast error impact: $3.4M. Electronics category contributes $2.1M (62%) of total cost",
          page: 11
        }
      ]
    },
    timestamp: new Date("2024-03-08T10:45:00")
  },
  {
    id: "9",
    type: "answer",
    query: "What's the impact of fuel price volatility?",
    content: {
      what: "Fuel price volatility added $847K to transportation costs this quarter, representing 18.7% of total logistics spend variance. Diesel prices fluctuated 34% (from $3.12 to $4.18/gallon), while jet fuel for air cargo spiked 67% during peak season. This volatility forced 23 carrier rate renegotiations and caused $234K in fuel surcharge disputes across 156 shipments.",
      why: "Exposure stems from fixed-rate contracts without fuel adjustment clauses covering 67% of volume, while spot market dependency during demand spikes amplifies volatility impact. Limited carrier diversity means rate changes cascade quickly - single fuel spike affects entire network within 48 hours. Hedging mechanisms are absent, leaving full exposure to commodity price swings.",
      recommendation: "Implement fuel cost management within 6 weeks: (1) Negotiate fuel adjustment clauses in all contracts >$100K annually, (2) Establish fuel hedging program covering 60% of quarterly consumption, (3) Diversify carrier mix to reduce single-carrier fuel surcharge impact, (4) Deploy dynamic routing to optimize fuel efficiency, targeting 12% cost reduction during high-volatility periods.",
      charts: [
        {
          type: "trend",
          title: "Fuel Price Impact on Transportation Costs",
          data: [
            { month: "Jan", diesel: 3.12, cost_impact: 145000, surcharges: 12 },
            { month: "Feb", diesel: 3.67, cost_impact: 267000, surcharges: 18 },
            { month: "Mar", diesel: 4.18, cost_impact: 435000, surcharges: 31 }
          ],
          config: {
            diesel: { label: "Diesel Price ($/gal)", color: "hsl(39, 98%, 52%)" },
            cost_impact: { label: "Cost Impact ($)", color: "hsl(0, 65%, 51%)" },
            surcharges: { label: "Surcharge Disputes", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "fuel-volatility-analysis.pdf",
          title: "Fuel Price Volatility Impact Analysis",
          excerpt: "Q1 fuel volatility: $847K impact, diesel prices fluctuated 34% from $3.12 to $4.18/gallon",
          page: 7
        }
      ]
    },
    timestamp: new Date("2024-03-07T15:30:00")
  },
  {
    id: "10",
    type: "answer",
    query: "Which suppliers provide the best quality metrics?",
    content: {
      what: "PrecisionTech leads quality performance with 99.7% defect-free delivery rate and 0.02% return rate across $4.2M annual volume. Excellence Manufacturing follows at 99.3% quality rate with industry-leading 24-hour corrective action response time. Top 5 suppliers average 98.9% quality versus bottom quartile at 87.3%, creating $890K annual cost difference.",
      why: "Quality leaders invest 3.2x more in process control systems and maintain ISO 9001 certification with annual third-party audits. They use statistical process control with real-time monitoring versus manual inspection methods used by lower performers. Cultural emphasis on continuous improvement shows - top suppliers implement average 12 quality improvements per year versus 2.3 for bottom quartile.",
      recommendation: "Accelerate supplier quality improvement in 90 days: (1) Expand business with top 5 quality suppliers by 35% while reducing low-performer volumes, (2) Require quality improvement plans from suppliers below 95% performance with quarterly milestone reviews, (3) Implement supplier quality scorecards with customer-facing dashboards, (4) Establish quality excellence awards program with preferred supplier status for top performers.",
      charts: [
        {
          type: "bar",
          title: "Supplier Quality Performance Rankings",
          data: [
            { name: "PrecisionTech", quality: 99.7, return_rate: 0.02, volume: 4200000 },
            { name: "Excellence Mfg", quality: 99.3, return_rate: 0.08, volume: 2800000 },
            { name: "QualityCorp", quality: 98.9, return_rate: 0.12, volume: 3100000 },
            { name: "StandardParts", quality: 94.2, return_rate: 0.67, volume: 1900000 },
            { name: "BudgetSupply", quality: 87.3, return_rate: 2.34, volume: 1200000 }
          ],
          config: {
            quality: { label: "Quality Rate (%)", color: "hsl(142, 71%, 45%)" },
            return_rate: { label: "Return Rate (%)", color: "hsl(0, 65%, 51%)" },
            volume: { label: "Annual Volume ($)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "supplier-quality-rankings.pdf",
          title: "Supplier Quality Performance Rankings Q1 2024",
          excerpt: "PrecisionTech: 99.7% quality rate, 0.02% returns. Excellence Manufacturing: 24-hour corrective action response",
          page: 4
        }
      ]
    },
    timestamp: new Date("2024-03-06T12:15:00")
  },
  {
    id: "11", 
    type: "answer",
    query: "How do trade tariffs affect our sourcing strategy?",
    content: {
      what: "Current tariffs add $2.34M annually to sourcing costs, with 25% tariffs on Chinese electronics components comprising $1.67M of impact. Steel imports face 15% duties adding $445K yearly, while pharmaceutical ingredients from India incur new 12% tariffs totaling $223K. This has forced sourcing strategy pivots for 67% of affected categories.",
      why: "Heavy dependence on single-country sourcing created vulnerability - 78% of electronics volume sourced from China with no alternative suppliers qualified. Trade war escalations occurred faster than supply chain diversification capability. Lack of tariff hedging or duty drawback programs means full cost absorption without mitigation strategies.",
      recommendation: "Execute tariff mitigation strategy within 6 months: (1) Diversify electronics sourcing to Vietnam, Thailand, and Mexico suppliers (targeting 40% volume shift), (2) Establish duty drawback program for re-exported products, projected $340K annual recovery, (3) Negotiate shared tariff burden clauses with suppliers on new contracts, (4) Create tariff monitoring dashboard with 90-day forward visibility for strategic planning.",
      charts: [
        {
          type: "pie",
          title: "Annual Tariff Impact by Category",
          data: [
            { name: "Chinese Electronics", value: 1670000, percentage: 71 },
            { name: "Steel Imports", value: 445000, percentage: 19 },
            { name: "Indian Pharmaceuticals", value: 223000, percentage: 10 }
          ],
          config: {
            value: { label: "Annual Cost ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "tariff-impact-analysis.pdf",
          title: "Trade Tariff Impact Analysis 2024",
          excerpt: "Total tariff impact: $2.34M annually. Chinese electronics: $1.67M (71% of total cost)",
          page: 8
        }
      ]
    },
    timestamp: new Date("2024-03-05T09:40:00")
  },
  {
    id: "12",
    type: "answer", 
    query: "What's our carbon footprint from transportation?",
    content: {
      what: "Transportation operations generate 47,800 metric tons CO2 annually, representing 34% of total corporate carbon footprint. Ocean freight accounts for 52% (24,896 tons) despite handling 78% of volume, while air cargo generates 31% of emissions (14,818 tons) from only 8% of shipments. Last-mile delivery contributes 8,086 tons with diesel trucks producing 67% more emissions per mile than electric alternatives.",
      why: "High carbon intensity stems from modal mix optimization for cost rather than sustainability - air freight usage 340% above industry benchmark for time-sensitive shipments. Truck fleet averages 6.2 MPG versus modern fleet standard of 8.4 MPG. Limited intermodal options and lack of carbon accounting in transportation decisions perpetuate high-emission choices.",
      recommendation: "Reduce transportation emissions 35% within 18 months: (1) Convert 60% of last-mile fleet to electric vehicles, cutting delivery emissions by 4,200 tons annually, (2) Shift 25% of air cargo to ocean freight through improved demand planning (saving 3,700 tons CO2), (3) Implement carbon cost accounting in carrier selection algorithms, (4) Establish carbon offset program for unavoidable emissions, targeting carbon neutrality by 2026.",
      charts: [
        {
          type: "pie",
          title: "Transportation Emissions by Mode",
          data: [
            { name: "Ocean Freight", value: 24896, percentage: 52 },
            { name: "Air Cargo", value: 14818, percentage: 31 },
            { name: "Trucking", value: 8086, percentage: 17 }
          ],
          config: {
            value: { label: "CO2 Emissions (tons)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "carbon-footprint-assessment.pdf",
          title: "Transportation Carbon Footprint Assessment",
          excerpt: "Annual transportation emissions: 47,800 metric tons CO2. Ocean freight: 52% despite 78% volume share",
          page: 12
        }
      ]
    },
    timestamp: new Date("2024-03-04T16:25:00")
  },
  {
    id: "13",
    type: "answer",
    query: "Which warehouses have the highest operating costs?",
    content: {
      what: "Los Angeles Distribution Center leads operating costs at $8.47 per cubic foot annually, 67% above network average of $5.07. Chicago facility follows at $7.23/cubic foot due to high labor costs ($23.40/hour versus $16.80 average). Combined, these two facilities consume 43% of total warehouse operating budget ($4.2M of $9.8M annually) while handling only 31% of throughput volume.",
      why: "LA costs driven by California labor regulations requiring premium overtime rates and facility lease costs 240% above national average at $18.90/sq ft. Chicago suffers from aging infrastructure with 34% higher utility costs and manual processes requiring 2.3x labor hours per transaction. Both facilities lack modern automation, operating with 1990s-era material handling systems.",
      recommendation: "Optimize high-cost facilities within 12 months: (1) Relocate LA operations to Riverside facility (35% cost reduction, $1.4M annual savings), (2) Automate Chicago picking operations with projected 45% labor hour reduction, (3) Renegotiate Chicago lease or relocate to Indiana facility (22% cost savings), (4) Standardize operating procedures across network to eliminate inefficiency variations.",
      charts: [
        {
          type: "bar",
          title: "Warehouse Operating Costs per Cubic Foot",
          data: [
            { name: "Los Angeles", cost: 8.47, throughput: 1200000, labor_rate: 21.80 },
            { name: "Chicago", cost: 7.23, throughput: 980000, labor_rate: 23.40 },
            { name: "Atlanta", cost: 4.89, throughput: 1450000, labor_rate: 15.20 },
            { name: "Dallas", cost: 4.12, throughput: 1680000, labor_rate: 14.60 }
          ],
          config: {
            cost: { label: "Cost per Cubic Foot ($)", color: "hsl(0, 65%, 51%)" },
            throughput: { label: "Annual Throughput (units)", color: "hsl(217, 91%, 60%)" },
            labor_rate: { label: "Labor Rate ($/hour)", color: "hsl(39, 98%, 52%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "warehouse-cost-analysis.pdf",
          title: "Warehouse Operating Cost Analysis",
          excerpt: "LA Distribution Center: $8.47/cubic foot annually, 67% above network average. Chicago: $7.23/cubic foot",
          page: 6
        }
      ]
    },
    timestamp: new Date("2024-03-03T11:55:00")
  },
  {
    id: "14", 
    type: "answer",
    query: "How do seasonal patterns affect inventory levels?",
    content: {
      what: "Seasonal demand drives inventory swings from $12.3M low point in February to $34.7M peak in November, requiring $22.4M working capital fluctuation. Q4 buildup begins August with 67% inventory increase over 16 weeks, while post-holiday liquidation spans 12 weeks through March. Carrying costs for seasonal inventory total $1.87M annually with 23% tied up in slow-moving holiday merchandise by January.",
      why: "Consumer goods drive seasonality with 340% December demand versus February baseline, while B2B industrial sales remain stable year-round. Limited forward visibility and conservative buying create excess safety stock - average 67 days supply versus optimal 35 days. Warehouse space constraints force expensive overflow storage costing $340K annually for temporary facilities.",
      recommendation: "Optimize seasonal inventory management within 8 weeks: (1) Implement S&OP process with rolling 18-month demand planning to improve seasonal accuracy, (2) Negotiate vendor-managed inventory for top 20 seasonal SKUs, (3) Establish dynamic safety stock algorithms adjusting for seasonality patterns, (4) Create seasonal liquidation partnerships to clear excess inventory 40% faster, targeting $750K working capital reduction.",
      charts: [
        {
          type: "trend",
          title: "Seasonal Inventory Levels",
          data: [
            { month: "Jan", inventory: 18500000, carrying_cost: 145000, turnover: 6.2 },
            { month: "Feb", inventory: 12300000, carrying_cost: 98000, turnover: 8.4 },
            { month: "Aug", inventory: 23400000, carrying_cost: 187000, turnover: 4.1 },
            { month: "Nov", inventory: 34700000, carrying_cost: 278000, turnover: 2.8 }
          ],
          config: {
            inventory: { label: "Inventory Value ($)", color: "hsl(217, 91%, 60%)" },
            carrying_cost: { label: "Carrying Cost ($)", color: "hsl(0, 65%, 51%)" },
            turnover: { label: "Turnover Rate", color: "hsl(142, 71%, 45%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "seasonal-inventory-analysis.pdf",
          title: "Seasonal Inventory Pattern Analysis",
          excerpt: "Inventory ranges from $12.3M (Feb low) to $34.7M (Nov peak), $22.4M working capital swing",
          page: 9
        }
      ]
    },
    timestamp: new Date("2024-03-02T14:10:00")
  },
  {
    id: "15",
    type: "answer",
    query: "What's the average time to resolve supplier disputes?",
    content: {
      what: "Supplier dispute resolution averages 47.3 days from initiation to closure, with payment disputes requiring 62 days and quality issues averaging 38 days. Complex contract disputes extend to 89 days average, while delivery issues resolve in 23 days. This creates $2.1M in outstanding disputed amounts at any given time, with $890K aged beyond 60 days representing relationship risk.",
      why: "Extended resolution times stem from manual escalation processes and lack of centralized dispute tracking. Legal review adds 18 days average to contract disputes, while payment disputes require CFO approval creating bottlenecks. Multiple stakeholder involvement (procurement, quality, legal, finance) without clear ownership causes handoff delays averaging 12 days per transfer.",
      recommendation: "Accelerate dispute resolution to 25-day average within 10 weeks: (1) Implement automated dispute workflow system with stakeholder notifications and SLA tracking, (2) Establish rapid resolution process for disputes under $50K with procurement authority, (3) Create supplier dispute dashboard with executive visibility for issues >30 days, (4) Develop standard resolution templates reducing legal review time by 60%.",
      charts: [
        {
          type: "bar",
          title: "Dispute Resolution Time by Category",
          data: [
            { name: "Contract Terms", days: 89, count: 12, value: 1890000 },
            { name: "Payment Issues", days: 62, count: 34, value: 567000 },
            { name: "Quality Failures", days: 38, count: 67, value: 234000 },
            { name: "Delivery Delays", days: 23, count: 89, value: 123000 }
          ],
          config: {
            days: { label: "Avg Resolution Days", color: "hsl(0, 65%, 51%)" },
            count: { label: "Active Disputes", color: "hsl(217, 91%, 60%)" },
            value: { label: "Disputed Amount ($)", color: "hsl(39, 98%, 52%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "dispute-resolution-analysis.pdf", 
          title: "Supplier Dispute Resolution Analysis",
          excerpt: "Average resolution time: 47.3 days. Outstanding disputes: $2.1M, with $890K aged >60 days",
          page: 7
        }
      ]
    },
    timestamp: new Date("2024-03-01T08:30:00")
  },
  {
    id: "16",
    type: "answer",
    query: "Which trade lanes show the most delays?",
    content: {
      what: "Asia-West Coast corridor experiences 67% of total delay incidents, with Shanghai-Los Angeles averaging 3.4 days behind schedule and costing $234K monthly in detention fees. Europe-East Coast follows with 23% of delays, primarily Hamburg-New York route adding 2.1 days average. Intra-Asia lanes show 340% increase in delays since Q2, with Singapore-Hong Kong suffering from port congestion.",
      why: "West Coast port congestion creates cascading delays - Long Beach operates at 127% capacity with average 4.2-day vessel queue times. Limited rail capacity from ports to inland destinations adds 1.8 days average. Asian manufacturing delays compound transit issues, with supplier production schedules 23% behind due to raw material shortages and labor constraints.",
      recommendation: "Diversify trade lane strategy within 12 weeks: (1) Shift 30% of Asia volume to East Coast ports via Suez Canal routing (adding 5 days transit but reducing delay risk), (2) Establish buffer inventory at inland distribution centers for critical Asia-sourced items, (3) Negotiate priority berthing agreements at Long Beach for time-sensitive cargo, (4) Create dual-sourcing strategy for top delay-prone products with Mexico/Central America alternatives.",
      charts: [
        {
          type: "bar",
          title: "Trade Lane Delay Analysis",
          data: [
            { name: "Shanghai-LA", delays: 3.4, cost: 234000, volume: 1200 },
            { name: "Hamburg-NY", delays: 2.1, cost: 123000, volume: 890 },
            { name: "Singapore-HK", delays: 4.7, cost: 67000, volume: 560 },
            { name: "Rotterdam-Miami", delays: 1.8, cost: 45000, volume: 670 }
          ],
          config: {
            delays: { label: "Avg Delay (days)", color: "hsl(0, 65%, 51%)" },
            cost: { label: "Monthly Cost ($)", color: "hsl(39, 98%, 52%)" },
            volume: { label: "Monthly TEUs", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "trade-lane-performance.pdf",
          title: "Trade Lane Performance Analysis Q1 2024", 
          excerpt: "Asia-West Coast: 67% of delays. Shanghai-LA averaging 3.4 days behind, $234K monthly detention",
          page: 11
        }
      ]
    },
    timestamp: new Date("2024-02-28T16:45:00")
  },
  {
    id: "17",
    type: "answer",
    query: "How does our performance compare to industry benchmarks?",
    content: {
      what: "Our supply chain performance ranks in 67th percentile overall, with inventory turnover of 8.2x versus industry leader 12.4x and average 7.8x. On-time delivery achieves 89.3% versus top quartile 96.2%, while cost per shipment exceeds benchmark by 23% ($127 versus $103 average). Quality metrics lag at 94.7% versus best-in-class 99.1%.",
      why: "Performance gaps stem from legacy systems and fragmented processes - ERP implementation lags 3 years behind modernization schedule. Manual processes consume 34% more labor hours than automated competitors. Limited real-time visibility creates reactive rather than predictive management, while supplier base consolidation trails industry trend by 45%.",
      recommendation: "Close performance gaps within 18 months through systematic improvement: (1) Accelerate ERP modernization with cloud-based platform targeting 15% efficiency gain, (2) Implement predictive analytics for demand and supply planning, (3) Consolidate supplier base from 234 to 150 strategic partners, (4) Deploy IoT sensors for real-time shipment tracking, (5) Establish continuous improvement program with monthly benchmark comparisons.",
      charts: [
        {
          type: "bar",
          title: "Performance vs Industry Benchmarks",
          data: [
            { metric: "Inventory Turnover", our_perf: 8.2, industry_avg: 7.8, best_class: 12.4 },
            { metric: "On-Time Delivery", our_perf: 89.3, industry_avg: 91.7, best_class: 96.2 },
            { metric: "Cost per Shipment", our_perf: 127, industry_avg: 103, best_class: 87 },
            { metric: "Quality Rate", our_perf: 94.7, industry_avg: 96.8, best_class: 99.1 }
          ],
          config: {
            our_perf: { label: "Our Performance", color: "hsl(0, 65%, 51%)" },
            industry_avg: { label: "Industry Average", color: "hsl(39, 98%, 52%)" },
            best_class: { label: "Best in Class", color: "hsl(142, 71%, 45%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "industry-benchmark-study.pdf",
          title: "Supply Chain Industry Benchmark Study 2024",
          excerpt: "Performance ranking: 67th percentile. Inventory turnover: 8.2x vs best-in-class 12.4x",
          page: 5
        }
      ]
    },
    timestamp: new Date("2024-02-27T13:20:00")
  },
  {
    id: "18",
    type: "answer",
    query: "What's the total cost of ownership for our logistics network?",
    content: {
      what: "Total logistics network TCO reaches $47.8M annually, with transportation comprising 52% ($24.9M), warehousing 31% ($14.8M), and technology infrastructure 17% ($8.1M). Hidden costs include $2.3M in network inefficiencies, $1.7M in excess capacity, and $890K in system integration maintenance. Cost per unit shipped averages $23.40 versus industry benchmark $19.70.",
      why: "High TCO driven by network design optimized for coverage rather than efficiency - 12 distribution centers versus optimal 8 create duplicate fixed costs. Legacy warehouse management systems require $340K annual maintenance with limited automation capabilities. Overbuilt capacity in slow-growth regions ties up $4.2M in underutilized assets.",
      recommendation: "Optimize network TCO by 25% within 24 months: (1) Consolidate to 8 strategic distribution centers with expanded coverage radius, saving $3.2M annually in fixed costs, (2) Modernize WMS platform with integrated automation reducing labor costs 35%, (3) Right-size capacity utilization to 85% optimal level, (4) Implement network optimization software for dynamic routing and inventory placement.",
      charts: [
        {
          type: "pie",
          title: "Logistics Network TCO Breakdown",
          data: [
            { name: "Transportation", value: 24900000, percentage: 52 },
            { name: "Warehousing", value: 14800000, percentage: 31 },
            { name: "Technology", value: 8100000, percentage: 17 }
          ],
          config: {
            value: { label: "Annual Cost ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "logistics-tco-analysis.pdf",
          title: "Logistics Network Total Cost of Ownership Analysis",
          excerpt: "Annual logistics TCO: $47.8M. Cost per unit: $23.40 vs industry benchmark $19.70",
          page: 8
        }
      ]
    },
    timestamp: new Date("2024-02-26T10:05:00")
  },
  {
    id: "19",
    type: "answer",
    query: "Which suppliers have the best ESG ratings?",
    content: {
      what: "GreenTech Solutions leads ESG performance with 94.7/100 rating, featuring carbon-neutral operations and 89% renewable energy usage across $3.2M annual volume. Sustainable Materials Co. follows at 91.3 rating with zero-waste manufacturing and fair trade certification. Top ESG quartile suppliers average 12% premium pricing but deliver 67% fewer compliance incidents and 34% better quality consistency.",
      why: "ESG leaders invest systematically in sustainability infrastructure - averaging $2.3M annually in environmental initiatives versus $340K for bottom quartile. They maintain comprehensive third-party certifications (ISO 14001, SA 8000) and transparent reporting. Cultural commitment to sustainability drives innovation, resulting in 23% more patents and 45% better employee retention rates.",
      recommendation: "Expand ESG partnership strategy within 6 months: (1) Increase procurement volume from top ESG suppliers by 40% while phasing out bottom quartile performers, (2) Establish ESG minimum requirements for new supplier onboarding with annual assessments, (3) Create ESG incentive pricing structure rewarding sustainability improvements, (4) Develop joint sustainability initiatives with top performers targeting supply chain carbon neutrality by 2027.",
      charts: [
        {
          type: "bar",
          title: "Supplier ESG Ratings and Performance",
          data: [
            { name: "GreenTech Solutions", esg: 94.7, volume: 3200000, incidents: 0 },
            { name: "Sustainable Materials", esg: 91.3, volume: 2800000, incidents: 1 },
            { name: "EcoManufacturing", esg: 87.9, volume: 1900000, incidents: 3 },
            { name: "Standard Supply", esg: 67.2, volume: 2100000, incidents: 12 },
            { name: "Budget Components", esg: 43.1, volume: 1400000, incidents: 23 }
          ],
          config: {
            esg: { label: "ESG Rating (0-100)", color: "hsl(142, 71%, 45%)" },
            volume: { label: "Annual Volume ($)", color: "hsl(217, 91%, 60%)" },
            incidents: { label: "Compliance Incidents", color: "hsl(0, 65%, 51%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "supplier-esg-assessment.pdf",
          title: "Supplier ESG Performance Assessment 2024",
          excerpt: "GreenTech Solutions: 94.7 ESG rating, carbon-neutral operations, 89% renewable energy usage",
          page: 6
        }
      ]
    },
    timestamp: new Date("2024-02-25T12:30:00")
  },
  {
    id: "20",
    type: "answer",
    query: "How do geopolitical events impact supply continuity?",
    content: {
      what: "Geopolitical tensions disrupted $8.9M in annual sourcing, with Ukraine conflict affecting 23% of European suppliers and creating $2.4M in alternative sourcing costs. China-Taiwan tensions forced contingency planning for 67% of electronics volume, while Middle East instability added $890K in shipping insurance and route diversification costs. Supply security now requires 15% higher safety stock levels.",
      why: "Over-concentration in geopolitically sensitive regions created vulnerability - 78% of critical components sourced from single countries with limited alternatives qualified. Lack of early warning systems meant reactive rather than proactive response to emerging risks. Limited supplier diversity and long qualification cycles (127 days average) prevented rapid source switching during crises.",
      recommendation: "Build geopolitical resilience within 12 months: (1) Implement dual-sourcing strategy for all critical components with suppliers in different political regions, (2) Establish geopolitical risk monitoring dashboard with 90-day forward alerts, (3) Pre-qualify alternative suppliers in stable regions to reduce switching time to 45 days, (4) Create supply continuity war room with cross-functional response team for crisis management.",
      charts: [
        {
          type: "bar",
          title: "Geopolitical Risk Impact by Region",
          data: [
            { name: "Europe (Ukraine)", impact: 2400000, suppliers: 34, risk_level: 8.7 },
            { name: "Asia (China-Taiwan)", impact: 4200000, suppliers: 67, risk_level: 7.2 },
            { name: "Middle East", impact: 890000, suppliers: 12, risk_level: 6.8 },
            { name: "Latin America", impact: 340000, suppliers: 23, risk_level: 4.1 }
          ],
          config: {
            impact: { label: "Financial Impact ($)", color: "hsl(0, 65%, 51%)" },
            suppliers: { label: "Affected Suppliers", color: "hsl(217, 91%, 60%)" },
            risk_level: { label: "Risk Level (1-10)", color: "hsl(39, 98%, 52%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "geopolitical-risk-assessment.pdf",
          title: "Geopolitical Supply Risk Assessment 2024",
          excerpt: "Total disruption impact: $8.9M. Ukraine conflict affected 23% European suppliers, $2.4M alternative sourcing costs",
          page: 9
        }
      ]
    },
    timestamp: new Date("2024-02-24T15:10:00")
  },
  {
    id: "21",
    type: "answer",
    query: "What's the financial impact of product recalls?",
    content: {
      what: "Product recalls generated $4.7M total cost this year across 3 major incidents, with electronics recall comprising $2.8M (component defect affecting 12,400 units). Direct costs include $1.9M in product replacement, $1.4M in logistics/reverse supply chain, and $1.4M in customer remediation. Indirect impact includes $890K in lost sales and $340K in brand damage mitigation.",
      why: "Recall costs amplified by complex global distribution - average 847 days to track and recover affected units across 23 countries. Lack of serialization tracking meant broad recall scope affecting 340% more units than necessary. Supplier quality issues in 67% of cases, with insufficient upstream monitoring systems failing to detect defects before distribution.",
      recommendation: "Implement recall prevention and response system within 8 weeks: (1) Deploy end-to-end product serialization and tracking for recall precision, targeting 75% scope reduction, (2) Establish supplier quality gates with real-time defect monitoring, (3) Create rapid recall response team with pre-negotiated logistics contracts for 48-hour activation, (4) Implement insurance coverage for recall costs exceeding $500K per incident.",
      charts: [
        {
          type: "pie",
          title: "Product Recall Cost Breakdown",
          data: [
            { name: "Product Replacement", value: 1900000, percentage: 40 },
            { name: "Logistics/Reverse Chain", value: 1400000, percentage: 30 },
            { name: "Customer Remediation", value: 1400000, percentage: 30 }
          ],
          config: {
            value: { label: "Cost ($)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "product-recall-analysis.pdf",
          title: "Product Recall Cost Analysis 2024",
          excerpt: "Total recall costs: $4.7M across 3 incidents. Electronics recall: $2.8M, 12,400 units affected",
          page: 4
        }
      ]
    },
    timestamp: new Date("2024-02-23T09:25:00")
  },
  {
    id: "22",
    type: "answer",
    query: "Which distribution channels are most cost-effective?",
    content: {
      what: "Direct-to-consumer online channel delivers highest margin at 67.3% with $12.40 average fulfillment cost per order. B2B direct sales follow at 54.2% margin but scale 340% higher volume ($18.7M versus $5.4M monthly). Retail partnerships show 31.8% margin due to distributor fees but require minimal fulfillment infrastructure investment. Third-party logistics costs average 23% higher than internal operations.",
      why: "Online DTC efficiency stems from automated fulfillment centers processing 2,340 orders daily with 1.2 FTE requirement versus retail channel needing 4.7 FTE for equivalent volume. B2B direct eliminates intermediary markups (15-25%) but requires dedicated sales team costing $890K annually. Retail partnerships trade margin for reach - accessing 2,340 locations versus 340 with direct approach.",
      recommendation: "Optimize channel mix within 6 months for maximum profitability: (1) Expand DTC online capacity 60% to capture higher-margin demand, (2) Consolidate retail partnerships to top-performing 40% (eliminating underperformers below $50K annual volume), (3) Implement channel-specific pricing strategy reflecting true cost-to-serve differences, (4) Deploy omnichannel inventory optimization to reduce safety stock 25% across channels.",
      charts: [
        {
          type: "bar",
          title: "Distribution Channel Performance",
          data: [
            { name: "DTC Online", margin: 67.3, volume: 5400000, cost: 12.40 },
            { name: "B2B Direct", margin: 54.2, volume: 18700000, cost: 8.90 },
            { name: "Retail Partners", margin: 31.8, volume: 12300000, cost: 15.60 },
            { name: "3PL Wholesale", margin: 28.4, volume: 8900000, cost: 19.30 }
          ],
          config: {
            margin: { label: "Margin (%)", color: "hsl(142, 71%, 45%)" },
            volume: { label: "Monthly Volume ($)", color: "hsl(217, 91%, 60%)" },
            cost: { label: "Cost per Order ($)", color: "hsl(0, 65%, 51%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "channel-profitability-analysis.pdf",
          title: "Distribution Channel Profitability Analysis",
          excerpt: "DTC online: 67.3% margin, $12.40 fulfillment cost. B2B direct: 54.2% margin, 340% higher volume",
          page: 7
        }
      ]
    },
    timestamp: new Date("2024-02-22T14:15:00")
  },
  {
    id: "23",
    type: "answer",
    query: "How do labor shortages affect our operations?",
    content: {
      what: "Labor shortages cost $3.8M annually through premium wages (+34% above market), overtime expenses ($1.2M), and temporary staffing fees ($890K). Warehouse operations run at 73% capacity due to 87 unfilled positions, while transportation faces 23% driver shortage forcing expensive spot market usage. Manufacturing overtime increased 156% to maintain production schedules.",
      why: "Tight labor market competition with tech companies offering 45% higher wages for similar skills. Aging workforce averages 52 years with high retirement rates (12% annually). Limited automation means heavy dependence on manual labor for 67% of operations. Training programs lag industry needs by 18 months average.",
      recommendation: "Address labor challenges within 90 days: (1) Implement automation for repetitive tasks, reducing labor dependency 40%, (2) Partner with technical colleges for skilled worker pipeline, (3) Increase wages 15% to competitive levels and improve retention 25%, (4) Deploy cross-training programs to increase workforce flexibility.",
      charts: [
        {
          type: "bar",
          title: "Labor Shortage Impact by Department",
          data: [
            { name: "Warehousing", shortage: 87, cost: 1500000, capacity: 73 },
            { name: "Transportation", shortage: 34, cost: 1200000, capacity: 77 },
            { name: "Manufacturing", shortage: 23, cost: 890000, capacity: 84 },
            { name: "Quality Control", shortage: 12, cost: 210000, capacity: 88 }
          ],
          config: {
            shortage: { label: "Open Positions", color: "hsl(0, 65%, 51%)" },
            cost: { label: "Annual Cost ($)", color: "hsl(39, 98%, 52%)" },
            capacity: { label: "Operating Capacity (%)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "labor-shortage-impact.pdf",
          title: "Labor Shortage Impact Analysis",
          excerpt: "Annual labor shortage cost: $3.8M. Warehouse capacity: 73% due to 87 unfilled positions",
          page: 8
        }
      ]
    },
    timestamp: new Date("2024-02-21T11:40:00")
  },
  {
    id: "24", 
    type: "answer",
    query: "What's the average lead time for critical components?",
    content: {
      what: "Critical components average 73.2 days lead time versus target 45 days, with semiconductors reaching 127 days and specialized alloys at 89 days. This forces $4.2M safety stock investment and causes 23% of production delays. Electronic components show highest variability with 67% exceeding promised delivery dates by average 12.3 days.",
      why: "Global supply constraints and single-source dependencies create bottlenecks. Semiconductor shortage affects 78% of electronics components, while specialized suppliers lack capacity expansion. Limited supplier diversity means single points of failure, with top 10 components sourced from only 1-2 qualified suppliers each.",
      recommendation: "Reduce critical component lead times within 6 months: (1) Qualify alternative suppliers for top 50 components, (2) Negotiate vendor-managed inventory agreements, (3) Implement collaborative forecasting with key suppliers, (4) Create strategic inventory buffers for longest lead time items.",
      charts: [
        {
          type: "bar",
          title: "Critical Component Lead Times",
          data: [
            { name: "Semiconductors", lead_time: 127, target: 60, variability: 23 },
            { name: "Specialized Alloys", lead_time: 89, target: 45, variability: 18 },
            { name: "Electronic Components", lead_time: 67, target: 30, variability: 34 },
            { name: "Mechanical Parts", lead_time: 45, target: 35, variability: 12 }
          ],
          config: {
            lead_time: { label: "Actual Lead Time (days)", color: "hsl(0, 65%, 51%)" },
            target: { label: "Target (days)", color: "hsl(142, 71%, 45%)" },
            variability: { label: "Variability (%)", color: "hsl(217, 91%, 60%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "component-leadtime-analysis.pdf",
          title: "Critical Component Lead Time Analysis",
          excerpt: "Average lead time: 73.2 days vs 45-day target. Semiconductors: 127 days, 67% exceed delivery promises",
          page: 5
        }
      ]
    },
    timestamp: new Date("2024-02-20T13:25:00")
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