import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

// v1/v2 usam Archivo (grotesca pesada). v3 usa Inter 500, mais leve e arejada.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://envs.com.br"),
  // acompanha a copy que a home renderiza; desalinhar isso faz o Google e o
  // compartilhamento anunciarem uma página diferente da que abre
  title: "envs — Software sob medida para empresas",
  description:
    "Pare de adaptar sua operação ao sistema. A envs constrói o software que a sua empresa realmente usa: sistemas internos, portais, apps e integrações.",
  openGraph: {
    title: "envs — Software sob medida para empresas",
    description:
      "ERP que não fecha, planilha que virou processo, integração que ninguém mantém. A envs constrói o software que a sua empresa realmente usa.",
    url: "https://envs.com.br",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
