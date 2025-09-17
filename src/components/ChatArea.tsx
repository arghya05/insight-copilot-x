import { useState, useEffect } from "react";
import { AnswerCard } from "@/components/AnswerCard";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";
import { AnomalyCard } from "@/components/AnomalyCard";

interface ChatMessage {
  id: string;
  type: 'answer' | 'anomaly';
  query: string;
  content: {
    what?: string;
    why?: string;
    recommendation?: string;
    references?: Array<{
      document: string;
      excerpt: string;
      page?: number;
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

interface ChatAreaProps {
  showAnomaliesOnly: boolean;
  onDocumentSelect: (documentId: string) => void;
  onHighlightText: (text: string) => void;
  onSubmitQuery?: (query: string) => void;
}

export const ChatArea = ({ showAnomaliesOnly, onDocumentSelect, onHighlightText, onSubmitQuery }: ChatAreaProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Sample data for demonstration
  useEffect(() => {
    const sampleMessages: ChatMessage[] = [
      {
        id: "1",
        type: "answer",
        query: "What anomalies are in freight invoices last month?",
        content: {
          what: "Multiple invoices showed overcharges on route B shipments totaling $47,300 across 23 shipments.",
          why: "Analysis revealed misclassified freight class (Class 85 instead of Class 60) and duplicate fuel surcharges applied by vendor TransLogistics Inc.",
          recommendation: "Audit vendor invoices immediately, implement automated freight classification checks, and renegotiate fuel surcharge terms to prevent double-charging.",
          references: [
            {
              document: "freight_invoice_2024_03.pdf",
              excerpt: "Freight class 85 applied to machinery shipment, fuel surcharge $127.50 + additional fuel adjustment $127.50",
              page: 3
            }
          ]
        },
        timestamp: new Date()
      },
      {
        id: "2", 
        type: "anomaly",
        query: "Route B shipment delays",
        content: {
          anomalies: [
            {
              type: "Delay Spike",
              severity: "high",
              description: "Average delivery time increased 340% on Route B (Chicago-Atlanta)",
              impact: "Customer complaints up 67%, $23K in penalty fees"
            }
          ]
        },
        timestamp: new Date()
      }
    ];
    setMessages(sampleMessages);
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const filteredMessages = showAnomaliesOnly 
    ? messages.filter(msg => msg.type === 'anomaly')
    : messages;

  const suggestedQuestions = [
    "Which vendor had the highest anomaly count?",
    "How much did anomalies cost in total?",
    "Which routes were most impacted?",
    "Causes of anomalies in freight invoices?",
    "How to reduce detention charges?",
    "Which shipments had customs delays?",
    "What's the average cost per mile variance?"
  ];

  const handleQuestionClick = (question: string) => {
    // Simulate API response for demo
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "answer",
      query: question,
      content: {
        what: "Sample response data generated for demonstration purposes.",
        why: "This is a simulated answer to show how the system would respond to user queries.",
        recommendation: "In a real implementation, this would connect to your backend APIs for actual data analysis.",
        references: [
          {
            document: "sample_document.pdf",
            excerpt: "Relevant text excerpt would appear here",
            page: 1
          }
        ]
      },
      timestamp: new Date()
    };
    addMessage(newMessage);
  };

  const handleNewQuery = (query: string) => {
    // This would be called when user submits a new query
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "answer",
      query: query,
      content: {
        what: "Analysis of your query is being processed...",
        why: "The system is analyzing relevant documents and data to provide insights.",
        recommendation: "Please wait while we compile the most relevant information for your question.",
        references: [
          {
            document: "processing.pdf",
            excerpt: "Data analysis in progress...",
            page: 1
          }
        ]
      },
      timestamp: new Date()
    };
    addMessage(newMessage);
    onSubmitQuery?.(query);
  };

  // Expose the function to parent component
  useEffect(() => {
    (window as any).submitQueryToChatArea = handleNewQuery;
  }, []);

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
                  what={message.content.what || ""}
                  why={message.content.why || ""}
                  recommendation={message.content.recommendation || ""}
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
                  questions={suggestedQuestions} 
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