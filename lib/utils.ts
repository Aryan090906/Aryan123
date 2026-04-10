import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'text-easy bg-easy/10 border-easy/30';
    case 'medium':
      return 'text-medium bg-medium/10 border-medium/30';
    case 'hard':
      return 'text-hard bg-hard/10 border-hard/30';
    case 'boss':
      return 'text-boss bg-boss/10 border-boss/30';
    default:
      return 'text-muted-foreground bg-muted border-muted';
  }
}

export function getDifficultyGradient(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'from-green-500 to-green-600';
    case 'medium':
      return 'from-yellow-500 to-yellow-600';
    case 'hard':
      return 'from-red-500 to-red-600';
    case 'boss':
      return 'from-purple-500 to-purple-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateStreak(lastActiveDate: string): number {
  const lastActive = new Date(lastActiveDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastActiveStr = lastActive.toDateString();
  const todayStr = today.toDateString();
  const yesterdayStr = yesterday.toDateString();
  
  if (lastActiveStr === todayStr) {
    return -1; // Already active today
  }
  if (lastActiveStr === yesterdayStr) {
    return 0; // Continue streak
  }
  return -2; // Reset streak
}

export function generateRandomAvatar(seed: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}
