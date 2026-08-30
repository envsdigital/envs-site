"use client";

import { useEffect } from "react";

const CAL_ORIGIN = "https://agenda.envs.com.br";
const CAL_NAMESPACE = "20min";
const CAL_LINK = "envs/20min";

declare global {
  interface Window {
    Cal?: any;
  }
}

/**
 * Embed inline do Cal.com (self-hosted da envs, sem selo de terceiro).
 * Porta o snippet oficial do painel — Tipo de Evento → Inserir → Inserção
 * embutida — para um efeito React, em vez de acrescentar a dependência
 * @calcom/embed-react só para isso.
 *
 * Responsividade e altura são do próprio embed.js, não mexer:
 *  · o layout mobile é automático. Em embed/embed.js:
 *      if (matchMedia("(max-width: 768px)")) return "mobile"
 *    ou seja, abaixo de 768px ele ignora o layout pedido e usa o mobile
 *    sozinho — passar "mobile" na config não é aceito (só month_view,
 *    week_view e column_view) e forçar ?layout=mobile na URL do calLink
 *    quebra o cálculo de altura;
 *  · a altura vem da página de dentro por postMessage
 *    (CAL::__dimensionChanged { iframeHeight }) e o embed.js escreve no
 *    style do iframe. Medido aqui: 689px no calendário, 1158px com a
 *    lista de horários aberta. Fixar altura (mesmo como piso) faz o
 *    conteúdo passar do iframe e aparecer barra de rolagem interna.
 */
export default function CalEmbed() {
  useEffect(() => {
    (function (C: Window, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...ar: any[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = (...apiAr: any[]) => p(api, apiAr);
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, `${CAL_ORIGIN}/embed/embed.js`, "init");

    window.Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    window.Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: "#my-cal-inline-20min",
      config: { layout: "month_view", theme: "dark" },
      calLink: CAL_LINK,
    });
    window.Cal.ns[CAL_NAMESPACE]("ui", {
      theme: "dark",
      cssVarsPerTheme: { light: { "cal-brand": "#bff24e" }, dark: { "cal-brand": "#bff24e" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    // A altura que o Cal reporta (CAL::__dimensionChanged) mede o conteúdo,
    // mas fica alguns pixels curta em relação à altura real do documento
    // dentro do iframe. Sobra pouco, e é justamente isso que faz aparecer a
    // barra de rolagem nativa do iframe com o polegar ocupando quase toda a
    // trilha — parece "só a barra, sem o componente que desliza".
    // Como o iframe é de outro domínio, não dá para mexer no documento de
    // dentro; o que dá é dar uma folga por fora, em cima do valor que o
    // embed.js escreve.
    const BUFFER = 32;
    const container = document.getElementById("my-cal-inline-20min");
    let iframeObserver: MutationObserver | undefined;
    let ownHeight = 0;

    const addBuffer = (iframe: HTMLIFrameElement) => {
      const h = parseInt(iframe.style.height || "0", 10);
      // ignora a mutação disparada pela nossa própria escrita
      if (!h || h === ownHeight) return;
      ownHeight = h + BUFFER;
      iframe.style.height = `${ownHeight}px`;
    };

    const containerObserver = new MutationObserver(() => {
      const iframe = container?.querySelector("iframe");
      if (!iframe) return;
      containerObserver.disconnect();
      addBuffer(iframe);
      iframeObserver = new MutationObserver(() => addBuffer(iframe));
      iframeObserver.observe(iframe, { attributes: true, attributeFilter: ["style"] });
    });
    if (container) {
      containerObserver.observe(container, { childList: true, subtree: true });
    }

    return () => {
      containerObserver.disconnect();
      iframeObserver?.disconnect();
    };
  }, []);

  return <div id="my-cal-inline-20min" style={{ width: "100%" }} />;
}
