'use client';

import { LEVEL_THRESHOLDS } from '@/types';
import { cn } from '@/lib/utils';

interface XpBarProps {
  xp: number;
  showLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function XpBar({ xp, showLevel = true, size = 'md', className }: XpBarProps) {
  const level = LEVEL_THRESHOLDS.getLevel(xp);
  const progress = LEVEL_THRESHOLDS.getProgressToNextLevel(xp);
  const xpForNextLevel = 100;
  const percentage = (progress / xpForNextLevel) * 100;

  const sizeClasses = {
    sm: 'h-2 text-xs',
    md: 'h-3 text-sm',
    lg: 'h-4 text-base',
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {showLevel && (
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="font-medium text-xp">Level {level}</span>
          <span>{progress} / {xpForNextLevel} XP</span>
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 xp-progress rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
