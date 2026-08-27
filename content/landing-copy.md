# envs — Landing (modelada a partir de dizevolv.com.br)

Referência de copy: https://dizevolv.com.br/ (analisada 2026-08-27).
Posicionamento adotado: **parceiro de operação com IA** + software house + squad —
"tudo que a Dizevolv oferece", com a marca e as provas da envs.

---

## 1. Qual prompt do "One-Prompt Website Pack" se adequa

**Melhor encaixe: PROMPT 09 — AGENCY / STUDIO.**

Por quê: a Dizevolv não vende um produto, vende uma **parceria de serviço** com
manifesto forte, lista de frentes/serviços, cases, números, time e um CTA gigante
de "fale com a gente". Essa é exatamente a espinha do Prompt 09 (NOIR&CO):
manifesto cinético + grid de cases + lista de serviços editorial + seção de time +
footer/CTA oversized + cursor com dot. É o único dos 10 que é "agência que presta
serviço" e não "lançamento de produto".

**O que puxar dos outros prompts (a landing da envs tem mais seções que o NOIR&CO):**

| Elemento da envs/Dizevolv | Técnica emprestada de |
|---|---|
| Linhas do tempo "2023→2026" e "Anos 2000→2010→2025" com scroll-scrub | **Prompt 02 / 06** (clipes encadeados start/end frame = a linha do tempo "rola" como uma descida contínua) |
| Contadores animados (+100 SaaS, R$10M, 3x, 15 certificações) | **Prompt 08 / 03** (stats strip que conta no scroll) |
| Case de destaque com número gigante ("R$7M") | **Prompt 03** (finale com número em display type) |
| Hero com glow radial + tags flutuantes nos cantos | ajuste do hero orbit do **Prompt 01/09** trocando o clipe por partículas/glow |

**Não use** o Prompt 08 puro: ele força tabela de preços e "Start free", que não
existem no modelo Dizevolv (o CTA é sempre "agende uma call").

---

## 2. Prompt de build

Movido para [`PROMPT.md`](../PROMPT.md) na raiz do repo — é o arquivo executável
e a versão autoritativa. Ele lê a copy da §3 abaixo e os assets de `design/`.
Regras que ele carrega: cores e logo/ícone vêm do guia de estilo (inegociáveis);
a fonte é escolha do modelo, só com direção de estilo (§6).

---

## 3. Copy deck — versão envs (PT-BR, pronta pra usar)

> Estrutura e retórica espelhadas da Dizevolv, reescritas para a envs.
>
> **Convenção de marcação:**
> - `[[placeholder]]` — falta dado real seu.
> - `⚠️ EXEMPLO` — texto que **eu inventei** só para preencher o layout.
>   Não pode ir ao ar como se fosse real. Ou você substitui por algo verdadeiro,
>   ou a seção sai. Ver §5.

### CONFIG — links e contatos

| Item | Valor |
|---|---|
| Domínio | `envs.com.br` |
| WhatsApp | (88) 98169-7614 |
| Link de todos os CTAs | `https://wa.me/5588981697614?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20envs%20e%20quero%20automatizar%20meus%20processos%20com%20IA.` |
| Backlog público | [[backlog.envs.com.br — confirmar se existe]] |

Todo botão da página (`Quero automatizar com a envs`, `Quero estar na frente`,
`Agendar call gratuita agora`, `Quero um resultado assim`) aponta para esse mesmo
link do WhatsApp, com `target="_blank" rel="noopener"`.

### HERO
- Eyebrow: **AUTOMAÇÃO INTELIGENTE PARA EMPRESAS QUE QUEREM CRESCER**
- Headline:
  > Pare de contratar pessoas
  > para fazer o que a
  > **IA pode fazer sozinha.**
- Subhead: Financeiro, jurídico, comercial, logística. Todos os seus processos inteiros podem rodar sem intervenção humana.
- CTA: **Quero automatizar com a envs**
- Trust line: Sem compromisso · Call de 30 min · Resultado em semanas
- Tags flutuantes: Financeiro · Jurídico · Comercial · Logística

