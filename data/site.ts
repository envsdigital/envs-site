// Copy deck: content/landing-copy.md §3 — verbatim. Não "melhorar" texto aqui.

export const WA_URL =
  "https://wa.me/5588981697614?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20envs%20e%20quero%20automatizar%20meus%20processos%20com%20IA.";

export const hero = {
  eyebrow: "AUTOMAÇÃO INTELIGENTE PARA EMPRESAS QUE QUEREM CRESCER",
  // última linha em verde
  headline: ["Pare de contratar pessoas", "para fazer o que a", "IA faz sozinha"],
  sub: "Financeiro, jurídico, comercial, logística. Todos os seus processos inteiros podem rodar sem intervenção humana.",
  cta: "Quero automatizar com a envs",
  trust: ["Sem compromisso", "Call de 30 min", "Resultado em semanas"],
  pills: ["Financeiro", "Jurídico", "Comercial", "Logística"],
};

export const virada = {
  eyebrow: "A VIRADA",
  title: ["A IA parou de responder.", "Começou a executar."],
  lead: "A maioria das empresas brasileiras ainda está presa no chatbot. O que está emergindo agora é outra coisa — e quem não perceber isso vai pagar caro.",
  cards: [
    {
      period: "PRIMEIRA ONDA",
      title: "IA que Responde",
      desc: "ChatGPT, chatbots, funil com IA, WhatsApp automático. A IA como canal de comunicação.",
      items: ["Chatbot de atendimento", "Automação de WhatsApp", "Funil com IA"],
      kicker: "Foi só a ponta do iceberg.",
      now: false,
    },
    {
      period: "SEGUNDA ONDA",
      title: "IA que Automatiza",
      desc: "Zapier, Make, n8n. Fluxos conectados. A IA como middleware entre sistemas.",
      items: ["Sequências pré-definidas", "Integração entre APIs", "Gatilhos e condições fixas"],
      kicker: "Evoluiu. Mas ainda não chegou lá.",
      now: false,
    },
    {
      period: "TERCEIRA ONDA — AGORA",
      title: "IA que Executa",
      desc: "Agentes autônomos que observam, decidem e agem — como um humano, mas sem parar.",
      items: ["Opera softwares e sistemas", "Toma decisões com contexto", "Adapta o comportamento"],
      kicker: "É aqui que está o dinheiro.",
      now: true,
    },
  ],
};

export const diferenca = {
  eyebrow: "A DIFERENÇA",
  title: "A diferença que ninguém está explicando direito.",
  compare: [
    {
      tag: "CHATBOT / AUTOMAÇÃO",
      desc: "“Se X acontecer, faça Y.” Sequência rígida. Quebra quando algo muda.",
      good: false,
    },
    {
      tag: "AGENTE AUTÔNOMO",
      desc: "Observa o ambiente, raciocina sobre o contexto, decide a ação e executa. Adapta quando muda.",
      good: true,
    },
  ],
  analogy:
    "Automação segue regras fixas. Agente autônomo toma decisões. O semáforo sempre faz a mesma coisa: verde, amarelo, vermelho. Se surgir um acidente na frente, ele não muda. O motorista vê, pensa e desvia.",
  praticaTitle: "O que um agente faz na prática",
  praticaLead: "Ele não conversa com o software. Ele opera o software.",
  verbs: ["Observa", "Decide", "Executa", "Aprende"],
  systems: ["Planilhas", "Documentos", "Softwares", "APIs", "qualquer sistema"],
  fecho:
    "Ignorar agentes autônomos hoje é o equivalente a ignorar a internet em 2005. A pergunta não é se isso vai afetar o seu negócio. É se você vai estar na frente ou atrás.",
  cta: "Quero estar na frente",
  provaTitle: "Mais de 5 anos construindo software para quem não pode parar.",
  setores: ["Educação", "Telecomunicações", "Marketing Digital", "E-commerce", "SaaS"],
};

