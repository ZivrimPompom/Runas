import { RevelarScreen } from "@/components/RevelarScreen";

interface PageProps {
  params: Promise<{ tipo: string }>;
}

export default async function RevelarPage({ params }: PageProps) {
  const { tipo } = await params;
  return <RevelarScreen tipo={tipo} />;
}