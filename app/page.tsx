import V3Page from "@/components/v3/Page";
import { devContent } from "@/data/site-dev";

// Versão vigente do site: design da v3 com a copy de software sob medida
// (a mesma que /v3-1 serve). Trocar aqui quando outra versão assumir —
// e ajustar o metadata em app/layout.tsx junto, senão o título anunciado
// na busca deixa de bater com a página.
export default function Page() {
  return <V3Page content={devContent} />;
}
