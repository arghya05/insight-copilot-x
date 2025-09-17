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
    if (l.includes("freight") || l.includes("invoice")) {
      return [
        "Which vendor had the highest anomaly count?",
        "What was the total overcharge last month?",
      ];
    }
    if (l.includes("delay")) {
      return [
        "Which routes were most impacted?",
        "What were the root causes of delays?",
      ];
    }
    if (l.includes("contract")) {
      return [
        "Which clauses are most risky?",
        "Where are potential savings opportunities?",
      ];
    }
    return [
      "What are the top 3 risks right now?",
      "What actions should we take next?",
    ];
  };

  const handleQuestionClick = (question: string) => {
    // Simulate API response for demo
    const newMessage: ChatMessage = {
      id: genId(),
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
      id: genId(),
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