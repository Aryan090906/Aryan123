'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { mockLeaderboard } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { LEVEL_THRESHOLDS } from '@/types';

export default function LeaderboardPage() {
  const { progress } = useUserProgress();
  const userLevel = LEVEL_THRESHOLDS.getLevel(progress.xp);

  // Add current user to leaderboard
  const allEntries = [
    ...mockLeaderboard,
    {
      id: 'you',
      name: 'You',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=You`,
      xp: progress.xp,
      level: userLevel,
      problemsSolved: progress.solvedProblems.length,
      streak: progress.streak,
    },
  ].sort((a, b) => b.xp - a.xp);

  const userRank = allEntries.findIndex(e => e.id === 'you') + 1;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
        <p className="text-muted-foreground">Compete with other learners and climb the ranks</p>
      </div>

      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <div className="text-lg text-purple-200 mb-2">Your Rank</div>
        <div className="text-5xl font-bold mb-4">#{userRank}</div>
        <div className="flex justify-center gap-8">
          <div>
            <div className="text-2xl font-bold">{progress.xp}</div>
            <div className="text-purple-200 text-sm">Total XP</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{userLevel}</div>
            <div className="text-purple-200 text-sm">Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{progress.solvedProblems.length}</div>
            <div className="text-purple-200 text-sm">Problems</div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="bg-card border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-muted font-medium text-sm">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-center">Level</div>
          <div className="col-span-2 text-center">Problems</div>
          <div className="col-span-2 text-right">XP</div>
        </div>
        <div className="divide-y">
          {allEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`grid grid-cols-12 gap-4 p-4 items-center ${
                entry.id === 'you' ? 'bg-purple-500/10' : ''
              }`}
            >
              <div className="col-span-1">{getRankIcon(index + 1)}</div>
              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full bg-muted"
                />
                <span className="font-medium">{entry.name}</span>
                {entry.id === 'you' && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs">You</span>
                )}
              </div>
              <div className="col-span-2 text-center">{entry.level}</div>
              <div className="col-span-2 text-center">{entry.problemsSolved}</div>
              <div className="col-span-2 text-right font-bold">{entry.xp}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
