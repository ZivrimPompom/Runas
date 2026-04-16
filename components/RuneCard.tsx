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

  // 3D thickness offsets based on size
  const thickness = size === 'sm' ? '5px' : size === 'md' ? '8px' : '10px';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn('cursor-pointer perspective-1000', className)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={{ 
          duration: 0.8, 
          type: 'spring', 
          stiffness: 120, 
          damping: 20 
        }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front (Revealed) */}
        <div className={cn(
          'absolute inset-0 backface-hidden rounded-xl',
          sizeClasses[size]
        )}>
          {/* 3D Edge/Thickness */}
          <div 
            className="absolute inset-0 bg-stone-300 dark:bg-stone-600 rounded-xl"
            style={{ transform: `translateZ(-${thickness})` }}
          />
          
          {/* Main Face */}
          <div className={cn(
            'absolute inset-0 bg-stone-50 dark:bg-stone-300 border-2 border-stone-300 dark:border-stone-500 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2),0_6px_6px_rgba(0,0,0,0.2)]',
          )}>
            {/* Stone Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] rounded-xl" />
            
            <CardContent className="p-0 flex flex-col items-center justify-center relative z-10">
              <motion.span 
                animate={{ rotate: isInverted ? 180 : 0 }}
                transition={{ duration: 0.7 }}
                className="text-stone-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] inline-block font-bold"
              >
                {rune.symbol}
              </motion.span>
            </CardContent>
          </div>
        </div>

        {/* Back (Hidden) */}
        <div className={cn(
          'absolute inset-0 backface-hidden rounded-xl',
          sizeClasses[size]
        )}
        style={{ transform: 'rotateY(180deg)' }}
        >
          {/* 3D Edge/Thickness */}
          <div 
            className="absolute inset-0 bg-stone-600 dark:bg-stone-800 rounded-xl"
            style={{ transform: `translateZ(-${thickness})` }}
          />

          {/* Main Face */}
          <div className={cn(
            'absolute inset-0 bg-stone-400 dark:bg-stone-600 border-2 border-stone-500 dark:border-stone-700 rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3),0_6px_6px_rgba(0,0,0,0.3)]',
          )}>
            {/* Stone Texture Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')] rounded-xl" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
