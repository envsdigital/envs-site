import type { Metadata } from "next";
import { WA_URL } from "@/data/site";
import CalEmbed from "@/components/CalEmbed";
import Aurora from "@/components/v3/Aurora";

export const metadata: Metadata = {
  title: "envs | Agendar conversa",
  description:
    "20 minutos para entender sua operação e mostrar onde a tecnologia gera resultado. Escolha o melhor horário na agenda.",
  // página de link curto, para mandar direto para quem já está falando com a
  // gente. Não deve competir com a home na busca.
  robots: { index: false, follow: false },
};

const pontos = [
  "20 minutos, por Google Meet",
  "Sem compromisso e sem apresentação comercial",
  "Você sai com o próximo passo definido",
];

export default function Page() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="grain" />

      {/* Mesma aurora do fecho da LP (components/v3/Body.tsx): sem planeta,
          luz nascendo de baixo e dissolvendo no topo. Fica só atrás do
          cabeçalho e do texto — o embed é um iframe opaco, então a luz
          morreria num corte reto se passasse por baixo dele. Terminando
          acima, ela emoldura a entrada do calendário. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[62vh] min-h-[420px]"
        style={{
          // dissolve a base. Na LP a aurora fica na última seção e o corte de
          // baixo cai no rodapé; aqui ela termina no meio da página, então sem
          // esse fade sobra uma linha reta atravessando a tela dos dois lados
          // do calendário.
          maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
        }}
      >
        <Aurora
          junction={0.62}
          // mais alto que os 0.96 da LP: lá a luz nasce rente à borda de baixo
          // da seção; aqui ela precisa caber inteira dentro do bloco de texto
          horizonAt={0.58}
          intensity={0.9}
          planet={false}
          fadeTop={0.42}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 44% 40% at 50% 38%, rgba(13,13,13,0.7), transparent 74%)",
          }}
        />
      </div>

      <header className="relative px-5 py-5">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/" aria-label="envs">
            <img
              src="/logos/envs-wordmark.svg"
              alt="envs"
              className="h-[18px] w-auto"
            />
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-2 text-[13.5px] text-fg/75 transition hover:border-white/25 hover:text-fg"
          >
            Prefiro WhatsApp
          </a>
        </div>
      </header>

      <section className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-8">
        <div className="flex items-center gap-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg/45">
            AGENDA
          </span>
        </div>

        <h1 className="h-display mt-5 text-[clamp(2rem,4.4vw,3.2rem)]">
          Escolha um horário e{" "}
          <span className="text-lime">a gente conversa.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg/55">
          Uma conversa curta para entender como sua operação funciona hoje e
          onde software sob medida e agentes de IA resolvem o gargalo real.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {pontos.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[13px] text-fg/70"
            >
              <span className="text-lime">✓</span>
              {p}
            </li>
          ))}
        </ul>

        {/* Agenda própria (Cal.com self-hosted em agenda.envs.com.br) — sem
            selo de terceiro, tema escuro e cor da marca combinando com o
            resto do site. Sem container/borda por fora: o próprio widget já
            é escuro e fecha com o fundo da página; uma caixa ao redor só
            duplicava a moldura. Ver components/CalEmbed.tsx — o componente
            escolhe o layout certo (mês ou mobile) conforme a largura da
            tela. */}
        <div className="mt-10">
          <CalEmbed />
        </div>

        <p className="mt-8 text-[13px] text-fg/40">
          Não achou um horário que sirva?{" "}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener"
            className="text-lime hover:underline"
          >
            Fale com a gente no WhatsApp
          </a>
          .
        </p>
      </section>
    </main>
  );
}
