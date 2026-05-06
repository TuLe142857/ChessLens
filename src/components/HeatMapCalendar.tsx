import { useCallback, useMemo } from 'react';
import type { WDL } from '@/types/chess.ts';

const Block = ({ data, date }: { data?: WDL; date: string }) => {
  const totalGames = data ? data.win + data.draw + data.loss : 0;

  return (
    <div
      className={`
      group relative flex flex-1 
      w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-xs 
      ${totalGames > 0 ? (data && data.win - data.loss >= 0 ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-500'}
      border border-transparent
      hover:border-white
      `}
      title={new Date(date).toLocaleDateString() + `~${totalGames}`}
    >
      <div
        className={`
        z-50 absolute bottom-2 left-1 
        hidden group-hover:flex flex-col h-fit
        text-sm 
        rounded-md border border-gray-300 bg-slate-500 p-1`}
      >
        <div>{new Date(date).toLocaleDateString()}</div>
        <div className={`flex  flex-row flex-1 flex-full gap-1`}>
          <span>{'W/D/L: '}</span>
          <span>{`${data?.win || 0}/${data?.draw || 0}/${data?.loss || 0}`}</span>
        </div>
      </div>
    </div>
  );
};

type Props = {
  year: number;
  data?: Map<string, WDL>;
  className?: string;
};
const HeatMapCalendar = ({ data, year, className = '' }: Props) => {
  const chunkWeeks = useCallback((year: number) => {
    const startDate = new Date(year, 0, 1);
    const fullYear = startDate.getFullYear();

    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const days = new Array<string>();
    while (startDate.getFullYear() <= fullYear) {
      const yyyy = startDate.getFullYear();
      const mm = String(startDate.getMonth() + 1).padStart(2, '0');
      const dd = String(startDate.getDate()).padStart(2, '0');
      const str = `${yyyy}-${mm}-${dd}`;
      days.push(str);

      startDate.setDate(startDate.getDate() + 1);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  }, []);

  const weeks = useMemo(() => chunkWeeks(year), [year, chunkWeeks]);
  console.log('map', data);
  return (
    <div
      className={`flex flex-col p-3 bg-slate-950 rounded-lg border border-white w-fit  ${className}`}
    >
      {/* Heatmap */}
      <div className="flex gap-1">
        {weeks.map((week, i) => (
          <div key={i} className="grid grid-rows-7 gap-1">
            {week.map((day) => (
              <Block key={day} data={data?.get(day)} date={day} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatMapCalendar;
