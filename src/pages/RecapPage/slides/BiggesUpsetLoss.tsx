// import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';
//
// const BiggestUpsetLoss = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <pre>{JSON.stringify(data?.opponent?.biggestUpsetLoss, null, 2)}</pre>
//     </div>
//   );
// };
//
// export default BiggestUpsetLoss;

import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

const BiggestUpsetLoss = ({ data, className = '' }: RecapSlideProps) => {
  const upsetLoss = data.opponent.biggestUpsetLoss;

  if (!upsetLoss) {
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
          bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_50%)]
        "
      />

      {/* Red glow */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-rose-500/15
          blur-3xl
        "
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Toughest Moment
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-7xl">
          The One That Hurt
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          Every player remembers a painful defeat. This was yours.
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

            <h2 className="mt-4 break-all text-5xl font-black md:text-6xl">
              @{upsetLoss.username}
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
            {/* Rating */}
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-neutral-400">Opponent Rating</p>

              <h3 className="mt-3 text-4xl font-black">{upsetLoss.rating}</h3>
            </div>

            {/* Difference */}
            <div className="rounded-3xl bg-rose-500/10 p-6">
              <p className="text-sm text-rose-300">Rating Difference</p>

              <h3 className="mt-3 text-4xl font-black text-rose-400">
                -{upsetLoss.ratingDiff}
              </h3>
            </div>

            {/* Result */}
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-sm text-neutral-400">Result</p>

              <h3 className="mt-3 text-4xl font-black">Defeat</h3>
            </div>
          </div>

          {/* Quote */}
          <div
            className="
              mt-10 rounded-3xl
              border border-white/10
              bg-black/20
              p-6
            "
          >
            <p className="text-lg leading-8 text-neutral-300 italic">
              “Some losses stay with you longer than victories.”
            </p>
          </div>

          {/* Button */}
          {upsetLoss.gameUrl && (
            <a
              href={upsetLoss.gameUrl}
              target="_blank"
              rel="noreferrer"
              className="
                mt-8 inline-flex
                rounded-2xl
                bg-white px-5 py-3
                text-sm font-semibold text-black
                transition-opacity duration-200
                hover:opacity-80
              "
            >
              Review Game
            </a>
          )}

          {/* Footer */}
          <p className="mt-10 text-neutral-500">
            But every painful loss becomes experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BiggestUpsetLoss;
