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
    // Generate contextual responses based on question content
    const l = question.toLowerCase();
    
    if (l.includes("transportation") || l.includes("cost")) {
      return {
        what: "West Coast transportation costs are 64% higher than national average at $3.45/mile vs $2.10/mile, with $890K in excessive costs this quarter. Driver shortage affects 67% of routes, creating premium wage pressure of $1.20/mile. California routes specifically show 89% cost premium due to AB5 compliance requirements.",
        why: "Three systematic issues drive costs: (1) Driver shortage reached critical 33% vacancy rate forcing premium wages, (2) Fuel price volatility averaging $4.12/gallon vs. $3.20 target, and (3) California regulatory compliance (AB5) requiring employee classification changes, increasing costs 45% above neighboring states.",
        recommendation: "Execute cost reduction strategy: (1) Diversify 40% of California volume to Nevada/Arizona hubs within 90 days (15% cost reduction), (2) Lock fuel pricing with 6-month hedging contracts, (3) Negotiate driver retention bonuses vs. premium wages (projected 20% savings), (4) Implement route optimization software for 12% efficiency gain.",
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
    
    if (l.includes("quality") || l.includes("supplier")) {
      return {
        what: "Apex Electronics leads quality performance with 99.7% first-pass yield and zero critical defects, while Value Parts Inc. shows declining performance at 94.1% quality score with 23% increase in defect rates quarter-over-quarter. Quality variance costs the company $340K annually in rework and customer returns.",
        why: "Quality performance correlates directly with supplier investment: ISO-certified suppliers achieve 97.8% average quality vs. 91.2% for non-certified suppliers. Value Parts reduced quality investments by 30% to maintain low pricing, while Apex invested $890K in process improvements and automation systems.",
        recommendation: "Implement quality-based supplier management: (1) Establish minimum 95% quality requirement for all suppliers (exit Value Parts if not achieved within 90 days), (2) Offer quality incentive bonuses (+2% pricing for >98% performance), (3) Require ISO certification for all new suppliers >$500K annually, (4) Monthly quality scorecards with CEO review for suppliers >$1M.",
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
          },
          {
            id: 4,
            document: "iso-certification-impact.pdf",
            title: "ISO Certification Impact Study",
            excerpt: "ISO-certified suppliers: 97.8% average quality vs 91.2% non-certified",
            page: 5
          }
        ]
      };
    }

    // Default response for other questions
    return {
      what: "Analysis reveals mixed performance across key supply chain metrics, with 67% of KPIs above target but 33% requiring immediate attention. Technology adoption shows direct correlation with 34% performance improvement in participating divisions.",
      why: "Performance gaps stem from inconsistent process standardization across business units and lack of integrated technology platforms. Manual processes in 45% of operations create data accuracy issues and slow decision-making cycles.",
      recommendation: "Launch 90-day process standardization initiative: (1) Implement unified ERP system across all divisions, (2) Establish weekly cross-functional performance reviews, (3) Deploy automation for manual processes affecting >$100K annually, (4) Create standardized KPI dashboard with real-time visibility for all managers.",
      references: [
        {
          id: 1,
          document: "comprehensive-analysis-2024.pdf",
          title: "Comprehensive Supply Chain Analysis",
          excerpt: "Multi-source data analysis revealing complex interdependencies",
          page: 45
        },
        {
          id: 2,
          document: "kpi-dashboard-report.pdf",
          title: "KPI Dashboard Report",
          excerpt: "Mixed results: 67% metrics above target, 33% requiring attention",
          page: 12
        },
        {
          id: 3,
          document: "industry-benchmarking.pdf",
          title: "Industry Benchmarking Study",
          excerpt: "Technology adoption correlation with 34% performance improvement",
          page: 28
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