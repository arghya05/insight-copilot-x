import { supabase } from "@/integrations/supabase/client";

export interface Question {
  id: string;
  question_text: string;
  answer_text: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface FollowUpQuestion {
  id: string;
  parent_question_id: string;
  question_text: string;
  created_at: string;
}

export interface ConversationHistory {
  id: string;
  question: string;
  answer: string;
  follow_up_questions: string[];
  created_at: string;
}

// Search for questions in the database using text similarity
export const searchQuestions = async (query: string): Promise<Question[]> => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .textSearch('question_text', query, { type: 'websearch' })
    .limit(5);

  if (error) {
    console.error('Error searching questions:', error);
    return [];
  }

  return data || [];
};

// Get all questions from the database
export const getAllQuestions = async (): Promise<Question[]> => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
};

// Get follow-up questions for a specific question
export const getFollowUpQuestions = async (questionId: string): Promise<FollowUpQuestion[]> => {
  const { data, error } = await supabase
    .from('follow_up_questions')
    .select('*')
    .eq('parent_question_id', questionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching follow-up questions:', error);
    return [];
  }

  return data || [];
};

// Find the best matching question using fuzzy text search
export const findBestMatch = async (userQuestion: string): Promise<Question | null> => {
  // First try exact text search
  const exactMatches = await searchQuestions(userQuestion);
  
  if (exactMatches.length > 0) {
    return exactMatches[0];
  }

  // If no exact matches, try to find partial matches by keywords
  const keywords = userQuestion.toLowerCase().split(' ').filter(word => word.length > 3);
  
  for (const keyword of keywords) {
    const matches = await searchQuestions(keyword);
    if (matches.length > 0) {
      return matches[0];
    }
  }

  return null;
};

// Save conversation to history
export const saveConversation = async (
  question: string, 
  answer: string, 
  followUpQuestions: string[] = []
): Promise<void> => {
  const { error } = await supabase
    .from('conversation_history')
    .insert({
      question,
      answer,
      follow_up_questions: followUpQuestions
    });

  if (error) {
    console.error('Error saving conversation:', error);
  }
};

// Get random questions for suggestions
export const getRandomQuestions = async (limit: number = 5): Promise<Question[]> => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .limit(limit);
  
  if (error) {
    console.error('Error fetching random questions:', error);
    return [];
  }
  
  return data || [];
};

// Get starter questions (first few questions from each category)
export const getStarterQuestions = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('questions')
    .select('question_text')
    .limit(6);

  if (error) {
    console.error('Error fetching starter questions:', error);
    return [
      "What are the main freight cost anomalies this quarter?",
      "Which suppliers have the highest contract compliance risk?",
      "What's the ROI on our last supply chain automation project?",
      "Which regions have the highest transportation costs?"
    ];
  }

  return data?.map(q => q.question_text) || [];
};