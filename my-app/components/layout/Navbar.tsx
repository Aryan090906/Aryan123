'use client';

import Link from 'next/link';
import { useUserProgress } from '@/context/UserProgressContext';
import { LEVEL_THRESHOLDS } from '@/types';
import { Trophy, Flame, Target, BookOpen, BarChart3, Home, Zap, Calendar } from 'lucide-react';

export function Navbar() {
  const { progress } = useUserProgress();
  const level = LEVEL_THRESHOLDS.getLevel(progress.xp);

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { href: '/topics', icon: BookOpen, label: 'Topics' },
    { href: '/daily', icon: Calendar, label: 'Daily' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Codexium
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Stats & Auth */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Flame className="w-4 h-4 text-amber-500 streak-flame" />
              <span className="text-sm font-semibold text-amber-600">{progress.streak}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-purple-600">Lvl {level}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-600">{progress.xp} XP</span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
