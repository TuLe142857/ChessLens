import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ChevronRight as NextIcon,
  ChevronLeft as PreviousIcon,
} from 'lucide-react';

import StoryProgressBar from './components/StoryProgressBar.tsx';
import { usePlayerProfile, useGamesByYear } from '@/hooks/useChess.ts';

import { makeRecapData } from '@/utils/recap.ts';

import type { RecapData } from '@/utils/recap.ts';

import type { RecapSlideDefinition } from '@/pages/RecapPage/type.ts';

// slides
import {
  welcomeSlide,
  activitiesOverviewSlide,
  wdlSlide,
  winRateByColorSlide,
  accuracySlide,
  ratingSlide,
  strongestBeaten,
  biggestUpsetLoss,
  mostFacedOpponent,
  streakSlide,
  endSlide,
} from './slideConfig.ts';
import type { Game } from '@/types/chess.ts';

const ALL_SLIDES: RecapSlideDefinition[] = [
  welcomeSlide,
  activitiesOverviewSlide,
  wdlSlide,
  winRateByColorSlide,
  accuracySlide,
  ratingSlide,
  strongestBeaten,
  mostFacedOpponent,
  biggestUpsetLoss,
  streakSlide,
  endSlide,
];

const RecapPage = () => {
  const { username, year } = useParams<{ username: string; year: string }>();

  const { data: playerProfile } = usePlayerProfile(username);

  const gameQueries = useGamesByYear(username, Number(year));

  const gamesByYear = useMemo<Game[] | null>(() => {
    if (gameQueries.every((res) => !res.isFetching)) {
      return gameQueries.flatMap((res) => res?.data ?? []);
    } else {
      return null;
    }
  }, [gameQueries]);

  const recapData = useMemo<RecapData | null>(() => {
    if (!playerProfile || !gamesByYear || !username || !year) {
      return null;
    }
    return makeRecapData(username, Number(year), gamesByYear, playerProfile);
  }, [playerProfile, gamesByYear, username, year]);

  const slides = useMemo<RecapSlideDefinition[]>(() => {
    if (!recapData) {
      return [];
    }
    return ALL_SLIDES.filter((slide) => slide.canRender(recapData));
  }, [recapData]);
  const [slideId, setSlideId] = useState(0);

  const goNextSlide = () => {
    setSlideId((prev) => Math.min(prev + 1, slides.length - 1));
  };
  const goPreviousSlide = () => {
    setSlideId((prev) => Math.max(prev - 1, 0));
  };

  if (!recapData) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
        <p className="text-sm text-zinc-400">Loading recap...</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        No slides available
      </div>
    );
  }

  const CurrentSlideComponent = slides[slideId].component;

  return (
    <div className="relative flex flex-row items-center justify-center h-screen w-screen overflow-hidden">
      {/* progress */}
      <div className="absolute left-0 top-0 z-50 w-full p-2">
        <StoryProgressBar
          n={slides.length}
          current={slideId}
          onChange={setSlideId}
        />
      </div>

      {/* previous */}
      <button
        className={`fixed left-5 top-1/2 z-50 -translate-y-1/2 rounded-full bg-zinc-900/70 p-3 backdrop-blur transition hover:bg-zinc-800 ${
          slideId === 0 ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        onClick={goPreviousSlide}
      >
        <PreviousIcon size={20} />
      </button>

      {/* next */}
      <button
        className={`fixed right-5 top-1/2 z-50 -translate-y-1/2 rounded-full bg-zinc-900/70 p-3 backdrop-blur transition hover:bg-zinc-800 ${
          slideId === slides.length - 1
            ? 'pointer-events-none opacity-0'
            : 'opacity-100'
        }`}
        onClick={goNextSlide}
      >
        <NextIcon size={20} />
      </button>

      {/* current slide */}
      <CurrentSlideComponent data={recapData} className="w-full h-full" />

      {/* footer */}
      <div className="absolute bottom-3 left-0 z-50 w-full text-center text-xs text-zinc-500">
        @{username} • {year} recap
      </div>
    </div>
  );
};

export default RecapPage;