### 2026: A VIRADA
- Título: Se 2024 foi o ano do chat, **2026 é o ano da IA que executa.**
- Lead: A maioria das empresas brasileiras ainda está presa no chatbot. O que está emergindo agora é outra coisa — e quem não perceber isso vai pagar caro.
- Card 2023–2024 — **IA que Responde**: ChatGPT, chatbots, funil com IA, WhatsApp automático. A IA como canal de comunicação.
  - Chatbot de atendimento · Automação de WhatsApp · Funil com IA
  - Kicker: Foi só a ponta do iceberg.
- Card 2025 — **IA que Automatiza**: Zapier, Make, n8n. Fluxos conectados. A IA como middleware entre sistemas.
  - Sequências pré-definidas · Integração entre APIs · Gatilhos e condições fixas
  - Kicker: Evoluiu. Mas ainda não chegou lá.
- Card 2026 / AGORA — **IA que Executa** (destaque verde): Agentes autônomos que observam, decidem e agem — como um humano, mas sem parar.
  - Opera softwares e sistemas · Toma decisões com contexto · Adapta o comportamento
  - Kicker: É aqui que está o dinheiro.

### A DIFERENÇA
- Título: A diferença que ninguém está explicando direito.
- **CHATBOT / AUTOMAÇÃO**: "Se X acontecer, faça Y." Sequência rígida. Quebra quando algo muda.
- **AGENTE AUTÔNOMO**: Observa o ambiente, raciocina sobre o contexto, decide a ação e executa. Adapta quando muda.
- Analogia: Automação segue regras fixas. Agente autônomo toma decisões. O semáforo sempre faz a mesma coisa: verde, amarelo, vermelho. Se surgir um acidente na frente, ele não muda. O motorista vê, pensa e desvia.
- "O que um agente faz na prática": Ele não conversa com o software. Ele opera o software.
  - Diagrama: **Agente IA** ⟶ Observa · Decide · Executa · Aprende ⟶ Planilhas · Documentos · Softwares · APIs · qualquer sistema
- Fecho: Ignorar agentes autônomos em 2026 é o equivalente a ignorar a internet em 2005. A pergunta não é *se* isso vai afetar o seu negócio. É se você vai estar na frente ou atrás.
- CTA: **Quero estar na frente**
- **Faixa de prova social** — ver §5: **não** usar logos de clientes inventados nem
  logos de empresas reais que não são clientes. Substituto honesto e já verdadeiro,
  baseado no que o site atual da envs afirma:
  > **Mais de 5 anos construindo software para quem não pode parar.**
  > Educação · Telecomunicações · Marketing Digital · E-commerce · SaaS
  Marquee horizontal com os setores. Quando houver clientes com autorização de uso
  de marca, troca por logos reais.

### O FUTURO CHEGOU
- Título: A empresa que não automatiza seus processos com IA está com os dias contados.
- Parágrafos (manter o tom):
  > Não é exagero. É o que já está acontecendo. Empresas que colocaram IA para operar seus processos estão reduzindo custo, escalando sem contratar e tomando decisões com dados em tempo real. As que não entraram ainda estão perdendo velocidade e nem perceberam.
  >
  > Toda grande onda tecnológica criou dois grupos: os que entraram cedo e dominaram o mercado, e os que esperaram e correram atrás. A diferença não está no produto, não está no preço. Está em quem opera mais rápido, com menos erro, sem depender de uma equipe que precisa crescer no mesmo ritmo que o faturamento.
  >
  > A IA não vai tirar o emprego do empresário. Mas o empresário que usa IA vai tirar o mercado de quem não usa.
  >
  > A envs é o parceiro que coloca você no lado certo dessa divisão.
