import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Política de Privacidade | envs",
  description:
    "Como a envs trata dados pessoais no site, no assistente de conversa e no agendamento: quais dados, para quê, com quem, por quanto tempo e como exercer seus direitos pela LGPD.",
  alternates: { canonical: "/privacidade" },
};

// Dados do controlador. A página só mostra o que estiver preenchido: razão social, CNPJ, endereço e o nome do
// encarregado (DPO) entram aqui quando existirem. O art. 9º, III, e o art. 41, §1º, da LGPD pedem a identificação do
// controlador e do encarregado e o contato dele; sem esses campos a identificação fica só no nome e no e-mail.
const EMPRESA = {
  nome: "envs",
  razaoSocial: "",
  cnpj: "",
  endereco: "",
  email: "privacidade@envs.com.br",
  encarregado: "",
};

const VERSAO = "1.2";
const ATUALIZADA_EM = "17 de outubro de 2026";

function Secao({ n, titulo, children }: { n: number; titulo: string; children: ReactNode }) {
  return (
    <section id={`s${n}`} className="scroll-mt-24 border-t border-white/8 pt-10">
      <h2 className="text-xl font-semibold tracking-[-0.01em] text-fg md:text-2xl">
        <span className="mr-3 font-mono text-sm text-lime">{String(n).padStart(2, "0")}</span>
        {titulo}
      </h2>
      <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-fg/70">{children}</div>
    </section>
  );
}

