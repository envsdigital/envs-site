import type { Metadata } from "next";
import V3Page from "@/components/v3/Page";
import { devContent } from "@/data/site-dev";

export const metadata: Metadata = {
  title: "envs — Software sob medida para empresas",
  description:
    "Pare de adaptar sua operação ao sistema. A envs constrói o software que a sua empresa realmente usa: sistemas internos, portais, apps e integrações.",
};

/** v3.1 — mesmo design da v3, copy focada em desenvolvimento sob medida. */
export default function Page() {
  return <V3Page content={devContent} />;
}
