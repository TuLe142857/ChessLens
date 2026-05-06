// import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';
//
// const ActivitiesOverviewSlide = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <div>{data.year} overview</div>
//       <div>{data.gameStats.totalGames} games played</div>
//       <div>AVG {data.gameStats.avgGamePerDay} game per day</div>
//     </div>
//   );
// };
//
// export default ActivitiesOverviewSlide;

import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

const ActivitiesOverviewSlide = ({ data, className = '' }: RecapSlideProps) => {
  return (
    <section
      className={`
        relative overflow-hidden
        flex flex-col items-center justify-center
        bg-neutral-950 px-6 py-12 text-white
        ${className}
      `}
    >
      {/* Grid background */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute top-1/2 left-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-indigo-500/15
          blur-3xl
        "
      />

      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Year Overview
        </p>

        <h1
          className="
            mt-4
            text-center
            text-5xl font-black tracking-tight
            sm:text-6xl md:text-7xl
          "
        >
          {data.year} in Chess
        </h1>

        <p
          className="
            mt-5 max-w-2xl
            text-center text-base leading-7
            text-neutral-400 md:text-lg
          "
        >
          Another year of openings, tactics, time pressure, and unforgettable
          games.
        </p>

        {/* Stats */}
        <div
          className="
            mt-14
            grid w-full gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {/* Total games */}
          <div
            className="
              rounded-3xl border border-white/10
              bg-white/5
              p-6
              backdrop-blur-sm
            "
          >
            <p className="text-sm text-neutral-400">Total Games</p>

            <h2 className="mt-3 text-4xl font-black">
              {data.gameStats.totalGames.toLocaleString()}
            </h2>
          </div>

          {/* Avg games */}
          <div
            className="
              rounded-3xl border border-white/10
              bg-white/5
              p-6
              backdrop-blur-sm
            "
          >
            <p className="text-sm text-neutral-400">Daily Average</p>

            <h2 className="mt-3 text-4xl font-black">
              {data.gameStats.avgGamePerDay.toFixed(1)}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">games per day</p>
          </div>

          {/* Hours */}
          <div
            className="
              rounded-3xl border border-white/10
              bg-white/5
              p-6
              backdrop-blur-sm
            "
          >
            <p className="text-sm text-neutral-400">Time Played</p>

            <h2 className="mt-3 text-4xl font-black">
              {Math.round(data.gameStats.totalHours)}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">hours</p>
          </div>

          {/* Active month */}
          <div
            className="
              rounded-3xl border border-white/10
              bg-white/5
              p-6
              backdrop-blur-sm
            "
          >
            <p className="text-sm text-neutral-400">Most Active Month</p>

            <h2 className="mt-3 text-4xl font-black">
              {data.gameStats.mostActiveMonth}
            </h2>
          </div>
        </div>

        {/* Footer line */}
        <p
          className="
            mt-14
            text-center text-lg
            text-neutral-400
          "
        >
          You kept coming back to the board ♟️
        </p>
      </div>
    </section>
  );
};

export default ActivitiesOverviewSlide;
