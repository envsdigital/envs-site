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

const TITLE = "envs Software House | Desenvolvimento de Software Sob Medida";
const DESC =
  "A envs é uma software house brasileira: desenvolvimento de software sob medida e sob demanda para empresas. Sistemas internos, portais, apps e integrações.";

export const metadata: Metadata = {
  metadataBase: new URL("https://envs.com.br"),
  // acompanha a copy que a home renderiza; desalinhar isso faz o Google e o
  // compartilhamento anunciarem uma página diferente da que abre.
  // Começa por "envs" (busca pela marca) e carrega os termos que o cliente
  // digita: software house, desenvolvimento de software, sob medida.
  title: TITLE,
  description: DESC,
  applicationName: "envs",
  authors: [{ name: "envs", url: "https://envs.com.br" }],
  creator: "envs",
  publisher: "envs",
  category: "technology",
  // o Google ignora; Bing e outros buscadores ainda leem
  keywords: [
    "envs",
    "envs software",
    "software house",
    "desenvolvimento de software",
    "software sob medida",
    "software sob demanda",
    "empresa de desenvolvimento de software",
    "sistema sob medida",
    "desenvolvimento de sistemas",
    "integração de sistemas",
  ],
  // sem canonical o Google escolhe sozinho qual endereço é o oficial quando
  // encontra a mesma página por caminhos diferentes
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://envs.com.br",
    siteName: "envs",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "envs | Pare de adaptar sua operação ao sistema pronto. Construa o seu.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
