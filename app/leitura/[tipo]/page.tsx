import { EscolhaScreen } from "@/components/EscolhaScreen";

interface PageProps {
  params: Promise<{ tipo: string }>;
}

export default async function EscolhaPage({ params }: PageProps) {
  const { tipo } = await params;
  return <EscolhaScreen tipo={tipo} />;
}