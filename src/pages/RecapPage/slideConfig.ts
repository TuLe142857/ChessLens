import type { RecapData } from '@/utils/recap.ts';
import type { RecapSlideDefinition } from '@/pages/RecapPage/type.ts';

import WelcomeSlide from '@/pages/RecapPage/slides/WelcomeSlide.tsx';
import ActivitiesOverviewSlide from '@/pages/RecapPage/slides/ActivitiesOverviewSlide.tsx';
import WDLSlide from '@/pages/RecapPage/slides/WDLSlide.tsx';
import WinRateByColorSlide from '@/pages/RecapPage/slides/WinRateByColorSlide.tsx';
import AccuracySlide from '@/pages/RecapPage/slides/AccuracySlide.tsx';
import RatingSlide from '@/pages/RecapPage/slides/RatingSlide.tsx';
import StrongestBeaten from '@/pages/RecapPage/slides/StrongestBeaten.tsx';
import BiggestUpsetLoss from '@/pages/RecapPage/slides/BiggesUpsetLoss.tsx';
import MostFacedOpponent from '@/pages/RecapPage/slides/MosFacedOpponent.tsx';
import StreakSlide from '@/pages/RecapPage/slides/StreakSlide.tsx';
import EndSlide from '@/pages/RecapPage/slides/EndSlide.tsx';

export const welcomeSlide: RecapSlideDefinition = {
  id: 'welcome',
  title: '',
  component: WelcomeSlide,
  canRender: (data: RecapData) => {
    return !!data?.profile;
  },
};

export const activitiesOverviewSlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: ActivitiesOverviewSlide,
  canRender: (data: RecapData) => {
    return !!data?.gameStats;
  },
};

export const wdlSlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: WDLSlide,
  canRender: (data: RecapData) => {
    return !!data?.wdl;
  },
};

export const winRateByColorSlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: WinRateByColorSlide,
  canRender: (data: RecapData) => {
    return !!data?.winRateByColor;
  },
};

export const accuracySlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: AccuracySlide,
  canRender: (data: RecapData) => {
    return !!data?.accuracy;
  },
};

export const ratingSlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: RatingSlide,
  canRender: (data: RecapData) => {
    return !!data?.rating;
  },
};

export const strongestBeaten: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: StrongestBeaten,
  canRender: (data: RecapData) => {
    return !!data?.opponent?.strongestBeaten;
  },
};

export const biggestUpsetLoss: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: BiggestUpsetLoss,
  canRender: (data: RecapData) => {
    return !!data?.opponent?.biggestUpsetLoss;
  },
};

export const mostFacedOpponent: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: MostFacedOpponent,
  canRender: (data: RecapData) => {
    return !!data?.opponent?.mostFaced;
  },
};

export const streakSlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: StreakSlide,
  canRender: (data: RecapData) => {
    return !!data?.streaks;
  },
};

export const endSlide: RecapSlideDefinition = {
  id: 'activity',
  title: '',
  component: EndSlide,
  canRender: () => {
    return true;
  },
};
