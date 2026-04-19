'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ELDER_FUTHARK, Rune } from '@/lib/runes';

export function HomeScreen() {
  const [runaDoDia, setRunaDoDia] = useState<Rune | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const randomIndex = Math.floor(Math.random() * ELDER_FUTHARK.length);
    setRunaDoDia(ELDER_FUTHARK[randomIndex]);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="pt-24 pb-28 px-6 max-w-4xl mx-auto flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-8 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 blur-[60px] rounded-full"></div>
        <h2 className="font-serif text-primary-fixed text-4xl md:text-5xl mb-3 tracking-wide">Oráculo de Runas</h2>
        <p className="text-[#d1c5b4] text-base md:text-lg leading-relaxed max-w-2xl mx-auto italic">
          Desvende os mistérios do antigo alfabeto nórdico.
        </p>
      </section>

      {/* Main Buttons with Images - like original Stitch design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* LEITURA Button */}
        <Link 
          href="/leitura"
          className="group relative aspect-[2/1] sm:aspect-video md:aspect-[4/3] bg-surface-container-low rounded-lg overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl border border-[#4e4639]/10"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxFOJ872MBqaY_erjMzAddNv-HfmvxKR8bvVcUY76hY_5MP7sPupRcEkW2doBRc_UJ66TIPrellyjp96GojMHFl26hFAWhLJZloR6vmiM2nx10nJEABRBVXSw4vVpUhXa5KXAiyQfX62yqMD6vhWPd1XM_chzd_1N3hbjCu09Sq6-GyuqLfewlA2FCZhzZ877RWBFpP1ityCh805msRrMiU42XeWgPCjMl9HhjTwH-8P4mcV1Ga6JFvkzDXeICiJ0cw9Ah5qj4ZtM')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:drop-shadow-[0_0_12px_rgba(233,195,73,0.8)] transition-all">auto_awesome</span>
            <h3 className="text-xl md:text-2xl font-serif text-[#e5e2e1] tracking-[0.2em] mb-1">LEITURA</h3>
            <p className="text-[10px] md:text-xs font-serif text-[#9a8f80] tracking-widest uppercase opacity-80">Consulte o Destino</p>
          </div>
        </Link>

        {/* DICIONÁRIO Button */}
        <Link 
          href="/dicionario"
          className="group relative aspect-[2/1] sm:aspect-video md:aspect-[4/3] bg-surface-container-low rounded-lg overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-2xl border border-[#4e4639]/10 md:mt-8"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBV27soek7ivMn7HrhzYjS73qrDmYsI2Pwz5LX646f0dZfM1AgR5R2VMsWto6uIKVK0qFhiLL1wUEh0xfOlNGfsFwGJXXTjj8OpR6z-moksDgBDE23UPiKD0EEK2qFPC9KkGknTiBIEabRSQo-DW1m8NBkcR6xXxt-DAuAF93WZ6XptmmRTLCLKCmLJbJRlgQhksR5hyNGTT9PIkGUDLSBxD41MTIiWrC98SVH7Ihbr5O-bUuzTVR9j2ws5g2a4se6tbtuYePLBw_Y')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:drop-shadow-[0_0_12px_rgba(233,195,73,0.8)] transition-all">menu_book</span>
            <h3 className="text-xl md:text-2xl font-serif text-[#e5e2e1] tracking-[0.2em] mb-1">DICIONÁRIO</h3>
            <p className="text-[10px] md:text-xs font-serif text-[#9a8f80] tracking-widest uppercase opacity-80">Conheça o Futhark</p>
          </div>
        </Link>
      </div>

      {/* Daily Rune */}
      {runaDoDia && (
        <section className="mt-10 w-full max-w-lg bg-surface-container rounded-xl p-5 border border-[#4e4639]/10 relative amber-glow">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-20 h-24 flex-shrink-0 bg-surface-container-highest rounded-lg flex items-center justify-center shadow-inner border border-primary/20">
              <span className="text-primary text-4xl font-serif">
                {runaDoDia.symbol}
              </span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xs font-serif tracking-widest text-primary mb-1">RUNA DO DIA</h4>
              <h5 className="text-lg font-serif mb-2 text-primary-fixed">{runaDoDia.name}</h5>
              <p className="text-[#d1c5b4] text-sm">{runaDoDia.meaning}</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}