- Timeline histórica:
  - **ANOS 2000** — Toda empresa precisou de um site. Surgiu a agência web. Quem não estava online ficou invisível.
  - **ANOS 2010** — Toda empresa precisou de marketing digital. Surgiu a assessoria de tráfego, a agência de conteúdo. Quem não anunciou perdeu mercado.
  - **2025 EM DIANTE** — Toda empresa vai precisar de IA na operação. Surgiu o parceiro de operação com IA. Quem não automatizar os processos vai ser engolido por quem automatizou.
- Fecho: A envs implanta os agentes, integra os sistemas e continua do seu lado enquanto o negócio cresce. Não é consultoria que entrega relatório. Não é software house que some. É o parceiro permanente que coloca IA para operar sua empresa e fica do lado para garantir que funciona.
- CTA: **Quero automatizar com a envs**
- 4 bullets: Agentes de IA que operam seus processos 24h · Integração entre todos os seus sistemas · Sistemas feitos para o seu processo real · Parceria contínua, não some após a entrega

### STACK CERTIFICADA
- Título: Tecnologia de ponta, dominada de dentro para fora.
- Lead: Nossa equipe é certificada nas plataformas que operam o futuro. Não usamos IA por fora. A gente vive dentro dela.
- Grid: OpenAI · Claude (Anthropic) · AWS · Supabase · JavaScript · Python · React · React Native · [[+ o que a envs usar de fato]]
- Selo: **[[15]]+ certificações ativas · Stack atualizada continuamente**

### O QUE A ENVS FAZ
- Título: Um parceiro de tech que opera as três frentes do seu negócio.
- Lead: Não é uma contratação pontual. É um braço tecnológico permanente que se pluga à sua empresa.
- **FRENTE 01 — Implantação de Agentes de IA**: Agentes autônomos que operam seus processos sem intervenção humana. Financeiro, jurídico, comercial — rodando 24h.
  - Mock: `agente_financeiro.run()` → Nota fiscal emitida automaticamente → Cobrança enviada ao cliente → Processando conciliação bancária...
  - Processos rodando 24h sem parar · Integração com sistemas que você já usa · Zero dependência de pessoa específica
- **FRENTE 02 — Desenvolvimento de Software**: Sistemas sob medida para o seu processo real. Do protótipo em Figma ao produto em produção.
  - Mock: Figma → Code → Deploy ✓
- **FRENTE 03 — Squad Plugado na Empresa**: Time completo integrado à sua operação. Sem CLT, sem headache, sem sumiço.
  - Chips: Frontend · Backend · UX/UI · Tech Lead — **[[55%]] ↓ custo**
- **MÉTODO ENVS — Etapa limitante primeiro. Sempre.**: Baseado na metodologia da Intel: identificamos o maior gargalo e resolvemos antes de avançar. Sem retrabalho.
- **GARANTIA — Resultado ou devolução.**: Quem tem skin in the game não precisa de contrato para levar seu negócio a sério.

### POR QUE EMPRESAS FICAM PARA TRÁS
- Título: A empresa que vai ficar para trás tem exatamente esse perfil:
1. **Ele abre 3 abas, 2 planilhas e um grupo no WhatsApp** e diz: "é assim que a gente se organiza." Não está errado. Está fazendo o que dá pra fazer. O problema é que nenhum sistema genérico foi construído para o processo real da sua empresa.
2. **A empresa cresce mas a operação não acompanha.** Você vende mais, contrata mais gente, e mesmo assim a sensação é de que está sempre apagando incêndio. O problema não é venda. É que o processo interno não foi feito para escalar.
3. **Tudo depende de uma pessoa específica para funcionar.** Tem sempre aquela pessoa que "sabe como é feito". Se ela some por um dia, a operação trava. Isso não é processo. É risco disfarçado de rotina.
4. **Você toma decisão com informação de ontem.** Financeiro, CRM, estoque, cada um num lugar diferente. Para saber o número certo você precisa abrir três sistemas, cruzar na mão e torcer para que ninguém tenha esquecido de atualizar.
5. **Paga por sistema que resolve 70%. O resto é gambiarra.** O ERP faz o básico. O que realmente diferencia sua operação continua sendo planilha, WhatsApp ou na cabeça de alguém. Você convive com isso porque "sempre foi assim".
6. **Você já contratou alguém que se dizia tech. Não funcionou.** O freelancer sumiu depois do primeiro pagamento. Ou você contratou uma software house, mas o sistema quebrou e não havia ninguém para consertar. O problema nunca foi a tecnologia. Foi quem a entregou.
- Fecho: Enquanto você gerencia esse caos, alguém no seu mercado não está. Alguém já está colocando IA para operar o que você ainda faz na mão. Toda semana que passa, essa vantagem cresce. Nenhuma dessas situações é falta de esforço — é falta do parceiro certo. O SaaS pronto resolve 70% e deixa o resto na planilha. O freelancer entrega e some. A software house fecha o escopo e vai embora. É exatamente isso que o empresário precisa: alguém que entende o negócio, constrói a tecnologia certa, coloca agentes para operar de verdade e continua presente enquanto a empresa cresce.

