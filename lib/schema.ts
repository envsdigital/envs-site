import { faq } from "@/data/faq";

const SITE = "https://envs.com.br";
const ORG = `${SITE}/#organization`;
const WEBSITE = `${SITE}/#website`;

/**
 * Dados estruturados da home: descrevem a empresa numa forma que buscadores e
 * IAs leem como fato, não como texto de página. Alimenta painel de
 * conhecimento, nome do site no resultado e resposta direta.
 *
 * Só entra o que é verificável. Endereço, CNPJ, redes sociais (sameAs) e nota
 * de avaliação ficam de fora enquanto não houver dado real: schema com
 * informação inventada é pior que schema ausente, porque o Google trata como
 * declaração da própria empresa. Quando existirem LinkedIn/Instagram/Google
 * Business Profile, entram em `sameAs` na organização, é o sinal mais forte
 * para a busca só por "envs".
 */
const servicos = [
  {
    name: "Desenvolvimento de software sob medida",
    description:
      "Sistemas internos, portais do cliente, aplicativos mobile e produtos digitais construídos a partir do processo real da empresa.",
  },
  {
    name: "Integração entre sistemas",
    description: "ERP, CRM, banco de dados, sistemas fiscais e planilhas conversando, sem digitação dupla.",
  },
  {
    name: "Automação de processos com IA",
    description: "Automação e agentes de IA aplicados à operação da empresa.",
  },
  {
    name: "Squad de tecnologia dedicado",
    description: "Time de frontend, backend, UX/UI e tech lead integrado à operação do cliente.",
  },
];

export const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG,
      name: "envs",
      // variações pelas quais a empresa já é buscada: ajudam a ligar
      // "envs", "envs software" e "envs.com.br" à mesma entidade
      alternateName: ["envs Software", "envs Software House", "envs.com.br"],
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logos/envs-wordmark.svg` },
      image: `${SITE}/og.png`,
      description:
        "A envs é uma software house brasileira: desenvolvimento de software sob medida e sob demanda para empresas. Sistemas internos, portais, aplicativos, integrações e agentes de IA aplicados à operação.",
      slogan: "Pare de adaptar sua operação ao sistema pronto. Construa o seu.",
      telephone: "+55-88-98169-7614",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+55-88-98169-7614",
        availableLanguage: "pt-BR",
        areaServed: "BR",
      },
      areaServed: { "@type": "Country", name: "Brasil" },
      knowsLanguage: "pt-BR",
      knowsAbout: [
        "Software house",
        "Desenvolvimento de software sob medida",
        "Desenvolvimento de software sob demanda",
        "Sistemas internos para empresas",
        "Aplicativos mobile",
        "Integração de sistemas",
        "Automação de processos",
        "Agentes de IA",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de desenvolvimento de software",
        itemListElement: servicos.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": ORG } },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      // é este nome que o Google usa como "nome do site" no resultado
      name: "envs",
      alternateName: ["envs Software", "envs Software House"],
      url: SITE,
      inLanguage: "pt-BR",
      publisher: { "@id": ORG },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: "envs Software House | Desenvolvimento de Software Sob Medida",
      isPartOf: { "@id": WEBSITE },
      about: { "@id": ORG },
      primaryImageOfPage: `${SITE}/og.png`,
      inLanguage: "pt-BR",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      isPartOf: { "@id": `${SITE}/#webpage` },
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};
