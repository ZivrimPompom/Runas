'use client';

import { useState, useEffect, useRef } from 'react';
import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const FILTER_THEMES = [
  { id: 'all', label: 'Todas', keywords: [] },
  { id: 'amor', label: 'Amor', keywords: ['Parceria', 'União', 'Equilíbrio', 'Alegria', 'Harmonia', 'Paz', 'Presente'] },
  { id: 'trabalho', label: 'Trabalho', keywords: ['Sucesso', 'Riqueza', 'Posses', 'Vitória', 'Clareza', 'Progresso', 'Energia'] },
  { id: 'saude', label: 'Saúde', keywords: ['Força', 'Saúde', 'Vitalidade', 'Coragem', 'Cura', 'Fertilidade'] },
  { id: 'protecao', label: 'Proteção', keywords: ['Proteção', 'Defesa', 'Escudo', 'Resistência', 'Continuidade'] },
  { id: 'transformacao', label: 'Transformação', keywords: ['Crise', 'Mudança', 'Destruição', 'Purificação', 'Despertar', 'Transformação'] },
  { id: 'sabedoria', label: 'Sabedoria', keywords: ['Sabedoria', 'Conhecimento', 'Comunicação', 'Mente', 'Intuição', 'Sinais', 'Inspiração'] },
  { id: 'destino', label: 'Destino', keywords: ['Destino', 'Mistério', 'Segredo', 'Sorte', 'Espiritualidade', 'Herança', 'Tradição'] },
];

export function DicionarioScreen() {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null);
  const [hoveredRune, setHoveredRune] = useState<Rune | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      firstButtonRef.current?.focus();
    }, 300);
  }, []);

  const currentTheme = FILTER_THEMES.find(t => t.id === selectedTheme);
  
  const filteredRunes = selectedTheme === 'all' 
    ? ELDER_FUTHARK 
    : ELDER_FUTHARK.filter(rune => 
        currentTheme?.keywords?.some(kw => rune.keywords.includes(kw))
      );

  if (!isMounted) return null;

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-8 text-center md:text-left">
        <span className="text-primary tracking-[0.2em] uppercase font-bold text-xs block mb-2">Compêndio Sagrado</span>
        <h2 className="text-3xl font-serif text-[#e5e2e1] leading-tight">O Futhark Antigo</h2>
        <p className="text-[#d1c5b4] max-w-2xl mt-2 leading-relaxed italic text-sm">
          Descifre o sussurro das pedras. Cada glifo é uma chave para as forças primordiais.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_THEMES.map((theme) => (
          <button
            key={theme.id}
            ref={theme.id === selectedTheme ? firstButtonRef : null}
            onClick={() => setSelectedTheme(theme.id)}
            className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider transition-all duration-300 ${
              selectedTheme === theme.id
                ? 'bg-primary text-[#241a00] shadow-[0_0_15px_rgba(233,195,73,0.4)]'
                : 'bg-[#2a2a2a] text-[#d1c5b4] hover:bg-[#353534] border border-[#4e4639]/20'
            }`}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-[#9a8f80] mb-4">
        {filteredRunes.length} {filteredRunes.length === 1 ? 'runa encontrada' : 'runas encontradas'}
      </p>

      {/* Rune Grid - smaller layout */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-3">
        {filteredRunes.map((rune, idx) => (
          <div
            key={rune.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredRune(rune)}
            onMouseLeave={() => setHoveredRune(null)}
            onClick={() => setSelectedRune(rune)}
          >
            {/* Card - scaled down */}
            <div
              className="w-full aspect-[3/4] rounded-lg border border-[#4e4639]/10 shadow-xl flex items-center justify-center transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-primary/20"
              style={{ 
                transform: `rotate(${(idx % 3) - 1}deg)`,
                backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(53, 53, 52, 0.4), rgba(14, 14, 14, 0.9))'
              }}
            >
              <span className="text-2xl lg:text-3xl text-primary rune-glow opacity-80 group-hover:opacity-100 transition-opacity">
                {rune.symbol}
              </span>

              {/* Hover Overlay */}
              {hoveredRune?.id === rune.id && (
                <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 rounded-lg p-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary mb-1">{rune.name}</span>
                  <span className="material-symbols-outlined text-[#e5e2e1] text-sm opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>
                    info
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Quote */}
      <div className="mt-16 p-8 border border-[#4e4639]/10 rounded-xl bg-[#0e0e0e] relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="text-[12rem] font-serif opacity-10">ᛟ</span>
        </div>
        <div className="relative z-10">
          <p className="text-[#d1c5b4] italic text-sm mb-2">"O conhecimento é a luz que brilha além da tumba."</p>
          <cite className="text-primary tracking-widest text-[10px]">— O Hávamál</cite>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRune} onOpenChange={() => setSelectedRune(null)}>
        <DialogContent className="max-w-md bg-[#201f1f] border-[#4e4639]/20 text-[#e5e2e1]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-[#e5e2e1] flex items-center gap-3">
              <span className="text-4xl text-primary">{selectedRune?.symbol}</span>
              {selectedRune?.name}
            </DialogTitle>
            <DialogDescription className="text-[#d1c5b4] italic">
              {selectedRune?.meaning}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3 max-h-[50vh] overflow-y-auto pr-2">
            <div className="space-y-1">
              <h4 className="text-[10px] uppercase tracking-widest text-[#9a8f80]">Descrição</h4>
              <p className="text-xs leading-relaxed text-[#e5e2e1]">
                {selectedRune?.description}
              </p>
            </div>

            {selectedRune?.history && (
              <div className="space-y-1">
                <h4 className="text-[10px] uppercase tracking-widest text-[#9a8f80]">História</h4>
                <p className="text-[10px] leading-relaxed text-[#9a8f80] italic">
                  {selectedRune.history}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <h4 className="text-[10px] uppercase tracking-widest text-[#9a8f80]">Palavras-chave</h4>
              <div className="flex flex-wrap gap-1">
                {selectedRune?.keywords.map((kw) => (
                  <span 
                    key={kw} 
                    className="px-2 py-0.5 bg-[#353534] rounded-full text-[10px] text-[#d1c5b4]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}