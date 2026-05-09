import { useMemo, useState } from 'react';
import {
  useGamesByYear,
  usePlayerProfile,
  usePlayerStats,
} from '@/hooks/useChess.ts';
import { calcTotalWDL, parseWDLByDay } from '@/utils/chess.util.ts';
import WDLBadge from '@/components/WDLBadge.tsx';
import StatsCard from '@/components/StatsCard.tsx';

import HeatMapCalendar from '@/components/HeatMapCalendar.tsx';

const WDLStats = ({ username }: { username: string }) => {
  const { data: profile, isLoading: isLoadingProfile } =
    usePlayerProfile(username);
  const { data: stats, isLoading: isLoadingStats } = usePlayerStats(username);
  const totalWDL = useMemo(() => {
    return stats
      ? calcTotalWDL(stats)
      : { totalGames: 0, winCount: 0, drawCount: 0, lossCount: 0 };
  }, [stats]);

  if (isLoadingProfile || isLoadingStats || !profile) {
    return (
      <div className="flex flex-col text-xl p-2 gap-2">
        <div className="skeleton w-50 h-5" />
        <div className="skeleton rounded-md w-full h-30" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 md:gap-5 md:p-5">
          <div className="skeleton rounded-md w-full h-30" />
          <div className="skeleton rounded-md w-full h-30" />
          <div className="skeleton rounded-md w-full h-30" />
          <div className="skeleton rounded-md w-full h-30" />
        </div>
      </div>
    );
  }

  const yearCount =
    new Date().getFullYear() -
    new Date(profile?.joined * 1000).getFullYear() +
    1;
  return (
    <div>
      <div className="flex flex-row gap-1 font-nornal text-2xl">
        <span className="font-bold">{username}</span>
        played
        <span className="text-blue-400 font-bold">{totalWDL.totalGames}</span>
        game{totalWDL.totalGames > 0 ? 's' : ''} through
        <span className="text-blue-400 font-bold">{yearCount} years</span>
      </div>

      <WDLBadge
        win={totalWDL.winCount}
        draw={totalWDL.drawCount}
        loss={totalWDL.lossCount}
        className="card px-5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 md:gap-5 md:p-5">
        {stats?.chess_rapid && (
          <StatsCard stats={stats.chess_rapid} typeName="Rapid" />
        )}

        {stats?.chess_blitz && (
          <StatsCard stats={stats.chess_blitz} typeName="Blitz" />
        )}

        {stats?.chess_bullet && (
          <StatsCard stats={stats.chess_bullet} typeName="Bullet" />
        )}
      </div>
    </div>
  );
};

const HeatMap = ({ username }: { username: string }) => {
  const { data: profile } = usePlayerProfile(username);
  const startYear = useMemo(() => {
    return profile ? new Date(profile.joined * 1000).getFullYear() : undefined;
  }, [profile]);
  const endYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(endYear);

  const queriesRes = useGamesByYear(username, selectedYear);

  const gameByYear = useMemo(
    () => queriesRes.flatMap((res) => res?.data ?? []),
    [queriesRes]
  );
  const heatmapData = useMemo(
    () => parseWDLByDay(gameByYear, username),
    [gameByYear, username]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-end gap-2">
        <h2 className="text-2xl font-bold">HeatMap</h2>
        {
          <select
            className="input"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value={endYear}>{endYear}</option>
            {startYear &&
              Array.from(
                { length: endYear - startYear },
                (_, i) => i + startYear
              ).map((year) => <option value={year}>{year}</option>)}
          </select>
        }
      </div>
      <HeatMapCalendar year={selectedYear} data={heatmapData} />
    </div>
  );
};

const OverviewTab = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-col text-xl p-2 gap-4">
      <HeatMap username={username} />
      <hr className="my-2 text-gray-500/50" />
      <WDLStats username={username} />
    </div>
  );
};

export default OverviewTab;
