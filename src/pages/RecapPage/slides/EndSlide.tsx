import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

const getBestRating = (data: RecapSlideProps['data']) => {
  const ratings = [
    data.rating.rapid?.peak.rating,
    data.rating.blitz?.peak.rating,
    data.rating.bullet?.peak.rating,
  ].filter(Boolean) as number[];

  if (ratings.length === 0) {
    return undefined;
  }

  return Math.max(...ratings);
};

const EndSlide = ({ data, className = '' }: RecapSlideProps) => {
  const bestRating = getBestRating(data);

  return (
    <section
      className={[
        'relative overflow-hidden',
        'flex min-h-screen flex-col items-center justify-center',
        'bg-neutral-950 text-white',
        'px-6 py-12 text-center',
        className,
      ].join(' ')}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_40%)]" />

      <div className="relative z-10 max-w-4xl">
        {/* Heading */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Chess Recap
        </p>

        <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
          That was your {data.year}
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-300 md:text-2xl">
          From opening mistakes to brilliant moves, you kept showing up at the
          board.
        </p>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm text-neutral-400">Games</p>

            <p className="mt-2 text-3xl font-black">
              {data.gameStats.totalGames.toLocaleString()}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm text-neutral-400">Hours</p>

            <p className="mt-2 text-3xl font-black">
              {Math.round(data.gameStats.totalHours)}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm text-neutral-400">Best Streak</p>

            <p className="mt-2 text-3xl font-black">{data.streaks.winStreak}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm text-neutral-400">Peak Rating</p>

            <p className="mt-2 text-3xl font-black">{bestRating || '-'}</p>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-16">
          <p className="text-xl font-semibold text-white md:text-2xl">
            See you on the board in {data.year + 1} ♟️
          </p>

          <p className="mt-3 text-sm text-neutral-500">
            @{data.profile.username}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EndSlide;
