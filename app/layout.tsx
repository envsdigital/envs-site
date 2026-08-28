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
  title: "envs | Software sob medida para empresas",
  description:
    "Pare de adaptar sua operação ao sistema. A envs constrói o software que a sua empresa realmente usa: sistemas internos, portais, apps e integrações.",
  // sem canonical o Google escolhe sozinho qual endereço é o oficial quando
  // encontra a mesma página por caminhos diferentes
  alternates: { canonical: "/" },
  openGraph: {
    title: "envs | Software sob medida para empresas",
    description:
      "ERP que não fecha, planilha que virou processo, integração que ninguém mantém. A envs constrói o software que a sua empresa realmente usa.",
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
    title: "envs | Software sob medida para empresas",
    description:
      "ERP que não fecha, planilha que virou processo, integração que ninguém mantém. A envs constrói o software que a sua empresa realmente usa.",
    images: ["/og.png"],
  },
};

/**
 * Dados estruturados: descrevem a empresa numa forma que o Google lê como
 * fato, não como texto de página. É o que alimenta painel de conhecimento e
 * resposta direta.
 *
 * Só entra aqui o que é verificável. Endereço, CNPJ, redes sociais e nota de
 * avaliação ficam de fora enquanto eu não tiver o dado real — schema com
 * informação inventada é pior que schema ausente, porque o Google trata como
 * declaração da própria empresa.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "envs",
  url: "https://envs.com.br",
  logo: "https://envs.com.br/logos/envs-wordmark.svg",
  image: "https://envs.com.br/og.png",
  description:
    "Desenvolvimento de software sob medida para empresas: sistemas internos, portais, aplicativos, integrações e agentes de IA aplicados à operação.",
  telephone: "+55-88-98169-7614",
  areaServed: { "@type": "Country", name: "Brasil" },
  inLanguage: "pt-BR",
  knowsAbout: [
    "Desenvolvimento de software sob medida",
    "Sistemas internos para empresas",
    "Integração de sistemas",
    "Automação de processos",
    "Agentes de IA",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: [
      "Desenvolvimento de software sob medida",
      "Integração entre sistemas",
      "Automação de processos com IA",
      "Squad de tecnologia dedicado",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
