'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppBottomNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/dicionario') return pathname.startsWith('/dicionario');
    if (path === '/leitura') return pathname.startsWith('/leitura');
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-6 px-4 bg-neutral-950/90 backdrop-blur-lg border-t border-amber-900/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] rounded-t-[2rem]">
      <Link 
        href="/" 
        className={`flex flex-col items-center justify-center text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
          isActive('/') 
            ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(233,195,73,0.6)] scale-110' 
            : 'text-stone-600 opacity-60 hover:text-amber-200'
        }`}
      >
        <span className="material-symbols-outlined mb-1">home</span>
        <span className="font-serif">Início</span>
      </Link>

      <Link 
        href="/leitura" 
        className={`flex flex-col items-center justify-center text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
          isActive('/leitura') 
            ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(233,195,73,0.6)] scale-110' 
            : 'text-stone-600 opacity-60 hover:text-amber-200'
        }`}
      >
        <span className="material-symbols-outlined mb-1">auto_awesome</span>
        <span className="font-serif">Leitura</span>
      </Link>
      
      <Link 
        href="/dicionario" 
        className={`flex flex-col items-center justify-center text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
          isActive('/dicionario') 
            ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(233,195,73,0.6)] scale-110' 
            : 'text-stone-600 opacity-60 hover:text-amber-200'
        }`}
      >
        <span className="material-symbols-outlined mb-1">menu_book</span>
        <span className="font-serif">Dicionário</span>
      </Link>
    </nav>
  );
}