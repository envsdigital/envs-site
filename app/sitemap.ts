import type { MetadataRoute } from "next";

// exigido com `output: export` — sem isso o Next trata a rota como dinâmica
// e o build falha em vez de gerar o arquivo
export const dynamic = "force-static";

/**
 * Só a home e a política de privacidade entram. As rotas de versão repetem a mesma copy e estão
 * bloqueadas no robots.txt — listá-las aqui seria pedir a indexação
 * de páginas que o robots manda ignorar.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://envs.com.br",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://envs.com.br/privacidade",
      lastModified: new Date("2026-10-17"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
