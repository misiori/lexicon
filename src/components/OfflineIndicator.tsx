import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-16 md:bottom-6 right-4 z-40 flex items-center gap-2 border border-[#252525] bg-[#000000] px-3 py-1.5 text-xs text-[#888888] shadow-sm rounded-sm"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#888888]" />
      <span>Offline archive active · Cached data accessible</span>
    </div>
  );
};
