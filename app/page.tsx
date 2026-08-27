import { SmoothScroll, Cursor } from "@/components/Chrome";
import { Rail, Ticker, TopBar } from "@/components/v2/Shell";
import Hero from "@/components/v2/Hero";
import Virada from "@/components/v2/Virada";
import Diferenca from "@/components/v2/Diferenca";
import Futuro from "@/components/v2/Futuro";
import Frentes from "@/components/v2/Frentes";
import Dores from "@/components/v2/Dores";
import Agentes from "@/components/v2/Agentes";
import Metodo from "@/components/v2/Metodo";
import Prova from "@/components/v2/Prova";

export default function Page() {
  return (
    <main className="pb-8 xl:pl-[92px]">
      <SmoothScroll />
      <Cursor />
      <div className="grain" />
      <Rail />
      <TopBar />
      <Hero />
      <Virada />
      <Diferenca />
      <Futuro />
      <Frentes />
      <Dores />
      <Agentes />
      <Metodo />
      <Prova />
      <Ticker />
    </main>
  );
}
