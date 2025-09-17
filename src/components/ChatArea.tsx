import { useState, useEffect } from "react";
import { AnswerCard } from "@/components/AnswerCard";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";
import { AnomalyCard } from "@/components/AnomalyCard";
import { supplyChainQAs, additionalQuestions, pdfDocuments } from "@/data/sampleData";
import type { ChatMessage } from "@/data/sampleData";

interface ChatAreaProps {
  showAnomaliesOnly: boolean;
  onDocumentSelect: (documentId: string) => void;
  onHighlightText: (text: string) => void;
}

export const ChatArea = ({ showAnomaliesOnly, onDocumentSelect, onHighlightText }: ChatAreaProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  let idCounter = 0;
  const genId = () => `${Date.now()}-${++idCounter}`;

  // Start with empty messages - no chat history
  useEffect(() => {
    setMessages([]);
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  // Expose function to add messages from search bar
  useEffect(() => {
    (window as any).addMessageToChatArea = addMessage;
  }, []);

  const filteredMessages = showAnomaliesOnly 
    ? messages.filter(msg => msg.type === 'anomaly')
    : messages;

  const getNextQuestions = (q: string): string[] => {
    const l = (q || "").toLowerCase();
    const allQuestions = additionalQuestions;
    
    if (l.includes("freight") || l.includes("cost")) {
      return [
        "Which regions have the highest transportation costs?",
        "What's the impact of fuel price volatility on our routes?"
      ];
    }
    if (l.includes("supplier") || l.includes("contract")) {
      return [
        "Which suppliers provide the best quality metrics?",
        "What's the average time to resolve supplier disputes?"
      ];
    }
    if (l.includes("inventory") || l.includes("holding")) {
      return [
        "Which product categories have the most stockouts?",
        "How effective are our demand forecasting models?"
      ];
    }
    if (l.includes("port") || l.includes("delay")) {
      return [
        "Which trade lanes show the most delays?",
        "How do seasonal patterns affect logistics performance?"
      ];
    }
    
    // Return random questions for other queries
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const handleQuestionClick = (question: string) => {
    // Find matching response from sample data or create realistic response
    const matchingQA = supplyChainQAs.find(qa => 
      qa.query.toLowerCase().includes(question.toLowerCase()) ||
      question.toLowerCase().includes(qa.query.toLowerCase())
    );
    
    const response = matchingQA ? matchingQA.content : generateRealisticResponse(question);
    
    const newMessage: ChatMessage = {
      id: genId(),
      type: "answer",
      query: question,
      content: response,
      timestamp: new Date()
    };
    addMessage(newMessage);
  };

  const generateRealisticResponse = (question: string) => {
    const l = question.toLowerCase();
    
    if (l.includes("transportation") || l.includes("cost") || l.includes("region")) {
      return {
        what: "West Coast transportation costs exceeded budget by $890K this quarter, averaging $3.45/mile vs national average of $2.10/mile (64% premium). Driver shortage affects 67% of routes, with California operations showing 89% cost premium due to AB5 regulatory compliance requirements.",
        why: "Three systematic cost drivers identified: (1) Critical driver shortage at 33% vacancy rate forcing premium wages of $1.20/mile above standard rates, (2) Fuel price volatility averaging $4.12/gallon vs $3.20 target, and (3) California AB5 compliance requiring employee reclassification, increasing operational costs 45% above neighboring states.",
        recommendation: "Execute immediate cost reduction plan: (1) Diversify 40% of California volume to Nevada/Arizona distribution hubs within 90 days (projected 15% cost reduction), (2) Implement 6-month fuel hedging contracts to stabilize pricing, (3) Negotiate driver retention bonuses instead of premium wages (20% savings potential), (4) Deploy route optimization software for 12% efficiency improvement.",
        references: [
          {
            id: 1,
            document: "regional-transport-costs-2024.pdf",
            title: "Regional Transportation Cost Analysis",
            excerpt: "West Coast average: $3.45/mile vs national average $2.10/mile",
            page: 14
          },
          {
            id: 2,
            document: "fuel-impact-study.pdf", 
            title: "Fuel Price Impact Study",
            excerpt: "Driver shortage affecting 67% of routes, fuel averaging $4.12/gallon",
            page: 8
          },
          {
            id: 3,
            document: "california-logistics-report.pdf",
            title: "California Logistics Regulatory Impact",
            excerpt: "California routes: 89% higher costs due to AB5 compliance and capacity constraints",
            page: 23
          }
        ]
      };
    }
    
    if (l.includes("quality") || l.includes("supplier") || l.includes("metric")) {
      return {
        what: "Supplier quality performance shows critical variance: Apex Electronics achieves 99.7% first-pass yield with zero critical defects, while Value Parts Inc. declined to 94.1% quality score with 23% increase in defect rates. Quality issues cost $340K annually in rework, returns, and production delays across 12 supplier relationships.",
        why: "Quality performance directly correlates with supplier investment levels: ISO-certified suppliers achieve 97.8% average quality vs 91.2% for non-certified suppliers. Value Parts reduced quality investments by 30% to maintain competitive pricing, while top performers like Apex invested $890K in process improvements and automation systems.",
        recommendation: "Implement performance-based supplier strategy: (1) Establish minimum 95% quality threshold for all suppliers - exit Value Parts within 90 days if not achieved, (2) Create quality incentive structure (+2% pricing premium for suppliers achieving >98% performance), (3) Mandate ISO certification for all new suppliers with contracts >$500K annually, (4) Institute monthly supplier scorecards with CEO review for relationships >$1M.",
        references: [
          {
            id: 1,
            document: "supplier-quality-rankings.pdf",
            title: "Supplier Quality Performance Rankings Q3",
            excerpt: "Apex Electronics: 99.7% first-pass yield, zero critical defects",
            page: 7
          },
          {
            id: 2,
            document: "resolution-time-analysis.pdf",
            title: "Issue Resolution Time Analysis", 
            excerpt: "Nordic Components: 24-hour average resolution, 99.2% quality rating",
            page: 12
          },
          {
            id: 3,
            document: "quality-trend-report.pdf",
            title: "Quality Trend Analysis",
            excerpt: "Value Parts Inc.: 94.1% quality score, defect rate increased 23% QoQ",
            page: 18
          }
        ]
      };
    }

    if (l.includes("inventory") || l.includes("stock") || l.includes("forecast")) {
      return {
        what: "Inventory costs increased 178% this quarter to $4.2M annually, with $2.8M tied up in slow-moving inventory (turnover rate 0.6x vs target 4.5x). Electronics division shows $1.1M in obsolete stock requiring immediate write-off, while demand forecasting accuracy dropped to 62% causing $1.4M in overstock across 156 SKUs.",
        why: "Inventory inefficiency stems from three core issues: (1) Outdated demand forecasting models that ignore market volatility patterns, causing systematic overordering, (2) Safety stock policies based on pre-pandemic data, creating 89% excess buffer inventory, and (3) Electronics product lifecycle management failure - 28% of stock faces obsolescence due to 4-month refresh cycles vs 6-month planning horizon.",
        recommendation: "Execute inventory optimization program: (1) Write-off $1.1M obsolete electronics inventory immediately and implement monthly obsolescence reviews, (2) Reduce safety stock by 45% for slow-moving SKUs to free $1.26M in working capital, (3) Deploy AI-powered demand forecasting system within 120 days (ROI: 14 months, $2.4M annual benefit), (4) Establish dynamic safety stock policies based on real-time demand signals.",
        references: [
          {
            id: 1,
            document: "inventory-optimization-2024.pdf",
            title: "Inventory Optimization Analysis",
            excerpt: "Slow-moving inventory: $2.8M tied up, turnover rate 0.6x vs target 4.5x",
            page: 22
          },
          {
            id: 2,
            document: "demand-forecasting-review.pdf",
            title: "Demand Forecasting Accuracy Review",
            excerpt: "Forecast accuracy declined to 62%, causing $1.4M overstock",
            page: 15
          },
          {
            id: 3,
            document: "electronics-lifecycle-analysis.pdf",
            title: "Electronics Product Lifecycle Analysis",
            excerpt: "28% of electronics stock facing obsolescence, $1.1M write-off required",
            page: 9
          }
        ]
      };
    }

    if (l.includes("delay") || l.includes("trade") || l.includes("lane") || l.includes("route")) {
      return {
        what: "Trade lane delays cost $520K monthly through extended transit times, with Asia-US routes averaging 18.3 days vs standard 12 days (53% increase). Europe-US lanes show 34% delay rates, while Latin America routes experience 67% on-time performance vs 95% target. Most critical impact on automotive parts causing 15 production line stoppages worth $675K in lost output.",
        why: "Delay analysis reveals systematic bottlenecks: (1) Port congestion at entry points causes 67% of delays, with Long Beach and Houston operating at 97% capacity, (2) Customs documentation errors increased 45% due to new regulatory requirements, and (3) Inland transportation constraints from chassis shortages (38% below requirement) and rail capacity limits during peak seasons.",
        recommendation: "Implement multi-modal diversification strategy: (1) Shift 30% of Asia volume from West Coast to East Coast ports within 60 days (Savannah/Norfolk showing 15% better performance), (2) Establish dedicated customs broker relationships to reduce documentation delays by 60%, (3) Negotiate guaranteed chassis allocation with 3 equipment providers, (4) Create 45-day buffer inventory for critical automotive components to prevent production stoppages.",
        references: [
          {
            id: 1,
            document: "trade-lane-performance-q3.pdf",
            title: "Trade Lane Performance Analysis Q3",
            excerpt: "Asia-US routes: 18.3 days average vs 12 days standard, 53% increase",
            page: 18
          },
          {
            id: 2,
            document: "port-congestion-analysis.pdf",
            title: "Port Congestion Impact Analysis",
            excerpt: "Long Beach and Houston at 97% capacity, causing 67% of trade delays",
            page: 11
          },
          {
            id: 3,
            document: "automotive-production-impact.pdf",
            title: "Automotive Production Impact Study",
            excerpt: "15 production stoppages due to delays, $675K in lost output",
            page: 7
          }
        ]
      };
    }

    // Default comprehensive business response
    return {
      what: "Supply chain performance analysis reveals mixed results across operational metrics, with 64% of KPIs meeting targets but 36% showing concerning trends. Technology gap analysis indicates $890K in efficiency losses annually from manual processes affecting procurement, inventory management, and logistics coordination across 8 business units.",
      why: "Performance inconsistencies stem from three organizational issues: (1) Lack of standardized processes across business units, creating 23% efficiency variance between top and bottom performers, (2) Legacy technology systems requiring manual intervention in 52% of transactions, and (3) Insufficient cross-functional visibility causing delayed decision-making and reactive rather than proactive management approaches.",
      recommendation: "Launch enterprise-wide standardization initiative: (1) Implement unified ERP platform across all divisions within 180 days (projected $1.2M annual efficiency gain), (2) Establish weekly cross-functional performance reviews with standardized KPI reporting, (3) Deploy process automation for all manual workflows affecting >$50K annually, (4) Create real-time executive dashboard with predictive analytics for proactive decision-making.",
      references: [
        {
          id: 1,
          document: "operational-performance-review.pdf",
          title: "Operational Performance Review Q3",
          excerpt: "64% of KPIs meeting targets, 36% showing concerning performance trends",
          page: 31
        },
        {
          id: 2,
          document: "technology-gap-analysis.pdf",
          title: "Technology Gap Analysis",
          excerpt: "Manual processes causing $890K annual efficiency losses",
          page: 19
        },
        {
          id: 3,
          document: "process-standardization-study.pdf",
          title: "Process Standardization Opportunity Study",
          excerpt: "23% efficiency variance between top and bottom performing business units",
          page: 14
        }
      ]
    };
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-6">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                What would you like to analyze?
              </h2>
              <p className="text-muted-foreground mb-8">
                Ask questions about supply chain, freight, contracts, or finance operations
              </p>
              
              {/* Starter Question Hints */}
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-muted-foreground mb-4">Try asking:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => handleQuestionClick("What are the main freight cost anomalies this quarter?")}
                    className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium">Freight Cost Anomalies</div>
                    <div className="text-sm opacity-80">Analyze cost spikes and overcharges</div>
                  </button>
                  <button
                    onClick={() => handleQuestionClick("Which suppliers have the highest contract compliance risk?")}
                    className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-left"
                  >
                    <div className="font-medium">Supplier Risk Analysis</div>
                    <div className="text-sm opacity-80">Review contract compliance issues</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div key={message.id} className="space-y-4">
              {message.type === 'answer' ? (
                <AnswerCard
                  query={message.query}
                  answer={message.content.answer || message.content.what || ""}
                  what={message.content.what}
                  why={message.content.why}
                  recommendation={message.content.recommendation}
                  references={message.content.references || []}
                  onDocumentSelect={onDocumentSelect}
                  onHighlightText={onHighlightText}
                />
              ) : (
                <AnomalyCard
                  anomalies={message.content.anomalies || []}
                  timestamp={message.timestamp}
                />
              )}
              
              {message === filteredMessages[filteredMessages.length - 1] && (
                <SuggestedQuestions 
                  questions={getNextQuestions(message.query)} 
                  onQuestionClick={handleQuestionClick}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};