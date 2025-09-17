import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: (query: string) => void;
}

export const SearchBar = ({ value, onChange, placeholder, onSubmit }: SearchBarProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      onSubmit?.(value);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-20 h-12 text-base rounded-lg border-2 border-input focus:border-primary transition-colors"
        />
        <Button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-sm"
        >
          {isLoading ? "..." : "Ask"}
        </Button>
      </div>
    </form>
  );
};