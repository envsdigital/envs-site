import { SmoothScroll, Cursor, Nav } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Virada from "@/components/Virada";
import Diferenca from "@/components/Diferenca";
import Futuro from "@/components/Futuro";
import Frentes from "@/components/Frentes";
import Dores from "@/components/Dores";
import Agentes from "@/components/Agentes";
import Visibilidade from "@/components/Visibilidade";
import Metodo from "@/components/Metodo";
import Prova from "@/components/Prova";
import Final from "@/components/Final";

export default function Page() {
  return (
    <main>
      <SmoothScroll />
      <Cursor />
      <div className="grain" />
      <Nav />
      <Hero />
      <Virada />
      <Diferenca />
      <Futuro />
      <Frentes />
      <Dores />
      <Agentes />
      <Visibilidade />
      <Metodo />
      <Prova />
      <Final />
    </main>
  );
}
