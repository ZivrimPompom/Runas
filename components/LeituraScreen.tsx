'use client';

import { useState, useEffect } from 'react';

import { ELDER_FUTHARK, Rune } from '@/lib/runes';
import { RuneCard, RuneCardBack } from './RuneCard';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

type Step = 'modalidades' | 'escolha' | 'revelar';

const modalidades = [
  { 
    id: '1', 
    icon: 'auto_awesome', 
    titulo: 'UMA RUNA', 
    descricao: 'Conselho rápido e direto',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8JQLWsdHDfoHhrZ7LNk5paDYxqgsNEGu2UnXnX9QLj8Y2XnBen1x8r_psT149Ll-TO2ikGgC4fSfyV_fJQ14nF_NYhS7Tser_25rM8bp6pczUloZPbZmntINJuT25eH9ZceUGhrUkT6qEXlC9QulBV2fDan1IDB-kkuVk_OTskqy-jpJ0sCAXTtEjxOwLXWZ1GCSdpfzwUgXzT-CEg0r5jgEso3-Tlttdvi7tSdzRg-nGBF93vRX_9VeKWWniuLQFlgLXE8EsmE0'
  },
  { 
    id: '3', 
    icon: 'architecture', 
    titulo: 'TRÊS RUNAS', 
    descricao: 'Passado, Presente e Futuro',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLI91VQ5uagVegUDwhot3J979qJqDRsHbO3VQ9Atzpb1SzX1wtxA8u2rfY2mT3MkzVdibEP1MzsNKAocnIY4dTm0h-AykGLDJ2CWY3MuepB8qDWJJ3N_Jn5u70L_ooANDyPwoxU-Ceg6fGnJ5S2efc8ARt_bjesohlx5W8OQLadulSztwzZDidgmX6iBD_ZDHlvwje2WO1hl5z1CRzdwCly53Pbr1h3_N5piartz2g49rFAhQjuY5biD4T2jNyBr9R1TeYj_5cTjA'
  },
  { 
    id: '5', 
    icon: 'shield', 
    titulo: 'CRUZ NÓRDICA', 
    descricao: 'Análise profunda e complexa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4nSUc_CiKmj-0gqUUzp4FASHNx7uE5eaXx_wIPJwuuIRTjkyI8jbIB9v-vxJO4jLvAC52YM5RkeDVY1SusWcA3n84xtZtmKeQzL_UeFz7SdovXnDGfl740wVVfP7QvQVT_Q4pUOMxP0SwGnII94KYGKYN-qqiSOQ2wPCqvBN4g9YOvD8fzeFF4Ar9sDvTzW3z_OIf-h6ASJ8ARL52zVJMLqzhHubsxut0QbDMMld-oyQseiF1eVfjpd0wjoLloTMVHKUy8lDf2cU'
  },
  { 
    id: 'yesno', 
    icon: 'balance', 
    titulo: 'SIM ou NÃO', 
    descricao: 'Resposta objetiva e clara',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3_SznSsbxV_cA81lZQULMKgwOqbjAx7u6ubeGXHKgQ2Qc3BuVYGrT63P91KDhtzwj_afd199CNnW_TYKLfwoe-VRGyMwxW-sxZ7FvzgSDR69Rs34EzcDU_D6KpV9wuSPx7x8rSGqtcd-SNBSeyslzGf_KBpoFX-O3HRSGRwDWx_DuO4TSBiSNef4t6LI7lsy23dC-lJywQ6v1z2pDXCW0e8HGhMsIDt798FQrmwAXEiLw2DBWh0r20F6nUG8CnJmIIUOHrb-EfXU'
  },
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
      <main className="pt-20 pb-32 px-6 max-w-2xl mx-auto min-h-screen">
        <div className="mb-6 text-center">
          <span className="text-primary tracking-[0.2em] uppercase font-bold text-xs block mb-2">Selecione seu Destino</span>
          <h2 className="text-4xl font-serif text-[#e5e2e1] leading-tight mb-3">Como deseja ler as Runas?</h2>
          <p className="text-[#d1c5b4] max-w-2xl mt-2 leading-relaxed italic text-sm mx-auto">As vozes dos antigos ecoam no silêncio. <br /> Escolha a tiragem que sua alma necessita neste momento.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modalidades.map(m => (
            <button key={m.id} onClick={() => start(m.id)}
              className="group relative flex flex-col justify-center p-6 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500 border-b-2 border-transparent hover:border-primary active:scale-95 text-left overflow-hidden animate-pulse-amber min-h-[140px]">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-30 transition-opacity translate-x-4 -translate-y-4">
                <img src={m.image} alt={m.titulo} className="w-full h-full object-cover rounded-full filter drop-shadow(0 0 15px rgba(233,195,73,0.3))" />
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-primary/20 shadow-lg">
                  <img src={m.image} alt={m.titulo} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-[#e5e2e1] tracking-widest uppercase mb-0.5">{m.titulo}</h3>
                  <p className="text-[#d1c5b4] text-[10px] italic leading-tight">{m.descricao}</p>
                </div>
              </div>
              
              <div className="mt-4 w-full h-[1px] bg-outline-variant/10 group-hover:bg-primary/30 transition-colors relative z-10"></div>
            </button>
          ))}
        </div>
        {/* Decorative Quote */}
        <div className="mt-16 text-center opacity-40">
          <p className="font-serif italic text-xs tracking-widest text-[#d1c5b4]">"O destino é tecido pelo que fazemos hoje."</p>
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
        <button onClick={flipAll} disabled={isLoading} className={`px-10 py-4 bg-primary text-[#241a00] font-serif tracking-[0.2em] uppercase rounded shadow-lg active:scale-95 transition-all animate-pulse-amber ${isLoading ? 'opacity-50' : ''}`}>
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