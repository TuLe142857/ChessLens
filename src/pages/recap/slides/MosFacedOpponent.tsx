// import type { RecapSlideProps } from '@/pages/recap/type.ts';
//
// const MostFacedOpponent = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <pre>{JSON.stringify(data?.opponent?.mostFaced, null, 2)}</pre>
//     </div>
//   );
// };
//
// export default MostFacedOpponent;

import type { RecapSlideProps } from '../type.ts';

const MostFacedOpponent = ({ data, className = '' }: RecapSlideProps) => {
  const opponent = data.opponent.mostFaced;

  if (!opponent) {
    return null;
  }

  const winRate =
    opponent.games > 0 ? (opponent.wins / opponent.games) * 100 : 0;

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
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Rivalry
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-7xl">
          Your Most Faced
          <br />
          Opponent
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          Some players appeared again and again throughout your year.
        </p>

        {/* Main Card */}
        <div
          className="
            mt-14
            w-full overflow-hidden rounded-[2rem]
            border border-white/10
            bg-white/5
            p-8
            backdrop-blur-sm
          "
        >
          {/* Username */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Opponent
            </p>

            <h2 className="mt-4 break-all text-5xl font-black md:text-7xl">
              @{opponent.username}
            </h2>
          </div>

          {/* Stats */}
          <div
            className="
              mt-12
              grid gap-4
              md:grid-cols-3
            "
          >
            {/* Games */}
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-neutral-400">Games Played</p>

              <h3 className="mt-3 text-5xl font-black">{opponent.games}</h3>
            </div>

            {/* Wins */}
            <div className="rounded-3xl bg-emerald-500/10 p-6">
              <p className="text-sm text-emerald-300">Wins</p>

              <h3 className="mt-3 text-5xl font-black text-emerald-400">
                {opponent.wins}
              </h3>
            </div>

            {/* Win Rate */}
            <div className="rounded-3xl bg-indigo-500/10 p-6">
              <p className="text-sm text-indigo-300">Win Rate</p>

              <h3 className="mt-3 text-5xl font-black text-indigo-400">
                {winRate.toFixed(0)}%
              </h3>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-12">
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>Matchup Success</span>
              <span>{winRate.toFixed(1)}%</span>
            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
              <div
                className="
                  h-full rounded-full
                  bg-gradient-to-r from-emerald-400 to-indigo-500
                "
                style={{
                  width: `${Math.min(winRate, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <p className="mt-10 text-neutral-400">
            Every rivalry creates memories.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MostFacedOpponent;
