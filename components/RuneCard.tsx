'use client';

import { Rune } from '@/lib/runes';
import { motion } from 'motion/react';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RuneCardProps {
  rune: Rune | null;
  isFlipped?: boolean;
  isInverted?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RuneCard({ rune, isInverted = false, onClick, className, size = 'md' }: RuneCardProps) {
  const sizeClasses = {
    sm: 'w-14 h-20 text-2xl',
    md: 'w-20 h-28 text-3xl',
    lg: 'w-24 h-32 text-4xl',
  };

  if (!rune) return null;

  return (
    <motion.div
      whileHover={{ 
        rotate: [0, -5, 5, -3, 3, 0],
        transition: { duration: 0.6 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn('cursor-pointer', className)}
    >
      <div className={cn('relative rounded-xl overflow-hidden', sizeClasses[size])}>
        <div className={cn(
          'w-full h-full bg-stone-50 dark:bg-stone-300 border-2 border-stone-300 dark:border-stone-500 rounded-xl flex items-center justify-center',
          size === 'sm' ? 'shadow-[0_2px_4px_rgba(0,0,0,0.15)]' : size === 'md' ? 'shadow-[0_3px_6px_rgba(0,0,0,0.18)]' : 'shadow-[0_4px_8px_rgba(0,0,0,0.2)]'
        )}>
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] rounded-xl" />
          <CardContent className="p-0 flex flex-col items-center justify-center relative z-10">
            <motion.span 
              animate={{ rotate: isInverted ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-stone-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] inline-block font-bold"
            >
              {rune.symbol}
            </motion.span>
          </CardContent>
        </div>
      </div>
    </motion.div>
  );
}

export function RuneCardBack({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-14 h-20',
    md: 'w-20 h-28',
    lg: 'w-24 h-32',
  };

  return (
    <div className={cn('rounded-xl overflow-hidden', sizeClasses[size], className)}>
      <div className={cn(
        'w-full h-full bg-stone-400 dark:bg-stone-600 border-2 border-stone-500 dark:border-stone-700 rounded-xl flex items-center justify-center',
        size === 'sm' ? 'shadow-[0_2px_4px_rgba(0,0,0,0.15)]' : size === 'md' ? 'shadow-[0_3px_6px_rgba(0,0,0,0.18)]' : 'shadow-[0_4px_8px_rgba(0,0,0,0.2)]'
      )}>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] rounded-xl" />
      </div>
    </div>
  );
}
