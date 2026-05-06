import { createContext, useContext, useState } from 'react';

import { LoaderCircle as LoadingIcon } from 'lucide-react';

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {/* Overlay render ngay trong Provider */}
      {isLoading && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-gray-500/50 backdrop-blur-xs">
          <LoadingIcon className="animate-spin" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) throw new Error('useLoading phải dùng trong LoadingProvider');
  return context;
}
