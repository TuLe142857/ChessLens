import { useState, useMemo, useEffect } from 'react';
import type { Game, GameResult } from '@/types/chess.ts';
import { Link } from 'react-router-dom';

import { useAllGames } from '@/hooks/useChess.ts';

type GameResultBadgeProps = {
  white: GameResult;
  black: GameResult;
  resultFor: 'white' | 'black';
};
const GameResultBadge = ({ white, black, resultFor }: GameResultBadgeProps) => {
  const res = white === 'win' ? 1 : black === 'win' ? -1 : 0;

  const winner = white === 'win' ? 'white' : black === 'win' ? 'black' : 'draw';
  const color =
    res === 0
      ? 'bg-gray-500'
      : winner === resultFor
        ? 'bg-green-500'
        : 'bg-red-500';

  const icon = res === 0 ? '=' : winner === resultFor ? '+' : '-';
  return (
    <div className="flex flex-row items-center gap-1">
      <div className="flex flex-col min-w-10">
        <span>{res === 1 ? 1 : res === 0 ? 0.5 : 0}</span>
        <span>{res === -1 ? 1 : res === 0 ? 0.5 : 0}</span>
      </div>

      <div
        className={`
          flex flex-col
          text-lg font-bold
          w-4 h-4 
         rounded-xs ${color}
         items-center justify-center
        `}
      >
        {icon}
      </div>
    </div>
  );
};

type GameFilter = {
  type: 'all' | 'rapid' | 'bullet' | 'blitz';
  result: 'win' | 'loss' | 'draw' | 'all';
  opponent: string;
  fromDate: number;
  toDate: number;
  color: 'black' | 'white' | 'all';
};

type Pagination = {
  page: number;
  perPage: number;
};

