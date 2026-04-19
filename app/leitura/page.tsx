'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { LeituraScreen } from "@/components/LeituraScreen";

function LeituraContent() {
  const searchParams = useSearchParams();
  const reset = searchParams.get('reset');
  
  // When user navigates here via bottom nav, show loading briefly
  return <LeituraScreen />;
}

export default function LeituraPage() {
  return (
    <Suspense fallback={<div className="pt-28 text-center">Carregando...</div>}>
      <LeituraContent />
    </Suspense>
  );
}