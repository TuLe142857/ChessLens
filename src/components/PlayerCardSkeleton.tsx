const PlayerCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`card flex flex-row p-2 gap-2 ${className}`}>
    <div
      className={`  
        skeleton
        rounded-full 
        w-30 h-30 
        sm:w-35 sm:h-35 
        md:w-40 md:h-40
        lg:w-45 lg:h-45
        xl:w-50 xl:h-50
      `}
    />
    <div className="flex flex-col flex-1 gap-2">
      <div className="skeleton w-2/3 max-w-75 h-7" />
      <div className="skeleton w-1/3 max-w-50 h-5" />
      <div className="skeleton w-1/3 max-w-50 h-5" />
      <div className="skeleton w-1/3 max-w-50 h-5" />
    </div>
  </div>
);

export default PlayerCardSkeleton;
