'use client';

import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { useState, useEffect } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = FILTER_THEMES.find(t => t.id === selectedTheme);
  
  const filteredRunes = currentTheme?.id === 'all' 
    ? ELDER_FUTHARK 
    : ELDER_FUTHARK.filter(rune => 
        rune.keywords.some(kw => currentTheme.keywords.includes(kw))
      );

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">Dicionário de Runas</h2>
        <p className="text-stone-500 italic text-sm">Selecione um tema para filtrar as runas</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {FILTER_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              selectedTheme === theme.id
                ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-lg"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            )}
          >
            {theme.label}
          </button>
        ))}
      </div>

      <ScrollArea className="h-[700px] w-full pr-4 bg-stone-50/50 dark:bg-stone-950/20 rounded-[3rem] p-8 border border-stone-100 dark:border-stone-900 shadow-inner overflow-hidden">
        <div className="flex flex-wrap justify-center gap-8 pb-16 px-6 pt-4">
          {filteredRunes.map((rune) => (
            <DictionaryCard 
              key={rune.id} 
              rune={rune}
              onSelect={() => setSelectedRune(rune)} 
            />
          ))}
        </div>
        {filteredRunes.length === 0 && (
          <p className="text-center text-stone-500 py-8">Nenhuma runa encontrada para este tema.</p>
        )}
      </ScrollArea>
        </div>
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
    </div>
  );
}

function DictionaryCard({ rune, onSelect }: { rune: Rune, onSelect: () => void }) {
  return (
    <div className="flex flex-col items-center w-24">
      <RuneCard
        rune={rune}
        onClick={onSelect}
        size="sm"
        className="relative mx-auto"
      />
      <div className="mt-2 text-center">
        <div className="font-semibold text-xs text-stone-700 dark:text-stone-300">{rune.name}</div>
        <div className="text-[7px] font-normal text-stone-500 normal-case leading-tight">{rune.keywords.slice(0, 2).join(', ')}</div>
      </div>
    </div>
  );
}
