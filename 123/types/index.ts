export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'boss';
  description: string;
  examples: Example[];
  constraints: string[];
  starterCode: string;
  solution: string;
  hints: string[];
  xpReward: number;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  notes: string;
  problems: Problem[];
  quizzes: Quiz[];
}

export interface TopicProgress {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  bossSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  totalBoss: number;
}

export interface ProblemAttempt {
  problemId: string;
  timestamp: string;
  accuracy: number;
  timeTaken: number;
  passed: boolean;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  solvedProblems: string[];
  quizScores: Record<string, number>;
  badges: string[];
  topicProgress: Record<string, TopicProgress>;
  dailyChallengeCompleted: boolean;
  dailyChallengeDate: string;
  dailyChallengeProblems: string[];
  problemAttempts: ProblemAttempt[];
  weakTopics: string[];
  preferredLanguage: 'python' | 'javascript';
}

export interface RoadmapNode {
  id: string;
  topicId: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  completed: boolean;
  dependsOn: string[];
}

export interface LearningRoadmap {
  id: string;
  userId: string;
  createdAt: string;
  nodes: RoadmapNode[];
  overallProgress: number;
}

export interface ChallengeParticipant {
  userId: string;
  name: string;
  avatar: string;
  progress: number;
  score: number;
  completedProblems: string[];
  isReady: boolean;
}

export interface RealTimeChallenge {
  id: string;
  hostId: string;
  inviteCode: string;
  inviteLink: string;
  problemIds: string[];
  participants: ChallengeParticipant[];
  status: 'waiting' | 'in-progress' | 'completed';
  timeLimit: number;
  startTime?: string;
  endTime?: string;
  winnerId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'problems' | 'streak' | 'level' | 'topic' | 'special';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  problemsSolved: number;
  streak: number;
}

export interface DailyChallenge {
  date: string;
  problems: Problem[];
  bonusXp: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';

export const XP_REWARDS = {
  easy: 10,
  medium: 25,
  hard: 50,
  boss: 100,
  quizCorrect: 5,
  dailyChallenge: 30,
  streakBonus: 5,
} as const;

export const LEVEL_THRESHOLDS = {
  getLevel: (xp: number): number => Math.floor(xp / 100),
  getXpForNextLevel: (xp: number): number => {
    const currentLevel = Math.floor(xp / 100);
    return (currentLevel + 1) * 100 - xp;
  },
  getProgressToNextLevel: (xp: number): number => {
    return xp % 100;
  },
};
