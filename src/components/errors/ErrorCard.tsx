import { TriangleAlert as ErrorIcon } from 'lucide-react';

import MacWindow from '@/components/window/MacWindow.tsx';
import Terminal from '@/components/window/Terminal.tsx';

type Props = {
  title?: string;
  message?: string;
  className?: string;
  onRetry?: () => void;
};

export default function ErrorCard({
  title = 'OOPS',
  message = 'Something went wrong',
  className = '',
  onRetry,
}: Props) {
  return (
    <MacWindow className={className}>
      {/* Icon + Title */}
      <div className="flex gap-3 items-center text-red-500">
        <ErrorIcon size={40} />
        <span className="text-4xl font-extrabold">{title}</span>
      </div>

      {/* Terminal output */}
      <Terminal history={[{ command: '', output: `Error: ${message}` }]} />

      {/* Retry */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="self-center px-4 py-1.5 text-sm font-mono font-semibold
                         border border-red-500 text-red-400 rounded-lg
                         hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          Retry
        </button>
      )}
    </MacWindow>
  );
}
