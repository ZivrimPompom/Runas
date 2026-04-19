'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RuneReading } from "@/components/RuneReading";
import { RuneDictionary } from "@/components/RuneDictionary";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";
import { ScrollText, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="w-full py-20 px-4 flex flex-col items-center text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-stone-500/10 blur-3xl rounded-full" />
          <h1 className="text-6xl md:text-8xl font-serif text-gradient relative z-10">
            Oráculo de Runas
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-stone-500 dark:text-stone-400 max-w-lg text-lg font-light tracking-wide"
        >
          Desvende os mistérios do antigo alfabeto nórdico. 
          Consulte as runas para orientação, sabedoria e autoconhecimento.
        </motion.p>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-6xl px-4 pb-20">
        <Tabs defaultValue="reading" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 p-1 h-12">
              <TabsTrigger 
                value="reading" 
                className="px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-stone-800 data-[state=active]:text-stone-900 dark:data-[state=active]:text-stone-100 text-stone-500 transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Leitura
              </TabsTrigger>
              <TabsTrigger 
                value="dictionary" 
                className="px-8 data-[state=active]:bg-white dark:data-[state=active]:bg-stone-800 data-[state=active]:text-stone-900 dark:data-[state=active]:text-stone-100 text-stone-500 transition-all"
              >
                <ScrollText className="w-4 h-4 mr-2" />
                Dicionário
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="reading" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RuneReading />
            </motion.div>
          </TabsContent>

          <TabsContent value="dictionary" className="mt-0 focus-visible:outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <RuneDictionary />
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-stone-200 dark:border-stone-900/50 flex flex-col items-center space-y-4">
        <div className="flex space-x-4 text-stone-500 dark:text-stone-600">
          <span className="text-xs uppercase tracking-[0.3em]">Sabedoria Ancestral</span>
          <span className="text-xs">•</span>
          <span className="text-xs uppercase tracking-[0.3em]">Guia Espiritual</span>
        </div>
        <p className="text-[10px] text-stone-400 dark:text-stone-700 uppercase tracking-widest">
          © {new Date().getFullYear()} Oráculo de Runas • Conectado ao Grande Mistério
        </p>
      </footer>
    </main>
  );
}
