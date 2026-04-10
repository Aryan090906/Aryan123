'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

// Generate static params for all topics
export function generateStaticParams() {
  return [
    { id: 'arrays' },
    { id: 'strings' },
    { id: 'linked-list' },
    { id: 'stack' },
  ];
}
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Code2, HelpCircle, CheckCircle2, Lock, Trophy } from 'lucide-react';
import { getTopicById } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';
import { getDifficultyColor, cn } from '@/lib/utils';

export default function TopicDetailPage() {
  const params = useParams();
  const topicId = params.id as string;
  const topic = getTopicById(topicId);
  const [activeTab, setActiveTab] = useState<'notes' | 'problems' | 'quiz'>('notes');
  const { isProblemSolved, getTopicProgress, progress } = useUserProgress();

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <Link href="/topics" className="text-purple-600 hover:underline">
          Back to topics
        </Link>
      </div>
    );
  }

  const tp = getTopicProgress(topicId);
  const solvedCount = tp.easySolved + tp.mediumSolved + tp.hardSolved + tp.bossSolved;
  const totalProblems = topic.problems.length;
  const progressPercent = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

  // Separate problems by difficulty
  const easyProblems = topic.problems.filter(p => p.difficulty === 'easy');
  const mediumProblems = topic.problems.filter(p => p.difficulty === 'medium');
  const hardProblems = topic.problems.filter(p => p.difficulty === 'hard');
  const bossProblems = topic.problems.filter(p => p.difficulty === 'boss');

  const tabs = [
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'problems', label: 'Problems', icon: Code2 },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link
          href="/topics"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
              <span className="text-2xl text-white font-bold">{topic.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{topic.name}</h1>
              <p className="text-muted-foreground">{topic.description}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{solvedCount}/{totalProblems}</div>
          <div className="text-sm text-muted-foreground">Problems Solved</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-6 py-3 font-medium transition-colors relative',
              activeTab === tab.id
                ? 'text-purple-600'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'notes' && (
          <div className="bg-card border rounded-2xl p-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {topic.notes}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'problems' && (
          <div className="space-y-8">
            {/* Easy Problems */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Easy ({tp.easySolved}/{easyProblems.length} solved)
              </h3>
              <div className="grid gap-3">
                {easyProblems.map((problem) => {
                  const solved = isProblemSolved(problem.id);
                  return (
                    <Link key={problem.id} href={`/practice/${problem.id}`}>
                      <div className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md',
                        solved ? 'bg-green-500/5 border-green-500/20' : 'bg-card'
                      )}>
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          solved ? 'bg-green-500 text-white' : 'bg-muted'
                        )}>
                          {solved ? <CheckCircle2 className="w-5 h-5" /> : <Code2 className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{problem.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{problem.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-green-600 font-medium">+{problem.xpReward} XP</span>
                          {solved && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Medium Problems */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                Medium ({tp.mediumSolved}/{mediumProblems.length} solved)
              </h3>
              <div className="grid gap-3">
                {mediumProblems.map((problem) => {
                  const solved = isProblemSolved(problem.id);
                  return (
                    <Link key={problem.id} href={`/practice/${problem.id}`}>
                      <div className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md',
                        solved ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-card'
                      )}>
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          solved ? 'bg-yellow-500 text-white' : 'bg-muted'
                        )}>
                          {solved ? <CheckCircle2 className="w-5 h-5" /> : <Code2 className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{problem.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{problem.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-yellow-600 font-medium">+{problem.xpReward} XP</span>
                          {solved && <CheckCircle2 className="w-5 h-5 text-yellow-500" />}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Hard Problems */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                Hard ({tp.hardSolved}/{hardProblems.length} solved)
              </h3>
              <div className="grid gap-3">
                {hardProblems.map((problem) => {
                  const solved = isProblemSolved(problem.id);
                  return (
                    <Link key={problem.id} href={`/practice/${problem.id}`}>
                      <div className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md',
                        solved ? 'bg-red-500/5 border-red-500/20' : 'bg-card'
                      )}>
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          solved ? 'bg-red-500 text-white' : 'bg-muted'
                        )}>
                          {solved ? <CheckCircle2 className="w-5 h-5" /> : <Code2 className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{problem.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{problem.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-red-600 font-medium">+{problem.xpReward} XP</span>
                          {solved && <CheckCircle2 className="w-5 h-5 text-red-500" />}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Boss Problems */}
            {bossProblems.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-500" />
                  Boss Challenge ({tp.bossSolved}/{bossProblems.length} defeated)
                </h3>
                <div className="grid gap-3">
                  {bossProblems.map((problem) => {
                    const solved = isProblemSolved(problem.id);
                    const canUnlock = solvedCount >= totalProblems * 0.8;
                    
                    return (
                      <Link 
                        key={problem.id} 
                        href={canUnlock ? `/practice/${problem.id}` : '#'}
                        onClick={(e) => !canUnlock && e.preventDefault()}
                      >
                        <div className={cn(
                          'flex items-center gap-4 p-4 rounded-xl border transition-all',
                          solved ? 'bg-purple-500/5 border-purple-500/20' : 'bg-card',
                          !canUnlock && !solved && 'opacity-60 cursor-not-allowed'
                        )}>
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center animate-pulse-glow',
                            solved ? 'bg-purple-500 text-white' : canUnlock ? 'bg-purple-500/20 text-purple-500' : 'bg-muted'
                          )}>
                            {solved ? <CheckCircle2 className="w-5 h-5" /> : canUnlock ? <Trophy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{problem.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {!canUnlock && !solved 
                                ? `Unlock by solving 80% of problems (${Math.ceil(totalProblems * 0.8)} needed)` 
                                : problem.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-purple-600 font-bold">+{problem.xpReward} XP</span>
                            {solved && <CheckCircle2 className="w-5 h-5 text-purple-500" />}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="bg-card border rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Test Your Knowledge</h3>
              <p className="text-muted-foreground">
                Take the quiz to earn bonus XP and test your understanding of {topic.name}
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                href={`/quiz/${topic.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30"
              >
                <HelpCircle className="w-5 h-5" />
                Start Quiz ({topic.quizzes.length} questions)
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
