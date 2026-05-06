// import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';
//
// const StreakSlide = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <pre>{JSON.stringify(data?.streaks, null, 2)}</pre>
//     </div>
//   );
// };
//
// export default StreakSlide;

import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

const StreakCard = ({
  title,
  value,
  description,
  theme,
}: {
  title: string;
  value: number;
  description: string;
  theme: 'win' | 'unbeaten' | 'loss';
}) => {
  const themeStyles = {
    win: {
      glow: 'bg-emerald-500/20',
      card: 'bg-emerald-500/10',
      value: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },

    unbeaten: {
      glow: 'bg-indigo-500/20',
      card: 'bg-indigo-500/10',
      value: 'text-indigo-400',
      border: 'border-indigo-500/20',
    },

    loss: {
      glow: 'bg-rose-500/20',
      card: 'bg-rose-500/10',
      value: 'text-rose-400',
      border: 'border-rose-500/20',
    },
  };

  const style = themeStyles[theme];

  return (
    <div
      className={`
        relative overflow-hidden rounded-[2rem]
        border border-white/10
        bg-white/5
        p-8
        backdrop-blur-sm
        transition-transform duration-300
        hover:scale-[1.02]
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute top-0 right-0
          h-40 w-40 rounded-full
          blur-3xl
          ${style.glow}
        `}
      />

      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          {title}
        </p>

        <h2
          className={`
            mt-6 text-7xl font-black
            ${style.value}
          `}
        >
          {value}
        </h2>

        <p className="mt-3 text-neutral-400">{description}</p>

        <div
          className={`
            mt-8 rounded-2xl border p-4
            ${style.card}
            ${style.border}
          `}
        >
          <p className="text-sm text-neutral-300">
            {theme === 'win' && 'You were unstoppable during this run.'}

            {theme === 'unbeaten' && 'Consistency kept you alive on the board.'}

            {theme === 'loss' &&
              'Even the toughest stretches teach valuable lessons.'}
          </p>
        </div>
      </div>
    </div>
  );
};

const StreakSlide = ({ data, className = '' }: RecapSlideProps) => {
  return (
    <section
      className={`
        relative overflow-hidden
        flex flex-col items-center justify-center
        bg-neutral-950 px-6 py-12 text-white
        ${className}
      `}
    >
      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-[600px] w-[600px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Streaks
        </p>

        <h1 className="mt-4 text-center text-5xl font-black md:text-7xl">
          Momentum Matters
        </h1>

        <p className="mt-5 max-w-2xl text-center text-lg leading-8 text-neutral-400">
          Some days you couldn’t stop winning. Other days tested your
          resilience.
        </p>

        {/* Cards */}
        <div
          className="
            mt-14
            grid w-full gap-6
            lg:grid-cols-3
          "
        >
          <StreakCard
            title="Win Streak"
            value={data.streaks.winStreak}
            description="Consecutive victories"
            theme="win"
          />

          <StreakCard
            title="Unbeaten Streak"
            value={data.streaks.unbeatenStreak}
            description="Games without losing"
            theme="unbeaten"
          />

          <StreakCard
            title="Loss Streak"
            value={data.streaks.lossStreak}
            description="Tough consecutive defeats"
            theme="loss"
          />
        </div>
      </div>
    </section>
  );
};

export default StreakSlide;
