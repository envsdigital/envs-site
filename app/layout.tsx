import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://envs.com.br"),
  title: "envs — Parceiro de Operação com IA",
  description:
    "Pare de contratar pessoas para fazer o que a IA pode fazer sozinha. Agentes autônomos, desenvolvimento de software e squad plugado na sua empresa.",
  openGraph: {
    title: "envs — Parceiro de Operação com IA",
    description:
      "Agentes autônomos que operam seus processos 24h. Financeiro, jurídico, comercial, logística — sem intervenção humana.",
    url: "https://envs.com.br",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
