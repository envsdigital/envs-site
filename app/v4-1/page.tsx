import type { Metadata } from "next";
import V4Page from "@/components/v4/Page";
import { devContent } from "@/data/site-dev";

export const metadata: Metadata = {
  title: "envs | Software sob medida para empresas",
  description:
    "Pare de adaptar sua operação ao sistema. A envs constrói o software que a sua empresa realmente usa: sistemas internos, portais, apps e integrações.",
};

/** v4.1 — mesma cena da v4, copy da v3.1 (desenvolvimento sob medida). */
export default function Page() {
  return <V4Page content={devContent} />;
}
