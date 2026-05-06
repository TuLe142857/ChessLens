// import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';
//
// import FlipCard from '@/pages/RecapPage/components/FlipCard.tsx';
// const AccuracySlide = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <pre>{JSON.stringify(data?.accuracy, null, 2)}</pre>
//     </div>
//   );
// };
//
// export default AccuracySlide;

import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

import FlipCard from '@/pages/RecapPage/components/FlipCard.tsx';

const AccuracyCard = ({
  title,
  avg,
  best,
  worst,
}: {
  title: string;
  avg: number;
  best: number;
  worst: number;
}) => {
  return (
    <FlipCard
      className="w-72 overflow-hidden rounded-3xl"
      cover={
        <div
          className="
            flex h-80 flex-col items-center justify-center
            bg-gradient-to-br from-indigo-500 to-purple-600
            px-6 text-center text-white
          "
        >
          <p className="text-sm uppercase tracking-[0.3em] opacity-70">
            Accuracy
          </p>

          <h2 className="mt-4 text-4xl font-black">{title}</h2>

          <p className="mt-6 text-sm opacity-80">Click to reveal</p>
        </div>
      }
    >
      <div
        className="
          flex h-80 flex-col justify-between
          bg-neutral-950 p-6 text-white
        "
      >
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            {title}
          </p>

          <h3 className="mt-3 text-5xl font-black">{avg.toFixed(1)}</h3>

          <p className="mt-2 text-neutral-400">Average Accuracy</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-neutral-400">Best</p>

            <p className="mt-1 text-2xl font-bold text-green-400">
              {best.toFixed(1)}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-neutral-400">Worst</p>

            <p className="mt-1 text-2xl font-bold text-red-400">
              {worst.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </FlipCard>
  );
};

const AccuracySlide = ({ data, className = '' }: RecapSlideProps) => {
  const accuracy = data.accuracy;

  if (!accuracy) {
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

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Accuracy Report
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            How precise were you?
          </h1>

          <p className="mt-4 text-neutral-400">Every move tells a story.</p>
        </div>

        {/* Cards */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
          <AccuracyCard
            title="Overall"
            avg={accuracy.avg}
            best={accuracy.best}
            worst={accuracy.worst}
          />

          {accuracy.rapid && (
            <AccuracyCard
              title="Rapid"
              avg={accuracy.rapid.avg}
              best={accuracy.rapid.best}
              worst={accuracy.rapid.worst}
            />
          )}

          {accuracy.blitz && (
            <AccuracyCard
              title="Blitz"
              avg={accuracy.blitz.avg}
              best={accuracy.blitz.best}
              worst={accuracy.blitz.worst}
            />
          )}

          {accuracy.bullet && (
            <AccuracyCard
              title="Bullet"
              avg={accuracy.bullet.avg}
              best={accuracy.bullet.best}
              worst={accuracy.bullet.worst}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AccuracySlide;
