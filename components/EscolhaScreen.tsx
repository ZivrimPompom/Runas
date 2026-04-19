'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { RuneCard } from './RuneCard';

interface PoolRune extends Rune {
  initialRotate: number;
}

interface EscolhaScreenProps {
  tipo: string;
}

export function EscolhaScreen({ tipo }: EscolhaScreenProps) {
  const router = useRouter();
  const [pool, setPool] = useState<PoolRune[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(true);

  const getCount = () => {
    if (tipo === 'yesno') return 1;
    return parseInt(tipo) || 1;
  };

  const count = getCount();

  useEffect(() => {
    const shuffled = [...ELDER_FUTHARK]
      .sort(() => 0.5 - Math.random())
      .map((rune) => ({
        ...rune,
        initialRotate: (Math.random() - 0.5) * 30,
      }));
    setPool(shuffled);

    const timer = setTimeout(() => setIsShuffling(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const pickRune = (index: number) => {
    if (selecionadas.includes(index)) return;
    if (selecionadas.length >= count) return;

    const novas = [...selecionadas, index];
    setSelecionadas(novas);

    if (novas.length === count) {
      setTimeout(() => {
        router.push(`/leitura/${tipo}/revelar?r=${novas.join(',')}`);
      }, 500);
    }
  };

  const getLayout = () => {
    if (tipo === '5') {
      return 'grid grid-cols-3 grid-rows-3 gap-2';
    }
    if (tipo === '3') {
      return 'flex flex-wrap justify-center gap-4';
    }
    return 'flex justify-center';
  };

  if (isShuffling) {
    return (
      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
          <div className="w-12 h-12 border-4 border-[#353534] border-t-primary rounded-full animate-spin" />
          <p className="text-[#9a8f80] font-serif italic text-lg">Misturando as pedras sagradas...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto min-h-screen flex flex-col">
      <div className="mb-8 text-center">
        <Link href="/leitura" className="text-primary text-xs hover:underline">
          ← Voltar
        </Link>
        <h2 className="text-xl font-serif text-primary-fixed mt-2">Monte das Runas</h2>
        <p className="text-[#d1c5b4] text-sm mt-1">
          Escolha <span className="text-primary font-bold">{count - selecionadas.length}</span> {' '}
          {count - selecionadas.length === 1 ? 'runa' : 'runas'}
        </p>
      </div>

      {/* Slots */}
      <div className={`flex justify-center gap-3 mb-8 ${getLayout()}`}>
        {Array.from({ length: count }).map((_, i) => {
          const runeIdx = selecionadas[i];
          const selectedRune = runeIdx !== undefined ? pool[runeIdx] : null;
          
          let gridClass = '';
          if (tipo === '5') {
            if (i === 0) gridClass = 'col-start-2 row-start-1';
            if (i === 1) gridClass = 'col-start-1 row-start-2';
            if (i === 2) gridClass = 'col-start-2 row-start-2';
            if (i === 3) gridClass = 'col-start-3 row-start-2';
            if (i === 4) gridClass = 'col-start-2 row-start-3';
          }
          
          return (
            <div
              key={i}
              className={`w-16 h-20 border-2 border-dashed border-[#353534] rounded-lg flex items-center justify-center ${gridClass}`}
            >
              {selectedRune ? (
                <div className="w-full h-full bg-[#353534] rounded-lg shadow-sm" />
              ) : (
                <div className="w-2 h-2 bg-[#353534] rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Pool */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl bg-[#1c1b1b] p-4 rounded-[2rem] border border-[#4e4639]/10 shadow-inner max-h-[45vh] overflow-y-auto">
        {pool.map((rune, idx) => {
          const isSelected = selecionadas.includes(idx);
          if (isSelected) {
            return <div key={`pool-${idx}`} className="w-14 h-20 invisible" />;
          }

          return (
            <div
              key={`pool-${idx}`}
              className="cursor-pointer hover:scale-105 transition-transform"
              style={{ transform: `rotate(${rune.initialRotate}deg)` }}
              onClick={() => pickRune(idx)}
            >
              <RuneCard rune={rune} size="sm" showBack />
            </div>
          );
        })}
      </div>
    </main>
  );
}