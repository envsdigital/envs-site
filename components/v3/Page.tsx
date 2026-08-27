import { SmoothScroll, Cursor } from "@/components/Chrome";
import Hero from "@/components/v3/Hero";
import Spotlight from "@/components/v3/Spotlight";
import { ContentProvider } from "@/components/v3/Content";
import { defaultContent, type Content } from "@/data/content";
import { Statement, Virada, Solucoes, Agentes, Dores, Metodo, Prova, Fecho } from "@/components/v3/Body";

/**
 * Composição da v3. O design é um só; a copy entra por props.
 *  · /  e /v3    → defaultContent  (parceiro de operação com IA)
 *  · /v3-1       → devContent      (software sob medida)
 */
export default function V3Page({ content = defaultContent }: { content?: Content }) {
  return (
    <ContentProvider value={content}>
      <main style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}>
        <SmoothScroll />
        <Cursor />
        <Spotlight />
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
    </ContentProvider>
  );
}
