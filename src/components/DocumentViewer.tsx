import { useState, useEffect } from "react";
import { FileText, Search, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DocumentViewerProps {
  documentId: string | null;
  highlightedText: string;
}

export const DocumentViewer = ({ documentId, highlightedText }: DocumentViewerProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample document content for demonstration
  const sampleDocument = {
    title: "Freight Invoice March 2024",
    type: "PDF",
    pages: 5,
    content: `
      TRANSLOGISTICS INC.
      Freight Invoice #TL-2024-00347
      Date: March 15, 2024
      
      Shipment Details:
      Origin: Chicago, IL
      Destination: Atlanta, GA
      Weight: 15,420 lbs
      
      Freight Classification: Class 85
      Base Rate: $2,450.00
      Fuel Surcharge: $127.50
      Additional Fuel Adjustment: $127.50
      
      Total Amount: $2,705.00
      
      [HIGHLIGHTED: Freight class 85 applied to machinery shipment, fuel surcharge $127.50 + additional fuel adjustment $127.50]
      
      Note: This shipment contains industrial machinery that should be classified as Class 60 according to NMFC guidelines.
    `
  };

  useEffect(() => {
    // Simulate scrolling to highlighted text
    if (highlightedText && documentId) {
      console.log(`Scrolling to: ${highlightedText}`);
    }
  }, [highlightedText, documentId]);

  if (!documentId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Select a document to view
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Click on any reference in the chat to open the source document with highlighted relevant sections.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Document Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium text-foreground">{sampleDocument.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {sampleDocument.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Page {currentPage} of {sampleDocument.pages}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
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

      {/* Document Content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <Card className="max-w-none shadow-elevated">
          <div 
            className="p-8 font-mono text-sm leading-relaxed"
            style={{ fontSize: `${zoomLevel}%` }}
          >
            {sampleDocument.content.split('\n').map((line, index) => {
              const isHighlighted = highlightedText && line.toLowerCase().includes(highlightedText.toLowerCase());
              return (
                <div
                  key={index}
                  className={`mb-2 ${
                    isHighlighted 
                      ? 'bg-yellow-200 border-l-4 border-l-warning pl-4 py-2 rounded-r-md' 
                      : ''
                  }`}
                >
                  {line.startsWith('[HIGHLIGHTED:') && line.endsWith(']') ? (
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

      {/* Page Navigation */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-center justify-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-4">
            {currentPage} / {sampleDocument.pages}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            disabled={currentPage === sampleDocument.pages}
            onClick={() => setCurrentPage(Math.min(sampleDocument.pages, currentPage + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};