### O QUE OS AGENTES FAZEM NA PRÁTICA
- Título: Da IA que responde para a IA que executa.
- Lead: Um agente autônomo não conversa com o software. Ele opera o software, da mesma forma que um humano faria, mas sem parar, sem errar por cansaço, sem precisar de férias.
- Abas: 💰 Financeiro · ⚙️ Operação · 📈 Comercial · ⚖️ Jurídico · 💻 Produto Digital · 🤖 Qualquer Processo

**💰 FINANCEIRO — Agente que cuida do seu caixa**
- Abre o financeiro todo dia e identifica inadimplência
- Cruza com o CRM e categoriza por risco
- Dispara régua de cobrança automaticamente
- Gera relatório executivo toda semana

**⚙️ OPERAÇÃO — Agente que cuida dos seus processos**
- Pega o pedido, verifica estoque, emite nota fiscal
- Agenda entrega e notifica o cliente
- Tudo sem nenhum humano no processo
- Integra sistemas que nunca foram feitos para se conversar

**📈 COMERCIAL — Agente que cuida das suas vendas**
- Monitora CRM e identifica oportunidades paradas
- Dispara follow-up no momento certo
- Atualiza dados sem depender do vendedor lembrar
- Gera relatório de pipeline em tempo real

**⚖️ JURÍDICO — Agente que lê contratos por você**
- Lê contratos e extrai cláusulas relevantes
- Compara com histórico e gera alerta
- Monitora prazos e obrigações automaticamente
- Elimina revisão manual de documentos

**💻 PRODUTO DIGITAL — Transforma processo interno em receita**
- Resolve a dor interna e ainda vende para concorrentes
- Micro-SaaS construído em cima do que você já sabe
- Nova fonte de receita recorrente sem custo marginal
- Sistema próprio como vantagem competitiva

**🤖 QUALQUER PROCESSO — Se existe trabalho manual repetitivo, existe um agente para ele.**
- RH, logística, administrativo, atendimento
- Integrações entre sistemas incompatíveis
- Automações de back-office que liberam sua equipe
- Qualquer processo que hoje depende de um humano específico

**Comparativo fixo (aparece abaixo de qualquer aba):**
- **COMO OS OUTROS FAZEM**: Executa sequência rígida pré-definida · Quebra quando algo muda · Não toma decisões · É um semáforo
- **COMO A ENVS FAZ**: Observa, decide e adapta a ação · Funciona com variáveis e exceções · Age como um colaborador experiente · É um motorista

