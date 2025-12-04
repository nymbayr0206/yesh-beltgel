export type ScreenName = 
  | 'onboarding'
  | 'auth'
  | 'examPreferences'
  | 'home'
  | 'dailyTraining'
  | 'aiTutor'
  | 'testSimulation'
  | 'progress'
  | 'profile';

export interface ExamSettings {
  subjects: string[];
  targetScore: string;
  subjectScores: Record<string, string>;
  year: string;
}

export interface User {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  examSettings?: ExamSettings;
}

export interface Question {
  id: number;
  text: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  type: 'multiple-choice' | 'input';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StatPoint {
  subject: string;
  score: number;
  fullMark: number;
}

export interface WeeklyProgress {
  day: string;
  xp: number;
}

export interface Mission {
  mission_id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_time_min: number;
  xp_reward: number;
  problem_type: 'multiple_choice' | 'short_answer' | 'open_ended';
  problem_statement: string;
  choices?: string[];
  correct_answer: string;
  explanation: string;
  hints: string[];
  metadata: {
    grade_or_level: string;
    target_exam: string;
    tags: string[];
  };
}

export interface DailyQuest {
  quest_id: string;
  title: string;
  description: string;
  estimated_total_time_min: number;
  recommended_order: string;
  xp_reward_total: number;
  streak_hint: string;
  missions: Mission[];
}