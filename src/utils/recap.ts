import type { PlayerProfile, Game, GameResult } from '@/types/chess.ts';

type RatingSummary = {
  start: number;
  end: number;
  peak: {
    rating: number;
    date: number;
  };

  gain: number; // end - start
  totalGame: number;
};

export type RecapData = {
  // 1  slide
  year: number;
  profile: PlayerProfile;

  // 1 slide
  gameStats: {
    totalHours: number;
    totalGames: number;
    avgGamePerDay: number;
    mostActiveMonth: number;
    mostActiveDay?: string;
    firstGameDate?: number;
    lastGameDate?: number;
  };

  // 1 slide
  wdl: {
    win: number;
    loss: number;
    draw: number;
  };

  // 1 slide
  winRateByColor: {
    white: number;
    black: number;
  };

  // 1 slide
  accuracy?: {
    avg: number;
    best: number;
    worst: number;

    rapid?: {
      avg: number;
      best: number;
      worst: number;
    };

    blitz?: {
      avg: number;
      best: number;
      worst: number;
    };

    bullet?: {
      avg: number;
      best: number;
      worst: number;
    };
  };

  // 1 slide
  rating: {
    rapid?: RatingSummary;
    blitz?: RatingSummary;
    bullet?: RatingSummary;
  };

  // 1 slide
  streaks: {
    winStreak: number;
    unbeatenStreak: number;
    lossStreak: number;
  };

  // 2 - 3 slides
  opponent: {
    strongestBeaten?: {
      username: string;
      rating: number;
      ratingDiff: number;
      gameUrl?: string;
    };

    biggestUpsetLoss?: {
      username: string;
      rating: number;
      ratingDiff: number;
      gameUrl?: string;
    };

    mostFaced?: {
      username: string;
      games: number;
      wins: number;
    };
  };
};

type PlayerGameData = {
  color: 'white' | 'black';

  player: Game['white'];

  opponent: Game['black'];
};

const DRAW_RESULTS: GameResult[] = [
  'agreed',
  'repetition',
  'stalemate',
  'insufficient',
  '50move',
  'timevsinsufficient',
];

const round2 = (value: number) => {
  return Number(value.toFixed(2));
};

const isDraw = (result: GameResult) => {
  return DRAW_RESULTS.includes(result);
};

const getPlayerGameData = (game: Game, username: string): PlayerGameData => {
  const lowerUsername = username.toLowerCase();

  const isWhite = game.white.username.toLowerCase() === lowerUsername;

  return {
    color: isWhite ? 'white' : 'black',

    player: isWhite ? game.white : game.black,

    opponent: isWhite ? game.black : game.white,
  };
};

const sortGamesByDate = (games: Game[]) => {
  return [...games].sort((a, b) => a.end_time - b.end_time);
};

const calculateWDL = (games: Game[], username: string) => {
  let win = 0;
  let draw = 0;
  let loss = 0;

  games.forEach((game) => {
    const { player } = getPlayerGameData(game, username);

    if (player.result === 'win') {
      win += 1;
      return;
    }

    if (isDraw(player.result)) {
      draw += 1;
      return;
    }

    loss += 1;
  });

  return {
    win,
    draw,
    loss,
  };
};

const calculateWinRateByColor = (games: Game[], username: string) => {
  let whiteGames = 0;
  let whiteWins = 0;

  let blackGames = 0;
  let blackWins = 0;

  games.forEach((game) => {
    const { color, player } = getPlayerGameData(game, username);

    if (color === 'white') {
      whiteGames += 1;

      if (player.result === 'win') {
        whiteWins += 1;
      }
    } else {
      blackGames += 1;

      if (player.result === 'win') {
        blackWins += 1;
      }
    }
  });

  return {
    white: whiteGames === 0 ? 0 : round2((whiteWins / whiteGames) * 100),

    black: blackGames === 0 ? 0 : round2((blackWins / blackGames) * 100),
  };
};

const calculateAccuracy = (games: Game[], username: string) => {
  const accuracies: number[] = [];

  games.forEach((game) => {
    if (!game.accuracies) {
      return;
    }

    const { color } = getPlayerGameData(game, username);

    const accuracy =
      color === 'white' ? game.accuracies.white : game.accuracies.black;

    accuracies.push(accuracy);
  });

  if (accuracies.length === 0) {
    return undefined;
  }

  const total = accuracies.reduce((sum, value) => sum + value, 0);

  return {
    avg: round2(total / accuracies.length),

    best: Math.max(...accuracies),

    worst: Math.min(...accuracies),
  };
};

const calculateGameStats = (games: Game[]) => {
  let totalSeconds = 0;

  const monthMap = new Map<number, number>();

  const dayMap = new Map<string, number>();

  games.forEach((game) => {
    totalSeconds += game.end_time - game.start_time;

    const date = new Date(game.end_time * 1000);

    const month = date.getMonth();

    monthMap.set(month, (monthMap.get(month) ?? 0) + 1);

    const day = date.toISOString().split('T')[0];

    dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
  });

  let mostActiveMonth = 0;

  let mostMonthGames = 0;

  monthMap.forEach((games, month) => {
    if (games > mostMonthGames) {
      mostMonthGames = games;

      mostActiveMonth = month;
    }
  });

  let mostActiveDay: string | undefined;

  let mostDayGames = 0;

  dayMap.forEach((games, day) => {
    if (games > mostDayGames) {
      mostDayGames = games;

      mostActiveDay = day;
    }
  });

  const sortedGames = sortGamesByDate(games);

  return {
    totalHours: round2(totalSeconds / 3600),

    totalGames: games.length,

    avgGamePerDay: round2(games.length / 365),

    mostActiveMonth,

    mostActiveDay,

    firstGameDate: sortedGames[0]?.start_time,

    lastGameDate: sortedGames[sortedGames.length - 1]?.end_time,
  };
};

