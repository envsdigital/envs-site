"use client";

import { useEffect, useRef } from "react";
import { AGENDA_ORIGIN, AGENDA_SLUG } from "@/data/site";

/**
 * Agenda própria da envs (SysEnvs), no lugar do antigo embed do Cal.com. Usa o embed.js da plataforma em modo inline:
 * ele troca a tag <script> por um iframe de /agendar/<slug>, ajusta a altura sozinho (a página de dentro avisa por
 * postMessage) e `data-theme="dark"` casa o calendário com o fundo escuro do site mesmo que o visitante use tema claro.
 *
 * Pré-requisitos na plataforma (Incorporar): este site (https://envs.com.br) cadastrado como origem permitida e o tipo de
 * evento com o endereço AGENDA_SLUG ativo. Sem isso o navegador bloqueia o iframe.
 */
export default function AgendaEmbed() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const script = document.createElement("script");
    script.src = `${AGENDA_ORIGIN}/embed.js`;
    script.async = true;
    script.setAttribute("data-agendar", AGENDA_SLUG);
    script.setAttribute("data-mode", "inline");
    script.setAttribute("data-theme", "dark");
    el.appendChild(script);
    return () => {
      el.replaceChildren(); // tira a tag e o iframe (o React remonta no modo estrito de desenvolvimento)
    };
  }, []);

  return <div ref={box} style={{ width: "100%" }} />;
}
