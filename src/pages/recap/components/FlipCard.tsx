import { useState } from 'react';
import type { ReactNode } from 'react';

type FlipCardProps = {
  children: ReactNode;
  cover?: ReactNode;
  className?: string;
};

const DefaultCover = () => {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl bg-neutral-900 text-white">
      Click me
    </div>
  );
};

const FlipCard = ({ children, cover, className = '' }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={[
        'group relative overflow-hidden rounded-2xl',
        'cursor-pointer',
        'transition-all duration-300',
        'hover:scale-[1.02]',
        className,
      ].join(' ')}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={[
          'h-full w-full',
          'transition-opacity duration-300',
          isFlipped ? 'opacity-100' : 'opacity-95',
        ].join(' ')}
      >
        {isFlipped ? children : cover || <DefaultCover />}
      </div>
    </div>
  );
};

export default FlipCard;
