'use client';

import { useState, useEffect, useRef } from 'react';
import { Rune, ELDER_FUTHARK } from '@/lib/runes';
import { RuneCard } from './RuneCard';
import { Button as ShadcnButton } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

// Initialize Groq lazily to avoid crashes if API key is missing
let aiReady = false;
const checkAi = () => {
  if (!aiReady) {
    if (!GROQ_API_KEY) {
      throw new Error('Chave de API do Groq não configurada.');
    }
    aiReady = true;
  }
  return aiReady;
};

interface PoolRune extends Rune {
  initialRotate: number;
}

export function RuneReading() {
  const [step, setStep] = useState<'menu' | 'selecting' | 'reading'>('menu');
  const [reading, setReading] = useState<(Rune | null)[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [isInverted, setIsInverted] = useState<boolean[]>([]);
  const [spreadType, setSpreadType] = useState<'1' | '3' | '5' | 'yesno'>('1');
  const [userQuestion, setUserQuestion] = useState('');
  const [aiInterpretation, setAiInterpretation] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [pool, setPool] = useState<PoolRune[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [requiredCount, setRequiredCount] = useState(0);
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (step === 'selecting') {
      setTimeout(() => {
        const element = document.querySelector('h2');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [step]);

  const startSelection = async (count: number, type: '1' | '3' | '5' | 'yesno') => {
    setReading(new Array(count).fill(null));
    setStep('selecting');
    setIsShuffling(true);
    setAiInterpretation('');
    setUserQuestion(''); // Reset question
    setSelectedIndices([]);
    setIsFlipped(new Array(count).fill(false));
    setIsInverted(new Array(count).fill(false));
    
    // Shuffle all 24 runes for the pool and add stable random rotation
    const shuffledPool = [...ELDER_FUTHARK]
      .sort(() => 0.5 - Math.random())
      .map(rune => ({ 
        ...rune, 
        initialRotate: (Math.random() - 0.5) * 30 
      }));
    setPool(shuffledPool);
    setRequiredCount(count);
    setSpreadType(type);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsShuffling(false);
  };

  const pickRune = (index: number) => {
    if (selectedIndices.includes(index) || selectedIndices.length >= requiredCount) return;
    
    const nextSlot = reading.findIndex(r => r === null);
    if (nextSlot === -1) return;

    const newReading = [...reading];
    newReading[nextSlot] = pool[index];
    setReading(newReading);

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    const newInversions = [...isInverted];
    newInversions[nextSlot] = Math.random() > 0.7;
    setIsInverted(newInversions);

    if (newSelected.length === requiredCount) {
      setTimeout(() => {
        setStep('reading');
      }, 800);
    }
  };

  const flipRune = (index: number) => {
    const newFlipped = [...isFlipped];
    newFlipped[index] = true;
    setIsFlipped(newFlipped);
  };

  const getAiInterpretation = async () => {
    if (reading.length === 0 || isFlipped.includes(false)) return;
    
    if (!userQuestion.trim()) {
      setAiInterpretation('Por favor, faça uma pergunta para que o oráculo possa se basear em sua dúvida.');
      return;
    }
    
    checkAi();
    setIsLoadingAi(true);
    try {
      const spreadDescriptions: Record<string, string[]> = {
        '1': ['Conselho Único'],
        '3': ['Passado', 'Presente', 'Futuro'],
        '5': ['O Problema', 'O que Ajuda', 'O que Atrapalha', 'O Futuro Próximo', 'O Resultado Final'],
        'yesno': ['A Resposta']
      };

      const positions = spreadDescriptions[spreadType] || [];
      const runeDetails = reading.map((r, i) => 
        `${positions[i] || 'Posição ' + (i+1)}: ${r?.name || 'Runa'}${isInverted[i] ? ' (Invertida/Merkstave)' : ''}`
      ).join('\n');

      const prompt = `Você é um mestre oraculista de runas nórdicas (Elder Futhark). 
      O consulente pergunta: "${userQuestion || 'O que as runas têm a me dizer?'}"
      
      Tipo de Tiragem: ${spreadType === 'yesno' ? 'Sim ou Não' : spreadType + ' Runas'}
      
      Runas Sorteadas:
      ${runeDetails}
      
      Por favor, forneça uma interpretação mística, profunda e arquetípica. 
      - Se for uma tiragem de 3 runas, foque no eixo temporal.
      - Se for a Cruz Nórdica (5 runas), analise o conflito e a resolução.
      - Se for "Sim ou Não", dará uma resposta direta baseada na natureza das runas, mas explique o porquê.
      - Considere runas invertidas (Merkstave) como energias bloqueadas, excessivas ou ocultas.
      - Use um tom solene, poético e inspirador em português brasileiro.
      - Divida a resposta em seções claras.`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || `Erro ${response.status}: ${JSON.stringify(data)}`);
      }
      const text = data.choices?.[0]?.message?.content;
      setAiInterpretation(text || 'Não foi possível obter uma interpretação no momento.');
    } catch (error) {
      console.error('Error getting AI interpretation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao conectar com a IA';
      setAiInterpretation(`O oráculo está em silêncio... (${errorMessage})`);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const getSpreadLayout = () => {
    if (spreadType === '5') {
      return "grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-2 w-full max-w-5xl mx-auto items-center justify-items-center min-h-[280px]";
    }
    if (spreadType === '3') {
      return "grid grid-cols-3 gap-8 md:gap-10 w-full max-w-4xl mx-auto items-center justify-items-center min-h-[240px]";
    }
    return "flex flex-wrap justify-center gap-6 min-h-[200px]";
  };

  const revealAll = () => {
    setIsFlipped(new Array(reading.length).fill(true));
  };

  if (!isMounted) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2">
      <AnimatePresence mode="wait">
        {step === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center space-y-6 py-4"
          >
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">Oráculo de Runas</h1>
              <p className="text-stone-500 italic text-sm">Escolha sua modalidade de consulta</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <ShadcnButton 
                variant="outline" 
                onClick={() => startSelection(1, '1')}
                className="h-24 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-2xl flex flex-col gap-1"
              >
                <span className="text-lg font-serif font-bold">Uma Runa</span>
                <span className="text-[10px] text-stone-500">Conselho rápido e direto</span>
              </ShadcnButton>
              <ShadcnButton 
                variant="outline" 
                onClick={() => startSelection(3, '3')}
                className="h-24 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-2xl flex flex-col gap-1"
              >
                <span className="text-lg font-serif font-bold">Três Runas</span>
                <span className="text-[10px] text-stone-500">Passado, Presente e Futuro</span>
              </ShadcnButton>
              <ShadcnButton 
                variant="outline" 
                onClick={() => startSelection(5, '5')}
                className="h-24 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-2xl flex flex-col gap-1"
              >
                <span className="text-lg font-serif font-bold">Cruz Nórdica</span>
                <span className="text-[10px] text-stone-500">Análise profunda (5 runas)</span>
              </ShadcnButton>
              <ShadcnButton 
                variant="outline" 
                onClick={() => startSelection(1, 'yesno')}
                className="h-24 border-2 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-2xl flex flex-col gap-1"
              >
                <span className="text-lg font-serif font-bold">Sim ou Não</span>
                <span className="text-[10px] text-stone-500">Resposta objetiva</span>
              </ShadcnButton>
            </div>
          </motion.div>
        )}

        {step === 'selecting' && (
          <motion.div 
            key="selecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-6 py-2"
          >
            {isShuffling ? (
              <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin" />
                <p className="text-stone-500 font-serif italic text-lg">Misturando as pedras sagradas...</p>
              </div>
            ) : (
              <>
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-serif font-bold text-stone-900">O Monte de Runas</h2>
                  <p className="text-sm text-stone-500 italic">
                    Escolha <span className="text-stone-900 font-bold">{requiredCount - selectedIndices.length}</span> {requiredCount - selectedIndices.length === 1 ? 'runa' : 'runas'}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl bg-stone-50 p-4 rounded-[2rem] border border-stone-100 shadow-inner max-h-[50vh] overflow-y-auto">
                  {pool.map((rune, idx) => {
                    const isSelected = selectedIndices.includes(idx);
                    if (isSelected) return <div key={`pool-${rune.id}-${idx}`} className="w-14 h-20 invisible" />;
                    
                    return (
                      <div
                        key={`pool-${rune.id}-${idx}`}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        style={{ transform: `rotate(${rune.initialRotate}deg)` }}
                        onClick={() => pickRune(idx)}
                      >
                        <RuneCard rune={rune} size="sm" showBack />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="flex gap-2">
                    {reading.map((r, i) => (
                      <div key={`slot-${i}`} className="w-10 h-14 border-2 border-dashed border-stone-200 rounded-lg flex items-center justify-center bg-white/50">
                        {r ? (
                          <div className="w-full h-full bg-stone-400 rounded-lg shadow-sm" />
                        ) : (
                          <div className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">Suas escolhas</p>
                </div>
              </>
            )}
          </motion.div>
        )}

        {step === 'reading' && (
          <motion.div 
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col space-y-6 py-2"
          >
            <div className="w-full flex flex-col md:flex-row items-center justify-between border-b border-stone-100 pb-4 gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  {spreadType === 'yesno' ? 'Sim ou Não' : 
                   spreadType === '5' ? 'Cruz Nórdica' : 
                   spreadType === '3' ? 'Três Runas' : 'Uma Runa'}
                </h2>
                <ShadcnButton 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setStep('menu')}
                  className="text-stone-500 hover:text-stone-900"
                >
                  <RotateCcw className="w-3 h-3 mr-2" /> Nova Consulta
                </ShadcnButton>
              </div>
              
              <div className="flex-1 max-w-md w-full">
                <input
                  type="text"
                  placeholder="Sua pergunta para as Runas..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  className={cn(
                    "w-full bg-white dark:bg-stone-900 border-2 rounded-full py-2 px-6 text-stone-800 dark:text-stone-100 focus:outline-none transition-all text-sm shadow-sm",
                    !userQuestion.trim() ? "border-amber-100 dark:border-amber-900/30" : "border-stone-100 dark:border-stone-800 focus:border-stone-300 dark:focus:border-stone-600"
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column: The Spread */}
              <div className={cn(getSpreadLayout(), "w-full py-2")}>
                {reading.map((rune, index) => {
                  let gridClass = "";
                  let positionLabel = "";
                  if (spreadType === '5') {
                    const labels = ['O Problema', 'O que Ajuda', 'O que Atrapalha', 'O Futuro', 'O Resultado'];
                    positionLabel = labels[index];
                    if (index === 0) gridClass = "col-start-2 row-start-2";
                    if (index === 1) gridClass = "col-start-1 row-start-2";
                    if (index === 2) gridClass = "col-start-3 row-start-2";
                    if (index === 3) gridClass = "col-start-2 row-start-1";
                    if (index === 4) gridClass = "col-start-2 row-start-3";
                  } else if (spreadType === '3') {
                    const labels = ['Passado', 'Presente', 'Futuro'];
                    positionLabel = labels[index];
                  }

                  return (
                    <div key={`result-${index}`} className={cn("flex flex-row items-center gap-2", gridClass)}>
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold">{positionLabel}</span>
                        <RuneCard
                          rune={rune}
                          isInverted={isInverted[index]}
                          onClick={() => flipRune(index)}
                          size={spreadType === '5' ? 'sm' : 'md'}
                          showBack={!isFlipped[index]}
                        />
                      </div>
                      {isFlipped[index] && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "text-center space-y-1 bg-white dark:bg-stone-900 p-2 rounded-2xl shadow-md border border-stone-50 dark:border-stone-800 max-w-[150px] relative z-20",
                            spreadType === '3' ? "-ml-[15%]" : "mt-5"
                          )}
                        >
                          <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">{rune?.name}</h3>
                          <p className="text-[10px] text-stone-600 dark:text-stone-400 italic leading-tight">
                            {isInverted[index] ? `Invertida: ${rune?.name}` : rune?.meaning}
                          </p>
                          <ShadcnButton 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedRune(rune)}
                            className="h-6 px-2 text-[9px] text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                          >
                            <Info className="w-2.5 h-2.5 mr-1" /> Detalhes
                          </ShadcnButton>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: AI Interpretation */}
              <div className="w-full space-y-6">
                {!isFlipped.every(v => v) ? (
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-100 dark:border-stone-800 rounded-[2rem] space-y-4">
                    <p className="text-stone-400 dark:text-stone-500 italic text-sm text-center">As runas aguardam sua coragem para serem reveladas.</p>
                    <ShadcnButton 
                      onClick={() => {
                        revealAll();
                        getAiInterpretation();
                      }}
                      className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full px-8"
                    >
                      Revelar Todas e Consultar Oráculo
                    </ShadcnButton>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-stone-900 p-6 rounded-[2rem] shadow-2xl text-center space-y-4">
                      <h3 className="text-lg font-serif font-bold text-white">Interpretação do Oráculo</h3>
                      <ShadcnButton 
                        onClick={getAiInterpretation}
                        disabled={isLoadingAi}
                        className="w-full bg-white text-stone-900 hover:bg-stone-100 rounded-full py-4 h-auto text-sm font-serif"
                      >
                        {isLoadingAi ? "Consultando Destino..." : "Atualizar Sabedoria"}
                      </ShadcnButton>
                    </div>

                    {aiInterpretation && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-xl prose prose-stone dark:prose-invert max-w-none text-xs"
                      >
                        <ReactMarkdown>{aiInterpretation}</ReactMarkdown>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
