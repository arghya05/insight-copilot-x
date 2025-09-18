import { useState, useEffect } from "react";
import { AnswerCard } from "@/components/AnswerCard";
import { SuggestedQuestions } from "@/components/SuggestedQuestions";
import { AnomalyCard } from "@/components/AnomalyCard";
import { supplyChainQAs, additionalQuestions, pdfDocuments } from "@/data/sampleData";
import type { ChatMessage } from "@/data/sampleData";
import { 
  findBestMatch, 
  getFollowUpQuestions, 
  saveConversation, 
  getStarterQuestions,
  getRandomQuestions 
} from "@/lib/questionService";
import { StarterQuestions } from "@/components/StarterQuestions";

interface ChatAreaProps {
  showAnomaliesOnly: boolean;
  onDocumentSelect: (documentId: string) => void;
  onHighlightText: (text: string) => void;
  onActiveMessageChange: (message: ChatMessage | null) => void;
}

export const ChatArea = ({ showAnomaliesOnly, onDocumentSelect, onHighlightText, onActiveMessageChange }: ChatAreaProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState<string>("");
  const [nextQuestions, setNextQuestions] = useState<string[]>([]);
  const [loadingPhase, setLoadingPhase] = useState<string>("Analyzing your question...");
  let idCounter = 0;
  const genId = () => `${Date.now()}-${++idCounter}`;

  // Start with empty messages - no chat history
  useEffect(() => {
    setMessages([]);
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
    onActiveMessageChange(message); // Set the new message as active
  };

  // Expose function to handle questions from search bar
  useEffect(() => {
    (window as any).addMessageToChatArea = addMessage;
    (window as any).handleChatAreaQuestion = handleQuestionClick;
  }, []);

  const filteredMessages = showAnomaliesOnly 
    ? messages.filter(msg => msg.type === 'anomaly')
    : messages;

  const getNextQuestions = async (q: string): Promise<string[]> => {
    try {
      // Get random questions from database as follow-ups
      const randomQuestions = await getRandomQuestions(4);
      return randomQuestions.map(question => question.question_text).slice(0, 2);
    } catch (error) {
      console.error('Error fetching next questions:', error);
      // Fallback to hardcoded questions
      const l = (q || "").toLowerCase();
      
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
      
      return additionalQuestions.slice(0, 2);
    }
  };

  const handleQuestionClick = async (question: string) => {
    // Immediately clear everything for a fresh start
    setMessages([]);
    setNextQuestions([]);
    setIsLoading(true);
    setLoadingQuestion(question);
    setLoadingPhase("Analyzing your question...");
    
    // Small delay to ensure UI updates before processing
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      // Phase 1: Analyzing question (1 second)
      setLoadingPhase("Analyzing your question...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 2: Searching documents (1.5 seconds)
      setLoadingPhase("Searching through documents...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 3: Finding answer (1-2 seconds)
      setLoadingPhase("Finding the answer...");
      const finalDelay = 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, finalDelay));

      // First priority: Check if we have rich sample data with charts and references
      const matchingQA = supplyChainQAs.find(qa => 
        qa.query.toLowerCase().includes(question.toLowerCase()) ||
        question.toLowerCase().includes(qa.query.toLowerCase())
      );
      
      let response;
      let followUpQuestions: string[] = [];
      
      if (matchingQA) {
        // Use rich sample data with charts and references
        response = matchingQA.content;
        followUpQuestions = await getNextQuestions(question);
      } else {
        // Second priority: Try database for exact matches
        const dbMatch = await findBestMatch(question);
        
        if (dbMatch) {
          // Use database answer but enhance it with references
          response = {
            what: dbMatch.answer_text,
            why: "This information is retrieved from our knowledge base and reflects current operational data.",
            recommendation: "For more specific insights, please ask follow-up questions or request detailed analysis.",
            charts: [], // Database answers don't include charts by default
            references: [
              // Add sample references to enable PDF functionality
              {
                id: 1,
                document: "knowledge-base-extract.pdf",
                title: "Knowledge Base Analysis",
                excerpt: dbMatch.answer_text.substring(0, 100) + "...",
                page: 1
              }
            ]
          };
          
          // Get follow-up questions from database
          const dbFollowUps = await getFollowUpQuestions(dbMatch.id);
          followUpQuestions = dbFollowUps.map(fq => fq.question_text);
        } else {
          // Last fallback: Generate realistic response with full references
          response = generateRealisticResponse(question);
          followUpQuestions = await getNextQuestions(question);
        }
      }
      
      const newMessage: ChatMessage = {
        id: genId(),
        type: "answer",
        query: question,
        content: response,
        timestamp: new Date()
      };
      
      // Clear loading state and add message
      setIsLoading(false);
      setLoadingQuestion("");
      setLoadingPhase("Analyzing your question...");
      addMessage(newMessage);
      
      // Small delay before showing next questions for smoother UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Set next questions
      if (followUpQuestions.length > 0) {
        setNextQuestions(followUpQuestions);
      } else {
        // If no specific follow-ups, get some random questions
        try {
          const randomQuestions = await getRandomQuestions(4);
          const questionTexts = randomQuestions.map(q => q.question_text).slice(0, 3);
          setNextQuestions(questionTexts);
        } catch (error) {
          console.error('Error loading random questions:', error);
          // Fallback to hardcoded questions
          setNextQuestions([
            "Which regions have the highest transportation costs?",
            "What's the impact of fuel price volatility?",
            "How effective are our demand forecasting models?"
          ]);
        }
      }
      
      // Save conversation to database (async, don't wait)
      saveConversation(question, JSON.stringify(response), followUpQuestions).catch(error => {
        console.error('Error saving conversation:', error);
      });
      
    } catch (error) {
      console.error('Error handling question:', error);
      
      // Even on error, ensure minimum analysis time with phases
      setLoadingPhase("Searching through documents...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingPhase("Finding the answer...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Fallback to original behavior
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
      
      setIsLoading(false);
      setLoadingQuestion("");
      setLoadingPhase("Analyzing your question...");
      addMessage(newMessage);
      
      // Set fallback next questions
      setNextQuestions([
        "Which regions have the highest transportation costs?",
        "What's the impact of fuel price volatility?",
        "How effective are our demand forecasting models?"
      ]);
    }
  };

  const generateRealisticResponse = (question: string) => {
    const l = question.toLowerCase();
    
    if (l.includes("transportation") || l.includes("cost") || l.includes("region")) {
      return {
        what: "West Coast transportation costs exceeded budget by $890K this quarter, averaging $3.45/mile vs national average of $2.10/mile (64% premium). Driver shortage affects 67% of routes, with California operations showing 89% cost premium due to AB5 regulatory compliance requirements.",
        why: "Three systematic cost drivers identified: (1) Critical driver shortage at 33% vacancy rate forcing premium wages of $1.20/mile above standard rates, (2) Fuel price volatility averaging $4.12/gallon vs $3.20 target, and (3) California AB5 compliance requiring employee reclassification, increasing operational costs 45% above neighboring states.",
        recommendation: "Execute immediate cost reduction plan: (1) Diversify 40% of California volume to Nevada/Arizona distribution hubs within 90 days (projected 15% cost reduction), (2) Implement 6-month fuel hedging contracts to stabilize pricing, (3) Negotiate driver retention bonuses instead of premium wages (20% savings potential), (4) Deploy route optimization software for 12% efficiency improvement.",
        charts: [
          {
            type: "bar" as const,
            title: "Transportation Costs by Region",
            data: [
              { name: "West Coast", cost: 3.45, budget: 2.10 },
              { name: "East Coast", cost: 2.30, budget: 2.10 },
              { name: "Midwest", cost: 1.95, budget: 2.10 },
              { name: "Southwest", cost: 2.65, budget: 2.10 }
            ],
            config: {
              cost: { label: "Actual Cost ($/mile)", color: "hsl(0, 65%, 51%)" },
              budget: { label: "Budget ($/mile)", color: "hsl(217, 91%, 60%)" }
            }
          }
        ],
        references: [
          {
            id: 1,
            document: "regional-transport-costs-2024.pdf",
            title: "Regional Transportation Cost Analysis",
            excerpt: "West Coast average: $3.45/mile vs national average $2.10/mile",
            page: 14
          }
        ]
      };
    }
    
    // Default comprehensive business response
    return {
      what: "Supply chain performance analysis reveals mixed results across operational metrics, with 64% of KPIs meeting targets but 36% showing concerning trends. Technology gap analysis indicates $890K in efficiency losses annually from manual processes affecting procurement, inventory management, and logistics coordination across 8 business units.",
      why: "Performance inconsistencies stem from three organizational issues: (1) Lack of standardized processes across business units, creating 23% efficiency variance between top and bottom performers, (2) Legacy technology systems requiring manual intervention in 52% of transactions, and (3) Insufficient cross-functional visibility causing delayed decision-making and reactive rather than proactive management approaches.",
      recommendation: "Launch enterprise-wide standardization initiative: (1) Implement unified ERP platform across all divisions within 180 days (projected $1.2M annual efficiency gain), (2) Establish weekly cross-functional performance reviews with standardized KPI reporting, (3) Deploy process automation for all manual workflows affecting >$50K annually, (4) Create real-time executive dashboard with predictive analytics for proactive decision-making.",
      charts: [
        {
          type: "pie" as const,
          title: "KPI Performance Status",
          data: [
            { name: "Meeting Targets", value: 64 },
            { name: "Below Targets", value: 36 }
          ],
          config: {
            value: { label: "Percentage (%)" }
          }
        }
      ],
      references: [
        {
          id: 1,
          document: "performance-analysis-2024.pdf",
          title: "Supply Chain Performance Analysis",
          excerpt: "64% of KPIs meeting targets, 36% showing concerning trends",
          page: 5
        }
      ]
    };
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Welcome State - Only show when no messages and not loading */}
        {!isLoading && filteredMessages.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Welcome to Supply Chain Intelligence
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ask me anything about freight costs, supplier compliance, transportation metrics, 
                inventory management, or supply chain performance. I'll analyze the data and provide 
                actionable insights with supporting documentation.
              </p>
            </div>
            
            {/* Starter Questions */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                Popular Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleQuestionClick("What are the main freight cost anomalies this quarter?")}
                  className="group relative p-6 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 border border-primary/20 hover:border-primary/30 rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Freight Cost Analysis
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Analyze quarterly freight cost anomalies and budget variances
                      </div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleQuestionClick("Which suppliers have the highest contract compliance risk?")}
                  className="group relative p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 border border-secondary/20 hover:border-secondary/30 rounded-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                        Supplier Risk Analysis
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Review contract compliance issues and risk assessments
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Loading Animation */}
        {isLoading && (
          <div className="animate-fade-in">
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-8 h-8 border-3 border-transparent border-t-primary/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground mb-1">{loadingPhase}</div>
                  <div className="text-sm text-muted-foreground">{loadingQuestion}</div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                    <span>Processing supply chain data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {filteredMessages.map((message) => (
          <div key={message.id} className="space-y-4 animate-fade-in">
            {message.type === 'answer' ? (
              <AnswerCard
                query={message.query}
                what={message.content.what || ""}
                why={message.content.why || ""}
                recommendation={message.content.recommendation || ""}
                charts={message.content.charts || []}
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
          </div>
        ))}
        
        {/* Show suggested questions after the last message */}
        {!isLoading && filteredMessages.length > 0 && nextQuestions.length > 0 && (
          <div className="mt-6">
            <SuggestedQuestions 
              questions={nextQuestions} 
              onQuestionClick={handleQuestionClick}
              isLoading={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};