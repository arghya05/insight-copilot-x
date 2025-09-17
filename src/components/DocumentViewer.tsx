import { useState, useEffect } from "react";
import { FileText, Search, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pdfDocuments } from "@/data/sampleData";
import type { ChatMessage } from "@/data/sampleData";

interface DocumentViewerProps {
  documentId: string | null;
  highlightedText: string;
  activeMessage: ChatMessage | null;
}

export const DocumentViewer = ({ documentId, highlightedText, activeMessage }: DocumentViewerProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(documentId);

  // Generate document content based on active message
  const generateDocumentContent = (message: ChatMessage): string => {
    if (!message.content.references || message.content.references.length === 0) {
      return "Document content not available.";
    }

    const references = message.content.references;
    const mainReference = references[0];
    
    return `${mainReference.title?.toUpperCase() || 'ANALYSIS REPORT'}
${new Date().toLocaleDateString().toUpperCase()}

EXECUTIVE SUMMARY
${message.content.what || 'Analysis details not available.'}

KEY FINDINGS

[HIGHLIGHTED: ${mainReference.excerpt}]

DETAILED ANALYSIS
${message.content.why || 'Root cause analysis not available.'}

${references.map(ref => `
SUPPORTING DATA - PAGE ${ref.page || 1}:
[HIGHLIGHTED: ${ref.excerpt}]
`).join('')}

STRATEGIC RECOMMENDATIONS
${message.content.recommendation || 'Recommendations not available.'}

FINANCIAL IMPACT SUMMARY
- Immediate impact identified through data analysis
- Recommended actions with quantified ROI projections
- Timeline for implementation and cost recovery

NEXT STEPS
1. Review highlighted sections for critical data points
2. Implement recommended actions per timeline
3. Monitor KPIs for improvement validation

Generated on: ${new Date().toLocaleString()}
Source: Algonomy Supply Chain Control Tower Analysis`;
  };

  // Find the current document or generate dynamic content based on active message
  let currentDocument = pdfDocuments.find(doc => doc.id === (selectedDocument || documentId));
  
  // If we have an active message but no specific document selected, generate dynamic document
  if (!currentDocument && activeMessage && activeMessage.content.references && activeMessage.content.references.length > 0) {
    const firstReference = activeMessage.content.references[0];
    currentDocument = {
      id: firstReference.document,
      title: firstReference.title || firstReference.document.replace('.pdf', '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      pages: 25,
      type: "Analysis Report",
      content: generateDocumentContent(activeMessage)
    };
  }

  useEffect(() => {
    if (documentId) {
      setSelectedDocument(documentId);
      setCurrentPage(1);
    }
  }, [documentId]);

  useEffect(() => {
    // Simulate scrolling to highlighted text
    if (highlightedText && currentDocument) {
      console.log(`Scrolling to: ${highlightedText}`);
    }
  }, [highlightedText, currentDocument]);

  if (!currentDocument) {
    return (
      <div className="h-full flex flex-col">
        {/* Empty State Header */}
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium text-foreground">Document Viewer</h3>
                <p className="text-xs text-muted-foreground">Select a document to begin</p>
              </div>
            </div>
            
            <Select onValueChange={setSelectedDocument}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Browse documents..." />
              </SelectTrigger>
              <SelectContent>
                {pdfDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <div>
                        <div className="font-medium text-sm">{doc.title}</div>
                        <div className="text-xs text-muted-foreground">{doc.pages} pages • {doc.type}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Select a document to view
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            Click on any reference in the chat to open the source document with highlighted relevant sections, or browse available documents above.
          </p>
          
          <div className="grid grid-cols-1 gap-2 w-full max-w-md">
            {pdfDocuments.slice(0, 3).map((doc) => (
              <Button
                key={doc.id}
                variant="outline"
                onClick={() => setSelectedDocument(doc.id)}
                className="justify-start"
              >
                <FileText className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium text-sm">{doc.title}</div>
                  <div className="text-xs text-muted-foreground">{doc.pages} pages</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentDocument) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
          <p className="text-sm text-muted-foreground">Document not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-muted/20">
      {/* Document Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground truncate">{currentDocument.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {currentDocument.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Page {currentPage} of {currentDocument.pages}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={selectedDocument || ""} onValueChange={setSelectedDocument}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pdfDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="truncate">{doc.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-1 border-l pl-2">
              <Button variant="ghost" size="sm" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-12 text-center">
                {zoomLevel}%
              </span>
              <Button variant="ghost" size="sm" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Card className="max-w-none shadow-elevated bg-white">
            <div 
              className="p-8 font-mono text-sm leading-relaxed"
              style={{ fontSize: `${zoomLevel}%` }}
            >
              {currentDocument.content.split('\n').map((line, index) => {
                const effectiveHighlightedText = (highlightedText && highlightedText.trim().length > 0)
                  ? highlightedText
                  : (activeMessage?.content.references?.[0]?.excerpt || "");
                const isHighlighted = effectiveHighlightedText && line.toLowerCase().includes(effectiveHighlightedText.toLowerCase());
                const isHighlightedSection = line.startsWith('[HIGHLIGHTED:') && line.endsWith(']');
                
                return (
                  <div
                    key={index}
                    className={`mb-2 ${
                      isHighlighted || isHighlightedSection
                        ? 'bg-yellow-200 border-l-4 border-l-warning pl-4 py-2 rounded-r-md' 
                        : ''
                    } ${line.trim().startsWith('EXECUTIVE SUMMARY') || line.trim().startsWith('QUARTERLY') || line.trim().includes('ANALYSIS') ? 'font-bold text-lg mt-4 mb-2' : ''}`}
                  >
                    {isHighlightedSection ? (
                      <span className="bg-yellow-200 border-l-4 border-l-warning pl-4 py-2 rounded-r-md block font-semibold">
                        {line.replace('[HIGHLIGHTED:', '').replace(']', '')}
                      </span>
                    ) : (
                      <span className={line.trim() === '' ? 'block h-4' : ''}>
                        {line}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === currentDocument.pages}
              onClick={() => setCurrentPage(Math.min(currentDocument.pages, currentPage + 1))}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <span className="text-sm text-muted-foreground">
            {currentPage} / {currentDocument.pages}
          </span>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Jump to page:</span>
            <Select 
              value={currentPage.toString()} 
              onValueChange={(value) => setCurrentPage(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: currentDocument.pages }, (_, i) => i + 1).map((page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};