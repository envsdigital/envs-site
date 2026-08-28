import type { Metadata } from "next";
import V4Page from "@/components/v4/Page";

export const metadata: Metadata = {
  title: "envs | Parceiro de Operação com IA",
  description:
    "Pare de contratar pessoas para fazer o que a IA faz sozinha. Agentes autônomos operando seu financeiro, jurídico, comercial e logística.",
};

export default function Page() {
  return <V4Page />;
}