const calculateStreaks = (games: Game[], username: string) => {
  let currentWin = 0;
  let bestWin = 0;

  let currentLoss = 0;
  let bestLoss = 0;

  let currentUnbeaten = 0;
  let bestUnbeaten = 0;

  games.forEach((game) => {
    const { player } = getPlayerGameData(game, username);

    // WIN
    if (player.result === 'win') {
      currentWin += 1;
      bestWin = Math.max(bestWin, currentWin);

      currentLoss = 0;

      currentUnbeaten += 1;
      bestUnbeaten = Math.max(bestUnbeaten, currentUnbeaten);

      return;
    }

    // DRAW
    if (isDraw(player.result)) {
      currentWin = 0;
      currentLoss = 0;

      currentUnbeaten += 1;

      bestUnbeaten = Math.max(bestUnbeaten, currentUnbeaten);

      return;
    }

    // LOSS
    currentWin = 0;

    currentLoss += 1;

    bestLoss = Math.max(bestLoss, currentLoss);

    currentUnbeaten = 0;
  });

  return {
    winStreak: bestWin,

    unbeatenStreak: bestUnbeaten,

    lossStreak: bestLoss,
  };
};

const calculateOpponentStats = (games: Game[], username: string) => {
  let strongestBeaten: RecapData['opponent']['strongestBeaten'] | undefined;

  let biggestUpsetLoss: RecapData['opponent']['biggestUpsetLoss'] | undefined;

  const opponentMap = new Map<
    string,
    {
      games: number;
      wins: number;
    }
  >();

  games.forEach((game) => {
    const { player, opponent } = getPlayerGameData(game, username);

    const ratingDiff = opponent.rating - player.rating;

    // strongest beaten
    if (
      player.result === 'win' &&
      (!strongestBeaten || opponent.rating > strongestBeaten.rating)
    ) {
      strongestBeaten = {
        username: opponent.username,

        rating: opponent.rating,

        ratingDiff,

        gameUrl: game.url,
      };
    }

    // upset loss
    if (player.result !== 'win' && !isDraw(player.result)) {
      if (!biggestUpsetLoss || ratingDiff < biggestUpsetLoss.ratingDiff) {
        biggestUpsetLoss = {
          username: opponent.username,

          rating: opponent.rating,

          ratingDiff,

          gameUrl: game.url,
        };
      }
    }

    // most faced
    const existing = opponentMap.get(opponent.username);

    if (!existing) {
      opponentMap.set(opponent.username, {
        games: 1,

        wins: player.result === 'win' ? 1 : 0,
      });

      return;
    }

    existing.games += 1;

    if (player.result === 'win') {
      existing.wins += 1;
    }
  });

  let mostFaced: RecapData['opponent']['mostFaced'] | undefined;

  opponentMap.forEach((value, username) => {
    if (!mostFaced || value.games > mostFaced.games) {
      mostFaced = {
        username,

        games: value.games,

        wins: value.wins,
      };
    }
  });

  return {
    strongestBeaten,

    biggestUpsetLoss,

    mostFaced,
  };
};

const buildRatingSummary = (
  games: Game[],
  username: string,
  timeClass: 'rapid' | 'blitz' | 'bullet'
) => {
  const filteredGames = games
    .filter((game) => game.time_class === timeClass)
    .sort((a, b) => a.end_time - b.end_time);

  if (filteredGames.length === 0) {
    return undefined;
  }

  const firstGame = filteredGames[0];

  const lastGame = filteredGames[filteredGames.length - 1];

  const firstPlayer = getPlayerGameData(firstGame, username).player;

  const lastPlayer = getPlayerGameData(lastGame, username).player;

  let peakRating = firstPlayer.rating;

  let peakDate = firstGame.end_time;

  filteredGames.forEach((game) => {
    const { player } = getPlayerGameData(game, username);

    if (player.rating > peakRating) {
      peakRating = player.rating;

      peakDate = game.end_time;
    }
  });

  return {
    start: firstPlayer.rating,

    end: lastPlayer.rating,

    peak: {
      rating: peakRating,

      date: peakDate,
    },

    gain: lastPlayer.rating - firstPlayer.rating,

    totalGame: filteredGames.length,
  };
};

const calculateRatingStats = (games: Game[], username: string) => {
  return {
    rapid: buildRatingSummary(games, username, 'rapid'),

    blitz: buildRatingSummary(games, username, 'blitz'),

    bullet: buildRatingSummary(games, username, 'bullet'),
  };
};

export const makeRecapData = (
  username: string,
  year: number,
  games: Game[],
  playerProfile: PlayerProfile
): RecapData => {
  const sortedGames = sortGamesByDate(games);

  return {
    year: year,

    profile: playerProfile,

    gameStats: calculateGameStats(sortedGames),

    wdl: calculateWDL(sortedGames, username),

    winRateByColor: calculateWinRateByColor(sortedGames, username),

    accuracy: calculateAccuracy(sortedGames, username),

    rating: calculateRatingStats(sortedGames, username),

    streaks: calculateStreaks(sortedGames, username),

    opponent: calculateOpponentStats(sortedGames, username),
  };
};
