import { ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SourcesSection } from "@/components/SourcesSection";

interface Reference {
  id?: number;
  document: string;
  title?: string;
  excerpt: string;
  page?: number;
}

interface AnswerCardProps {
  query: string;
  answer?: string; // Perplexity-style single answer
  what?: string;
  why?: string;
  recommendation?: string;
  references: Reference[];
  onDocumentSelect: (documentId: string) => void;
  onHighlightText: (text: string) => void;
}

// Helper function to add citation numbers to text
const addCitations = (text: string, references: Reference[]) => {
  if (!text || !references.length) return text;
  
  let citedText = text;
  references.forEach((ref) => {
    if (ref.id && citedText.includes(ref.excerpt.substring(0, 30))) {
      // Add superscript citation number
      citedText = citedText.replace(
        new RegExp(ref.excerpt.substring(0, 30).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `${ref.excerpt.substring(0, 30)}<sup>${ref.id}</sup>`
      );
    }
  });
  return citedText;
};

export const AnswerCard = ({ 
  query, 
  answer,
  what, 
  why, 
  recommendation, 
  references,
  onDocumentSelect,
  onHighlightText 
}: AnswerCardProps) => {
  
  // Process references to ensure they have IDs
  const processedReferences = references.map((ref, index) => ({
    ...ref,
    id: ref.id || index + 1,
    title: ref.title || ref.document.replace('.pdf', '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }));

  // Function to render text with inline citations
  const renderTextWithCitations = (text: string) => {
    if (!text) return text;
    
    // Replace citation markers (¹²³) with styled superscript numbers
    let processedText = text;
    const citationPattern = /[¹²³⁴⁵⁶⁷⁸⁹]/g;
    const citationMap: {[key: string]: string} = {
      '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'
    };
    
    processedText = processedText.replace(citationPattern, (match) => {
      const num = citationMap[match];
      return `<sup class="inline-flex items-center justify-center w-4 h-4 text-xs bg-primary/10 text-primary rounded-full ml-0.5 cursor-pointer hover:bg-primary/20 transition-colors">${num}</sup>`;
    });
    
    return processedText;
  };

  return (
    <div className="space-y-4">
      {/* Query */}
      <div className="text-sm text-muted-foreground font-medium">
        {query}
      </div>

      {/* Main Answer */}
      <Card className="shadow-card">
        <div className="p-6">
          {answer ? (
            // Perplexity-style single answer
            <div 
              className="text-foreground leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: renderTextWithCitations(answer) }}
            />
          ) : (
            // Traditional What/Why/Recommendation format
            <div className="space-y-6">
              {what && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    What Happened
                  </h3>
                  <p className="text-foreground leading-relaxed">{what}</p>
                </div>
              )}

              {why && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    Why It Happened
                  </h3>
                  <p className="text-foreground leading-relaxed">{why}</p>
                </div>
              )}

              {recommendation && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    Recommendation
                  </h3>
                  <p className="text-foreground leading-relaxed">{recommendation}</p>
                </div>
              )}
            </div>
          )}

          {/* Sources Section */}
          <SourcesSection 
            sources={processedReferences}
            onDocumentSelect={onDocumentSelect}
            onHighlightText={onHighlightText}
          />
        </div>
      </Card>
    </div>
  );
};