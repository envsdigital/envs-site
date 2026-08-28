/**
 * Ícones de traço para as abas de solução (24x24, herdam currentColor).
 * Substituem os emojis: emoji renderiza colorido e diferente em cada SO.
 */
const paths: Record<string, string[]> = {
  wallet: [
    "M19 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
    "M21 9h-5a3 3 0 0 0 0 6h5V9Z",
  ],
  gear: [
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    "M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1",
  ],
  trending: ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
  scale: ["M12 3v18M7 6h10M5 21h14", "M7 6 3 14h8L7 6ZM17 6l-4 8h8l-4-8Z"],
  code: ["M8 6l-5 6 5 6M16 6l5 6-5 6"],
  bot: [
    "M6 9h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z",
    "M12 6v3M9 14h.01M15 14h.01",
    "M12 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  ],
  building: [
    "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 21h18",
    "M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4",
  ],
  globe: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z", "M3 12h18", "M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"],
  phone: ["M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z", "M11 18h2"],
  plug: ["M9 8V2M15 8V2M12 22v-5", "M18 8v3a6 6 0 0 1-12 0V8h12Z"],
  chart: ["M3 21h18", "M7 21v-6M12 21V8M17 21v-9"],
  rocket: [
    "M12 15l-3-3a22 22 0 0 1 2-3.95A12.9 12.9 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2Z",
    "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z",
  ],
};

export default function Icon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}
