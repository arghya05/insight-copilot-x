import { AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AnomalyToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const AnomalyToggle = ({ enabled, onToggle }: AnomalyToggleProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Label 
        htmlFor="anomaly-toggle" 
        className="text-sm font-medium text-foreground flex items-center space-x-2 cursor-pointer"
      >
        <AlertTriangle className="h-4 w-4 text-warning" />
        <span>Show anomalies only</span>
      </Label>
      <Switch
        id="anomaly-toggle"
        checked={enabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-warning"
      />
    </div>
  );
};