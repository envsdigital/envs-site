import { SmoothScroll } from "@/components/Chrome";
import { ContentProvider } from "@/components/v3/Content";
import { defaultContent, type Content } from "@/data/content";
import Field from "@/components/v4/Field";
import { Hud } from "@/components/v4/Hud";
import { Cursor } from "@/components/v4/Cursor";
import { Abertura, Virada, Diferenca, Frentes, Numeros, Fecho } from "@/components/v4/Beats";

/**
 * v4 — scrollytelling sobre uma cena 3D contínua.
 * Mesma copy da v3 (vem do mesmo content), tratada só como tipografia.
 */
export default function V4Page({ content = defaultContent }: { content?: Content }) {
  return (
    <ContentProvider value={content}>
      <SmoothScroll />
      <Field />
      {/* véu entre a cena e o texto: a copy foi calibrada contra preto, mas o
          terreno passa claro por baixo dela. Segura o contraste sem ter que
          escurecer a cena. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(5,5,5,.72), rgba(5,5,5,.28) 70%, transparent)" }}
      />
      <Hud />
      <Cursor />
      <main
        className="relative z-10"
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}
      >
        <Abertura />
        <Virada />
        <Diferenca />
        <Frentes />
        <Numeros />
        <Fecho />
      </main>
    </ContentProvider>
  );
}
