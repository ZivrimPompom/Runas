'use client';

import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { useState, useEffect } from 'react';
import { RuneCard } from './RuneCard';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function RuneDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Pre-calculate stable rotations for the dictionary runes
  const [rotations] = useState(() => 
    ELDER_FUTHARK.reduce((acc, rune) => {
      acc[rune.id] = (Math.random() - 0.5) * 25;
      return acc;
    }, {} as Record<string, number>)
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const filteredRunes = ELDER_FUTHARK.filter(rune => 
    rune.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rune.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rune.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">Dicionário de Runas</h2>
        <p className="text-stone-500 italic text-sm">Deslize o mouse sobre as pedras para revelá-las</p>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
        <Input
          placeholder="Buscar runa por nome ou significado..."
          className="pl-10 bg-stone-100/50 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-600 rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[700px] w-full pr-4 bg-stone-50/50 dark:bg-stone-950/20 rounded-[3rem] p-8 border border-stone-100 dark:border-stone-900 shadow-inner overflow-hidden">
        <div className="flex flex-wrap justify-center gap-12 pb-12 px-4">
          {filteredRunes.map((rune) => (
            <DictionaryCard 
              key={rune.id} 
              rune={rune} 
              rotation={rotations[rune.id]} 
              onSelect={() => setSelectedRune(rune)} 
            />
          ))}
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

function DictionaryCard({ rune, rotation, onSelect }: { rune: Rune, rotation: number, onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-center space-y-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="transition-transform duration-500"
        style={{ transform: isHovered ? 'rotate(0deg) scale(1.1)' : `rotate(${rotation}deg)` }}
      >
        <RuneCard
          rune={rune}
          isFlipped={isHovered}
          onClick={onSelect}
          size="md"
          className={cn(
            "relative",
            isHovered ? "z-50" : "z-10"
          )}
        />
      </div>
      <span className={cn(
        "text-[10px] text-stone-500 font-sans uppercase tracking-widest text-center transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        {rune.name}
      </span>
    </div>
  );
}
