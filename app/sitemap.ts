import type { MetadataRoute } from "next";

// exigido com `output: export` — sem isso o Next trata a rota como dinâmica
// e o build falha em vez de gerar o arquivo
export const dynamic = "force-static";

/**
 * Só a home entra. As rotas de versão repetem a mesma copy e estão
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
  ];
}
