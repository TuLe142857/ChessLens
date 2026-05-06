import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard as OverviewIcon,
  ChessPawn as GameIcon,
  ChartArea as StatisticIcon,
  Play as PlayIcon,
} from 'lucide-react';
import axios from 'axios';

import {
  useAllGames,
  usePlayerProfile,
  usePlayerStats,
} from '@/hooks/useChess.ts';

import type { TabItem } from '@/components/TabBar.tsx';
import TabBar from '@/components/TabBar.tsx';

import PlayerCard from '@/components/PlayerCard';
import PlayerCardSkeleton from '@/components/PlayerCardSkeleton.tsx';
import OverviewTab from './tabs/OverviewTab.tsx';
import GameTab from './tabs/GameTab.tsx';
import StatisticTab from './tabs/StatisticTab.tsx';
import ErrorCard from '@/components/errors/ErrorCard.tsx';
const Tabs: TabItem[] = [
  {
    id: 'overview',
    label: 'overview',
    icon: <OverviewIcon />,
  },
  {
    id: 'stats',
    label: 'statistics',
    icon: <StatisticIcon />,
  },
  {
    id: 'games',
    label: 'games',
    icon: <GameIcon />,
  },
];

const PlayerPage = () => {
  const { username } = useParams<{ username: string }>();

  // player data
  const {
    data: playerProfile,
    isError: isProfileError,
    error: profileError,
    refetch: refetchProfile,
  } = usePlayerProfile(username);

  const {
    data: playerStats,
  } = usePlayerStats(username);
  useAllGames(username);

  // tabs
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') || 'overview'
  );

  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab((prev) => searchParams.get('tab') ?? prev);
  }, [searchParams]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    const params = new URLSearchParams(searchParams);
    params.set('tab', id);
    setSearchParams(params);
  };

  if (!username) {
    return <div>Invalid username</div>;
  }

  if (isProfileError) {
    const response = profileError?.response;
    const msg =
      response?.status === 404
        ? 'User not found'
        : profileError?.response?.status ||
          profileError?.message ||
          'Something went wrong, please try again.';
    const onRetry =
      response?.status === 404
        ? undefined
        : () => {
            refetchProfile();
          };
    return (
      <ErrorCard
        message={msg}
        onRetry={onRetry}
        className="self-center max-w-200"
      />
    );
  }

  return (
    <div className={`flex flex-col gap-2 p-2`}>
      {playerProfile ? (
        <PlayerCard
          profile={playerProfile}
          blitz={playerStats?.chess_blitz?.last.rating}
          rapid={playerStats?.chess_rapid?.last.rating}
          bullet={playerStats?.chess_bullet?.last.rating}
        />
      ) : (
        <PlayerCardSkeleton />
      )}

      <TabBar
        items={Tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className={'sticky top-0 z-50  w-full'}
      />
      {activeTab === 'overview' && <OverviewTab username={username} />}
      {activeTab === 'games' && <GameTab username={username} />}
      {activeTab === 'stats' && <StatisticTab username={username} />}

      <div
        className={`
          fixed bottom-5 right-5 z-50
        `}
      >
        <div
          className={`
          absolute -inset-1
          bg-linear-to-r from-fuchsia-600 to-emerald-200 
          rounded-full blur-md opacity-700 animate-pulse
          transition-opacity duration-300`}
        ></div>

        <button
          className={`
            group
              relative flex flex-row items-center 
              rounded-full px-4 py-2 sm:px-6 sm:py-4 gap-1
              text-white bg-slate-950/80 
                font-bold hover:scale-105
              `}
          onClick={() => {
            navigate(`/recap/2025/${username}`);
          }}
        >
          <span className="text-sm md:text-lg">Recap</span>
          <PlayIcon className={'group-hover:animate-bounce'} />
        </button>
      </div>
    </div>
  );
};

export default PlayerPage;
