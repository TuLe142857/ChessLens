import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

import FlipCard from '@/pages/RecapPage/components/FlipCard.tsx';

const StatCard = ({
  label,
  value,
  color,
  coverText,
}: {
  label: string;
  value: number;
  color: string;
  coverText: string;
}) => {
  return (
    <FlipCard
      className="
        w-72 overflow-hidden rounded-3xl
        border border-white/10
        bg-neutral-900
        transition-transform duration-200
        hover:-translate-y-1
      "
      cover={
        <div
          className={`
            flex h-44 flex-col items-center justify-center
            text-white
            ${color}
          `}
        >
          <p className="text-xs uppercase tracking-[0.25em] opacity-60">WDL</p>

          <h2 className="mt-3 text-3xl font-bold">{coverText}</h2>

          <p className="mt-4 text-sm opacity-70">Click to reveal</p>
        </div>
      }
    >
      <div
        className={`
          flex h-44 flex-col items-center justify-center
          text-white
          ${color}
        `}
      >
        <p className="text-xs uppercase tracking-[0.25em] opacity-60">
          {label}
        </p>

        <h2 className="mt-3 text-5xl font-black">{value.toLocaleString()}</h2>
      </div>
    </FlipCard>
  );
};

const WDLSlide = ({ data, className = '' }: RecapSlideProps) => {
  return (
    <section
      className={`
        flex flex-col items-center justify-center
        bg-neutral-950 px-6 py-12 text-white
        ${className}
      `}
    >
      {/* Header */}
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        Match Results
      </p>

      <h1 className="mt-4 text-center text-4xl font-black md:text-5xl">
        Wins. Draws. Losses.
      </h1>

      <p className="mt-4 max-w-xl text-center text-neutral-400">
        Every game added another chapter to your year.
      </p>

      {/* Cards */}
      <div
        className="
          mt-12
          flex flex-col gap-5
          lg:flex-row
        "
      >
        <StatCard
          label="Wins"
          value={data.wdl.win}
          color="bg-emerald-700"
          coverText="Victories"
        />

        <StatCard
          label="Draws"
          value={data.wdl.draw}
          color="bg-zinc-700"
          coverText="Balanced"
        />

        <StatCard
          label="Losses"
          value={data.wdl.loss}
          color="bg-rose-800"
          coverText="Lessons"
        />
      </div>
    </section>
  );
};

export default WDLSlide;
