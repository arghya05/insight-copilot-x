import { ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Reference {
  document: string;
  excerpt: string;
  page?: number;
}

interface AnswerCardProps {
  query: string;
  what: string;
  why: string;
  recommendation: string;
  references: Reference[];
  onDocumentSelect: (documentId: string) => void;
  onHighlightText: (text: string) => void;
}

export const AnswerCard = ({ 
  query, 
  what, 
  why, 
  recommendation, 
  references,
  onDocumentSelect,
  onHighlightText 
}: AnswerCardProps) => {
  const handleReferenceClick = (ref: Reference) => {
    onDocumentSelect(ref.document);
    onHighlightText(ref.excerpt);
  };

  return (
    <div className="space-y-4">
      {/* Query */}
      <div className="text-sm text-muted-foreground font-medium">
        {query}
      </div>

      {/* Answer Sections */}
      <Card className="shadow-card border-l-4 border-l-primary">
        <div className="p-6 space-y-6">
          {/* What Happened */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
              What Happened
            </h3>
            <p className="text-foreground leading-relaxed">{what}</p>
          </div>

          {/* Why It Happened */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
              Why It Happened
            </h3>
            <p className="text-foreground leading-relaxed">{why}</p>
          </div>

          {/* Recommendation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
              Recommendation
            </h3>
            <p className="text-foreground leading-relaxed">{recommendation}</p>
          </div>

          {/* References */}
          {references.length > 0 && (
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                Sources
              </h3>
              <div className="space-y-2">
                {references.map((ref, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 justify-start text-left hover:bg-muted/50 transition-colors"
                    onClick={() => handleReferenceClick(ref)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground">
                          {ref.document}
                          {ref.page && (
                            <span className="text-muted-foreground ml-1">
                              (Page {ref.page})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {ref.excerpt}
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};