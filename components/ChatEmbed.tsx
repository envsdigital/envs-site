"use client";

import { useEffect } from "react";
import { AGENDA_ORIGIN, CHAT_SLUG } from "@/data/site";

/**
 * Chatbot da envs (plataforma SysEnvs) em popup: o embed.js cria o painel e abre quando alguém clica num elemento com
 * `data-sysenvs-open` (o botão "Quero meu sistema sob medida"). `data-theme="dark"` casa o chat com o fundo escuro do site.
 * O iframe só é criado na primeira abertura, então não pesa no carregamento da home.
 *
 * Pré-requisitos na plataforma: este site cadastrado como origem permitida (Incorporar) e o fluxo CHAT_SLUG publicado.
 * Sem CHAT_SLUG não faz nada e o botão continua levando ao WhatsApp.
 */
export default function ChatEmbed() {
  useEffect(() => {
    if (!CHAT_SLUG || document.querySelector("script[data-sysenvs-chat]")) return; // uma vez só (o modo estrito monta duas)
    const script = document.createElement("script");
    script.src = `${AGENDA_ORIGIN}/embed.js`;
    script.async = true;
    script.setAttribute("data-chat", CHAT_SLUG);
    script.setAttribute("data-mode", "popup");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-sysenvs-chat", "");
    document.body.appendChild(script);
  }, []);

  return null;
}
