'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { RuneCard } from './RuneCard';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

interface RevelarScreenProps {
  tipo: string;
}

const cruzNordicaLabels = ['O Destino', 'O Passado', 'O Agora', 'O Desafio', 'A Raiz'];
const tresRunasLabels = ['Passado', 'Presente', 'Futuro'];

export function RevelarScreen({ tipo }: RevelarScreenProps) {
  const searchParams = useSearchParams();
  const [runas, setRunas] = useState<Rune[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [isInverted, setIsInverted] = useState<boolean[]>([]);
  const [pergunta, setPergunta] = useState('');
  const [interpretacao, setInterpretacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const rParam = searchParams.get('r');
    if (rParam) {
      const indices = rParam.split(',').map(Number);
      const selectedRunas = indices.map((i) => ELDER_FUTHARK[i]);
      setRunas(selectedRunas);
      setIsFlipped(new Array(selectedRunas.length).fill(false));
      setIsInverted(
        selectedRunas.map(() => Math.random() > 0.7)
      );
    }
  }, [searchParams]);

  const flipAll = () => {
    setIsFlipped(new Array(runas.length).fill(true));
    if (pergunta.trim()) {
      getInterpretacao();
    }
  };

  const getInterpretacao = async () => {
    if (!GROQ_API_KEY) {
      setInterpretacao('Chave de API não configurada.');
      return;
    }

    setIsLoading(true);
    try {
      const count = runas.length;
      let positions: string[];
      if (tipo === '5') {
        positions = cruzNordicaLabels;
      } else if (tipo === '3') {
        positions = tresRunasLabels;
      } else {
        positions = ['A Resposta'];
      }

      const runeDetails = runas
        .map((r, i) => `${positions[i]}: ${r.name}${isInverted[i] ? ' (Invertida)' : ''}`)
        .join('\n');

      const prompt = `Você é um mestre oraculista de runas nórdicas (Elder Futhark). 
O consulente pergunta: "${pergunta || 'O que as runas têm a me dizer?'}"

Runas Sorteadas:
${runeDetails}

Forneça uma interpretação mística, profunda e arquetípica em português brasileiro.
- Use tom solene, poético e inspirador.
- Considere runas invertidas como energias bloqueadas ou ocultas.
- Divida a resposta em seções claras.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message);
      setInterpretacao(data.choices?.[0]?.message?.content || 'Não foi possível obter interpretação.');
    } catch (error) {
      setInterpretacao(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getLayout = () => {
    if (tipo === '5') {
      return 'grid grid-cols-3 grid-rows-3 gap-4';
    }
    if (tipo === '3') {
      return 'grid grid-cols-3 gap-8';
    }
    return 'flex justify-center';
  };

  const getGridClass = (index: number) => {
    if (tipo !== '5') return '';
    if (index === 0) return 'col-start-2 row-start-1';
    if (index === 1) return 'col-start-1 row-start-2';
    if (index === 2) return 'col-start-2 row-start-2';
    if (index === 3) return 'col-start-3 row-start-2';
    if (index === 4) return 'col-start-2 row-start-3';
    return '';
  };

  const labels = tipo === '5' ? cruzNordicaLabels : tipo === '3' ? tresRunasLabels : ['A Resposta'];

  return (
    <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto min-h-screen">
      {/* Title */}
      <div className="text-center mb-8">
        <Link href={`/leitura/${tipo}`} className="text-primary text-xs hover:underline">
          ← Voltar
        </Link>
        <h2 className="text-2xl font-serif text-primary-fixed mt-2">
          {tipo === '5' ? 'Cruz Nórdica' : tipo === '3' ? 'Três Runas' : tipo === 'yesno' ? 'Sim ou Não' : 'Uma Runa'}
        </h2>
      </div>

      {/* Rune Layout */}
      <div className={`${getLayout()} mb-8`}>
        {runas.map((rune, index) => {
          const gridClass = getGridClass(index);
          return (
            <div key={index} className={`flex flex-col items-center gap-2 ${gridClass}`}>
              <span className="text-[10px] uppercase tracking-widest text-[#d1c5b4] font-bold">
                {labels[index]}
              </span>
              <RuneCard
                rune={rune}
                isInverted={isInverted[index]}
                onClick={() => {
                  const newFlipped = [...isFlipped];
                  newFlipped[index] = true;
                  setIsFlipped(newFlipped);
                }}
                size={tipo === '5' ? 'sm' : 'md'}
                showBack={!isFlipped[index]}
              />
              {isFlipped[index] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-xs font-serif text-primary">
                    {isInverted[index] ? `Invertida: ${rune.name}` : rune.meaning}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-[#d1c5b4] mb-4 ml-1">
            Sua Intenção <span className="text-primary">*</span>
          </label>
          <textarea
            className="w-full bg-[#0e0e0e] border-2 border-[#4e4639] rounded-xl inner-stone-shadow text-[#e5e2e1] font-serif text-lg p-6 resize-none focus:border-primary focus:outline-none transition-colors"
            placeholder="Digite aqui sua pergunta para o oráculo..."
            rows={3}
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
          />
          <p className="text-[10px] italic text-stone-600 mt-2 leading-relaxed max-w-md">
            O oráculo responde melhor a perguntas abertas e intenções claras vindas do fundo de sua alma.
          </p>
        </div>

        {/* Reveal Button */}
        <div className="flex justify-center">
          <button
            onClick={flipAll}
            className="relative group px-12 py-6 bg-[#c5a12a] text-[#241a00] font-serif tracking-[0.3em] font-bold uppercase rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              REVELAR E ANALISAR
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
            </span>
          </button>
        </div>
      </div>

      {/* Interpretation */}
      {interpretacao && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-6 rounded-2xl bg-[#201f1f] border border-[#4e4639]/10 shadow-xl"
        >
          <h3 className="text-lg font-serif text-primary mb-4">Interpretação do Oráculo</h3>
          <div className="prose prose-invert prose-stone max-w-none text-sm">
            <ReactMarkdown>{interpretacao}</ReactMarkdown>
          </div>
        </motion.div>
      )}
    </main>
  );
}