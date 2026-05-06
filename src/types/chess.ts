export type PlayerProfile = {
  username: string;

  /** the personal first and last name */
  name?: string;

  /** avatar url 200x200 image*/
  avatar?: string; // avatar url

  /** chess.com user's profile page */
  url: string;

  /** UNIX timestamp */
  joined: number;

  country: string;

  /** custom field, not include in chess.com public api */
  country_code?: string;

  /** custom field, not include in chess.com public api */
  country_name?: string;

  followers: number;

  last_online: number;
};

export type Country = {
  code: string;
  name: string;
};

export type WDL = {
  win: number;
  loss: number;
  draw: number;
};

export type ChessStats = {
  last: {
    rating: number;
    date: number;
    rd: number;
  };
  best: {
    rating: number;
    date: number;
    game: string;
  };
  record: {
    win: number;
    loss: number;
    draw: number;
    time_per_move?: number;
    timeout_percent?: number;
  };
  tournament?: {
    count: number;
    withdraw: number;
    points: number;
    highest_finish: number;
  };
};

export type TacticsStats = {
  highest: { rating: number; date: number };
  lowest: { rating: number; date: number };
};

export type PuzzleRushStats = {
  daily?: { total_attempts: number; score: number };
  best?: { total_attempts: number; score: number };
};

export type PlayerStats = {
  chess_daily?: ChessStats;
  chess960_daily?: ChessStats;
  chess_rapid?: ChessStats;
  chess_blitz?: ChessStats;
  chess_bullet?: ChessStats;
  chess_bughouse?: ChessStats;
  chess_kingofthehill?: ChessStats;
  chess_threecheck?: ChessStats;
  chess_crazyhouse?: ChessStats;
  tactics?: TacticsStats;
  lessons?: TacticsStats;
  puzzle_rush?: PuzzleRushStats;
};

export type GameArchive = {
  archives: string[];
};

export type GameResult =
  | 'win'
  | 'checkmated'
  | 'agreed' // Hoà theo thoả thuận
  | 'repetition' // Hoà do lặp vị trí 3 lần
  | 'timeout'
  | 'resigned'
  | 'stalemate' // Hoà do pat (không còn nước đi hợp lệ)
  | 'lose'
  | 'insufficient' // Hoà do không đủ quân chiếu hết
  | '50move' // Hoà theo quy tắc 50 nước
  | 'abandoned'
  | 'kingofthehill'
  | 'threecheck'
  | 'timevsinsufficient'
  | 'bughousepartnerlose';

export type Game = {
  uuid: string;
  white: {
    username: string;
    rating: number;
    result: GameResult;
    '@id': string; // URL profile
  };
  black: {
    username: string;
    rating: number;
    result: GameResult;
    '@id': string;
  };
  accuracies?: {
    white: number;
    black: number;
  };
  url: string;
  fen: string; // FEN — ký hiệu mô tả trạng thái bàn cờ
  pgn: string; // PGN (Portable Game Notation) — định dạng ghi ván đấu
  start_time: number;
  end_time: number;
  time_control: string;
  time_class: string;
  rules: string;
  eco?: string; // ECO code — mã khai cuộc
  tournament?: string;
  match?: string;
};