### VISIBILIDADE TOTAL
- Título: Acompanhe cada entrega em tempo real.
- Lead: Backlog 100% compartilhado e aberto 24/7. Você sabe exatamente o que está sendo feito, o que vem a seguir e quanto foi entregue.
- **Backlog público** — Acesse qualquer tarefa, status e prioridade a qualquer hora.
- **Ciclos curtos de entrega** — Sprints semanais com entregas visíveis, sem esperar meses para ver resultado.
- **Alinhamento quinzenal** — ZIP Call: reunião compacta para decidir o próximo passo. Sem enrolação.
- Board: `backlog.envs.com.br` — colunas Backlog / Em andamento / Concluído; linhas de exemplo (Integração com CRM · Agente financeiro v2 · Dashboard de métricas · Módulo de relatórios).

### POR QUE A MAIORIA FALHA
- Título: O problema não é falta de automação. É automatizar as coisas erradas primeiro.
- Lead: Toda operação tem uma **Etapa Limitante** — um único gargalo que segura tudo. Quem não resolve isso primeiro, resolve nada.
- **COMO A MAIORIA FAZ**: automatiza Vendas, Financeiro e Suporte. A Operação — o gargalo real — continua travando tudo. Resultado: dinheiro jogado fora.
- **MÉTODO ENVS**: primeiro resolve o gargalo real, depois escala o restante. Resultado: o sistema inteiro flui.
- **Defasagem de Tempo — por que a maioria não vê resultado.**: Entre fazer uma mudança e ver o resultado dela existe um intervalo — a defasagem. Quem não entende isso desiste cedo demais, ou pisa no acelerador na hora errada. A envs mapeia essa defasagem antes de qualquer intervenção. Sabemos exatamente quando cada ação vai produzir resultado — e comunicamos isso para você.
- 3 passos:
  1. **Identificar** — Mapeamos qual etapa da sua operação está freando todo o restante. Não o que parece ser — o que realmente é.
  2. **Explorar** — Esgotamos tudo que é possível fazer no gargalo antes de tocar em qualquer outra coisa.
  3. **Elevar** — Só então expandimos para o restante do sistema — com o gargalo resolvido, tudo o mais flui naturalmente.

### DEPOIMENTOS
- Título: Resultados de quem não ficou para trás.
- Lead: Cada cliente abaixo tinha um processo manual que travava o crescimento. Veja o que aconteceu depois.

> **`status: rascunho`** — os três textos abaixo são meus, escritos para você ver o
> bloco montado e para o dev ter conteúdo realista (tamanhos variados, cargos
> plausíveis, números específicos — é isso que faz o layout se comportar como no ar).
> **Servem para desenvolver, não para publicar.** Ver checklist §5.

- **Ricardo Menezes** — Diretor de Operações · Vetorial Logística
  > "A gente emitia nota manualmente, um a um, e sempre sobrava pedido para o dia seguinte. Hoje o agente pega o pedido, confere estoque, emite a nota e avisa o cliente. Ninguém toca. Zeramos a fila em duas semanas."

- **Camila Andrade** — CFO · Grupo Bertoni
  > "A inadimplência era o nosso buraco. O agente abre o financeiro todo dia, cruza com o CRM e dispara a régua sozinho. Em quatro meses caímos de 18% para 6% e o time de cobrança virou time de relacionamento."

- **Thiago Vasconcelos** — Fundador · Meduca
  > "Eu tinha o produto na cabeça e nenhuma linha de código. Em seis meses estava no ar com usuário pagante. O que mais me pegou não foi a entrega — foi que eles continuaram depois dela."

**Como trocar pelos reais rápido:** pega os 4 projetos que já estão no site atual
(Loja de NFTs, Saúde e Bem-estar, Loja de Moda, Dashboards), manda uma mensagem
para o contato de cada um pedindo 2 linhas + autorização de uso do nome. Três
respostas resolvem a seção e ficam melhores que qualquer texto meu.

### CASE DE DESTAQUE
- Título: Eles tinham a ideia. A gente construiu o produto. Resultado? **[[número]]**

> **`status: rascunho`** — prosa completa e realista abaixo, colchetes só onde entra
> dado verificável. A envs **já tem** case real para encaixar aqui: o site atual
> afirma "+50 mil usuários simultâneos" e "clientes com faturamento de 7 dígitos".
> Escolha um desses projetos e preencha. Esta é a seção que faz a afirmação factual
> mais forte da página sobre um terceiro — é a que mais compensa ser verdadeira.

