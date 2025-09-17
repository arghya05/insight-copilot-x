import { FileText, Eye, Calendar, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pdfDocuments } from "@/data/sampleData";

interface PDFGalleryProps {
  onDocumentSelect: (documentId: string) => void;
}

export const PDFGallery = ({ onDocumentSelect }: PDFGalleryProps) => {
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'financial analysis':
        return <BarChart3 className="h-4 w-4" />;
      case 'compliance report':
        return <FileText className="h-4 w-4" />;
      case 'logistics report':
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'financial analysis':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'compliance report':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'logistics report':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="border-t border-border bg-muted/20 p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-foreground mb-1">Available Documents</h3>
        <p className="text-xs text-muted-foreground">Click any document to open and analyze</p>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {pdfDocuments.map((doc) => (
          <Card
            key={doc.id}
            className="flex-shrink-0 w-72 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
            onClick={() => onDocumentSelect(doc.id)}
          >
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-lg p-2 group-hover:bg-primary/20 transition-colors">
                  {getTypeIcon(doc.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                    {doc.title}
                  </h4>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${getTypeColor(doc.type)}`}>
                      {doc.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {doc.pages} pages
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Click to analyze
                    </span>
                    <Eye className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};