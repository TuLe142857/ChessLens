import type { RecapData } from './utils.ts';
import type { RecapSlideDefinition } from './type.ts';

import WelcomeSlide from './slides/WelcomeSlide.tsx';
import ActivitiesOverviewSlide from './slides/ActivitiesOverviewSlide.tsx';
import WDLSlide from './slides/WDLSlide.tsx';
import WinRateByColorSlide from './slides/WinRateByColorSlide.tsx';
import AccuracySlide from './slides/AccuracySlide.tsx';
import RatingSlide from './slides/RatingSlide.tsx';
import StrongestBeaten from './slides/StrongestBeaten.tsx';
import BiggestUpsetLoss from './slides/BiggesUpsetLoss.tsx';
import MostFacedOpponent from './slides/MosFacedOpponent.tsx';
import StreakSlide from './slides/StreakSlide.tsx';
import EndSlide from './slides/EndSlide.tsx';

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