export const futuro = {
  eyebrow: "O FUTURO CHEGOU",
  title: "A empresa que não automatiza seus processos com IA está com os dias contados.",
  paragraphs: [
    "Não é exagero. É o que já está acontecendo. Empresas que colocaram IA para operar seus processos estão reduzindo custo, escalando sem contratar e tomando decisões com dados em tempo real. As que não entraram ainda estão perdendo velocidade e nem perceberam.",
    "Toda grande onda tecnológica criou dois grupos: os que entraram cedo e dominaram o mercado, e os que esperaram e correram atrás. A diferença não está no produto, não está no preço. Está em quem opera mais rápido, com menos erro, sem depender de uma equipe que precisa crescer no mesmo ritmo que o faturamento.",
    "A IA não vai tirar o emprego do empresário. Mas o empresário que usa IA vai tirar o mercado de quem não usa.",
    "A envs é o parceiro que coloca você no lado certo dessa divisão.",
  ],
  timeline: [
    {
      era: "ANOS 2000",
      title: "Toda empresa precisou de um site.",
      desc: "Surgiu a agência web. Quem não estava online ficou invisível.",
    },
    {
      era: "ANOS 2010",
      title: "Toda empresa precisou de marketing digital.",
      desc: "Surgiu a assessoria de tráfego, a agência de conteúdo. Quem não anunciou perdeu mercado.",
    },
    {
      era: "AGORA",
      title: "Toda empresa vai precisar de IA na operação.",
      desc: "Surgiu o parceiro de operação com IA. Quem não automatizar os processos vai ser engolido por quem automatizou.",
    },
  ],
  fecho:
    "A envs implanta os agentes, integra os sistemas e continua do seu lado enquanto o negócio cresce. Não é consultoria que entrega relatório. Não é software house que some. É o parceiro permanente que coloca IA para operar sua empresa e fica do lado para garantir que funciona.",
  cta: "Quero automatizar com a envs",
  bullets: [
    "Agentes de IA que operam seus processos 24h",
    "Integração entre todos os seus sistemas",
    "Sistemas feitos para o seu processo real",
    "Parceria contínua, não some após a entrega",
  ],
};

export const stack = {
  eyebrow: "STACK CERTIFICADA",
  title: "Tecnologia de ponta, dominada de dentro para fora.",
  lead: "Nossa equipe é certificada nas plataformas que operam o futuro. Não usamos IA por fora. A gente vive dentro dela.",
  items: [
    { name: "OpenAI", role: "API & Agents" },
    { name: "Claude", role: "Anthropic API" },
    { name: "AWS", role: "Cloud & Deploy" },
    { name: "Supabase", role: "Database & Auth" },
    { name: "JavaScript", role: "Full Stack" },
    { name: "Python", role: "AI & Backend" },
    { name: "React", role: "Web Apps" },
    { name: "React Native", role: "Mobile Apps" },
  ],
  selo: "15+ certificações ativas · Stack atualizada continuamente",
};

