'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Clock, CheckCircle2, Flame, Zap, ArrowRight } from 'lucide-react';
import { getAllProblems } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { getTodayString, cn } from '@/lib/utils';
import { Problem } from '@/types';

export default function DailyChallengesPage() {
  const { progress, isProblemSolved, completeDailyChallenge } = useUserProgress();
  const [dailyProblems, setDailyProblems] = useState<Problem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate daily challenges based on today's date
    const allProblems = getAllProblems();
    const easy = allProblems.filter(p => p.difficulty === 'easy');
    const medium = allProblems.filter(p => p.difficulty === 'medium');
    const hard = allProblems.filter(p => p.difficulty === 'hard');
    
    // Use date as seed for consistent daily challenges
    const today = new Date().getDate();
    const selected = [
      easy[today % easy.length],
      medium[today % medium.length],
      hard[today % hard.length],
    ].filter(Boolean);
    
    setDailyProblems(selected);
  }, []);

  if (!isClient) return null;

  const today = getTodayString();
  const isCompleted = progress.dailyChallengeDate === today && progress.dailyChallengeCompleted;
  
  const solvedCount = dailyProblems.filter(p => isProblemSolved(p.id)).length;
  const allSolved = solvedCount === dailyProblems.length && dailyProblems.length > 0;
  
  // Calculate bonus XP
  const bonusXP = 30;
  const totalXPEarned = dailyProblems.reduce((acc, p) => {
    if (isProblemSolved(p.id)) {
      return acc + p.xpReward;
    }
    return acc;
  }, 0);

  const difficultyConfig = {
    easy: { color: 'bg-green-500', label: 'Easy', icon: Zap },
    medium: { color: 'bg-yellow-500', label: 'Medium', icon: Flame },
    hard: { color: 'bg-red-500', label: 'Hard', icon: Trophy },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium mb-4"
        >
          <Calendar className="w-4 h-4" />
          Daily Challenges
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Today&apos;s Challenges</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Complete all 3 daily challenges to earn bonus XP and maintain your streak!
        </p>
      </div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          'rounded-2xl p-8 text-center',
          allSolved
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
        )}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          {allSolved ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Clock className="w-6 h-6" />
          )}
          <span className="text-lg font-medium">
            {allSolved ? 'All Challenges Completed!' : 'Challenges in Progress'}
          </span>
        </div>
        
        <div className="text-5xl font-bold mb-2">
          {solvedCount}/{dailyProblems.length}
        </div>
        <div className="text-white/80 mb-6">Completed</div>
        
        <div className="flex justify-center gap-8">
          <div>
            <div className="text-2xl font-bold">+{totalXPEarned}</div>
            <div className="text-white/80 text-sm">XP Earned</div>
          </div>
          {allSolved && (
            <div>
              <div className="text-2xl font-bold">+{bonusXP}</div>
              <div className="text-white/80 text-sm">Bonus XP</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Challenge Cards */}
      <div className="space-y-4">
        {dailyProblems.map((problem, index) => {
          const solved = isProblemSolved(problem.id);
          const config = difficultyConfig[problem.difficulty as keyof typeof difficultyConfig];
          
          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link href={`/practice/${problem.id}`}>
                <div className={cn(
                  'group flex items-center gap-4 p-6 rounded-2xl border transition-all hover:shadow-lg',
                  solved
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-card hover:border-purple-500/30'
                )}>
                  {/* Difficulty Indicator */}
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    config.color,
                    solved && 'opacity-50'
                  )}>
                    <config.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full',
                        problem.difficulty === 'easy' && 'bg-green-500/10 text-green-600',
                        problem.difficulty === 'medium' && 'bg-yellow-500/10 text-yellow-600',
                        problem.difficulty === 'hard' && 'bg-red-500/10 text-red-600'
                      )}>
                        {config.label}
                      </span>
                      {solved && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {problem.description}
                    </p>
                  </div>
                  
                  {/* XP & Action */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-purple-600">+{problem.xpReward}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                    {solved ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-muted/50 rounded-2xl p-6"
      >
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          How Daily Challenges Work
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            New challenges are generated every day at midnight
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Complete all 3 challenges to earn a 30 XP bonus
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Daily challenges contribute to your streak
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            Challenges are curated from different topics each day
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
