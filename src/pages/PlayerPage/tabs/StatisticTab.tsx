import { useAllGames } from '@/hooks/useChess.ts';
import { calcRatingStats, type RatingStats } from '@/utils/chess.util.ts';
import { useMemo } from 'react';
import RatingHistoryChart from '@/components/RatingHistoryChart.tsx';

import type { Game } from '@/types/chess.ts';

const StatisticTab = ({ username }: { username: string }) => {
  const allGamesQueries = useAllGames(username);

  const allGames = useMemo<Game[]>(() => {
    if (allGamesQueries.every((res) => !res.isFetching)) {
      return allGamesQueries.flatMap((res) => res?.data ?? []);
    } else {
      return [];
    }
  }, [allGamesQueries]);

  const ratingStats = useMemo<RatingStats[]>(() => {
    return calcRatingStats(allGames, username);
  }, [allGames, username]);

  return (
    <div className={`flex flex-col p-2 gap-2`}>
      <RatingHistoryChart ratingStats={ratingStats} />
    </div>
  );
};

export default StatisticTab;
