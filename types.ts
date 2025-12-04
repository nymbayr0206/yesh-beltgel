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

export interface User {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
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