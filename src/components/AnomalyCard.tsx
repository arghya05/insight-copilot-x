import { AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Anomaly {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  impact: string;
}

interface AnomalyCardProps {
  anomalies: Anomaly[];
  timestamp: Date;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-destructive text-destructive-foreground';
    case 'medium':
      return 'bg-warning text-warning-foreground';
    case 'low':
      return 'bg-success text-success-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return <AlertTriangle className="h-4 w-4" />;
    case 'medium':
      return <TrendingUp className="h-4 w-4" />;
    case 'low':
      return <Clock className="h-4 w-4" />;
    default:
      return null;
  }
};

export const AnomalyCard = ({ anomalies, timestamp }: AnomalyCardProps) => {
  return (
    <Card className="shadow-card border-l-4 border-l-warning">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Anomalies Detected
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>

        <div className="space-y-4">
          {anomalies.map((anomaly, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{anomaly.type}</span>
                  <Badge className={`text-xs ${getSeverityColor(anomaly.severity)}`}>
                    {getSeverityIcon(anomaly.severity)}
                    <span className="ml-1 capitalize">{anomaly.severity}</span>
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-2">{anomaly.description}</p>
              
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Impact:</span> {anomaly.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};