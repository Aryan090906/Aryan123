'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, TopicProgress, XP_REWARDS, LEVEL_THRESHOLDS } from '@/types';
import { getTodayString, calculateStreak } from '@/lib/utils';

interface UserProgressContextType {
  progress: UserProgress;
  addXp: (amount: number) => void;
  markProblemSolved: (problemId: string, topicId: string, difficulty: string) => void;
  updateQuizScore: (topicId: string, score: number) => void;
  addBadge: (badgeId: string) => void;
  updateStreak: () => void;
  completeDailyChallenge: () => void;
  isProblemSolved: (problemId: string) => boolean;
  getTopicProgress: (topicId: string) => TopicProgress;
  getTotalProblemsSolved: () => number;
  getProblemsSolvedByDifficulty: () => { easy: number; medium: number; hard: number; boss: number };
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  xp: 0,
  level: 0,
  streak: 0,
  lastActiveDate: '',
  solvedProblems: [],
  quizScores: {},
  badges: [],
  topicProgress: {},
  dailyChallengeCompleted: false,
  dailyChallengeDate: '',
  dailyChallengeProblems: [],
};

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('dsaQuestProgress');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgress({ ...defaultProgress, ...parsed });
      } catch {
        setProgress(defaultProgress);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dsaQuestProgress', JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const addXp = (amount: number) => {
    setProgress(prev => {
      const newXp = prev.xp + amount;
      const newLevel = LEVEL_THRESHOLDS.getLevel(newXp);
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const markProblemSolved = (problemId: string, topicId: string, difficulty: string) => {
    if (progress.solvedProblems.includes(problemId)) return;

    setProgress(prev => {
      const newSolvedProblems = [...prev.solvedProblems, problemId];
      const topicProg = prev.topicProgress[topicId] || {
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        bossSolved: 0,
        totalEasy: 5,
        totalMedium: 5,
        totalHard: 5,
        totalBoss: 1,
      };

      const updatedTopicProg = { ...topicProg };
      switch (difficulty) {
        case 'easy':
          updatedTopicProg.easySolved++;
          break;
        case 'medium':
          updatedTopicProg.mediumSolved++;
          break;
        case 'hard':
          updatedTopicProg.hardSolved++;
          break;
        case 'boss':
          updatedTopicProg.bossSolved++;
          break;
      }

      const xpReward = XP_REWARDS[difficulty as keyof typeof XP_REWARDS] || 10;
      const newXp = prev.xp + xpReward;

      return {
        ...prev,
        xp: newXp,
        level: LEVEL_THRESHOLDS.getLevel(newXp),
        solvedProblems: newSolvedProblems,
        topicProgress: {
          ...prev.topicProgress,
          [topicId]: updatedTopicProg,
        },
      };
    });
  };

  const updateQuizScore = (topicId: string, score: number) => {
    setProgress(prev => {
      const currentScore = prev.quizScores[topicId] || 0;
      if (score > currentScore) {
        const xpGain = (score - currentScore) * XP_REWARDS.quizCorrect;
        const newXp = prev.xp + xpGain;
        return {
          ...prev,
          xp: newXp,
          level: LEVEL_THRESHOLDS.getLevel(newXp),
          quizScores: {
            ...prev.quizScores,
            [topicId]: score,
          },
        };
      }
      return prev;
    });
  };

  const addBadge = (badgeId: string) => {
    if (!progress.badges.includes(badgeId)) {
      setProgress(prev => ({
        ...prev,
        badges: [...prev.badges, badgeId],
      }));
    }
  };

  const updateStreak = () => {
    const today = getTodayString();
    if (progress.lastActiveDate === today) return;

    const streakResult = progress.lastActiveDate 
      ? calculateStreak(progress.lastActiveDate)
      : 0;

    setProgress(prev => {
      let newStreak = prev.streak;
      if (streakResult === 0) {
        newStreak = prev.streak + 1;
      } else if (streakResult === -2) {
        newStreak = 1;
      }

      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      };
    });
  };

  const completeDailyChallenge = () => {
    const today = getTodayString();
    if (progress.dailyChallengeDate !== today) {
      setProgress(prev => ({
        ...prev,
        dailyChallengeCompleted: true,
        dailyChallengeDate: today,
      }));
      addXp(XP_REWARDS.dailyChallenge);
    }
  };

  const isProblemSolved = (problemId: string) => {
    return progress.solvedProblems.includes(problemId);
  };

  const getTopicProgress = (topicId: string): TopicProgress => {
    return progress.topicProgress[topicId] || {
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      bossSolved: 0,
      totalEasy: 5,
      totalMedium: 5,
      totalHard: 5,
      totalBoss: 1,
    };
  };

  const getTotalProblemsSolved = () => {
    return progress.solvedProblems.length;
  };

  const getProblemsSolvedByDifficulty = () => {
    const counts = { easy: 0, medium: 0, hard: 0, boss: 0 };
    // This will be calculated based on problem data
    return counts;
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem('dsaQuestProgress');
  };

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        addXp,
        markProblemSolved,
        updateQuizScore,
        addBadge,
        updateStreak,
        completeDailyChallenge,
        isProblemSolved,
        getTopicProgress,
        getTotalProblemsSolved,
        getProblemsSolvedByDifficulty,
        resetProgress,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
}
