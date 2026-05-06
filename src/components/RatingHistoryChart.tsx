import {
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import { ChartNoAxesCombined as ChartIcon } from 'lucide-react';

import type { RatingStats } from '@/utils/chess.util.ts';
import { useMemo, useState } from 'react';

const TIME_RANGE = ['all', 'year', 'month', 'week'] as const;
type TimeRange = (typeof TIME_RANGE)[number];

const TIME_CLASSES = ['all', 'rapid', 'blitz', 'bullet'] as const;
type TimeClass = (typeof TIME_CLASSES)[number];

type ChartDataPoint = {
  timestamp: number;
  date: string;
  rapid: number | null;
  blitz: number | null;
  bullet: number | null;
};

const transformDataForRecharts = (
  ratingStats: RatingStats[]
): ChartDataPoint[] => {
  const map = new Map<number, ChartDataPoint>();
  ratingStats.forEach((stat) => {
    stat.rating.forEach((item) => {
      if (!map.has(item.timestamp)) {
        map.set(item.timestamp, {
          timestamp: item.timestamp,
          date: item.date,
          rapid: null,
          blitz: null,
          bullet: null,
        });
      }
      map.get(item.timestamp)![stat.type] = item.rating;
    });
  });

  const sortedData = [...map.values()].sort(
    (a, b) => a.timestamp - b.timestamp
  );
  let lastRapid: number | null = null;
  let lastBlitz: number | null = null;
  let lastBullet: number | null = null;
  sortedData.forEach((point) => {
    if (point.rapid !== null) lastRapid = point.rapid;
    else point.rapid = lastRapid;
    if (point.blitz !== null) lastBlitz = point.blitz;
    else point.blitz = lastBlitz;
    if (point.bullet !== null) lastBullet = point.bullet;
    else point.bullet = lastBullet;
  });
  return sortedData;
};

type PayloadEntryType = {
  color: string;
  dataKey: string;
  value: number;
};
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: PayloadEntryType[];
  label?: number;
}) => {
  if (active && payload && payload.length && label) {
    const dateStr = new Date(label).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg border border-slate-600 text-sm z-50">
        <p className="font-semibold mb-2 text-slate-300 border-b border-slate-700 pb-1">
          {dateStr}
        </p>
        {payload.map((entry, index: number) => (
          <div key={index} className="flex items-center gap-2 my-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize w-12 text-slate-200">
              {entry.dataKey}:
            </span>
            <span className="font-bold text-white">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

type Props = {
  ratingStats: RatingStats[];
  className?: string;
};
const RatingHistoryChart = ({ ratingStats, className = '' }: Props) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [timeClass, setTimeClass] = useState<TimeClass>('all');
  const allChartData = useMemo<ChartDataPoint[]>(() => {
    return transformDataForRecharts(ratingStats);
  }, [ratingStats]);

  const filteredChartData = useMemo<ChartDataPoint[]>(() => {
    switch (timeRange) {
      case 'all': {
        return allChartData;
      }
      case 'year': {
        const thisYear = new Date().getFullYear();
        const start = Date.UTC(thisYear, 0, 1);
        const end = Date.UTC(thisYear, 11, 31);
        return allChartData.filter(
          (entry) => entry.timestamp >= start && entry.timestamp <= end
        );
      }
      case 'month': {
        const current = new Date();
        const thisYear = current.getFullYear();
        const thisMonth = current.getMonth();
        const start = Date.UTC(thisYear, thisMonth, 1);
        const end = Date.UTC(thisYear, thisMonth + 1, 0);
        return allChartData.filter(
          (entry) => entry.timestamp >= start && entry.timestamp <= end
        );
      }
      case 'week': {
        const now = new Date().getTime();
        const start = now - 7 * 24 * 60 * 60 * 1000;
        const end = now;
        return allChartData.filter(
          (entry) => entry.timestamp >= start && entry.timestamp <= end
        );
      }
    }
  }, [allChartData, timeRange]);

  return (
    <div
      className={`flex flex-col p-2 gap-2 rounded-lg border border-slate-800 bg-slate-900  ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between px-4">
        <div className="flex flex-row items-center gap-2">
          <ChartIcon className={'hidden sm:block text-blue-500'} size={48} />
          <div className="text-2xl sm:text-4xl font-extrabold text-white">
            Rating Chart
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2 w-fit text-sm sm:text-base font-semibold ">
          <div
            className={`flex flex-row w-fit gap-2 p-2 rounded-md bg-slate-950/50 border border-slate-800  `}
          >
            {TIME_CLASSES.map((t) => (
              <div
                className={`
                      p-2 py-1 rounded-md
                      ${timeClass === t ? 'bg-gray-500 text-white ' : 'text-gray-400 hover:bg-gray-400/50'}
                      hover:cursor-pointer
                     `}
                onClick={() => {
                  setTimeClass(t);
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            className={`flex flex-row gap-2 p-2 rounded-md bg-slate-950/50 border border-slate-800 w-fit`}
          >
            {TIME_RANGE.map((t) => (
              <div
                className={`
                      flex  p-2 py-1 rounded-md
                      ${timeRange === t ? 'bg-gray-500  text-white' : 'text-gray-400 hover:bg-gray-400/50'}
                      hover:cursor-pointer
                      `}
                onClick={() => {
                  setTimeRange(t);
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-2 text-gray-400/50" />

      <ResponsiveContainer height={300} width={'100%'}>
        <AreaChart data={filteredChartData}>
          <defs>
            <linearGradient id="colorRapid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="blue" stopOpacity={0.2} />
              <stop offset="10%" stopColor="blue" stopOpacity={0.1} />
              <stop offset="95%" stopColor="blue" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBlitz" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="green" stopOpacity={0.2} />
              <stop offset="10%" stopColor="green" stopOpacity={0.1} />
              <stop offset="95%" stopColor="green" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBullet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="yellow" stopOpacity={0.2} />
              <stop offset="10%" stopColor="yellow" stopOpacity={0.1} />
              <stop offset="95%" stopColor="yellow" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey={'timestamp'}
            type={'number'}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            scale={'time'}
            tick={{ fill: 'white', fontSize: 15, fontWeight: 'bold' }}
            tickLine={false}
            axisLine={{ stroke: 'white' }}
            domain={['dataMin', 'dataMax']}
            dy={10}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fill: 'white', fontSize: 15, fontWeight: 'bold' }}
            tickLine={false}
            axisLine={false}
            dx={-10}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{
              fontSize: '14px',
              textTransform: 'capitalize',
              color: '#CBD5E1',
              paddingBottom: '10px',
            }}
          />
          <CartesianGrid
            vertical={false}
            horizontal={true}
            strokeDasharray={'3 3'}
            stroke={'gray'}
          />
          <Tooltip content={<CustomTooltip />} />

          {(timeClass === 'all' || timeClass === 'rapid') && (
            <Area
              dataKey={'rapid'}
              stroke={'blue'}
              strokeWidth={2.5}
              fill={'url(#colorRapid)'}
              fillOpacity={1}
              connectNulls={true}
            />
          )}

          {(timeClass === 'all' || timeClass === 'blitz') && (
            <Area
              dataKey={'blitz'}
              name={'Blitz'}
              stroke={'green'}
              strokeWidth={2.5}
              fill={'url(#colorBlitz)'}
              fillOpacity={1}
              connectNulls={true}
            />
          )}

          {(timeClass === 'all' || timeClass === 'bullet') && (
            <Area
              type="monotone"
              dataKey="bullet"
              name="Bullet"
              stroke={'yellow'}
              strokeWidth={2.5}
              fill={'url(#colorBullet)'}
              fillOpacity={1}
              connectNulls={true}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingHistoryChart;