- Corpo (modelo pronto, trocar os colchetes):
  > Em [[ano]], a [[cliente]] chegou até a envs com um produto ambicioso:
  > [[o que era — ex.: uma plataforma para conectar X e Y, operando em um mercado
  > que ainda rodava no WhatsApp e na planilha]].
  >
  > A ideia era sólida. Mas precisavam de um parceiro técnico para tirá-la do papel
  > rápido. Construímos o MVP com agilidade, colocamos o produto no ar em [[X]] meses
  > e a [[cliente]] foi para o mercado com algo concreto nas mãos. Com uma ferramenta
  > real rodando, [[validaram o modelo / escalaram a base]] e evoluímos juntos para
  > uma arquitetura completa — front-end e back-end à altura do que a plataforma
  > precisava suportar.
  >
  > Resultado: [[número]].
- ANTES: [[situação antes — ex.: "Operação inteira em planilha e grupo de WhatsApp. Sem produto. Sem nada para mostrar ao mercado."]]
- DEPOIS: [[situação depois — ex.: "Produto real, no ar, com base ativa. Evoluído de MVP para plataforma completa."]]
- Número gigante: **[[+50 mil usuários / R$ X]]**
- CTA: **Quero um resultado assim** · link: [[cliente.com.br]]

### RESULTADOS COMPROVADOS
- Título: Não são palavras. São números de quem já fez.

> Estes quatro vêm do **site atual da envs** — são seus, já publicados, pode usar.
> Não copiei os números da Dizevolv (+100 projetos / R$10M): além de falsos para
> vocês, são as métricas declaradas de um concorrente direto.

- **+5 anos** desenvolvendo software para quem não pode parar
- **+50 mil** usuários simultâneos suportados pelas ferramentas que construímos
- **7 dígitos** de faturamento gerados por clientes usando nossos sistemas
- **3 setores** dominados: educação, telecomunicações e marketing digital
- [[se tiver: nº de projetos entregues, nº de certificações — vira um 5º card]]

### NOSSO ESCRITÓRIO
- Título: O time que vai operar a tecnologia do seu negócio.
- Lead: Devs, designers, gestores e especialistas em IA. Todos sob o mesmo teto, focados na sua operação.

### GARANTIA (bloco final antes do CTA)
- Título: O risco é nosso tanto quanto é seu. Resultado ou devolução. Simples assim.
- Corpo: Contratar errado no mercado de tech não é só perder dinheiro. É perder tempo — e no mundo dos negócios, tempo perdido é mercado que o seu concorrente tomou. Se em qualquer etapa você sentir que não estamos entregando o que prometemos, corrigimos o rumo ou devolvemos seu investimento. Sem burocracia. Sem letras miúdas. Quem tem skin in the game não precisa de contrato para levar seu negócio a sério.

### CTA FINAL
- Eyebrow: PRONTO PARA NÃO FICAR PARA TRÁS?
- Título: Toda empresa vai precisar de um parceiro de tech com IA. **A sua já tem?**
- Lead: Uma call de 30 minutos para entender sua operação e mostrar onde os agentes de IA geram resultado imediato.
- CTA primário: **Agendar call gratuita agora**
- CTA secundário: Ver a tese completa
- Footer: © 2026 envs. Todos os direitos reservados. · envs.com.br

---

## 4. Status — o que está pronto

✅ **Pronto, pode desenvolver com isso:**
- Copy de todas as 15 seções (hero, manifestos, dores, método, garantia, CTAs)
- As 6 abas de "O que os agentes fazem na prática" — lidas do site de referência
- Conteúdo dos mocks de UI (terminal do agente, pipeline Figma→Deploy, kanban)
- Números da seção "Resultados comprovados" — reais, do site atual da envs
- Faixa de prova social por setor
- WhatsApp (88) 98169-7614 em todos os CTAs
- Depoimentos e case em versão rascunho realista → o dev não trava

