'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, CheckCircle2, Circle } from 'lucide-react';
import { topics } from '@/lib/data';
import { useUserProgress } from '@/context/UserProgressContext';

export default function TopicsPage() {
  const { getTopicProgress, isProblemSolved } = useUserProgress();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Explore DSA Topics</h1>
        <p className="text-muted-foreground text-lg">
          Master these core data structures and algorithms through interactive problems and quizzes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic, i) => {
          const tp = getTopicProgress(topic.id);
          const solvedCount = tp.easySolved + tp.mediumSolved + tp.hardSolved + tp.bossSolved;
          const totalProblems = topic.problems.length;
          const progress = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;
          const isCompleted = solvedCount === totalProblems;

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/topics/${topic.id}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-card border p-6 hover:shadow-xl transition-all topic-card h-full">
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl text-white font-bold">{topic.name.charAt(0)}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{topic.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {solvedCount}/{totalProblems} solved
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : progress > 0 ? (
                      <Circle className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-purple-600 text-sm font-medium">
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
