import type { PlayerProfile } from '@/types/chess.ts';
import { Link } from 'react-router-dom';

import { Globe as CountryIcon } from 'lucide-react';

import RatingCard from './RatingCard';

type Props = {
  profile: PlayerProfile;
  className?: string;
  blitz?: number;
  rapid?: number;
  bullet?: number;
};
const PlayerCard = ({
  profile,
  rapid,
  bullet,
  blitz,
  className = '',
}: Props) => {
  return (
    <div className={`card flex flex-row items-center p-2 gap-2 ${className}`}>
      <img
        src={profile.avatar}
        alt=""
        className={`  
        relative
        ring-4 ring-white
        rounded-full
        w-30 h-30 
        sm:w-35 sm:h-35 
        md:w-40 md:h-40
        lg:w-45 lg:h-45
        xl:w-50 xl:h-50
      `}
      ></img>

      <div className="flex flex-col flex-1 gap-1 text-sm sm:text-base text-gray-400">
        <div className="flex items-center gap-2">
          <Link
            to={profile.url}
            className={`text-2xl sm:text-4xl font-bold text-white`}
          >
            {profile.username}
          </Link>

          {profile?.country_name && (
            <div className="flex flex-row items-center text-xs sm:text-base gap-2 p-0.5 px-1 sm:p-1 sm:px-2 rounded-md border border-gray-600 bg-slate-500/50">
              <CountryIcon size={16} />
              <span className="font-semibold text-white">
                {profile.country_name}
              </span>
            </div>
          )}
        </div>

        {profile.name && (
          <div className={'text-white text-base sm:text-xl'}>
            {profile.name}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 ">
          <div className="flex flex-row gap-1">
            Joined
            <span className={'font-semibold text-white'}>
              {new Date(profile.joined * 1000).toDateString()}
            </span>
          </div>

          <div className="flex flex-row gap-1 ">
            Last online
            <span className={'font-semibold text-white'}>
              {new Date(profile.last_online * 1000).toDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {rapid && <RatingCard type={'rapid'} rating={rapid} />}
          {blitz && <RatingCard type={'blitz'} rating={blitz} />}
          {bullet && <RatingCard type={'bullet'} rating={bullet} />}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
