import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getStarterQuestions } from "@/lib/questionService";

interface StarterQuestionsProps {
  onQuestionClick: (question: string) => void;
}

export const StarterQuestions = ({ onQuestionClick }: StarterQuestionsProps) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const starterQuestions = await getStarterQuestions();
        setQuestions(starterQuestions);
      } catch (error) {
        console.error('Error loading starter questions:', error);
        // Fallback questions
        setQuestions([
          "What are the main freight cost anomalies this quarter?",
          "Which suppliers have the highest contract compliance risk?",
          "What's the ROI on our last supply chain automation project?",
          "Which regions have the highest transportation costs?"
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-12 bg-muted animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {questions.slice(0, 6).map((question, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto p-4 text-left justify-start hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          onClick={() => onQuestionClick(question)}
        >
          <span className="text-sm font-medium truncate">
            {question}
          </span>
        </Button>
      ))}
    </div>
  );
};