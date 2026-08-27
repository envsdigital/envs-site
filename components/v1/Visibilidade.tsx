"use client";

import { visibilidade } from "@/data/site";
import { Reveal } from "@/lib/anim";

const statusStyle: Record<string, string> = {
  "Concluído": "bg-lime/15 text-lime",
  "Em andamento": "bg-peri/15 text-peri",
  "Backlog": "bg-white/8 text-fg/55",
};

export default function Visibilidade() {
  const v = visibilidade;
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-5">{v.eyebrow}</p>
          <h2 className="display text-[clamp(1.9rem,4vw,3rem)]">{v.title}</h2>
          <p className="mt-5 text-fg/65">{v.lead}</p>
          <div className="mt-10 space-y-7">
            {v.features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime" />
                <div>
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm text-fg/60">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* faux kanban board */}
        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-surface/60 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime/60" />
              <span className="ml-3 rounded-md bg-bg px-3 py-1 font-mono text-xs text-fg/55">{v.board.url}</span>
            </div>
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-fg/40">
                    <th className="pb-3 font-medium">Tarefa</th>
                    <th className="pb-3 font-medium">Sprint</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {v.board.rows.map((r) => (
                    <tr key={r.task}>
                      <td className="py-3.5 text-fg/85">{r.task}</td>
                      <td className="py-3.5 text-fg/50">{r.sprint}</td>
                      <td className="py-3.5">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle[r.status]} ${r.status === "Em andamento" ? "pulsedot" : ""}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5 text-xs text-fg/45">
              <span>{v.board.footer}</span>
              <span className="text-lime">+ Nova tarefa</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
