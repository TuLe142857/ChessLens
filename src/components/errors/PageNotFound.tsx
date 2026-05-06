import { TriangleAlert as ErrorIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import MacWindow from '../window/MacWindow';

import Terminal from '../window/Terminal.tsx';

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen p-2 bg-mist-400">
      <MacWindow className="w-full max-w-200">
        {/* Icon + Title */}
        <div className="flex gap-3 items-center text-red-500">
          <ErrorIcon size={40} />
          <span className="text-4xl font-extrabold tracking-wider">404</span>
        </div>

        <Terminal
          history={[
            {
              command: `cd ${window.location.pathname}`,
              output: 'Error: 404 - Page not found',
            },
          ]}
          className="overflow-y-auto h-50"
        />
        {/* Back link */}
        <Link
          to="/"
          className="self-center font-mono text-sm text-slate-400
                   border border-slate-600 px-4 py-1.5 rounded-lg
                   hover:border-slate-400 hover:text-white transition-all duration-200"
        >
          Back to Home
        </Link>
      </MacWindow>
    </div>
  );
};

export default PageNotFound;