const GameTab = ({ username }: { username: string }) => {
  const queriesResult = useAllGames(username);

  const fetchedCount = queriesResult.filter((i) => i.isSuccess).length;
  const progress =
    queriesResult.length === 0
      ? 100
      : Math.round((fetchedCount / queriesResult.length) * 100);
  const error = queriesResult.some((i) => i.isError);

  const allGames = useMemo(
    () => queriesResult.flatMap((res) => res.data ?? []),
    [queriesResult]
  );

  const [filter, setFilter] = useState<GameFilter>({
    type: 'all',
    result: 'all',
    opponent: '',
    fromDate: -1,
    toDate: -1,
    color: 'all',
  });
  const filteredGames = useMemo(
    () =>
      allGames.filter((game: Game) => {
        const [playerColor] =
          game.white.username.toLowerCase() === username.toLowerCase()
            ? ['white', 'black']
            : ['black', 'white'];
        const [player, opponent] =
          playerColor === 'white'
            ? [game.white, game.black]
            : [game.black, game.white];
        const result =
          player.result === 'win'
            ? 'win'
            : opponent.result == 'win'
              ? 'loss'
              : 'draw';
        return (
          (filter.type === 'all' || game.time_class === filter.type) &&
          (filter.result === 'all' || result === filter.result) &&
          (filter.color === 'all' || filter.color === playerColor) &&
          (filter.opponent === '' || filter.opponent === opponent.username)
        );
      }),
    [allGames, filter, username]
  );

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 10,
  });

  const paginatedGames = useMemo<Game[]>(() => {
    const start = Math.min(
      (pagination.page - 1) * pagination.perPage,
      filteredGames.length
    );
    const end = Math.min(start + pagination.perPage, filteredGames.length);
    return filteredGames.slice(start, end);
  }, [filteredGames, pagination]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [filter]);

  // const handleResetFilter = () => {};

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredGames.length / pagination.perPage);
    if (pagination.page < maxPage) {
      setPagination((prev) => ({ ...prev, page: pagination.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1)
      setPagination((prev) => ({ ...prev, page: pagination.page - 1 }));
  };

  if (error) {
    return <div>Some thing wrong</div>;
  }
  if (progress !== 100) {
    return (
      <div>
        <div className="animate-spin w-fit h-fit">|</div>
        <span>{progress}%</span>
        <span>
          {fetchedCount}/{queriesResult.length}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 gap-2">
      <div>{allGames.length} games</div>
      <div className="form flex flex-col gap-2 p-2 max-w-150">
        <div className="self-center font-bold text-2xl">Filter</div>

        <select
          className={`input p-1`}
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
        >
          <option value={'all'}>All Games</option>
          <option value="blitz">Blitz</option>
          <option value="rapid">Rapid</option>
          <option value="bullet">Bullet</option>
        </select>

        <select
          className={`input p-1`}
          name="result"
          value={filter.result}
          onChange={handleFilterChange}
        >
          <option value={'all'}>All Result</option>
          <option value="win">Win</option>
          <option value="draw">Draw</option>
          <option value="loss">Loss</option>
        </select>

        <select
          className={`input p-1`}
          name="color"
          value={filter.color}
          onChange={handleFilterChange}
        >
          <option value={'all'}>All Color</option>
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-row items-center gap-2">
            <span>From</span>
            <input className={`input p-1`} type="date" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <span>To</span>
            <input className={`input p-1`} type="date" />
          </div>
        </div>

        {/*<select className={`input p-1`}>*/}
        {/*  <option value={''}>Select Result</option>*/}
        {/*  <option value="blitz">Blitz</option>*/}
        {/*  <option value="bullet">bullet</option>*/}
        {/*  <option value="Rapid">Rapid</option>*/}
        {/*</select>*/}

        <input
          className={`input p-1`}
          placeholder="Opponent"
          name="opponent"
          value={filter.opponent}
          onChange={handleFilterChange}
        />

        <div className={`flex flex-row p-2 gap-2`}>
          <button
            className={`flex-1 rounded-md p-2 font-semibold text-white bg-green-500 hover:bg-green-400`}
          >
            Filter
          </button>
          <button
            className={`flex-1 rounded-md  p-2 font-semibold text-white bg-slate-500 hover:bg-slate-400`}
          >
            Reset
          </button>
        </div>
      </div>

      <table>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>

        <thead>
          <tr>
            <th>Type</th>
            <th>Player</th>
            <th>Result</th>
            <th>Accuracy</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {paginatedGames.slice(0, 100).map((game: Game) => (
            <tr key={game.uuid}>
              <td>{game.time_class}</td>

              <td>
                <div className={`flex flex-col`}>
                  <div className={`flex flex-row items-center gap-1`}>
                    <span className={`rounded-xs w-2 h-2 bg-white`}></span>
                    <Link to={`/player/${game.white.username}`}>
                      {game.white.username} <span>({game.white.rating})</span>
                    </Link>
                  </div>

                  <div className={`flex flex-row items-center gap-1`}>
                    <span className={`rounded-xs w-2 h-2 bg-black`}></span>
                    <Link to={`/player/${game.black.username}`}>
                      {game.black.username} <span>({game.black.rating})</span>
                    </Link>
                  </div>
                </div>
              </td>

              <td>
                <GameResultBadge
                  white={game.white.result}
                  black={game.black.result}
                  resultFor={
                    game.white.username.toLowerCase() === username.toLowerCase()
                      ? 'white'
                      : 'black'
                  }
                />
              </td>

              <td>
                <div className={`flex flex-col  justify-center gap-1`}>
                  <span>{game.accuracies?.black || 'N/A'}</span>
                  <span>{game.accuracies?.white || 'N/A'}</span>
                </div>
              </td>
              <td>{new Date(game.end_time * 1000).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-row gap-2 self-center items-center">
        <button className={'btn '} onClick={handlePrevPage}>
          {'<'}
        </button>
        <span>
          Page {pagination.page}/
          {Math.ceil(filteredGames.length / pagination.perPage)}
        </span>
        <button className={'btn'} onClick={handleNextPage}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default GameTab;
