'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Trophy, Zap, Target, BookOpen, Sparkles } from 'lucide-react';
import { useUserProgress } from '@/context/UserProgressContext';
import { topics } from '@/lib/data';

export default function HomePage() {
  const { progress } = useUserProgress();
  const totalProblems = topics.reduce((acc, t) => acc + t.problems.length, 0);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master DSA Through{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Gamified Learning
              </span>
            </h1>
            
            <p className="text-xl text-purple-200 mb-8 max-w-2xl">
              Learn Data Structures and Algorithms in an engaging, personalized way. 
              Solve problems, earn XP, unlock achievements, and level up your coding skills!
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/topics"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-900 font-semibold hover:bg-purple-50 transition-colors"
              >
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {[
              { icon: BookOpen, label: 'Topics', value: topics.length },
              { icon: Code2, label: 'Problems', value: totalProblems },
              { icon: Trophy, label: 'Quizzes', value: topics.length * 10 },
              { icon: Zap, label: 'XP to Earn', value: totalProblems * 25 },
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <stat.icon className="w-8 h-8 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold">{stat.value}+</div>
                <div className="text-purple-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Learn With DSA Quest?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines the best of gamification with comprehensive DSA education
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: 'Adaptive Learning',
              description: 'Problems adjust to your skill level. Start from basics and progress to advanced concepts at your own pace.',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: Trophy,
              title: 'Gamified Experience',
              description: 'Earn XP, unlock badges, maintain streaks, and compete on leaderboards. Learning has never been this fun!',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Zap,
              title: 'AI-Powered Hints',
              description: 'Get intelligent hints that guide you step-by-step without giving away the answer. Learn through discovery.',
              color: 'from-amber-500 to-orange-500',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-card border p-8 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Topics Preview */}
      <section className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Topics</h2>
            <p className="text-muted-foreground">Master these core DSA concepts</p>
          </div>
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.slice(0, 4).map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/topics/${topic.id}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-card border p-6 hover:shadow-xl transition-all topic-card">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}>
                    <span className="text-2xl">{topic.icon.charAt(0)}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{topic.problems.length} problems</p>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-12 text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-purple-200 mb-8 max-w-xl mx-auto">
              Join thousands of learners mastering DSA through our gamified platform. 
              Your coding adventure begins now!
            </p>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-900 font-semibold hover:bg-purple-50 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
