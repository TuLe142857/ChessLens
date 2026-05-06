import axios from 'axios';
import type {
  PlayerProfile,
  Country,
  PlayerStats,
  GameArchive,
  Game,
} from '@/types/chess.ts';

// -----------------------------------------------
//        AXIOS CLIENT
// -----------------------------------------------

const BASE_URL = 'https://api.chess.com/pub';
const chessApi = axios.create({
  baseURL: BASE_URL,
});

// -----------------------------------------------
//        API FUNCTIONS
// -----------------------------------------------

export async function getPlayerProfile(
  username: string
): Promise<PlayerProfile> {
  const { data: profile } = await chessApi.get<PlayerProfile>(
    `/player/${username}`
  );
  const { data: country } = await chessApi.get<Country>(profile.country);
  profile.country_code = country.code;
  profile.country_name = country.name;
  return profile;
}

export async function isPlayerOnline(username: string): Promise<boolean> {
  const { data } = await chessApi.get<{ online: boolean }>(
    `/player/${username}/is-online`
  );
  return data.online;
}

export async function getPlayerStats(username: string): Promise<PlayerStats> {
  const { data } = await chessApi.get<PlayerStats>(`/player/${username}/stats`);
  return data;
}

export async function getGameArchives(username: string): Promise<GameArchive> {
  const { data } = await chessApi.get<GameArchive>(
    `/player/${username}/games/archives`
  );
  return data;
}

export async function getGamesByMonth(
  username: string,
  year: number,
  month: number
): Promise<Game[]> {
  const mm = String(month).padStart(2, '0');
  const { data } = await chessApi.get<{ games: Game[] }>(
    `/player/${username}/games/${year}/${mm}`
  );
  return data.games;
}

export async function getGamesByYears(
  username: string,
  year: number
): Promise<Game[]> {
  const urls = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ].map((mm) => `player/${username}/games/${year}/${mm}`);
  const results = await Promise.all(
    urls.map((url) =>
      chessApi.get<{ games: Game[] }>(url).then((res) => res.data.games)
    )
  );
  return results.flat();
}

export async function getAllGames(username: string): Promise<Game[]> {
  const archive = await getGameArchives(username);
  const results = await Promise.all(
    archive.archives.map((url) =>
      axios.get<{ games: Game[] }>(url).then((res) => res.data.games)
    )
  );
  return results.flat();
}
