import { SmoothScroll, Cursor, Nav } from "@/components/Chrome";
import Hero from "@/components/v1/Hero";
import Virada from "@/components/v1/Virada";
import Diferenca from "@/components/v1/Diferenca";
import Futuro from "@/components/v1/Futuro";
import Frentes from "@/components/v1/Frentes";
import Dores from "@/components/v1/Dores";
import Agentes from "@/components/v1/Agentes";
import Visibilidade from "@/components/v1/Visibilidade";
import Metodo from "@/components/v1/Metodo";
import Prova from "@/components/v1/Prova";
import Final from "@/components/v1/Final";

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
