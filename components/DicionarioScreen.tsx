'use client';

import { useState, useEffect, useRef } from 'react';
import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

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
  const [hoveredRune, setHoveredRune] = useState<{ rune: Rune, rect: DOMRect, position: 'top' | 'bottom' } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const searchResults = searchTerm.trim() === '' 
    ? [] 
    : ELDER_FUTHARK.filter(rune => 
        rune.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (!isMounted) return null;

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-primary tracking-[0.2em] uppercase font-bold text-xs block mb-2">Compêndio Sagrado</span>
          <h2 className="text-3xl font-serif text-[#e5e2e1] leading-tight">O Futhark Antigo</h2>
          <p className="text-[#d1c5b4] max-w-2xl mt-2 leading-relaxed italic text-sm">
            Decifre o sussurro das pedras. Cada glifo é uma chave para as forças primordiais.
          </p>
        </div>

        {/* Search Bar with Pulldown */}
        <div className="relative w-full max-w-xs mx-auto md:mx-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8f80] text-sm">search</span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar runa por nome..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-[#1c1b1b] border border-[#4e4639]/30 rounded-lg py-2 pl-9 pr-4 text-xs text-[#e5e2e1] focus:border-primary outline-none transition-all"
            />
          </div>

          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#201f1f] border border-[#4e4639]/30 rounded-lg shadow-2xl z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="max-h-60 overflow-y-auto">
                {searchResults.map((rune) => (
                  <button
                    key={rune.id}
                    onClick={() => {
                      setSelectedRune(rune);
                      setSearchTerm('');
                      setShowSearchDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#2a2a2a] text-left transition-colors border-b border-[#4e4639]/10 last:border-0"
                  >
                    <span className="text-lg text-primary">{rune.symbol}</span>
                    <span className="text-xs font-serif text-[#e5e2e1] uppercase tracking-wider">{rune.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8" onClick={() => setShowSearchDropdown(false)}>
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
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-3" onClick={() => setShowSearchDropdown(false)}>
        {filteredRunes.map((rune, idx) => (
          <div
            key={rune.id}
            className="relative group cursor-pointer"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const spaceBelow = window.innerHeight - rect.bottom;
              setHoveredRune({ rune, rect, position: spaceBelow < 250 ? 'top' : 'bottom' });
            }}
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
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Quote */}
      <div className="mt-16 text-center opacity-40">
        <p className="font-serif italic text-xs tracking-widest text-[#d1c5b4] mb-1">"O conhecimento é a luz que brilha além da tumba."</p>
        <cite className="text-primary tracking-[0.3em] uppercase font-serif text-[9px] block">— O Hávamál</cite>
      </div>

      {/* Detail Dialog */}
      <div onClick={() => setShowSearchDropdown(false)}>
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
      </div>

      {hoveredRune && (
        <div 
          className={cn(
            "fixed z-[100] w-72 bg-[#201f1f] text-primary-fixed text-sm p-4 rounded-xl shadow-2xl border border-primary/20 animate-in fade-in zoom-in-95 duration-200 pointer-events-none text-left",
            hoveredRune.position === 'top' ? "origin-bottom" : "origin-top"
          )}
          style={{
            left: hoveredRune.rect.left + hoveredRune.rect.width / 2,
            transform: `translateX(-50%) ${hoveredRune.position === 'top' ? 'translateY(-100%)' : ''}`,
            top: hoveredRune.position === 'bottom' ? hoveredRune.rect.bottom + 12 : hoveredRune.rect.top - 12
          }}
        >
          <div className="font-serif font-bold mb-2 flex items-center gap-2">
            <span className="text-2xl text-primary">{hoveredRune.rune.symbol}</span>
            <span className="text-lg">{hoveredRune.rune.name}</span>
          </div>
          <div className="text-[#d1c5b4] text-xs leading-relaxed mb-3">
            {hoveredRune.rune.description}
          </div>
          <div className="flex flex-wrap gap-1">
            {hoveredRune.rune.keywords.map(kw => (
              <span key={kw} className="px-1.5 py-0.5 bg-background/50 rounded-md text-[9px] uppercase tracking-wider text-primary/80 border border-primary/10">
                {kw}
              </span>
            ))}
          </div>
          {/* Seta do tooltip */}
          {hoveredRune.position === 'bottom' ? (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-[#201f1f]"></div>
          ) : (
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#201f1f]"></div>
          )}
        </div>
      )}
    </main>
  );
}