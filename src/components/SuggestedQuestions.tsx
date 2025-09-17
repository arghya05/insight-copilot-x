import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick?: (question: string) => void;
  isLoading?: boolean;
}

export const SuggestedQuestions = ({ questions, onQuestionClick, isLoading = false }: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Next questions
      </h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="secondary"
            size="sm"
            disabled={isLoading}
            className="text-xs h-8 px-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onQuestionClick?.(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};