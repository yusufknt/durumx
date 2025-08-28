"use client";

import Link from "next/link";

type Item = {
  name: string;
  href: string;
  bgImage?: string;
};

type StackedCategoryCardsProps = {
  items: Item[];
};

const CardGlass = ({ item, r }: { item: Item; r: number }) => {
  const styleVars = { ["--r" as string]: `${r}` } as React.CSSProperties;

  return (
    <Link
      href={item.href}
      aria-label={`${item.name} kategorisini keşfet`}
      className="group relative w-[180px] h-[200px] flex items-center justify-center rounded-[10px] border border-white/10 shadow-[0_25px_25px_rgba(0,0,0,0.25)] bg-white/5 backdrop-blur-md transition-all duration-500 mx-[-45px] overflow-hidden [transform:rotate(calc(var(--r)*1deg))] group-hover:[transform:rotate(0deg)] group-hover:mx-[10px]"
      style={styleVars}
    >
      {/* Soft red overlay on hover (behind PNG) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-red-500/20 via-red-400/15 to-transparent" />

      {item.bgImage ? (
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.bgImage})` }}
          aria-hidden
        />
      ) : null}

      <div className="absolute bottom-0 z-20 w-full h-11 md:h-12 bg-white/20 backdrop-blur-md border-t border-white/30 flex items-center justify-center text-red-700 font-extrabold text-sm md:text-base tracking-wide">
        {item.name}
      </div>
      <div className="absolute inset-0 pointer-events-none" />
    </Link>
  );
};

const StackedCategoryCards = ({ items }: StackedCategoryCardsProps) => {
  const visible = items.slice(0, 5);
  const rotations = [-25, -10, 0, 10, 25];

  return (
    <div className="relative flex items-center justify-center group py-6">
      {visible.map((it, idx) => (
        <CardGlass key={it.name} item={it} r={rotations[idx] ?? 0} />
      ))}
    </div>
  );
};

export default StackedCategoryCards;


