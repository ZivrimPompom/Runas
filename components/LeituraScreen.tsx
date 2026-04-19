'use client';

import { useState, useEffect } from 'react';

import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { RuneCard, RuneCardBack } from './RuneCard';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

type Step = 'modalidades' | 'escolha' | 'revelar';

const modalidades = [
  { id: '1', icon: 'auto_awesome', titulo: 'UMA RUNA', descricao: 'Conselho rápido', iconBg: 'auto_awesome' },
  { id: '3', icon: 'architecture', titulo: 'TRÊS RUNAS', descricao: 'Passado, Presente, Futuro', iconBg: 'architecture' },
  { id: '5', icon: 'shield', titulo: 'CRUZ NÓRDICA', descricao: 'Análise profunda', iconBg: 'shield' },
  { id: 'yesno', icon: 'balance', titulo: 'SIM OU NÃO', descricao: 'Resposta objetiva', iconBg: 'balance' },
];

const cruzLabels = ['O Destino', 'O Passado', 'O Agora', 'O Desafio', 'A Raiz'];
const tresLabels = ['Passado', 'Presente', 'Futuro'];

interface PoolRune extends Rune {
  initialRotate: number;
}

export function LeituraScreen() {
  const [step, setStep] = useState<Step>('modalidades');
  const [tipo, setTipo] = useState('1');
  
  // Escolha state
  const [pool, setPool] = useState<PoolRune[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  
  // Revelar state
  const [runas, setRunas] = useState<Rune[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [isInverted, setIsInverted] = useState<boolean[]>([]);
  const [pergunta, setPergunta] = useState('');
  const [interpretacao, setInterpretacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCount = () => {
    if (tipo === 'yesno') return 1;
    return parseInt(tipo) || 1;
  };

  const start = (tipoSelecionado: string) => {
    setTipo(tipoSelecionado);
    setIsShuffling(true);
    setSelecionadas([]);
    
    const shuffled = [...ELDER_FUTHARK]
      .sort(() => 0.5 - Math.random())
      .map(rune => ({ ...rune, initialRotate: (Math.random() - 0.5) * 30 }));
    setPool(shuffled);
    
    setTimeout(() => {
      setIsShuffling(false);
      setStep('escolha');
    }, 1500);
  };

  const pickRune = (index: number) => {
    if (selecionadas.includes(index)) { return; }
    if (selecionadas.length >= getCount()) { return; }
    
    const novas = [...selecionadas, index];
    setSelecionadas(novas);
    
    if (novas.length === getCount()) {
      setTimeout(() => {
        setRunas(novas.map(i => pool[i]));
        setIsFlipped(new Array(novas.length).fill(false));
        setIsInverted(novas.map(() => Math.random() > 0.7));
        setStep('revelar');
      }, 500);
    }
  };

  const flipAll = () => {
    setIsFlipped(new Array(runas.length).fill(true));
    if (!pergunta.trim()) {
      setInterpretacao('Por favor, faça uma pergunta para o oráculo antes de revelar.');
      return;
    }
    getInterpretacao();
  };

  const getInterpretacao = async () => {
    if (!GROQ_API_KEY) {
      setInterpretacao('Chave de API não configurada. Configure NEXT_PUBLIC_GROQ_API_KEY no arquivo .env.local');
      return;
    }
    
    setIsLoading(true);
    try {
      const labels = tipo === '5' ? cruzLabels : tipo === '3' ? tresLabels : ['A Resposta'];
      const runeDetails = runas.map((r, i) => `${labels[i]}: ${r.name}${isInverted[i] ? ' (Invertida)' : ''}`).join('\n');
      
      const prompt = `Você é um oráculo de runas. Pergunta: "${pergunta}"
Runas: ${runeDetails}
Interpretação mística em português.`;
      
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json();
      setInterpretacao(data.choices?.[0]?.message?.content || 'Erro na interpretação.');
    } catch (e) {
      setInterpretacao(`Erro: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const back = () => {
    setStep('modalidades');
    setSelecionadas([]);
    setRunas([]);
    setInterpretacao('');
    setPergunta('');
    setPool([]);
    setIsFlipped([]);
    setIsInverted([]);
  };

  const labels = tipo === '5' ? cruzLabels : tipo === '3' ? tresLabels : ['A Resposta'];

  // Step 1: Modalidades
  if (step === 'modalidades') {
    return (
      <main className="pt-28 pb-32 px-6 max-w-2xl mx-auto min-h-screen">
        <div className="mb-12 text-center">
          <span className="text-primary tracking-[0.3em] text-[10px] uppercase mb-2 block">Selecione seu Destino</span>
          <h2 className="text-3xl font-serif text-primary-fixed">Como deseja ler as Runas?</h2>
          <p className="text-[#d1c5b4] mt-4 text-sm">Escolha a tiragem que sua alma necessita.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modalidades.map(m => (
            <button key={m.id} onClick={() => start(m.id)}
              className="group relative flex flex-col items-start p-8 rounded-lg bg-surface-container hover:bg-surface-container-high border-b-2 border-transparent hover:border-primary transition-all active:scale-95 text-left">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              <h3 className="text-xl font-serif text-[#e5e2e1] tracking-widest uppercase">{m.titulo}</h3>
              <p className="text-[#d1c5b4] text-xs italic">{m.descricao}</p>
            </button>
          ))}
        </div>
      </main>
    );
  }

  // Step 2: Escolha
  if (step === 'escolha') {
    if (isShuffling) {
      return (
        <main className="pt-28 pb-32 px-6 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#353534] border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#9a8f80] italic">Misturando as pedras sagradas...</p>
          </div>
        </main>
      );
    }

    return (
      <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <button onClick={back} className="text-primary text-xs hover:underline">← Início</button>
          <h2 className="text-xl font-serif text-primary-fixed mt-2">Monte das Runas</h2>
          <p className="text-[#d1c5b4]">Escolha <span className="text-primary font-bold">{getCount() - selecionadas.length}</span> runas</p>
        </div>

        {/* Slots */}
        <div className={`flex justify-center mb-6 ${tipo === '5' ? 'grid grid-cols-3 gap-1 w-fit mx-auto' : tipo === '3' ? 'flex flex-wrap justify-center gap-3' : 'flex justify-center'}`}>
          {Array.from({ length: getCount() }).map((_, i) => {
            const runeIdx = selecionadas[i];
            let gridClass = '';
            if (tipo === '5') {
              if (i === 0) gridClass = 'col-start-2 row-start-1';
              if (i === 1) gridClass = 'col-start-1 row-start-2';
              if (i === 2) gridClass = 'col-start-2 row-start-2';
              if (i === 3) gridClass = 'col-start-3 row-start-2';
              if (i === 4) gridClass = 'col-start-2 row-start-3';
            }
            return (
              <div key={i} className={`w-16 h-20 border-2 border-dashed border-[#4e4639]/40 bg-background/50 rounded-lg flex items-center justify-center ${gridClass} shadow-inner`}>
                {runeIdx !== undefined ? (
                  <div className="w-full h-full animate-in zoom-in duration-300">
                    <RuneCardBack size="sm" className="w-full h-full rounded-md" />
                  </div>
                ) : (
                  <div className="w-2 h-2 bg-[#4e4639]/30 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Pool */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl bg-[#1c1b1b] p-4 rounded-2xl border border-[#4e4639]/10 max-h-[40vh] overflow-y-auto">
          {pool.map((rune, idx) => {
            const isSelected = selecionadas.includes(idx);
            if (isSelected) return <div key={idx} className="w-12 h-16 invisible" />;
            return (
              <div key={idx} className="cursor-pointer hover:scale-105 transition-transform" style={{ transform: `rotate(${rune.initialRotate}deg)` }} onClick={() => pickRune(idx)}>
                <RuneCard rune={rune} size="sm" showBack />
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  // Step 3: Revelar
  return (
    <main className="pt-28 pb-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <button onClick={back} className="text-primary text-xs hover:underline">← Início</button>
        <h2 className="text-2xl font-serif text-primary-fixed mt-2">
          {tipo === '5' ? 'Cruz Nórdica' : tipo === '3' ? 'Três Runas' : 'Uma Runa'}
        </h2>
      </div>

      {/* Layout */}
      <div className={`flex justify-center mb-8 ${tipo === '5' ? 'grid grid-cols-3 gap-2 w-fit mx-auto' : tipo === '3' ? 'flex flex-wrap justify-center gap-4' : 'flex justify-center'}`}>
        {runas.map((rune, i) => {
          let gridClass = '';
          if (tipo === '5') {
            if (i === 0) gridClass = 'col-start-2 row-start-1';
            if (i === 1) gridClass = 'col-start-1 row-start-2';
            if (i === 2) gridClass = 'col-start-2 row-start-2';
            if (i === 3) gridClass = 'col-start-3 row-start-2';
            if (i === 4) gridClass = 'col-start-2 row-start-3';
          }
          return (
            <div key={i} className={`flex flex-col items-center gap-1 ${gridClass}`}>
              <span className="text-[10px] uppercase tracking-widest text-[#d1c5b4]">{labels[i]}</span>
              <RuneCard rune={rune} isInverted={isInverted[i]} onClick={() => { const f = [...isFlipped]; f[i] = true; setIsFlipped(f); }} size={tipo === '5' ? 'sm' : 'md'} showBack={!isFlipped[i]} />
              {isFlipped[i] && <p className="text-xs text-primary">{isInverted[i] ? `Inv: ${rune.name}` : rune.meaning}</p>}
            </div>
          );
        })}
      </div>

      {/* Pergunta */}
      <div className="mb-6">
        <label className="block text-xs uppercase text-[#d1c5b4] mb-2">Sua Intenção *</label>
        <textarea className="w-full bg-[#0e0e0e] border-2 border-[#4e4639] rounded-xl text-[#e5e2e1] p-4 resize-none focus:border-primary" rows={2} placeholder="Pergunta para o oráculo..." value={pergunta} onChange={e => setPergunta(e.target.value)} />
      </div>

      {/* Button */}
      <div className="flex justify-center mb-6">
        <button onClick={flipAll} disabled={isLoading} className={`px-10 py-4 bg-primary text-[#241a00] font-serif tracking-[0.2em] uppercase rounded shadow-lg active:scale-95 transition-all ${isLoading ? 'opacity-50' : ''}`}>
          {isLoading ? 'Consultando...' : 'REVELAR E ANALISAR'}
        </button>
      </div>

      {/* Interpretacao */}
      {interpretacao && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-[#201f1f] border border-[#4e4639]/10">
          <h3 className="text-lg font-serif text-primary mb-4">Interpretação do Oráculo</h3>
          <div className="prose prose-invert text-sm"><ReactMarkdown>{interpretacao}</ReactMarkdown></div>
        </motion.div>
      )}
    </main>
  );
}