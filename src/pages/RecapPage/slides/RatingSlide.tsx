// import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';
//
// const RatingSlide = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <pre>{JSON.stringify(data?.rating, null, 2)}</pre>
//     </div>
//   );
// };
//
// export default RatingSlide;

import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

type RatingCardProps = {
  title: string;
  start: number;
  end: number;
  gain: number;
  peak: number;
  totalGames: number;
};

const RatingCard = ({
  title,
  start,
  end,
  gain,
  peak,
  totalGames,
}: RatingCardProps) => {
  const isPositive = gain >= 0;

  return (
    <div
      className="
        relative overflow-hidden rounded-3xl
        border border-white/10
        bg-white/5
        p-6
        backdrop-blur-sm
        transition-transform duration-300
        hover:scale-[1.02]
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute top-0 right-0
          h-40 w-40 rounded-full
          blur-3xl opacity-20
          ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}
        `}
      />

      <div className="relative z-10">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          {title}
        </p>

        <div className="mt-5 flex items-end gap-3">
          <h2 className="text-6xl font-black">{end}</h2>

          <div
            className={`
              rounded-full px-3 py-1 text-sm font-semibold
              ${
                isPositive
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-rose-500/15 text-rose-400'
              }
            `}
          >
            {isPositive ? '+' : ''}
            {gain}
          </div>
        </div>

        <p className="mt-2 text-neutral-400">Final Rating</p>

        {/* Stats */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <span className="text-neutral-400">Started At</span>

            <span className="font-bold">{start}</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <span className="text-neutral-400">Peak Rating</span>

            <span className="font-bold text-yellow-400">{peak}</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <span className="text-neutral-400">Games Played</span>

            <span className="font-bold">{totalGames.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingSlide = ({ data, className = '' }: RecapSlideProps) => {
  const ratingModes = [
    data.rating.rapid && {
      title: 'Rapid',
      ...data.rating.rapid,
    },

    data.rating.blitz && {
      title: 'Blitz',
      ...data.rating.blitz,
    },

    data.rating.bullet && {
      title: 'Bullet',
      ...data.rating.bullet,
    },
  ].filter(Boolean);

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
          absolute left-1/2 top-1/2
          h-[500px] w-[500px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-indigo-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Rating Journey
        </p>

        <h1 className="mt-4 text-center text-5xl font-black md:text-6xl">
          The Climb
        </h1>

        <p className="mt-4 max-w-2xl text-center text-neutral-400">
          Every game pushed your rating higher — or taught you something new.
        </p>

        {/* Cards */}
        <div
          className="
            mt-14
            grid w-full gap-6
            lg:grid-cols-3
          "
        >
          {ratingModes.map((mode) => {
            if (!mode) {
              return null;
            }

            return (
              <RatingCard
                key={mode.title}
                title={mode.title}
                start={mode.start}
                end={mode.end}
                gain={mode.gain}
                peak={mode.peak.rating}
                totalGames={mode.totalGame}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RatingSlide;
