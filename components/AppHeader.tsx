'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-neutral-950/80 backdrop-blur-2xl shadow-2xl shadow-amber-900/20 bg-gradient-to-b from-neutral-900 to-transparent">
      <div className="flex items-center gap-4">
        <button className="text-amber-500 hover:text-amber-300 transition-colors duration-500 scale-95 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-xl font-serif tracking-[0.2em] text-amber-500 drop-shadow-[0_0_8px_rgba(233,195,73,0.4)] uppercase">
          Relíquia do Vidente
        </h1>
      </div>
      <div className="w-10 h-10 rounded-full border border-amber-900/30 overflow-hidden bg-surface-container-highest">
        <img 
          className="w-full h-full object-cover grayscale opacity-80 contrast-125" 
          alt="ancient runic seal"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOOXWUFfCLKWtMiJgBofHhc8LFPBQbHwJ4yQ269I-OXoeCW-TmB4hkIyqxxbD5dTIb6jMmIfpFJGpQMIgqY8w-ulgRcFA51PINPZYaMY-2QcDD03-N0irIpMOX5-cI12y4uD3EHDmIfInJx2rjA9TF-yeWdUdqLNw_NL00XwzZ_toUk9tBRl2wRWox30GZ01IRH31ZKJzGC7cWy8yY7aS48elhJOtYAS0AtS9KYr8_z_aOwZuDEhH5Fq94zRm7tJMZ0vRCbgyqOkc"
        />
      </div>
    </header>
  );
}