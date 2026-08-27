// Agrupa toda a copy num objeto só, para que uma variante da v3 possa trocar
// o texto inteiro sem duplicar componente nenhum.
// data/site.ts continua sendo a fonte da versão padrão.

import * as base from "./site";
import { depoimentos, depoimentosHeader } from "./depoimentos";
import { caseDestaque } from "./case";

export const defaultContent = {
  WA_URL: base.WA_URL,
  hero: base.hero,
  virada: base.virada,
  diferenca: base.diferenca,
  futuro: base.futuro,
  stack: base.stack,
  frentes: base.frentes,
  dores: base.dores,
  agentes: base.agentes,
  visibilidade: base.visibilidade,
  falha: base.falha,
  stats: base.stats,
  escritorio: base.escritorio,
  garantiaFinal: base.garantiaFinal,
  finalCta: base.finalCta,
  depoimentos,
  depoimentosHeader,
  caseDestaque,
  nav: [
    { label: "A virada", href: "#virada" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Método", href: "#metodo" },
    { label: "Resultados", href: "#prova" },
  ],
  /** painel que aparece sobre o horizonte no hero */
  heroPanel: {
    title: "Agente Financeiro",
    badge: "rodando",
    rows: [
      { label: "Inadimplência identificada", value: "12 faturas", tone: "lime" },
      { label: "Cruzamento com CRM", value: "3 em risco", tone: "peri" },
      { label: "Régua de cobrança", value: "disparada", tone: "lime" },
      { label: "Conciliação bancária", value: "concluída", tone: "lime" },
    ],
    metrics: [
      { k: "Processos", v: "24h", s: "sem parar" },
      { k: "Intervenção", v: "0", s: "humana" },
      { k: "Sistemas", v: "6", s: "integrados" },
      { k: "Exceções", v: "1", s: "tratada" },
    ],
  },
  /** rótulos que giram dentro da esfera da seção de abertura */
  orbLabels: ["Financeiro", "Jurídico", "Comercial", "Logística"],
  /** texto de abertura logo abaixo do hero */
  statement: {
    lead: "A envs coloca",
    highlight: "agentes de IA para operar",
    rest: "seu financeiro, jurídico, comercial e logística — integra os sistemas que você já usa e continua do seu lado enquanto o negócio cresce.",
  },
  /** rótulos dos itens do card "Integra o que você já usa" */
  integraTitle: "Integra o que você já usa",
  integraDesc:
    "Planilhas, documentos, softwares, APIs — qualquer sistema. Sem trocar sua stack.",
  integraItems: ["ERP", "CRM", "Banco", "NF-e", "Sheets", "Slack", "E-mail", "APIs"],
  /** cabeçalhos das seções */
  heads: {
    solucoes: {
      label: "o que nos diferencia",
      title: "O que separa a envs de quem só “faz automação”",
      desc: "Automação segue regras fixas. Agente autônomo observa, decide e adapta.",
    },
    agentes: {
      label: "os agentes na prática",
      title: "Da IA que responde para a IA que executa",
    },
    prova: { label: "resultados", title: "Não são palavras. São números de quem já fez." },
    dores: { label: "o diagnóstico" },
    metodo: { label: "por que a maioria falha" },
    futuro: { label: "o futuro chegou" },
    virada: { label: "2026: a virada" },
  },
};

export type Content = typeof defaultContent;