export const frentes = {
  eyebrow: "O QUE A ENVS FAZ",
  title: "Um parceiro de tech que opera as três frentes do seu negócio.",
  lead: "Não é uma contratação pontual. É um braço tecnológico permanente que se pluga à sua empresa.",
  f1: {
    tag: "FRENTE 01",
    title: "Implantação de Agentes de IA",
    desc: "Agentes autônomos que operam seus processos sem intervenção humana. Financeiro, jurídico, comercial — rodando 24h.",
    terminal: [
      "agente_financeiro.run()",
      "Nota fiscal emitida automaticamente",
      "Cobrança enviada ao cliente",
      "Processando conciliação bancária...",
    ],
    bullets: [
      "Processos rodando 24h sem parar",
      "Integração com sistemas que você já usa",
      "Zero dependência de pessoa específica",
    ],
  },
  f2: {
    tag: "FRENTE 02",
    title: "Desenvolvimento de Software",
    desc: "Sistemas sob medida para o seu processo real. Do protótipo em Figma ao produto em produção.",
    pipeline: ["Figma", "Code", "Deploy ✓"],
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
};

export const dores = {
  eyebrow: "POR QUE EMPRESAS FICAM PARA TRÁS",
  title: "A empresa que vai ficar para trás tem exatamente esse perfil:",
  items: [
    {
      title: "Ele abre 3 abas, 2 planilhas e um grupo no WhatsApp",
      body: "e diz: “é assim que a gente se organiza.” Não está errado. Está fazendo o que dá pra fazer. O problema é que nenhum sistema genérico foi construído para o processo real da sua empresa.",
    },
    {
      title: "A empresa cresce mas a operação não acompanha.",
      body: "Você vende mais, contrata mais gente, e mesmo assim a sensação é de que está sempre apagando incêndio. O problema não é venda. É que o processo interno não foi feito para escalar.",
    },
    {
      title: "Tudo depende de uma pessoa específica para funcionar.",
      body: "Tem sempre aquela pessoa que “sabe como é feito”. Se ela some por um dia, a operação trava. Isso não é processo. É risco disfarçado de rotina.",
    },
    {
      title: "Você toma decisão com informação de ontem.",
      body: "Financeiro, CRM, estoque, cada um num lugar diferente. Para saber o número certo você precisa abrir três sistemas, cruzar na mão e torcer para que ninguém tenha esquecido de atualizar.",
    },
    {
      title: "Paga por sistema que resolve 70%. O resto é gambiarra.",
      body: "O ERP faz o básico. O que realmente diferencia sua operação continua sendo planilha, WhatsApp ou na cabeça de alguém. Você convive com isso porque “sempre foi assim”.",
    },
    {
      title: "Você já contratou alguém que se dizia tech. Não funcionou.",
      body: "O freelancer sumiu depois do primeiro pagamento. Ou você contratou uma software house, mas o sistema quebrou e não havia ninguém para consertar. O problema nunca foi a tecnologia. Foi quem a entregou.",
    },
  ],
  fecho:
    "Enquanto você gerencia esse caos, alguém no seu mercado não está. Alguém já está colocando IA para operar o que você ainda faz na mão. Toda semana que passa, essa vantagem cresce. Nenhuma dessas situações é falta de esforço — é falta do parceiro certo. O SaaS pronto resolve 70% e deixa o resto na planilha. O freelancer entrega e some. A software house fecha o escopo e vai embora. É exatamente isso que o empresário precisa: alguém que entende o negócio, constrói a tecnologia certa, coloca agentes para operar de verdade e continua presente enquanto a empresa cresce.",
};

export const agentes = {
  eyebrow: "O QUE OS AGENTES FAZEM NA PRÁTICA",
  title: ["Da IA que responde para a", "IA que executa."],
  lead: "Um agente autônomo não conversa com o software. Ele opera o software, da mesma forma que um humano faria, mas sem parar, sem errar por cansaço, sem precisar de férias.",
  tabs: [
    {
      icon: "💰",
      label: "Financeiro",
      title: "Agente que cuida do seu caixa",
      steps: [
        "Abre o financeiro todo dia e identifica inadimplência",
        "Cruza com o CRM e categoriza por risco",
        "Dispara régua de cobrança automaticamente",
        "Gera relatório executivo toda semana",
      ],
    },
    {
      icon: "⚙️",
      label: "Operação",
      title: "Agente que cuida dos seus processos",
      steps: [
        "Pega o pedido, verifica estoque, emite nota fiscal",
        "Agenda entrega e notifica o cliente",
        "Tudo sem nenhum humano no processo",
        "Integra sistemas que nunca foram feitos para se conversar",
      ],
    },
    {
      icon: "📈",
      label: "Comercial",
      title: "Agente que cuida das suas vendas",
      steps: [
        "Monitora CRM e identifica oportunidades paradas",
        "Dispara follow-up no momento certo",
        "Atualiza dados sem depender do vendedor lembrar",
        "Gera relatório de pipeline em tempo real",
      ],
    },
    {
      icon: "⚖️",
      label: "Jurídico",
      title: "Agente que lê contratos por você",
      steps: [
        "Lê contratos e extrai cláusulas relevantes",
        "Compara com histórico e gera alerta",
        "Monitora prazos e obrigações automaticamente",
        "Elimina revisão manual de documentos",
      ],
    },
    {
      icon: "💻",
      label: "Produto Digital",
      title: "Transforma processo interno em receita",
      steps: [
        "Resolve a dor interna e ainda vende para concorrentes",
        "Micro-SaaS construído em cima do que você já sabe",
        "Nova fonte de receita recorrente sem custo marginal",
        "Sistema próprio como vantagem competitiva",
      ],
    },
    {
      icon: "🤖",
      label: "Qualquer Processo",
      title: "Se existe trabalho manual repetitivo, existe um agente para ele.",
      steps: [
        "RH, logística, administrativo, atendimento",
        "Integrações entre sistemas incompatíveis",
        "Automações de back-office que liberam sua equipe",
        "Qualquer processo que hoje depende de um humano específico",
      ],
    },
  ],
  outros: {
    tag: "COMO OS OUTROS FAZEM",
    items: [
      "Executa sequência rígida pré-definida",
      "Quebra quando algo muda",
      "Não toma decisões",
      "É um semáforo",
    ],
  },
  envs: {
    tag: "COMO A ENVS FAZ",
    items: [
      "Observa, decide e adapta a ação",
      "Funciona com variáveis e exceções",
      "Age como um colaborador experiente",
      "É um motorista",
    ],
  },
};

export const visibilidade = {
  eyebrow: "VISIBILIDADE TOTAL",
  title: "Acompanhe cada entrega em tempo real.",
  lead: "Backlog 100% compartilhado e aberto 24/7. Você sabe exatamente o que está sendo feito, o que vem a seguir e quanto foi entregue.",
  features: [
    { title: "Backlog público", desc: "Acesse qualquer tarefa, status e prioridade a qualquer hora." },
    { title: "Ciclos curtos de entrega", desc: "Sprints semanais com entregas visíveis — sem esperar meses para ver resultado." },
    { title: "Alinhamento quinzenal", desc: "ZIP Call: reunião compacta para decidir o próximo passo. Sem enrolação." },
  ],
  board: {
    url: "backlog.envs.com.br",
    rows: [
      { task: "Integração com CRM", sprint: "Sprint 4", status: "Concluído" },
      { task: "Agente financeiro v2", sprint: "Sprint 5", status: "Em andamento" },
      { task: "Dashboard de métricas", sprint: "Sprint 5", status: "Backlog" },
      { task: "Módulo de relatórios", sprint: "Sprint 6", status: "Backlog" },
    ],
    footer: "12 tarefas · Sprint 5 ativo",
  },
};

export const falha = {
  eyebrow: "POR QUE A MAIORIA FALHA",
  title: ["O problema não é falta de automação.", "É automatizar as coisas erradas primeiro."],
  lead: "Toda operação tem uma Etapa Limitante — um único gargalo que segura tudo. Quem não resolve isso primeiro, resolve nada.",
  maioria: {
    tag: "COMO A MAIORIA FAZ",
    rows: [
      { area: "Vendas", note: "ok", gargalo: false },
      { area: "Operação", note: "GARGALO", gargalo: true },
      { area: "Financeiro", note: "ok", gargalo: false },
      { area: "Suporte", note: "ok", gargalo: false },
    ],
    desc: "Automatiza Vendas, Financeiro e Suporte. A Operação — o gargalo real — continua travando tudo. Resultado: dinheiro jogado fora.",
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
    title: "Defasagem de Tempo: por que a maioria não vê resultado.",
    p1: "Entre fazer uma mudança e ver o resultado dela existe um intervalo — a defasagem. Quem não entende isso desiste cedo demais, ou pisa no acelerador na hora errada.",
    p2: "A envs mapeia essa defasagem antes de qualquer intervenção. Sabemos exatamente quando cada ação vai produzir resultado — e comunicamos isso para você.",
  },
  steps: [
    { n: "1", title: "Identificar", desc: "Mapeamos qual etapa da sua operação está freando todo o restante. Não o que parece ser — o que realmente é." },
    { n: "2", title: "Explorar", desc: "Esgotamos tudo que é possível fazer no gargalo antes de tocar em qualquer outra coisa." },
    { n: "3", title: "Elevar", desc: "Só então expandimos para o restante do sistema — com o gargalo resolvido, tudo o mais flui naturalmente." },
  ],
};

export const stats = {
  eyebrow: "RESULTADOS COMPROVADOS",
  title: ["Não são palavras.", "São números de quem já fez."],
  items: [
    { prefix: "+", value: 5, suffix: " anos", label: "desenvolvendo software para quem não pode parar" },
    { prefix: "+", value: 50, suffix: " mil", label: "usuários simultâneos suportados pelas ferramentas que construímos" },
    { prefix: "", value: 7, suffix: " dígitos", label: "de faturamento gerados por clientes usando nossos sistemas" },
    { prefix: "", value: 3, suffix: " setores", label: "dominados: educação, telecomunicações e marketing digital" },
  ],
};

export const escritorio = {
  eyebrow: "NOSSO ESCRITÓRIO",
  title: "O time que vai operar a tecnologia do seu negócio.",
  lead: "Devs, designers, gestores e especialistas em IA. Todos sob o mesmo teto, focados na sua operação.",
};

export const garantiaFinal = {
  eyebrow: "NOSSA GARANTIA",
  title: ["O risco é nosso tanto quanto é seu.", "Resultado ou devolução. Simples assim."],
  body: "Contratar errado no mercado de tech não é só perder dinheiro. É perder tempo — e no mundo dos negócios, tempo perdido é mercado que o seu concorrente tomou. Se em qualquer etapa você sentir que não estamos entregando o que prometemos, corrigimos o rumo ou devolvemos seu investimento. Sem burocracia. Sem letras miúdas.",
  quote: "Quem tem skin in the game não precisa de contrato para levar seu negócio a sério.",
};

export const finalCta = {
  eyebrow: "PRONTO PARA NÃO FICAR PARA TRÁS?",
  title: ["Seus processos já podiam estar", "rodando sozinhos.", "Por que ainda não estão?"],
  lead: "Uma call de 30 minutos para entender sua operação e mostrar onde os agentes de IA geram resultado imediato.",
  primary: "Agendar call gratuita agora",
  secondary: "Ver a tese completa",
  footer: "© 2026 envs. Todos os direitos reservados.",
  domain: "envs.com.br",
};
