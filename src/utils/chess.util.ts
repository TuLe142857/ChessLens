import type { Game, PlayerStats, WDL } from '@/types/chess.ts';

/**
 * Get winner's username
 * Return null if draw
 * @param game
 */
export const getWinner = (game: Game): string | null => {
  if (game.white.result === 'win') {
    return game.white.username;
  } else if (game.black.result === 'win') {
    return game.black.username;
  }
  return null;
};

export const calcTotalWDL = (playerStats: PlayerStats) => {
  const overviewData = {
    totalGames: 0,
    winCount: 0,
    drawCount: 0,
    lossCount: 0,
  };
  const timeClasses = ['chess_rapid', 'chess_blitz', 'chess_bullet'] as const;
  timeClasses.forEach((t) => {
    if (t in playerStats && playerStats[t]?.record) {
      const record = playerStats[t].record;
      overviewData.winCount += record.win;
      overviewData.drawCount += record.draw;
      overviewData.lossCount += record.loss;
      overviewData.totalGames += record.win + record.draw + record.loss;
    }
  });
  return overviewData;
};

export const parseWDLByDay = (
  games: Game[],
  username: string
): Map<string, WDL> => {
  const res = new Map<string, WDL>();
  games.forEach((game) => {
    const date = new Date(game.end_time * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const key = `${yyyy}-${mm}-${dd}`;

    const wdl = res.get(key) ?? { win: 0, draw: 0, loss: 0 };
    const winner = getWinner(game);
    if (winner === null) {
      wdl.draw += 1;
    } else if (winner.toLowerCase() === username.toLowerCase()) {
      wdl.win += 1;
    } else {
      wdl.loss += 1;
    }
    res.set(key, wdl);
  });
  return res;
};

export type RatingByDate = {
  rating: number;
  timestamp: number;
  date: string;
};

export type RatingStats = {
  type: 'rapid' | 'blitz' | 'bullet';
  rating: RatingByDate[];
};

const TIME_CLASSES = ['rapid', 'blitz', 'bullet'] as const;
export const calcRatingStats = (
  games: Game[],
  username: string
): RatingStats[] => {
  const lowerUsername = username.toLowerCase();

  return TIME_CLASSES.map((type): RatingStats => {
    const ratingMap = new Map<string, RatingByDate>();
    games
      .filter((game: Game) => game.time_class === type)
      .forEach((game: Game) => {
        const rating =
          game.white.username.toLowerCase() === lowerUsername
            ? game.white.rating
            : game.black.rating;

        const timeStamp = new Date(game.end_time * 1000);
        const date = timeStamp.toISOString().split('T')[0];
        timeStamp.setUTCHours(0);
        timeStamp.setUTCMinutes(0);
        timeStamp.setUTCSeconds(0);

        const current: RatingByDate = {
          timestamp: timeStamp.getTime(),
          rating: rating,
          date: date,
        };
        const existing = ratingMap.get(date);
        if (!existing || existing.rating < current.rating) {
          ratingMap.set(date, current);
        }
      });

    const rating: RatingByDate[] = [...ratingMap.values()].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    return {
      type,
      rating,
    };
  });
};
