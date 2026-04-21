'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { cn } from '@/lib/utils';

export function HomeScreen() {
  const [runaDoDia, setRunaDoDia] = useState<Rune | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if we already have a rune of the day saved
    const savedRuneIndex = localStorage.getItem('runaDoDiaIndex');
    let runeIndex: number;
    
    if (savedRuneIndex) {
      runeIndex = parseInt(savedRuneIndex);
    } else {
      runeIndex = Math.floor(Math.random() * ELDER_FUTHARK.length);
      localStorage.setItem('runaDoDiaIndex', runeIndex.toString());
    }
    
    setRunaDoDia(ELDER_FUTHARK[runeIndex]);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="pt-20 pb-12 px-4 max-w-2xl mx-auto flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-6">
        <h2 className="font-serif text-primary-fixed text-3xl md:text-4xl mb-2 tracking-wide">Oráculo de Runas</h2>
        <p className="text-[#d1c5b4] text-sm leading-relaxed max-w-lg mx-auto italic">
          Desvende os mistérios do antigo alfabeto nórdico.
        </p>
      </section>

      {/* Main Buttons - maior destaque */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-md mb-4 px-4">
        {/* LEITURA Button */}
        <Link 
          href="/leitura"
          className="group relative h-56 sm:h-48 bg-surface-container-low rounded-xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-xl border border-[#4e4639]/10 animate-pulse-amber"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxFOJ872MBqaY_erjMzAddNv-HfmvxKR8bvVcUY76hY_5MP7sPupRcEkW2doBRc_UJ66TIPrellyjp96GojMHFl26hFAWhLJZloR6vmiM2nx10nJEABRBVXSw4vVpUhXa5KXAiyQfX62yqMD6vhWPd1XM_chzd_1N3hbjCu09Sq6-GyuqLfewlA2FCZhzZ877RWBFpP1ityCh805msRrMiU42XeWgPCjMl9HhjTwH-8P4mcV1Ga6JFvkzDXeICiJ0cw9Ah5qj4ZtM')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined text-primary text-5xl sm:text-5xl mb-3 drop-shadow-md">auto_awesome</span>
            <h3 className="text-xl sm:text-xl font-serif text-[#e5e2e1] tracking-[0.2em] font-medium drop-shadow-md uppercase">LEITURA</h3>
          </div>
        </Link>

        {/* DICIONÁRIO Button */}
        <Link 
          href="/dicionario"
          className="group relative h-56 sm:h-48 bg-surface-container-low rounded-xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-xl border border-[#4e4639]/10 animate-pulse-amber"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBV27soek7ivMn7HrhzYjS73qrDmYsI2Pwz5LX646f0dZfM1AgR5R2VMsWto6uIKVK0qFhiLL1wUEh0xfOlNGfsFwGJXXTjj8OpR6z-moksDgBDE23UPiKD0EEK2qFPC9KkGknTiBIEabRSQo-DW1m8NBkcR6xXxt-DAuAF93WZ6XptmmRTLCLKCmLJbJRlgQhksR5hyNGTT9PIkGUDLSBxD41MTIiWrC98SVH7Ihbr5O-bUuzTVR9j2ws5g2a4se6tbtuYePLBw_Y')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined text-primary text-5xl sm:text-5xl mb-3 drop-shadow-md">menu_book</span>
            <h3 className="text-xl sm:text-xl font-serif text-[#e5e2e1] tracking-[0.2em] font-medium drop-shadow-md uppercase">DICIONÁRIO</h3>
          </div>
        </Link>
      </div>

      {/* Daily Rune - embaixo numa linha */}
      {runaDoDia && (
        <section 
          className="w-full max-w-md mt-4 bg-surface-container rounded-xl p-3 border border-[#4e4639]/10 relative amber-glow shadow-lg cursor-pointer transition-colors hover:bg-surface-container-high"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="flex flex-row items-center gap-4 px-2">
            <div className="w-12 h-12 flex-shrink-0 bg-surface-container-highest rounded-lg flex items-center justify-center border border-primary/20">
              <span className="text-primary text-2xl font-serif leading-none mt-1">
                {runaDoDia.symbol}
              </span>
            </div>
            <div className="flex-1 flex flex-row items-center justify-between gap-3 overflow-hidden">
              <div className="flex flex-col justify-center min-w-[80px]">
                <h4 className="text-[10px] font-serif tracking-[0.2em] text-[#e9c349]/90 mb-0.5">RUNA DO DIA</h4>
                <h5 className="text-sm font-serif text-[#ffe088] font-bold leading-tight truncate">{runaDoDia.name}</h5>
              </div>
              <div className="h-8 w-px bg-[#e9c349]/20 hidden sm:block"></div>
              <p className="text-[#d1c5b4] text-xs line-clamp-2 sm:line-clamp-3 text-right italic">
                {runaDoDia.meaning}
              </p>
            </div>
          </div>
          
          {/* Tooltip com significado completo */}
          {showTooltip && (
            <div className={cn(
              "absolute left-1/2 -translate-x-1/2 z-50 w-72 bg-[#201f1f] text-primary-fixed text-sm p-4 rounded-xl shadow-2xl border border-primary/20 bottom-full mb-3 origin-bottom animate-in fade-in zoom-in-95 duration-200"
            )}>
              <div className="font-serif font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl text-primary">{runaDoDia.symbol}</span>
                <span className="text-lg">{runaDoDia.name}</span>
              </div>
              <div className="text-[#d1c5b4] text-xs leading-relaxed mb-3">
                {runaDoDia.description}
              </div>
              <div className="flex flex-wrap gap-1">
                {runaDoDia.keywords.map(kw => (
                  <span key={kw} className="px-1.5 py-0.5 bg-background/50 rounded-md text-[9px] uppercase tracking-wider text-primary/80 border border-primary/10">
                    {kw}
                  </span>
                ))}
              </div>
              {/* Seta do tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#201f1f]"></div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}