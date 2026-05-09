import type {ReactNode} from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const MacWindow = ({ className = '', children }: Props) => {
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-slate-900  ${className}`}
    >
      {/* Title bar */}
      <div className="flex flex-row bg-slate-800 items-center px-3 py-2 gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col  p-4 gap-4">{children}</div>
    </div>
  );
};

export default MacWindow;
