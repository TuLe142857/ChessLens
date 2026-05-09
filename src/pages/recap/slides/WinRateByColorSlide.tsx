// import type { RecapSlideProps } from '@/pages/recap/type.ts';
//
// const WinRateByColorSlide = ({ data, className = '' }: RecapSlideProps) => {
//   return (
//     <div
//       className={`flex flex-col justify-center items-center gap-2 ${className}`}
//     >
//       <div>{data.winRateByColor.white}</div>
//       <div>{data.winRateByColor.black}</div>
//     </div>
//   );
// };
//
// export default WinRateByColorSlide;

import type { RecapSlideProps } from '../type.ts';

const WinRateCard = ({
  title,
  rate,
  theme,
}: {
  title: string;
  rate: number;
  theme: 'white' | 'black';
}) => {
  const isWhite = theme === 'white';

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl
        border
        p-8
        backdrop-blur-sm
        transition-transform duration-300
        hover:scale-[1.02]
        ${
          isWhite
            ? 'border-white/20 bg-white text-black'
            : 'border-white/10 bg-neutral-900 text-white'
        }
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute top-0 right-0
          h-32 w-32 rounded-full
          blur-3xl opacity-30
          ${isWhite ? 'bg-yellow-300' : 'bg-indigo-500'}
        `}
      />

      <div className="relative z-10">
        <p
          className={`
            text-sm uppercase tracking-[0.3em]
            ${isWhite ? 'text-black/50' : 'text-neutral-500'}
          `}
        >
          {title}
        </p>

        <h2 className="mt-6 text-6xl font-black">{rate.toFixed(1)}%</h2>

        <div
          className={`
            mt-8 h-3 overflow-hidden rounded-full
            ${isWhite ? 'bg-black/10' : 'bg-white/10'}
          `}
        >
          <div
            className={`
              h-full rounded-full
              ${isWhite ? 'bg-black' : 'bg-white'}
            `}
            style={{
              width: `${Math.min(rate, 100)}%`,
            }}
          />
        </div>

        <p
          className={`
            mt-4 text-sm
            ${isWhite ? 'text-black/60' : 'text-neutral-400'}
          `}
        >
          Win rate playing as {title.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

const WinRateByColorSlide = ({ data, className = '' }: RecapSlideProps) => {
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

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        {/* Header */}
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Color Performance
        </p>

        <h1 className="mt-4 text-center text-5xl font-black md:text-6xl">
          White vs Black
        </h1>

        <p className="mt-4 max-w-2xl text-center text-neutral-400">
          Which side brought you more victories this year?
        </p>

        {/* Cards */}
        <div
          className="
            mt-14
            grid w-full gap-6
            md:grid-cols-2
          "
        >
          <WinRateCard
            title="White"
            rate={data.winRateByColor.white}
            theme="white"
          />

          <WinRateCard
            title="Black"
            rate={data.winRateByColor.black}
            theme="black"
          />
        </div>
      </div>
    </section>
  );
};

export default WinRateByColorSlide;
