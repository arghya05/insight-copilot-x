import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ChatArea } from "@/components/ChatArea";
import { DocumentViewer } from "@/components/DocumentViewer";
import { AnomalyToggle } from "@/components/AnomalyToggle";

const Index = () => {
  const [query, setQuery] = useState("");
  const [showAnomaliesOnly, setShowAnomaliesOnly] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>("");

  const handleSubmitQuery = (submittedQuery: string) => {
    // This would connect to your backend API
    console.log('Submitting query:', submittedQuery);
    
    // Call the chat area to add the new message
    if ((window as any).submitQueryToChatArea) {
      (window as any).submitQueryToChatArea(submittedQuery);
    }
    
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Enterprise Insight Copilot
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              AI-powered supply chain and document analysis
            </p>
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
            onSubmitQuery={handleSubmitQuery}
          />
        </div>

        {/* Document Viewer Panel */}
        <div className="w-document bg-muted/30">
          <DocumentViewer 
            documentId={selectedDocument}
            highlightedText={highlightedText}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;