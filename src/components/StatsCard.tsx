import type { ChessStats } from '@/types/chess.ts';
import WDLBadge from '@/components/WDLBadge.tsx';

type Props = {
  stats: ChessStats;
  typeName: string;
};
const StatsCard = ({ stats, typeName }: Props) => {
  return (
    <div className="card flex flex-col gap-1 px-5 text-base text-gray-300">
      <span className="self-center text-2xl font-bold">{typeName}</span>

      <div>
        Games played:{' '}
        <span className="text-white font-bold">
          {stats.record.win + stats.record.draw + stats.record.loss}
        </span>
      </div>

      <div>
        Highest Elo{' '}
        <span className="text-yellow-500 font-bold">{stats.best.rating}</span>{' '}
        on{' '}
        <span className="text-white font-bold">
          {new Date(stats.best.date * 1000).toDateString()}
        </span>
      </div>

      <div>
        Current Elo{' '}
        <span className="text-blue-500 font-bold">{stats.last.rating}</span>
      </div>

      <WDLBadge
        win={stats.record.win}
        draw={stats.record.draw}
        loss={stats.record.loss}
      />
    </div>
  );
};

export default StatsCard;
