import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ChatArea } from "@/components/ChatArea";
import { DocumentViewer } from "@/components/DocumentViewer";
import { AnomalyToggle } from "@/components/AnomalyToggle";
import { PDFGallery } from "@/components/PDFGallery";
import { supplyChainQAs } from "@/data/sampleData";
import type { ChatMessage } from "@/data/sampleData";
import algonomyLogo from "@/assets/algonomy-logo.png";

const Index = () => {
  const [query, setQuery] = useState("");
  const [showAnomaliesOnly, setShowAnomaliesOnly] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [activeMessage, setActiveMessage] = useState<ChatMessage | null>(null);

      const handleSubmitQuery = (submittedQuery: string) => {
        // Find matching response from sample data or create new one
        const matchingQA = supplyChainQAs.find(qa => 
          qa.query.toLowerCase().includes(submittedQuery.toLowerCase()) ||
          submittedQuery.toLowerCase().includes(qa.query.toLowerCase())
        );
        
        if (matchingQA) {
          const newMessage: ChatMessage = {
            id: Date.now().toString(),
            type: "answer", 
            query: submittedQuery,
            content: matchingQA.content,
            timestamp: new Date()
          };
          // Add to chat area messages
          if ((window as any).addMessageToChatArea) {
            (window as any).addMessageToChatArea(newMessage);
          }
        }
        
        setQuery("");
      };

  // When a new answer becomes active, reset any manual document selection and highlight
  useEffect(() => {
    if (activeMessage) {
      setSelectedDocument(null);
      setHighlightedText("");
    }
  }, [activeMessage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src={algonomyLogo} 
              alt="Algonomy Logo" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Algonomy Supply Chain Control Tower
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered supply chain and document analysis
              </p>
            </div>
          </div>
          <AnomalyToggle 
            enabled={showAnomaliesOnly}
            onToggle={setShowAnomaliesOnly}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Chat Panel */}
        <div className="w-chat border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <SearchBar 
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmitQuery}
              placeholder="Ask about supply chain, freight, contracts, or finance..."
            />
          </div>
          
          <ChatArea 
            showAnomaliesOnly={showAnomaliesOnly}
            onDocumentSelect={setSelectedDocument}
            onHighlightText={setHighlightedText}
            onActiveMessageChange={setActiveMessage}
          />
          
          <PDFGallery onDocumentSelect={setSelectedDocument} />
        </div>

        {/* Document Viewer Panel */}
        <div className="w-document bg-muted/30">
          <DocumentViewer 
            documentId={selectedDocument}
            highlightedText={highlightedText}
            activeMessage={activeMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;