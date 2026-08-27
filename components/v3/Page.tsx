import { SmoothScroll, Cursor } from "@/components/Chrome";
import Hero from "@/components/v3/Hero";
import { Statement, Virada, Solucoes, Agentes, Dores, Metodo, Prova, Fecho } from "@/components/v3/Body";

/** Composição da v3. Renderizada por / (versão vigente) e por /v3 (permalink). */
export default function V3Page() {
  return (
    <main style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}>
      <SmoothScroll />
      <Cursor />
      <div className="grain" />
      <Hero />
      <Statement />
      <Virada />
      <Solucoes />
      <Agentes />
      <Dores />
      <Metodo />
      <Prova />
      <Fecho />
    </main>
  );
}