function Lista({ itens }: { itens: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-lime/70">
      {itens.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const B = ({ children }: { children: ReactNode }) => <strong className="font-medium text-fg">{children}</strong>;

const FINALIDADES: { finalidade: string; dados: string; base: string }[] = [
  {
    finalidade: "Responder ao seu contato, entender o que você precisa e marcar a conversa com o time",
    dados: "Nome, e-mail, WhatsApp ou telefone, empresa e o que você escreveu",
    base: "Procedimentos preliminares a um contrato, a pedido do titular (art. 7º, V)",
  },
  {
    finalidade: "Confirmar, lembrar, reagendar ou cancelar a reunião, inclusive com convite no Google Agenda e link do Google Meet",
    dados: "Nome, e-mail, horário e fuso horário, link da reunião",
    base: "Procedimentos preliminares a um contrato, a pedido do titular (art. 7º, V)",
  },
  {
    finalidade: "Registrar que você leu este aviso antes de enviar seus dados",
    dados: "Data e hora, página de origem, versão e texto do aviso exibido",
    base: "Cumprimento de obrigação legal e exercício regular de direitos (art. 7º, II e VI)",
  },
  {
    finalidade: "Classificar o interesse e organizar o atendimento comercial",
    dados: "Respostas dadas ao assistente",
    base: "Legítimo interesse (art. 7º, IX), com o cuidado de usar só o necessário",
  },
  {
    finalidade: "Proteger o serviço contra abuso e fraude (limite de conversas e reservas por origem)",
    dados: "Identificador irreversível (hash) do endereço IP, nunca o IP em si",
    base: "Legítimo interesse (art. 7º, IX)",
  },
  {
    finalidade: "Atender pedidos dos titulares e cumprir obrigações legais",
    dados: "Os necessários para identificar e responder ao pedido",
    base: "Cumprimento de obrigação legal ou regulatória (art. 7º, II)",
  },
];

const OPERADORES: { nome: string; papel: string }[] = [
  { nome: "Vercel", papel: "hospedagem da plataforma de agendamento e do assistente, e armazenamento de arquivos privados. As funções rodam em São Paulo." },
  { nome: "Neon", papel: "banco de dados (PostgreSQL) onde ficam contatos, conversas e reservas, na região de São Paulo." },
  { nome: "Resend", papel: "envio dos e-mails de confirmação, reagendamento, cancelamento e lembrete." },
  { nome: "Google", papel: "Google Agenda e Google Meet (evento, convite e link da reunião) e login da nossa equipe." },
  { nome: "Cloudflare", papel: "hospedagem e entrega deste site (envs.com.br)." },
  { nome: "WhatsApp (Meta)", papel: "somente se você nos chamar pelo botão de WhatsApp; a conversa passa a seguir os termos e a política do WhatsApp." },
];

const DIREITOS = [
  "confirmar que tratamos dados seus;",
  "acessar os dados que temos sobre você;",
  "corrigir dados incompletos, inexatos ou desatualizados;",
  "pedir anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;",
  "pedir a portabilidade dos dados, nos termos da regulamentação da ANPD;",
  "pedir a eliminação dos dados tratados com base no seu consentimento;",
  "saber com quais entidades públicas e privadas compartilhamos dados;",
  "ser informado sobre a possibilidade de não fornecer consentimento e sobre as consequências da recusa;",
  "revogar o consentimento a qualquer momento;",
  "se opor a um tratamento feito sem o seu consentimento, quando houver descumprimento da lei;",
  "pedir a revisão de decisões tomadas unicamente de forma automatizada que afetem seus interesses.",
];

export default function Privacidade() {
  const identificacao = [
    EMPRESA.razaoSocial && `Razão social: ${EMPRESA.razaoSocial}`,
    EMPRESA.cnpj && `CNPJ: ${EMPRESA.cnpj}`,
    EMPRESA.endereco && `Endereço: ${EMPRESA.endereco}`,
  ].filter(Boolean) as string[];

  return (
    <main style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }} className="min-h-screen bg-bg text-fg">
      <header className="border-b border-white/8">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <a href="/" aria-label="envs, voltar ao início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/envs-wordmark.svg" alt="envs" className="h-5 w-auto" />
          </a>
          <a href="/" className="font-mono text-[11px] text-fg/50 transition-colors hover:text-lime">
            ← Voltar ao site
          </a>
        </div>
      </header>

      <article className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-14 md:py-20">
        <div>
          <p className="eyebrow">Privacidade</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl">Política de Privacidade</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/60">
            Esta política explica, em linguagem simples, como a {EMPRESA.nome} trata dados pessoais quando você visita este site, conversa com o
            nosso assistente ou agenda uma conversa com o time. Ela segue a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).
          </p>
          <p className="mt-4 font-mono text-[11px] text-fg/35">
            Versão {VERSAO} · atualizada em {ATUALIZADA_EM}
          </p>
        </div>

        <Secao n={1} titulo="Quem é o responsável pelos seus dados">
          <p>
            O controlador, que decide como os dados são tratados, é a <B>{EMPRESA.nome}</B>.
          </p>
          {identificacao.length > 0 && <Lista itens={identificacao} />}
          <p>
            O canal para qualquer assunto de privacidade, inclusive o do encarregado pelo tratamento de dados pessoais
            {EMPRESA.encarregado ? ` (${EMPRESA.encarregado})` : ""}, é o e-mail{" "}
            <a className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime" href={`mailto:${EMPRESA.email}`}>
              {EMPRESA.email}
            </a>
            .
          </p>
        </Secao>

        <Secao n={2} titulo="Quais dados coletamos e quando">
          <p>
            <B>Ao navegar neste site.</B> Não usamos cookies de publicidade nem de análise, e não carregamos pixels ou ferramentas de rastreamento de
            terceiros. A hospedagem do site pode registrar dados técnicos de acesso, como endereço IP, navegador e data e hora, para segurança e
            funcionamento.
          </p>
          <p>
            <B>Ao conversar com o assistente.</B> O que você digita: nome, e-mail, WhatsApp ou telefone e a descrição do sistema ou processo que você
            quer construir. Ao começar a conversa, registramos que você viu este aviso.
          </p>
          <p>
            <B>Ao agendar uma conversa.</B> Nome, e-mail, WhatsApp, telefone e empresa (conforme o formulário), respostas às perguntas do
            formulário, o horário escolhido e o seu fuso horário. Criamos um evento no Google Agenda, com link do Google Meet, e o convite vai para o seu
            e-mail.
          </p>
          <p>
            <B>Ao falar com a gente por e-mail ou WhatsApp.</B> O seu endereço ou número e o conteúdo da mensagem.
          </p>
          <p>
            Não pedimos dados pessoais sensíveis (como saúde, religião, opinião política ou biometria). Por favor, não os envie nos campos de texto.
          </p>
        </Secao>

        <Secao n={3} titulo="Para que usamos os dados e em que base legal">
          <p>Usamos os dados só para o que está na tabela abaixo.</p>
          <div className="flex flex-col gap-3">
            {FINALIDADES.map((f) => (
              <div key={f.finalidade} className="rounded-2xl border border-white/8 bg-surface/50 p-5">
                <p className="font-medium text-fg">{f.finalidade}</p>
                <dl className="mt-3 grid gap-x-6 gap-y-2 text-[13px] sm:grid-cols-[auto_1fr]">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-fg/40">Dados</dt>
                  <dd>{f.dados}</dd>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-fg/40">Base legal</dt>
                  <dd>{f.base}</dd>
                </dl>
              </div>
            ))}
          </div>
          <p>Não vendemos seus dados e não os usamos para publicidade de terceiros.</p>
        </Secao>

        <Secao n={4} titulo="Decisões automatizadas">
          <p>
            As respostas dadas ao assistente recebem uma pontuação interna que sugere em qual etapa do nosso atendimento o seu contato entra. Isso só
            organiza a fila do time: nenhuma decisão que produza efeitos jurídicos ou afete significativamente você é tomada unicamente por esse
            processo, e uma pessoa da equipe sempre faz o contato. Você pode pedir a revisão (art. 20 da LGPD) e informações sobre os critérios pelo
            e-mail de privacidade.
          </p>
        </Secao>

        <Secao n={5} titulo="Com quem compartilhamos">
          <p>Os dados ficam com a {EMPRESA.nome} e com os fornecedores que operam o serviço em nosso nome (operadores):</p>
          <ul className="flex flex-col gap-3">
            {OPERADORES.map((o) => (
              <li key={o.nome} className="rounded-xl border border-white/8 px-4 py-3">
                <span className="font-medium text-fg">{o.nome}</span>
                <span className="text-fg/60"> — {o.papel}</span>
              </li>
            ))}
          </ul>
          <p>Também podemos compartilhar dados com autoridades quando a lei exigir ou para defender nossos direitos em processos.</p>
        </Secao>

        <Secao n={6} titulo="Transferência internacional">
          <p>
            Alguns fornecedores, como Google, Resend e Cloudflare, podem processar dados fora do Brasil, inclusive nos Estados Unidos. Quando isso
            acontece, a transferência se apoia no art. 33 da LGPD, por meio das garantias contratuais e das cláusulas de proteção de dados que esses
            fornecedores oferecem. O banco de dados do assistente e das reservas e as funções que o operam ficam em São Paulo.
          </p>
        </Secao>

        <Secao n={7} titulo="Cookies e armazenamento no seu navegador">
          <Lista
            itens={[
              <>
                <B>Neste site:</B> nenhum cookie.
              </>,
              <>
                <B>Ao conversar com o assistente:</B> um cookie estritamente necessário, que mantém a sua conversa de onde parou. Ele dura 7 dias e não é
                lido por scripts. Se o seu navegador bloquear cookies de terceiros, usamos um armazenamento temporário da aba, que some quando você a
                fecha.
              </>,
            ]}
          />
          <p>Por serem necessários ao serviço que você pediu, esses itens não dependem de banner de cookies.</p>
        </Secao>

        <Secao n={8} titulo="Por quanto tempo guardamos">
          <Lista
            itens={[
              <>
                Conversas com o assistente que você não termina são apagadas automaticamente quando ficam <B>30 dias</B> sem movimento.
              </>,
              <>
                E-mails de confirmação e lembrete e os registros de envio já encerrados são apagados depois de <B>90 dias</B>.
              </>,
              <>
                Contatos que ficam <B>24 meses sem nenhum movimento</B> (sem conversa, reunião ou atendimento em andamento) são apagados
                automaticamente, com todos os dados deles, depois de um aviso à nossa equipe. Quem se torna cliente tem os dados mantidos enquanto durar
                o contrato e pelos prazos que a lei exigir. Você pode pedir a eliminação antes disso, a qualquer momento.
              </>,
              <>
                Cópias de segurança mantidas pelos provedores expiram conforme a política de cada um.
              </>,
            ]}
          />
        </Secao>

        <Secao n={9} titulo="Seus direitos">
          <p>Pela LGPD (art. 18), você pode, a qualquer momento e gratuitamente:</p>
          <Lista itens={DIREITOS} />
          <p>
            Para exercer qualquer um deles, escreva para{" "}
            <a className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime" href={`mailto:${EMPRESA.email}`}>
              {EMPRESA.email}
            </a>{" "}
            a partir do e-mail que você usou conosco. Podemos pedir uma confirmação de identidade para proteger você. Respondemos de forma simplificada
            de imediato ou, se for preciso mais, com a resposta completa em até 15 dias.
          </p>
          <p>
            Se achar que não resolvemos o seu pedido, você pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD):{" "}
            <a className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime" href="https://www.gov.br/anpd" rel="noopener noreferrer" target="_blank">
              gov.br/anpd
            </a>
            .
          </p>
        </Secao>

        <Secao n={10} titulo="Como protegemos os dados">
          <Lista
            itens={[
              "Toda a comunicação com o site e com o assistente é criptografada (HTTPS).",
              "A área interna só é acessada pela equipe, com login pela conta Google, e cada pessoa vê apenas o que o seu papel permite.",
              "Os arquivos ficam em armazenamento privado e só saem para quem tem permissão.",
              "Há limites de uso por origem para frear abuso, e as páginas públicas não podem ser embutidas em sites não autorizados.",
              "Exclusões de dados ficam registradas em uma trilha de auditoria sem dados pessoais.",
              "Apagamos dados abandonados automaticamente, como descrito na seção 8.",
            ]}
          />
          <p>
            Nenhum sistema é 100% seguro. Se ocorrer um incidente que possa acarretar risco ou dano relevante a você, comunicaremos você e a ANPD
            em prazo razoável, como determina o art. 48 da LGPD.
          </p>
        </Secao>

        <Secao n={11} titulo="Crianças e adolescentes">
          <p>
            Nossos serviços são voltados a empresas e a pessoas maiores de 18 anos. Não coletamos dados de crianças e adolescentes de propósito. Se
            você acredita que isso aconteceu, avise pelo e-mail de privacidade e eliminaremos os dados.
          </p>
        </Secao>

        <Secao n={12} titulo="Mudanças nesta política">
          <p>
            Podemos atualizar esta política para refletir mudanças no serviço ou na lei. A versão e a data de atualização ficam no topo desta página.
            Quando a mudança for relevante para o tratamento dos seus dados, o aviso exibido no assistente e no agendamento também é atualizado e
            passa a pedir o seu aceite de novo.
          </p>
        </Secao>
      </article>

      <footer className="border-t border-white/8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-8 md:flex-row md:justify-between">
          <p className="font-mono text-[10px] text-fg/30">© 2026 envs. Todos os direitos reservados.</p>
          <a href="/" className="font-mono text-[10px] text-fg/30 hover:text-lime">
            envs.com.br
          </a>
        </div>
      </footer>
    </main>
  );
}
