import { Head } from "./Kit";
import type { Faq as FaqItem } from "@/data/faq";

const S = "mx-auto max-w-[1240px] px-5";

/**
 * Perguntas frequentes. <details> nativo: abre e fecha sem JS e o texto das
 * respostas fica no HTML, onde buscadores e IAs leem. Os mesmos itens vão para
 * o JSON-LD (lib/schema.ts).
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className={`${S} py-20`}>
      <Head
        id="faq"
        label="perguntas frequentes"
        title="Software house e software sob medida: as dúvidas mais comuns."
      />
      <div className="mt-12 grid gap-3 lg:grid-cols-2">
        {items.map((f) => (
          <details key={f.q} className="bento group p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-medium leading-snug [&::-webkit-details-marker]:hidden">
              <h3 className="font-medium">{f.q}</h3>
              <span aria-hidden className="mt-0.5 text-lime transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-[13.5px] leading-relaxed text-fg/60">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
