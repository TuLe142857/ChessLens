import { useQuery, useQueries } from '@tanstack/react-query';

import {
  getAllGames,
  getGameArchives,
  getGamesByMonth,
  getPlayerProfile,
  getPlayerStats,
} from '@/api/chess.com.api.ts';

export const usePlayerProfile = (username?: string) =>
  useQuery({
    queryKey: ['profile', username],
    queryFn: async () => {
      return await getPlayerProfile(username);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!username,
  });

export const usePlayerStats = (username?: string) =>
  useQuery({
    queryKey: ['stats', username],
    queryFn: async () => {
      return await getPlayerStats(username);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!username,
  });

export const useArchives = (username: string | undefined) =>
  useQuery({
    queryKey: ['archives', username],
    queryFn: () => getGameArchives(username!),
    staleTime: 60 * 60 * 1000,
    enabled: !!username,
  });

export const useGames = (username?: string) =>
  useQuery({
    queryKey: ['games', username],
    queryFn: async () => {
      return await getAllGames(username);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!username,
  });

export const useGamesByMonth = (
  username?: string,
  year?: number,
  month?: number
) =>
  useQuery({
    queryKey: ['games', username, year, month],
    queryFn: async () => {
      return await getGamesByMonth(username, year, month);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!username,
  });

export const useGamesByYear = (username?: string, year?: number) => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const startMonth = 1;
  const endMonth = thisYear === year ? thisMonth : 12;
  const months = Array.from({ length: endMonth - startMonth + 1 }).map(
    (_, i) => i + 1
  );

  const queries = months.map((month) => ({
    queryKey: ['games', username, year, month],
    queryFn: async () => {
      return await getGamesByMonth(username, year, month);
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!username && !!year,
  }));
  return useQueries({ queries });
};

export const useAllGames = (username: string | undefined) => {
  const archiveQuery = useArchives(username);
  const archiveMonths = (archiveQuery.data?.archives ?? []).map((url) => {
    const parts = url.split('/');
    return { year: Number(parts.at(-2)), month: Number(parts.at(-1)) };
  });
  return useQueries({
    queries: archiveMonths.map(({ year, month }) => ({
      queryKey: ['games', username, year, month],
      queryFn: () => getGamesByMonth(username!, year, month),
      staleTime: 60 * 60 * 1000,
      enabled: !!username && archiveQuery.isSuccess,
    })),
  });
};
