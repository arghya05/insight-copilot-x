import { ExternalLink, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Source {
  id: number;
  document: string;
  title: string;
  excerpt: string;
  page?: number;
  url?: string;
}

interface SourcesSectionProps {
  sources: Source[];
  onDocumentSelect: (documentId: string) => void;
  onHighlightText: (text: string) => void;
}

export const SourcesSection = ({ sources, onDocumentSelect, onHighlightText }: SourcesSectionProps) => {
  const handleSourceClick = (source: Source) => {
    onDocumentSelect(source.document);
    onHighlightText(source.excerpt);
  };

  if (sources.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center space-x-3 mb-4">
        <LinkIcon className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Sources</h3>
      </div>
      
      <div className="grid gap-3">
        {sources.map((source) => (
          <Button
            key={source.id}
            variant="outline"
            className="h-auto p-4 justify-start text-left hover:bg-muted/50 transition-colors group"
            onClick={() => handleSourceClick(source)}
          >
            <div className="flex items-start space-x-3 w-full">
              <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">{source.id}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium text-sm text-foreground truncate">
                    {source.title}
                  </span>
                  {source.page && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      Page {source.page}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {source.excerpt}
                </p>
              </div>
              
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};