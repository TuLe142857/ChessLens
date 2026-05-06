import type { RecapSlideProps } from '@/pages/RecapPage/type.ts';

const WelcomeSlide = ({ data, className = '' }: RecapSlideProps) => {
  const profile = data.profile;

  return (
    <section
      className={`
        relative overflow-hidden
        flex flex-col items-center justify-center
        px-6 py-12
        text-center text-white
        bg-neutral-950
        ${className}
      `}
    >
      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute top-1/2 left-1/2
          h-100 w-100
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-yellow-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Intro */}
        <p
          className="
            text-sm uppercase tracking-[0.35em]
            text-neutral-500
          "
        >
          Chess Recap
        </p>

        <h1
          className="
            mt-4
            text-3xl font-black tracking-tight
            sm:text-5xl md:text-6xl
          "
        >
          Every player has a story
        </h1>

        <p
          className="
            mt-4 max-w-xl
            text-sm leading-7
            text-neutral-400
            sm:text-base
          "
        >
          And this one spent the year chasing brilliant moves, painful blunders,
          and unforgettable victories.
        </p>

        {/* Avatar */}
        <div className="relative mt-12">
          {/* Glow ring */}
          <div
            className="
              absolute -inset-2
              rounded-full
              bg-yellow-400/40
              blur-xl
              animate-pulse
            "
          />

          {/* Ring */}
          <div
            className="
              absolute inset-0
              rounded-full
              border border-white/20
            "
          />

          <img
            src={profile.avatar}
            alt="profile"
            className="
              relative
              rounded-full
              object-cover
              bg-white
              shadow-2xl
              w-32 h-32
              sm:w-40 sm:h-40
              md:w-52 md:h-52
            "
          />
        </div>

        {/* Text */}
        <div className="mt-10 space-y-3">
          <p
            className="
              text-xl font-semibold
              text-white
              sm:text-2xl
            "
          >
            A legend from {profile.country_name}
          </p>

          <p
            className="
              text-neutral-400
              sm:text-lg
            "
          >
            The journey began in{' '}
            <span className="font-bold text-white">
              {new Date(profile.joined * 1000).getFullYear()}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSlide;
