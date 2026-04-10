'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Flame, Code2, BookOpen, TrendingUp, Award, Zap } from 'lucide-react';
import { useUserProgress } from '@/context/UserProgressContext';
import { LEVEL_THRESHOLDS } from '@/types';
import { topics, badges } from '@/lib/data';
import Link from 'next/link';

export default function DashboardPage() {
  const { progress, getTotalProblemsSolved, getTopicProgress } = useUserProgress();
  const level = LEVEL_THRESHOLDS.getLevel(progress.xp);
  const xpForNextLevel = LEVEL_THRESHOLDS.getXpForNextLevel(progress.xp);
  const totalSolved = getTotalProblemsSolved();

  // Calculate stats
  const totalProblems = topics.reduce((acc, t) => acc + t.problems.length, 0);
  const completionRate = Math.round((totalSolved / totalProblems) * 100);

  // Get difficulty breakdown
  const difficultyStats = { easy: 0, medium: 0, hard: 0, boss: 0 };
  topics.forEach(topic => {
    const tp = getTopicProgress(topic.id);
    difficultyStats.easy += tp.easySolved;
    difficultyStats.medium += tp.mediumSolved;
    difficultyStats.hard += tp.hardSolved;
    difficultyStats.boss += tp.bossSolved;
  });

  const unlockedBadges = badges.filter(b => progress.badges.includes(b.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and achievements</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-semibold">{progress.streak} day streak</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { icon: Trophy, label: 'Total XP', value: progress.xp, color: 'text-yellow-500' },
          { icon: Target, label: 'Level', value: level, color: 'text-purple-500' },
          { icon: Code2, label: 'Problems Solved', value: totalSolved, color: 'text-green-500' },
          { icon: BookOpen, label: 'Completion', value: `${completionRate}%`, color: 'text-blue-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border rounded-2xl p-6"
          >
            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Level Progress */}
      <div className="bg-card border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Level {level}</h3>
              <p className="text-sm text-muted-foreground">{xpForNextLevel} XP to next level</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{progress.xp}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </div>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
            style={{ width: `${(LEVEL_THRESHOLDS.getProgressToNextLevel(progress.xp) / 100) * 100}%` }}
          />
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Problems by Difficulty
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Easy', value: difficultyStats.easy, total: topics.reduce((a, t) => a + t.problems.filter(p => p.difficulty === 'easy').length, 0), color: 'bg-green-500' },
              { label: 'Medium', value: difficultyStats.medium, total: topics.reduce((a, t) => a + t.problems.filter(p => p.difficulty === 'medium').length, 0), color: 'bg-yellow-500' },
              { label: 'Hard', value: difficultyStats.hard, total: topics.reduce((a, t) => a + t.problems.filter(p => p.difficulty === 'hard').length, 0), color: 'bg-red-500' },
              { label: 'Boss', value: difficultyStats.boss, total: topics.reduce((a, t) => a + t.problems.filter(p => p.difficulty === 'boss').length, 0), color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">{item.value} / {item.total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Progress */}
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Topic Progress
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {topics.map((topic) => {
              const tp = getTopicProgress(topic.id);
              const totalSolved = tp.easySolved + tp.mediumSolved + tp.hardSolved + tp.bossSolved;
              const totalProblems = topic.problems.length;
              const percentage = totalProblems > 0 ? (totalSolved / totalProblems) * 100 : 0;

              return (
                <Link key={topic.id} href={`/topics/${topic.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center text-white font-bold`}>
                      {topic.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{topic.name}</span>
                        <span className="text-muted-foreground">{totalSolved}/{totalProblems}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full mt-1.5">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-card border rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements ({unlockedBadges.length} / {badges.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {badges.map((badge) => {
            const isUnlocked = progress.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border text-center transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/30'
                    : 'bg-muted/50 border-transparent opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  isUnlocked ? 'bg-purple-500 text-white' : 'bg-muted'
                }`}>
                  <span className="text-lg">{isUnlocked ? '★' : '☆'}</span>
                </div>
                <div className="text-xs font-medium">{badge.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
