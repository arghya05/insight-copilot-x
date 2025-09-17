import { ExternalLink, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SourcesSection } from "@/components/SourcesSection";
import { BusinessCharts, ChartData } from "@/components/BusinessCharts";

interface Reference {
  id?: number;
  document: string;
  title?: string;
  excerpt: string;
  page?: number;
}

interface AnswerCardProps {
  query: string;
  what: string;
  why: string;
  recommendation: string;
  charts?: ChartData[];
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
  what, 
  why, 
  recommendation, 
  charts,
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

  return (
    <div className="space-y-4">
      {/* Query */}
      <div className="text-sm text-muted-foreground font-medium">
        {query}
      </div>

      {/* Main Answer - Always use What/Why/Recommendation structure */}
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

          {/* Charts Section */}
          {charts && charts.length > 0 && (
            <BusinessCharts charts={charts} />
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