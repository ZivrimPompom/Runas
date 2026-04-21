'use client';

import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { useState, useEffect, useRef } from 'react';
import { RuneCard } from './RuneCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FILTER_THEMES = [
  { id: 'all', label: 'Todas', keywords: [] },
  { id: 'amor', label: 'Amor & Relacionamento', keywords: ['Parceria', 'União', 'Equilíbrio', 'Alegria', 'Harmonia', 'Paz', 'Presente'] },
  { id: 'trabalho', label: 'Trabalho & Sucesso', keywords: ['Sucesso', 'Riqueza', 'Posses', 'Vitória', 'Clareza', 'Progresso', 'Energia'] },
  { id: 'saude', label: 'Saúde & Vitalidade', keywords: ['Força', 'Saúde', 'Vitalidade', 'Coragem', 'Cura', 'Fertilidade'] },
  { id: 'protecao', label: 'Proteção', keywords: ['Proteção', 'Defesa', 'Escudo', 'Resistência', 'Continuidade'] },
  { id: 'transformacao', label: 'Transformação & Crise', keywords: ['Crise', 'Mudança', 'Destruição', 'Purificação', 'Despertar', 'Transformação'] },
  { id: 'sabedoria', label: 'Sabedoria & Mente', keywords: ['Sabedoria', 'Conhecimento', 'Comunicação', 'Mente', 'Intuição', 'Sinais', 'Inspiração'] },
  { id: 'destino', label: 'Destino & Espiritualidade', keywords: ['Destino', 'Mistério', 'Segredo', 'Sorte', 'Espiritualidade', 'Herança', 'Tradição'] },
];

export function RuneDictionary() {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null);
  const [hoveredRune, setHoveredRune] = useState<{ rune: Rune, rect: DOMRect, position: 'top' | 'bottom' } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      firstButtonRef.current?.focus();
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4 py-6 space-y-4">
      <div className="text-center space-y-1 pt-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Dicionário de Runas</h2>
        <p className="text-stone-500 italic text-xs">Selecione um tema para filtrar as runas</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {FILTER_THEMES.map((theme, index) => (
          <button
            key={theme.id}
            ref={index === 0 ? (el) => el?.focus() : null}
            autoFocus
            onClick={() => setSelectedTheme(theme.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
              selectedTheme === theme.id
                ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-lg"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            )}
          >
            {theme.label}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-220px)] w-full pr-4 bg-stone-50/50 dark:bg-stone-950/20 rounded-[2rem] p-6 border border-stone-100 dark:border-stone-900 shadow-inner overflow-hidden">
        <div className="flex flex-wrap justify-center gap-6 pb-8 px-4">
          {filteredRunes.map((rune, index) => (
            <DictionaryCard 
              key={rune.id} 
              rune={rune}
              index={index}
              onSelect={() => setSelectedRune(rune)}
              onHover={(rect, position) => setHoveredRune({ rune, rect, position })}
              onLeave={() => setHoveredRune(null)}
            />
          ))}
        </div>
        {filteredRunes.length === 0 && (
          <p className="text-center text-stone-500 py-8">Nenhuma runa encontrada para este tema.</p>
        )}
      </ScrollArea>

      <Dialog open={!!selectedRune} onOpenChange={() => setSelectedRune(null)}>
        <DialogContent className="mystic-glass border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif text-stone-900 dark:text-stone-100 flex items-center gap-4">
              <span className="text-5xl">{selectedRune?.symbol}</span>
              {selectedRune?.name}
            </DialogTitle>
            <DialogDescription className="text-stone-500 dark:text-stone-400 italic">
              {selectedRune?.meaning}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-stone-500 font-sans">Descrição</h4>
              <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                {selectedRune?.description}
              </p>
            </div>

            {selectedRune?.history && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest text-stone-500 font-sans">Contexto Histórico</h4>
                <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400 italic">
                  {selectedRune.history}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-stone-500 font-sans">Palavras-chave</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRune?.keywords.map(kw => (
                  <span key={kw} className="px-2 py-1 bg-stone-200 dark:bg-stone-800 rounded-full text-[10px] uppercase tracking-wider text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {hoveredRune && (
        <div 
          className={cn(
            "fixed z-[100] w-72 bg-surface-container-highest text-primary-fixed text-sm p-4 rounded-xl shadow-2xl border border-primary/20 animate-in fade-in zoom-in-95 duration-200 pointer-events-none text-left",
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
            <span className="text-lg text-primary-fixed">{hoveredRune.rune.name}</span>
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
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-surface-container-highest"></div>
          ) : (
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface-container-highest"></div>
          )}
        </div>
      )}
    </div>
  );
}

function DictionaryCard({ rune, onSelect, index, onHover, onLeave }: { rune: Rune, onSelect: () => void, index: number, onHover: (rect: DOMRect, position: 'top' | 'bottom') => void, onLeave: () => void }) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - cardRect.bottom;
    onHover(cardRect, spaceBelow < 250 ? 'top' : 'bottom');
  };

  return (
    <div 
      className="relative flex flex-col items-center w-20 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      onClick={onSelect}
    >
      <RuneCard
        rune={rune}
        size="sm"
        className="relative mx-auto hover:scale-110 transition-transform duration-200"
      />
      <div className="mt-1 text-center">
        <div className="font-semibold text-xs text-stone-700 dark:text-stone-300">{rune.name}</div>
        <div className="text-[7px] font-normal text-stone-500 normal-case leading-tight">{rune.keywords.slice(0, 2).join(', ')}</div>
      </div>
    </div>
  );
}
