// import type { RecapSlideProps } from '@/pages/recap/type.ts';
//
// const StrongestBeaten = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <pre>{JSON.stringify(data?.opponent?.strongestBeaten, null, 2)}</pre>
//     </div>
//   );
// };
//
// export default StrongestBeaten;

import type { RecapSlideProps } from '../type.ts';

const StrongestBeaten = ({ data, className = '' }: RecapSlideProps) => {
  const strongestBeaten = data.opponent.strongestBeaten;

  if (!strongestBeaten) {
    return null;
  }

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
          bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_50%)]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute top-1/2 left-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-emerald-500/15
          blur-3xl
        "
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Biggest Victory
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-7xl">
          You Took Down
          <br />a Monster
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          One game. One brilliant performance. One unforgettable upset.
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

            <h2 className="mt-3 text-5xl font-black break-all md:text-6xl">
              @{strongestBeaten.username}
            </h2>
          </div>

          {/* Stats */}
          <div
            className="
              mt-10
              grid gap-4
              md:grid-cols-3
            "
          >
            {/* Rating */}
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-neutral-400">Opponent Rating</p>

              <h3 className="mt-3 text-4xl font-black">
                {strongestBeaten.rating}
              </h3>
            </div>

            {/* Diff */}
            <div className="rounded-3xl bg-emerald-500/10 p-6">
              <p className="text-sm text-emerald-300">Rating Difference</p>

              <h3 className="mt-3 text-4xl font-black text-emerald-400">
                +{strongestBeaten.ratingDiff}
              </h3>
            </div>

            {/* Status */}
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-neutral-400">Result</p>

              <h3 className="mt-3 text-4xl font-black">Victory ♟️</h3>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-10 text-neutral-400">
            Some victories feel different.
          </p>

          {strongestBeaten.gameUrl && (
            <a
              href={strongestBeaten.gameUrl}
              target="_blank"
              rel="noreferrer"
              className="
                mt-6 inline-flex
                rounded-2xl
                bg-white px-5 py-3
                text-sm font-semibold text-black
                transition-opacity duration-200
                hover:opacity-80
              "
            >
              View Game
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default StrongestBeaten;
