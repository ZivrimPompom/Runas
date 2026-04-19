'use client';

import { Rune } from '@/lib/runes';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RuneCardProps {
  rune: Rune | null;
  isFlipped?: boolean;
  isInverted?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RuneCard({ rune, isFlipped = true, isInverted = false, onClick, className, size = 'md' }: RuneCardProps) {
  const sizeClasses = {
    sm: 'w-14 h-20 text-2xl',
    md: 'w-24 h-32 text-4xl',
    lg: 'w-32 h-44 text-6xl',
  };

  if (!rune) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn('cursor-pointer', className)}
    >
      <div className={cn('relative rounded-xl overflow-hidden', sizeClasses[size])}>
        {/* Back (Hidden) - shown when not flipped */}
        <div className={cn(
          'absolute inset-0 transition-opacity duration-300',
          isFlipped ? 'opacity-0' : 'opacity-100'
        )}>
          <div className={cn(
            'w-full h-full bg-stone-400 dark:bg-stone-600 border-2 border-stone-500 dark:border-stone-700 rounded-xl flex items-center justify-center shadow-lg',
            size === 'sm' ? 'shadow-[0_4px_8px_rgba(0,0,0,0.2)]' : size === 'md' ? 'shadow-[0_6px_12px_rgba(0,0,0,0.25)]' : 'shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
          )}>
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] rounded-xl" />
          </div>
        </div>

        {/* Front (Revealed) - shown when flipped */}
        <div className={cn(
          'absolute inset-0 transition-opacity duration-300',
          isFlipped ? 'opacity-100' : 'opacity-0'
        )}>
          <div className={cn(
            'w-full h-full bg-stone-50 dark:bg-stone-300 border-2 border-stone-300 dark:border-stone-500 rounded-xl flex items-center justify-center shadow-lg',
            size === 'sm' ? 'shadow-[0_4px_8px_rgba(0,0,0,0.2)]' : size === 'md' ? 'shadow-[0_6px_12px_rgba(0,0,0,0.25)]' : 'shadow-[0_8px_16px_rgba(0,0,0,0.3)]'
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
      </div>
    </motion.div>
  );
}
