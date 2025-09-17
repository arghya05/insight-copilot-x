import { useState, useEffect } from "react";
import { AnswerCard } from "@/components/AnswerCard";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";
import { AnomalyCard } from "@/components/AnomalyCard";
import { supplyChainQAs, additionalQuestions } from "@/data/sampleData";
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

  // Load comprehensive supply chain data
  useEffect(() => {
    setMessages(supplyChainQAs.slice(0, 5));
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

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
    // Create realistic response based on question
    const response = generateRealisticResponse(question);
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
        answer: "Transportation costs are highest in the West Coast region, averaging $3.45 per mile compared to $2.10 nationally¹. The primary drivers include driver shortages (affecting 67% of routes), fuel price volatility (average $4.12/gallon), and port congestion adding 3.2 days per shipment². California routes show 89% higher costs due to regulatory compliance and limited capacity³.",
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
        answer: "Apex Electronics leads in quality metrics with 99.7% first-pass yield and zero critical defects in Q3¹. Nordic Components follows with 99.2% quality rating and industry-leading 24-hour issue resolution time². However, cost-focused suppliers like Value Parts Inc. show concerning trends with 94.1% quality scores and rising defect rates³. Quality correlates strongly with supplier investment in ISO certifications and continuous improvement programs⁴.",
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
      answer: "Based on current supply chain analysis, this area requires detailed investigation across multiple data sources¹. Key performance indicators show mixed results with some metrics exceeding targets while others need improvement². Industry benchmarking suggests opportunities for optimization through technology adoption and process refinement³.",
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
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg mb-2">Ready to analyze your supply chain data</p>
            <p className="text-sm">Ask questions about freight, contracts, invoices, or supply chain operations</p>
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