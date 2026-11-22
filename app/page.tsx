import V3Page from "@/components/v3/Page";
import { devContent } from "@/data/site-dev";
import { faq } from "@/data/faq";
import { schema } from "@/lib/schema";

// Versão vigente do site: design da v3 com a copy de software sob medida
// (a mesma que /v3-1 serve). Trocar aqui quando outra versão assumir —
// e ajustar o metadata em app/layout.tsx junto, senão o título anunciado
// na busca deixa de bater com a página.
//
// O JSON-LD vive aqui e não no layout: descreve ESTA página (home). No layout
// ele iria também para /privacidade e para as rotas de versão, repetindo o
// FAQPage em páginas que não têm as perguntas na tela.
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <V3Page content={devContent} faq={faq} />
    </>
  );
}
