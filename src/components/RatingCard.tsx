import {
  Timer as ChessRapidIcon,
  Zap as ChessBlitzIcon,
  Rocket as ChessBulletIcon,
} from 'lucide-react';

type Props = {
  type: 'rapid' | 'bullet' | 'blitz';
  rating: number;
  className?: string;
};

const RatingCard = ({ type, rating, className = '' }: Props) => {
  return (
    <div
      className={`
        group flex flex-col rounded-lg gap-1 p-1 pr-5 sm:pr-10
        text-sm sm:text-base 
        border border-slate-400/10 
        hover:border-gray-400/50 hover:scale-105 transition 
        bg-linear-to-tr to-white/10
        ${type === 'rapid' && ' from-blue-500/20 '}
        ${type === 'blitz' && ' from-green-500/20 '}
        ${type === 'bullet' && ' from-red-500/20 '}
        ${className}`}
    >
      <div className="flex flex-row items-center gap-2 text-gray-200 group-hover:text-white font-bold">
        {type === 'rapid' && <ChessRapidIcon className="text-blue-500" />}
        {type === 'blitz' && <ChessBlitzIcon className="text-green-500" />}
        {type === 'bullet' && <ChessBulletIcon className="text-red-500" />}

        <span>{type}</span>
      </div>

      <div className="text-white font-bold">{rating}</div>
    </div>
  );
};

export default RatingCard;
