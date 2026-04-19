import type { Metadata } from 'next';
import { Noto_Serif } from 'next/font/google';
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "@/components/AppHeader";
import { AppBottomNav } from "@/components/AppBottomNav";
import './globals.css';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Relíquia do Vidente',
  description: 'Um guia místico para o antigo alfabeto rúnico Futhark.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap" 
        />
      </head>
      <body className={cn("min-h-screen bg-[#131313] text-[#e5e2e1] font-serif", notoSerif.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          {children}
          <AppBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}