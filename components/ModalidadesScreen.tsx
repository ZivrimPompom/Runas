'use client';

import Link from 'next/link';

const modalidades = [
  {
    id: '1',
    icon: 'auto_awesome',
    titulo: 'UMA RUNA',
    descricao: 'Conselho rápido e direto',
    path: '/leitura/1',
  },
  {
    id: '3',
    icon: 'architecture',
    titulo: 'TRÊS RUNAS',
    descricao: 'Passado, Presente e Futuro',
    path: '/leitura/3',
  },
  {
    id: '5',
    icon: 'shield',
    titulo: 'CRUZ NÓRDICA',
    descricao: 'Análise profunda',
    path: '/leitura/5',
  },
  {
    id: 'yesno',
    icon: 'balance',
    titulo: 'SIM OU NÃO',
    descricao: 'Resposta objetiva',
    path: '/leitura/yesno',
  },
];

export function ModalidadesScreen() {
  return (
    <main className="pt-28 pb-32 px-6 max-w-2xl mx-auto min-h-screen flex flex-col">
      {/* Title Section */}
      <div className="mb-12 text-center">
        <span className="text-primary tracking-[0.3em] font-serif text-[10px] uppercase mb-2 block">
          Selecione seu Destino
        </span>
        <h2 className="text-3xl font-serif text-primary-fixed tracking-wide italic">
          Como deseja ler as Runas?
        </h2>
        <p className="text-[#d1c5b4] mt-4 text-sm max-w-xs mx-auto leading-relaxed">
          As vozes dos antigos ecoam no silêncio. Escolha a tiragem que sua alma necessita neste momento.
        </p>
      </div>

      {/* Bento Grid / Selection Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modalidades.map((mod) => (
          <Link
            key={mod.id}
            href={mod.path}
            className="group relative flex flex-col items-start p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500 border-b-2 border-transparent hover:border-primary active:scale-95 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {mod.icon}
              </span>
            </div>
            <span 
              className="material-symbols-outlined text-primary mb-4" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {mod.icon}
            </span>
            <h3 className="text-xl font-serif text-[#e5e2e1] tracking-widest uppercase mb-1">
              {mod.titulo}
            </h3>
            <p className="text-[#d1c5b4] text-xs italic">{mod.descricao}</p>
            <div className="mt-6 w-full h-[1px] bg-[#4e4639]/20 group-hover:bg-primary/40 transition-colors"></div>
          </Link>
        ))}
      </div>

      {/* Decorative Quote */}
      <div className="mt-16 text-center opacity-40">
        <p className="font-serif italic text-xs tracking-widest">
          "O destino é tecido pelo que fazemos hoje."
        </p>
      </div>
    </main>
  );
}