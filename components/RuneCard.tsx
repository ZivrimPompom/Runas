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
  showBack?: boolean;
}

export function RuneCard({ rune, isInverted = false, onClick, className, size = 'md', showBack = false }: RuneCardProps) {
  const sizeClasses = {
    sm: 'w-14 h-20 text-2xl',
    md: 'w-20 h-28 text-3xl',
    lg: 'w-24 h-32 text-4xl',
  };

  if (!rune) return null;

  if (showBack) {
    return (
      <div className={cn('rounded-xl overflow-hidden relative group', sizeClasses[size], className)}>
        <div className={cn(
          'w-full h-full bg-gradient-to-br from-[#2c2a27] to-[#141312] border-2 border-[#5c5344]/40 rounded-xl flex items-center justify-center inner-stone-shadow relative overflow-hidden transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_rgba(233,195,73,0.2)]',
          size === 'sm' ? 'shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : size === 'md' ? 'shadow-[0_4px_12px_rgba(0,0,0,0.4)]' : 'shadow-[0_6px_16px_rgba(0,0,0,0.5)]'
        )}>
          {/* Subtle magical noise overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
          
          {/* Center mystic symbol */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.25] group-hover:opacity-[0.4] transition-opacity duration-500">
            <span className="font-serif text-[#e9c349] rune-glow" style={{ fontSize: size === 'sm' ? '2rem' : size === 'md' ? '3rem' : '4rem' }}>
              ᛟ
            </span>
          </div>

          {/* Glowing edge highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#ffffff]/10 rounded-xl"></div>
          
          {/* Inner border to simulate engraved stone */}
          <div className="absolute inset-1 border border-[#111111]/80 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn('cursor-pointer', className)}
    >
      <div className={cn('relative rounded-xl overflow-hidden', sizeClasses[size])}>
        <div className={cn(
          'w-full h-full bg-gradient-to-br from-[#353534] to-[#1c1b1b] border border-[#4e4639]/20 rounded-xl flex items-center justify-center',
          size === 'sm' ? 'shadow-[0_2px_4px_rgba(0,0,0,0.15)]' : size === 'md' ? 'shadow-[0_3px_6px_rgba(0,0,0,0.18)]' : 'shadow-[0_4px_8px_rgba(0,0,0,0.2)]'
        )}>
          <CardContent className="p-0 flex flex-col items-center justify-center relative z-10">
            <motion.span 
              animate={{ rotate: isInverted ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#e9c349] rune-glow inline-block font-bold"
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
    <div className={cn('rounded-xl overflow-hidden relative group', sizeClasses[size], className)}>
      <div className={cn(
        'w-full h-full bg-gradient-to-br from-[#2c2a27] to-[#141312] border-2 border-[#5c5344]/40 rounded-xl flex items-center justify-center inner-stone-shadow relative overflow-hidden transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_rgba(233,195,73,0.2)]',
        size === 'sm' ? 'shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : size === 'md' ? 'shadow-[0_4px_12px_rgba(0,0,0,0.4)]' : 'shadow-[0_6px_16px_rgba(0,0,0,0.5)]'
      )}>
        {/* Subtle magical noise overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
        
        {/* Center mystic symbol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.25] group-hover:opacity-[0.4] transition-opacity duration-500">
          <span className="font-serif text-[#e9c349] rune-glow" style={{ fontSize: size === 'sm' ? '2rem' : size === 'md' ? '3rem' : '4rem' }}>
            ᛟ
          </span>
        </div>

        {/* Glowing edge highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#ffffff]/10 rounded-xl"></div>
        
        {/* Inner border to simulate engraved stone */}
        <div className="absolute inset-1 border border-[#111111]/80 rounded-lg"></div>
      </div>
    </div>
  );
}