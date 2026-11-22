// Perguntas frequentes da home. Esta lista alimenta DOIS lugares: a seção
// visível (components/v3/Faq.tsx) e o JSON-LD FAQPage (lib/schema.ts). O
// Google exige que o marcado bata com o que está na tela, então a fonte é uma só.
//
// Só entram afirmações que a própria página já sustenta (ver data/site-dev.ts).
// Sem preço, sem prazo fechado e sem promessa de posse do código: a copy de
// garantia foi reescrita de propósito para não prometer isso.

export type Faq = { q: string; a: string };

export const faq: Faq[] = [
  {
    q: "A envs é uma software house?",
    a: "Sim. A envs é uma software house brasileira: projeta, desenvolve, coloca no ar e continua evoluindo software para outras empresas. O foco é software sob medida, ou seja, sistemas feitos a partir do processo real de cada cliente, e não um produto de prateleira para a média do mercado.",
  },
  {
    q: "O que é desenvolvimento de software sob medida (sob demanda)?",
    a: "É construir o sistema a partir do processo da sua empresa, em vez de adaptar a operação a uma ferramenta pronta. Cada tela e cada regra de negócio existem porque alguém as usa. Também é chamado de software sob demanda, software personalizado ou software customizado.",
  },
  {
    q: "Quando vale a pena ter um software sob medida em vez de um sistema pronto?",
    a: "Quando o sistema de prateleira resolve cerca de 70% e o resto vira gambiarra: o processo mais importante roda em planilha, a equipe digita a mesma informação em três lugares, relatórios são montados na mão ou a resposta ao pedido de ajuste é “o sistema não faz isso”. Nesses casos, o custo de continuar improvisando passa a ser maior que o de construir o sistema certo.",
  },
  {
    q: "Que tipos de software a envs desenvolve?",
    a: "Sistemas internos (o ERP que cabe na sua operação), portais do cliente, aplicativos mobile para iOS e Android, integrações entre sistemas, dashboards de indicadores e produtos digitais, incluindo micro-SaaS. Também atuamos com automação de processos e agentes de IA aplicados à operação.",
  },
  {
    q: "Como funciona o processo de desenvolvimento?",
    a: "Mapeamos o processo real com o seu time, prototipamos, construímos e evoluímos. Seguimos o Método envs: identificamos a etapa limitante da operação, o maior gargalo, e construímos primeiro o software que a resolve, no menor escopo que já traz resultado. O escopo é alinhado antes de começar e você acompanha o software funcionando em demonstrações frequentes.",
  },
  {
    q: "Em quanto tempo o primeiro sistema vai ao ar?",
    a: "A proposta é colocar um MVP no ar em semanas, e não em trimestres, concentrando o primeiro ciclo no gargalo da operação. O prazo exato depende do escopo e é combinado com você antes de começar, na conversa inicial.",
  },
  {
    q: "O software novo integra com o ERP, o CRM e as planilhas que já uso?",
    a: "Sim. A ideia não é trocar tudo. O sistema novo se integra a ERP, CRM, banco de dados, sistemas fiscais (como NF-e), planilhas, e-mail e APIs que já rodam na sua empresa, para que o dado circule sozinho, sem digitação dupla.",
  },
  {
    q: "A envs continua ao lado da empresa depois da entrega?",
    a: "Sim. Manutenção e evolução contínuas fazem parte do modelo: a envs não é fábrica de software que entrega e some, nem freelancer que desaparece. Também é possível ter um squad de tecnologia integrado à operação, com frontend, backend, UX/UI e tech lead, sem contratação CLT.",
  },
  {
    q: "Como peço um orçamento ou falo com a envs?",
    a: "O primeiro passo é uma call gratuita de 30 minutos, sem compromisso, para entender a sua operação e mostrar o que dá para resolver primeiro. Você agenda pelo botão “Agendar call” da página ou chama a envs no WhatsApp, (88) 98169-7614.",
  },
];
