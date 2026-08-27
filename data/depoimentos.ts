// status: rascunho — texto realista para desenvolvimento (content/landing-copy.md §5).
// Trocar por depoimentos reais + autorização ANTES de publicar. verificado:false = não vai ao ar como está.

export type Depoimento = {
  nome: string;
  cargo: string;
  empresa: string;
  texto: string;
  verificado: boolean;
};

export const depoimentos: Depoimento[] = [
  {
    nome: "Ricardo Menezes",
    cargo: "Diretor de Operações",
    empresa: "Vetorial Logística",
    texto:
      "A gente emitia nota manualmente, um a um, e sempre sobrava pedido para o dia seguinte. Hoje o agente pega o pedido, confere estoque, emite a nota e avisa o cliente. Ninguém toca. Zeramos a fila em duas semanas.",
    verificado: false,
  },
  {
    nome: "Camila Andrade",
    cargo: "CFO",
    empresa: "Grupo Bertoni",
    texto:
      "A inadimplência era o nosso buraco. O agente abre o financeiro todo dia, cruza com o CRM e dispara a régua sozinho. Em quatro meses caímos de 18% para 6% e o time de cobrança virou time de relacionamento.",
    verificado: false,
  },
  {
    nome: "Thiago Vasconcelos",
    cargo: "Fundador",
    empresa: "Meduca",
    texto:
      "Eu tinha o produto na cabeça e nenhuma linha de código. Em seis meses estava no ar com usuário pagante. O que mais me pegou não foi a entrega — foi que eles continuaram depois dela.",
    verificado: false,
  },
];

export const depoimentosHeader = {
  eyebrow: "OUÇA QUEM JÁ VIVEU",
  title: "Resultados de quem não ficou para trás.",
  lead: "Cada cliente abaixo tinha um processo manual que travava o crescimento. Veja o que aconteceu depois.",
};
