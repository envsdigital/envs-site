// v3.1 — mesmo design da v3, copy reposicionada para DESENVOLVIMENTO DE
// SOFTWARE SOB MEDIDA. O eixo sai de "agentes que operam" e vai para
// "o sistema que a sua operação precisava e nenhum SaaS entrega".
//
// Mantém a estrutura e o tom da v3 (mesma retórica de urgência, mesma
// promessa de parceria contínua) — muda o produto.

import { defaultContent, type Content } from "./content";

// mensagem própria: quem vem da v3.1 quer sistema sob medida, não automação
const WA =
  "https://wa.me/5588981697614?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20envs%20e%20quero%20um%20sistema%20sob%20medida%20para%20a%20minha%20empresa.";

export const devContent: Content = {
  WA_URL: WA,

  nav: [
    { label: "O ponto de virada", href: "#virada" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Método", href: "#metodo" },
    { label: "Resultados", href: "#prova" },
  ],

  heroPanel: {
    title: "portal-cliente · sprint 4",
    badge: "em produção",
    rows: [
      { label: "Processo mapeado com o time", value: "12 fluxos", tone: "lime" },
      { label: "Protótipo validado", value: "aprovado", tone: "peri" },
      { label: "Integração com o ERP", value: "conectada", tone: "lime" },
      { label: "Deploy em produção", value: "no ar", tone: "lime" },
    ],
    metrics: [
      { k: "MVP no ar", v: "6", s: "semanas" },
      { k: "Licença", v: "0", s: "por usuário" },
      { k: "Sistemas", v: "5", s: "integrados" },
      { k: "Código", v: "seu", s: "sempre" },
    ],
  },

  hero: {
    eyebrow: "SOFTWARE SOB MEDIDA PARA EMPRESAS QUE JÁ PASSARAM DO GENÉRICO",
    headline: ["Pare de adaptar sua operação", "ao sistema pronto.", "Construa o seu."],
    sub: "ERP que não fecha, planilha que virou processo, integração que ninguém mantém. A envs constrói o software que a sua empresa realmente usa.",
    cta: "Quero meu sistema sob medida",
    trust: ["Sem compromisso", "Call de 30 min", "MVP no ar em semanas"],
    pills: ["Sistemas internos", "Portais", "Apps", "Integrações"],
  },

  virada: {
    eyebrow: "O PONTO DE VIRADA",
    title: [
      "Todo negócio chega no dia",
      "em que o sistema pronto não serve mais.",
    ],
    lead: "Começa com uma planilha. Vira um SaaS assinado. Depois vira três SaaS que não conversam. E um dia a sua operação está moldada pela ferramenta, não o contrário.",
    cards: [
      {
        period: "FASE 1",
        title: "Planilha e improviso",
        desc: "Tudo cabe numa aba. O processo mora na cabeça de quem fez.",
        items: ["Controle manual", "Zero rastreabilidade", "Some com a pessoa"],
        kicker: "Funciona — até crescer.",
        now: false,
      },
      {
        period: "FASE 2",
        title: "SaaS de prateleira",
        desc: "Você assina um sistema pronto. Ele resolve 70% e engessa os outros 30%.",
        items: ["Processo adaptado à ferramenta", "Campo que não existe", "Relatório que não sai"],
        kicker: "Melhorou. Mas não é seu.",
        now: false,
      },
      {
        period: "FASE 3 — AGORA",
        title: "Software próprio",
        desc: "O sistema nasce do seu processo real. Cada tela existe porque alguém usa.",
        items: [
          "Feito para o seu fluxo",
          "Integra o que você já tem",
          "Evolui junto com a empresa",
        ],
        kicker: "Aqui vira vantagem competitiva.",
        now: true,
      },
    ],
  },

  diferenca: {
    eyebrow: "A DIFERENÇA",
    title: "A diferença entre alugar um sistema e ter o seu.",
    compare: [
      {
        tag: "SAAS DE PRATELEIRA",
        desc: "Feito para a média do mercado. Você paga por módulo que não usa e contorna o que falta na planilha.",
        good: false,
      },
      {
        tag: "SOFTWARE SOB MEDIDA",
        desc: "Feito para o seu processo. Cada regra de negócio que hoje mora na cabeça de alguém vira código que ninguém precisa lembrar.",
        good: true,
      },
    ],
    analogy:
      "Sistema pronto é terno de loja: veste, mas aperta em algum lugar e sobra em outro. Você passa o dia ajustando a postura para caber nele. Sob medida é o contrário — a roupa se ajusta ao corpo, e você esquece que está usando.",
    praticaTitle: "Como um sistema sob medida nasce",
    praticaLead: "Não começa no código. Começa entendendo como sua empresa funciona de verdade.",
    verbs: ["Mapeia", "Prototipa", "Constrói", "Evolui"],
    systems: ["ERP", "CRM", "Banco", "Fiscal", "Planilhas", "APIs", "o que você já usa"],
    fecho:
      "Toda empresa que cresceu tem um processo que só ela faz daquele jeito. Esse processo é o seu diferencial — e é justamente ele que nenhum sistema pronto cobre. Software sob medida é transformar o que te torna diferente em algo que escala.",
    cta: "Quero conversar sobre o meu",
    provaTitle: "Mais de 5 anos construindo software para quem não pode parar.",
    setores: ["Educação", "Telecomunicações", "Marketing Digital", "E-commerce", "SaaS"],
  },

  futuro: {
    eyebrow: "POR QUE AGORA",
    title: "Construir software deixou de ser caro. Continuar improvisando é que ficou.",
    paragraphs: [
      "O custo de desenvolver caiu drasticamente nos últimos anos. Ferramentas melhores, infraestrutura barata, IA acelerando o time. O que antes era projeto de seis dígitos e um ano hoje é MVP no ar em meses.",
      "O que não caiu foi o custo de improvisar. Cada mês com processo manual é hora de gente cara fazendo trabalho de máquina, erro que vira retrabalho, e decisão tomada com dado desatualizado. Isso não aparece no balanço, mas sai do lucro.",
      "A conta virou: hoje sai mais caro conviver com o problema do que resolver.",
      "A envs é o time técnico que constrói e continua do seu lado depois.",
    ],
    timeline: [
      {
        era: "ANTES",
        title: "Software próprio era coisa de grande empresa.",
        desc: "Time interno, ano de projeto, orçamento alto. Só compensava em escala.",
      },
      {
        era: "HOJE",
        title: "Qualquer empresa média consegue ter o seu.",
        desc: "Stack madura, cloud barata, IA no desenvolvimento. MVP em semanas, não em trimestres.",
      },
      {
        era: "DAQUI PRA FRENTE",
        title: "Ter o próprio sistema vira o diferencial.",
        desc: "Quem opera com software feito para si é mais rápido, erra menos e não depende de roadmap de fornecedor.",
      },
    ],
    fecho:
      "A envs desenha, constrói, coloca no ar e continua evoluindo o sistema enquanto a empresa cresce. Não é fábrica de software que entrega e some. Não é freelancer que desaparece. É o time técnico que fica.",
    cta: "Quero meu sistema sob medida",
    bullets: [
      "Sistemas feitos para o seu processo real",
      "Integração com tudo que você já usa",
      "Do protótipo ao produto em produção",
      "Manutenção e evolução contínuas",
    ],
  },

  stack: {
    ...defaultContent.stack,
    title: "Tecnologia de ponta, dominada de dentro para fora.",
    lead: "A stack que a gente usa é a que o mercado usa para construir produto sério. Nada de framework exótico que ninguém mantém depois.",
  },

  frentes: {
    eyebrow: "O QUE A ENVS FAZ",
    title: "Um time técnico completo, plugado na sua empresa.",
    lead: "Não é contratação pontual. É o braço de tecnologia que sua operação não tem dentro de casa.",
    f1: {
      tag: "FRENTE 01",
      title: "Sistemas Sob Medida",
      desc: "Web, mobile e interno. Do levantamento do processo ao produto rodando em produção, com o seu fluxo no centro.",
      terminal: [
        "envs build --projeto portal-cliente",
        "Modelagem do processo aprovada",
        "Protótipo validado com o time",
        "Deploy em produção...",
      ],
      bullets: [
        "Nasce do seu processo, não de um template",
        "Você é dono do código",
        "Escala sem custo de licença por usuário",
      ],
    },
    f2: {
      tag: "FRENTE 02",
      title: "Integrações e Automação",
      desc: "Faz seus sistemas conversarem. ERP, CRM, banco, fiscal, planilhas — dado circulando sozinho, sem digitação dupla.",
      pipeline: ["Mapeia", "Integra", "No ar ✓"],
    },
    f3: {
      tag: "FRENTE 03",
      title: "Squad Plugado na Empresa",
      desc: "Time completo integrado à sua operação. Sem CLT, sem headache, sem sumiço.",
      roles: ["Frontend", "Backend", "UX/UI", "Tech Lead"],
      badge: "55% ↓ custo",
    },
    metodo: {
      tag: "MÉTODO ENVS",
      title: "Etapa limitante primeiro. Sempre.",
      desc: "Baseado na metodologia da Intel: identificamos o maior gargalo e resolvemos antes de avançar. Sem retrabalho.",
    },
    garantia: {
      tag: "GARANTIA",
      title: "Resultado ou devolução.",
      desc: "Quem tem skin in the game não precisa de contrato para levar seu negócio a sério.",
    },
  },

  dores: {
    eyebrow: "O DIAGNÓSTICO",
    title: "Sua empresa precisa de software próprio se isso soa familiar:",
    items: [
      {
        title: "O processo mais importante da empresa roda em planilha",
        body: "Aquela que só uma pessoa sabe mexer, que quebra quando alguém arrasta uma coluna, e que ninguém tem coragem de substituir porque a operação inteira depende dela.",
      },
      {
        title: "Você paga por sistema que resolve 70%. O resto é gambiarra.",
        body: "O ERP faz o básico. O que realmente diferencia sua operação continua sendo planilha, WhatsApp ou na cabeça de alguém. Você convive com isso porque “sempre foi assim”.",
      },
      {
        title: "Sua equipe digita a mesma informação em três lugares.",
        body: "O pedido entra no sistema, é copiado para a planilha, e depois relançado no financeiro. Cada cópia é uma chance de erro e uma hora de trabalho que ninguém contabiliza.",
      },
      {
        title: "Para saber um número, alguém monta relatório na mão.",
        body: "Financeiro, CRM, estoque, cada um num lugar diferente. A resposta existe, só não está pronta — e quando fica, já é informação de ontem.",
      },
      {
        title: "Você já ouviu “o sistema não faz isso”.",
        body: "E a resposta foi mudar o seu processo para caber na ferramenta. O fornecedor tem roadmap próprio; sua necessidade entra na fila atrás da de todo mundo.",
      },
      {
        title: "Você já contratou alguém que se dizia tech. Não funcionou.",
        body: "O freelancer sumiu depois do primeiro pagamento. Ou você contratou uma fábrica de software, mas o sistema quebrou e não havia ninguém para consertar. O problema nunca foi a tecnologia. Foi quem a entregou.",
      },
    ],
    fecho:
      "Nenhuma dessas situações é falta de esforço — é falta de uma ferramenta feita para você. O SaaS pronto resolve a média e deixa o resto na planilha. O freelancer entrega e some. A fábrica de software fecha o escopo e vai embora. O que o empresário precisa é de alguém que entenda o negócio, construa a tecnologia certa e continue presente enquanto a empresa cresce.",
  },

  // a aba deixa de ser "tipo de agente" e passa a ser "tipo de sistema"
  agentes: {
    eyebrow: "O QUE CONSTRUÍMOS",
    title: ["Do processo na planilha para o", "sistema em produção."],
    lead: "Cada projeto começa entendendo como sua empresa trabalha hoje. O software vem depois — e vem no formato que o processo pede.",
    tabs: [
      {
        icon: "🏗️",
        label: "Sistema interno",
        title: "O ERP que cabe na sua operação",
        steps: [
          "Mapeamos o processo real, incluindo as exceções",
          "Cada tela existe porque alguém de fato usa",
          "Regras de negócio viram código, não convenção oral",
          "Substitui a planilha crítica sem parar a operação",
        ],
      },
      {
        icon: "🌐",
        label: "Portal do cliente",
        title: "Seu cliente se atende sozinho",
        steps: [
          "Pedido, status, segunda via e histórico self-service",
          "Reduz o volume que hoje chega no WhatsApp",
          "Identidade visual da sua marca, não do fornecedor",
          "Integrado ao sistema que você já usa por dentro",
        ],
      },
      {
        icon: "📱",
        label: "App mobile",
        title: "A operação que acontece fora do escritório",
        steps: [
          "Equipe de campo registrando em tempo real",
          "Funciona offline e sincroniza depois",
          "Foto, assinatura e localização na mesma tela",
          "iOS e Android com uma base de código",
        ],
      },
      {
        icon: "🔌",
        label: "Integrações",
        title: "Seus sistemas parando de se ignorar",
        steps: [
          "ERP, CRM, banco, fiscal e planilhas conversando",
          "Fim da digitação da mesma informação em três lugares",
          "Erros de transcrição desaparecem",
          "Dado circula sozinho, sem ninguém empurrando",
        ],
      },
      {
        icon: "📊",
        label: "Dashboards",
        title: "O número certo, agora",
        steps: [
          "Indicadores da operação em tempo real",
          "Uma fonte de verdade, não três relatórios divergentes",
          "Alerta quando algo sai do esperado",
          "Decisão com dado de hoje, não de ontem",
        ],
      },
      {
        icon: "🚀",
        label: "Produto digital",
        title: "Transforma processo interno em receita",
        steps: [
          "Resolve a dor interna e ainda vende para o mercado",
          "Micro-SaaS construído em cima do que você já domina",
          "Nova fonte de receita recorrente",
          "Do MVP validado à plataforma completa",
        ],
      },
    ],
    outros: {
      tag: "SISTEMA DE PRATELEIRA",
      items: [
        "Feito para a média do mercado",
        "Seu processo se adapta à ferramenta",
        "Sua necessidade entra na fila do roadmap",
        "Custo cresce por usuário, para sempre",
      ],
    },
    envs: {
      tag: "COMO A ENVS FAZ",
      items: [
        "Feito a partir do seu processo real",
        "A ferramenta se adapta à sua operação",
        "Prioridade é sua, sprint a sprint",
        "Você é dono do código e da evolução",
      ],
    },
  },

  visibilidade: {
    ...defaultContent.visibilidade,
    board: {
      ...defaultContent.visibilidade.board,
      rows: [
        { task: "Integração com o ERP", sprint: "Sprint 4", status: "Concluído" },
        { task: "Portal do cliente v2", sprint: "Sprint 5", status: "Em andamento" },
        { task: "Dashboard de métricas", sprint: "Sprint 5", status: "Backlog" },
        { task: "App de campo — offline", sprint: "Sprint 6", status: "Backlog" },
      ],
    },
  },

  falha: {
    eyebrow: "POR QUE PROJETOS FALHAM",
    title: [
      "O problema raramente é técnico.",
      "É construir a coisa errada primeiro.",
    ],
    lead: "Toda operação tem uma Etapa Limitante — um único gargalo que segura tudo. Construir software para qualquer outra parte antes disso é gastar bem em algo que não muda o resultado.",
    maioria: {
      tag: "COMO A MAIORIA FAZ",
      rows: [
        { area: "Vendas", note: "ok", gargalo: false },
        { area: "Operação", note: "GARGALO", gargalo: true },
        { area: "Financeiro", note: "ok", gargalo: false },
        { area: "Suporte", note: "ok", gargalo: false },
      ],
      desc: "Digitaliza Vendas, Financeiro e Suporte. A Operação — o gargalo real — continua travando tudo. Resultado: sistema bonito, empresa no mesmo ritmo.",
    },
    envs: {
      tag: "MÉTODO ENVS",
      rows: [
        { area: "Vendas", note: "depois", gargalo: false },
        { area: "Operação", note: "RESOLVE AQUI", gargalo: true },
        { area: "Financeiro", note: "depois", gargalo: false },
        { area: "Suporte", note: "depois", gargalo: false },
      ],
      desc: "Primeiro resolve o gargalo real. Depois escala o restante. Resultado: o sistema inteiro flui.",
    },
    defasagem: {
      tag: "CONCEITO-CHAVE",
      title: "Defasagem de Tempo: por que a maioria desiste antes do resultado.",
      p1: "Entre colocar um sistema no ar e ver o ganho na operação existe um intervalo — a equipe precisa aprender, o processo precisa assentar. Quem não entende isso troca de rumo cedo demais.",
      p2: "A envs mapeia essa defasagem antes de escrever a primeira linha. Sabemos quando cada entrega vai produzir efeito — e combinamos isso com você antes de começar.",
    },
    steps: [
      {
        n: "1",
        title: "Identificar",
        desc: "Mapeamos qual etapa da sua operação está freando todo o restante. Não o que parece ser — o que realmente é.",
      },
      {
        n: "2",
        title: "Construir",
        desc: "Software só para o gargalo, no menor escopo que já resolve. No ar rápido, com uso real desde o começo.",
      },
      {
        n: "3",
        title: "Expandir",
        desc: "Com o gargalo resolvido, avançamos para o resto do sistema — agora com o processo já validado na prática.",
      },
    ],
  },

  stats: {
    eyebrow: "RESULTADOS COMPROVADOS",
    title: ["Não são palavras.", "São números de quem já fez."],
    items: [
      { prefix: "+", value: 5, suffix: " anos", label: "construindo software para quem não pode parar" },
      { prefix: "+", value: 50, suffix: " mil", label: "usuários simultâneos suportados pelos sistemas que entregamos" },
      { prefix: "", value: 7, suffix: " dígitos", label: "de faturamento gerados por clientes usando nossos sistemas" },
      { prefix: "", value: 3, suffix: " setores", label: "dominados: educação, telecomunicações e marketing digital" },
    ],
  },

  escritorio: {
    eyebrow: "NOSSO ESCRITÓRIO",
    title: "O time que vai construir o software do seu negócio.",
    lead: "Devs, designers, gestores e especialistas em produto. Todos sob o mesmo teto, focados na sua operação.",
  },

  garantiaFinal: {
    ...defaultContent.garantiaFinal,
    title: ["O risco é nosso tanto quanto é seu.", "Resultado ou devolução."],
  },

  finalCta: {
    eyebrow: "PRONTO PARA SAIR DA PLANILHA?",
    title: ["Toda empresa chega no dia", "em que precisa do próprio sistema.", "A sua já chegou?"],
    lead: "Uma call de 30 minutos para entender sua operação e mostrar o que dá para resolver primeiro.",
    primary: "Agendar call gratuita agora",
    secondary: "Ver o que construímos",
    footer: "© 2026 envs. Todos os direitos reservados.",
    domain: "envs.com.br",
  },

  depoimentos: [
    {
      nome: "Ricardo Menezes",
      cargo: "Diretor de Operações",
      empresa: "Vetorial Logística",
      texto:
        "A gente controlava roteirização em planilha e emitia nota uma a uma. A envs construiu o sistema em cima do nosso processo, não o contrário. Em duas semanas de uso a fila do dia seguinte tinha sumido.",
      verificado: false,
    },
    {
      nome: "Camila Andrade",
      cargo: "CFO",
      empresa: "Grupo Bertoni",
      texto:
        "Tínhamos três sistemas que não se falavam e um time inteiro digitando o mesmo dado em todos. Depois da integração, o número que eu levava dois dias para fechar passou a estar pronto de manhã.",
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
  ],

  depoimentosHeader: {
    eyebrow: "OUÇA QUEM JÁ VIVEU",
    title: "Empresas que pararam de se adaptar ao sistema.",
    lead: "Cada cliente abaixo tinha um processo travado por ferramenta genérica. Veja o que aconteceu depois.",
  },

  caseDestaque: {
    ...defaultContent.caseDestaque,
    title: "Eles tinham a ideia. A gente construiu o produto. Resultado?",
    titleHighlight: "+50 mil usuários simultâneos.",
    paragraphs: [
      "Em 2024, a Meduca chegou até a envs com um produto ambicioso: uma plataforma de educação para preparar alunos do interior do Nordeste para vestibulares e concursos — em um mercado que ainda rodava em grupo de WhatsApp, PDF e planilha.",
      "Nenhum sistema pronto atendia: o modelo de turma, a correção e o acompanhamento eram específicos demais. Construímos sob medida, colocamos o MVP no ar em 6 meses e evoluímos para uma arquitetura completa — front-end e back-end à altura do que a plataforma precisava suportar em semana de prova.",
    ],
    resultado: "Resultado: a plataforma sustentou mais de 50 mil usuários simultâneos.",
    antes:
      "Aulas por grupo de WhatsApp, material em PDF solto, matrícula em planilha. Nenhum sistema de prateleira cobria o modelo.",
    depois:
      "Plataforma própria, no ar, com base ativa e picos de 50 mil alunos ao mesmo tempo. Evoluída de MVP para produto completo.",
    cta: "Quero um resultado assim",
  },

  orbLabels: ["Sistemas internos", "Portais", "Apps", "Integrações"],

  statement: {
    lead: "A envs constrói",
    highlight: "o software que a sua operação precisava",
    rest: "— integra o que você já usa, substitui a planilha crítica e continua evoluindo enquanto o negócio cresce.",
  },

  integraTitle: "Conversa com o que você já tem",
  integraDesc:
    "Nada de trocar tudo. O sistema novo integra com o ERP, o CRM e as planilhas que já rodam hoje.",
  integraItems: ["ERP", "CRM", "Banco", "NF-e", "Sheets", "Slack", "E-mail", "APIs"],

  heads: {
    solucoes: {
      label: "o que nos diferencia",
      title: "O que separa a envs de uma fábrica de software",
      desc: "Fábrica fecha escopo e entrega. A gente entende o processo, constrói e continua junto.",
    },
    agentes: {
      label: "o que construímos",
      title: "Do processo na planilha ao sistema em produção",
    },
    prova: { label: "resultados", title: "Não são palavras. São números de quem já fez." },
    dores: { label: "o diagnóstico" },
    metodo: { label: "por que projetos falham" },
    futuro: { label: "por que agora" },
    virada: { label: "o ponto de virada" },
  },
};
