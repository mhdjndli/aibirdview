const LOGOS = [
  "Lattice",
  "Northwind",
  "Cinder",
  "Atlas Labs",
  "Quill & Co.",
  "Helio",
  "Mira",
  "Beacon",
  "Studio Nine",
  "Granite",
];

export function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <div className="relative overflow-hidden scrollbar-none">
      <div className="marquee-track flex w-[200%] items-center gap-12">
        {items.map((l, i) => (
          <span
            key={`${l}-${i}`}
            className="whitespace-nowrap text-[18px] font-medium tracking-tight text-ink-400/80"
          >
            {l}
          </span>
        ))}
      </div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-50/95 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-50/95 to-transparent" />
    </div>
  );
}