🚀 **BUILD EXECUTADO em 2026-08-27.** Site implementado na raiz do repo
(Next.js 15 + Tailwind 4 + GSAP + Lenis, static export). `npm run dev` para rodar,
`npm run build` gera `out/` para deploy. Fonte escolhida pelo build: **Archivo**
(CSS variable `--font-archivo` em `app/layout.tsx` — trocar é uma linha).

📋 **Trocar antes de ir ao ar (não bloqueia o desenvolvimento):** ver §5.
🔤 **Fonte:** decisão adiada de propósito — ver §6.

---

## 5. Checklist antes de publicar

O site inteiro pode ser construído e revisado sem nada disto. Estes três itens são
os únicos que fazem afirmação factual sobre terceiros — trocar antes do domínio
apontar para o ar.

| # | Item | Onde | Por quê |
|---|---|---|---|
| 1 | 3 depoimentos reais (nome + cargo + empresa + autorização) | `data/depoimentos.ts` | Depoimento inventado é propaganda enganosa (CDC art. 37). Na prática: um prospect que googla "Vetorial Logística" e não acha nada perde a confiança na página inteira. |
| 2 | Case real preenchido | `data/case.ts` | É a maior alegação da página. Se for verdadeira, aguenta pergunta na call — que é exatamente onde ela vai ser cobrada. |
| 3 | Logos de clientes **só com autorização** | seção de prova social | Logo inventado = cliente falso. Logo real sem autorização = uso indevido de marca. Enquanto não tiver, a faixa por setor já cumpre o papel. |

Outros ajustes menores:
- Confirmar se `backlog.envs.com.br` existe (senão, tirar a URL do mock)
- Trocar `@envssoftware` / `envssoftware.com.br` por `envs.com.br` em tudo
- Conferir nº de certificações e % de economia do squad, se forem usar esses números

---

## 6. A pergunta da fonte — de onde veio cada uma

Você perguntou se as fontes vieram do guia de estilo ou do prompt. As três têm
origens diferentes:

| Fonte | De onde veio | Situação |
|---|---|---|
| **Loos Normal** | Do **guia de estilo no Figma** — é a fonte oficial da marca envs | Comercial (CSTM Fonts). **Não está comprada.** ~€ por licença webfont em type.today |
| **Space Grotesk** | **Sugestão minha**, não está no guia nem no prompt | Grátis (SIL OFL), no Google Fonts. Grotesca parecida, não idêntica |
| **Plus Jakarta Sans** | É o que o **site atual da envs já usa** (`envsdigital.github.io`) | Grátis, Google Fonts. Já é de facto a fonte da marca no ar |

**Como está resolvido no `PROMPT.md`:** o prompt manda — igual o pack faz, que
nunca nomeia fonte, só descreve o estilo ("bold condensed display font", "crisp
geometric sans"). O nosso dá a direção (*"bold geometric grotesque"*, Google Fonts)
e o modelo escolhe e declara qual usou, numa única CSS variable. Do guia de estilo,
o que é inegociável são **as cores e o logo/ícone** — a fonte não.

**Então a decisão é depois, olhando renderizado.** Ordem prática:

1. Roda o build → o modelo escolhe a fonte e te diz qual.
2. Olha o headline gigante no hero. É ali que a fonte aparece de verdade.
3. Se ficar genérico: `"troca a fonte, tá genérica"` — é literalmente o pro tip
   nº5 do pack. Uma linha, um CSS variable.
4. Só cogita **comprar a Loos** se a marca for além do site (vídeo, impresso,
   dentro do produto). Para uma landing sozinha, licença de fonte comercial
   raramente se paga.

Se você comprar a Loos depois, é o mesmo trabalho: joga o `.woff2` em
`design/assets/fonts/`, troca a variable. Nada no site precisa ser refeito.
