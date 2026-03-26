import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import AgGoLogo from '@/components/AgGoLogo';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center z-[100] transition-opacity duration-700 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-8 z-10">
        {/* Logo with premium animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-3xl opacity-50 animate-pulse scale-110"></div>
          <div className="relative animate-pulse" style={{ animationDuration: '3s' }}>
            <AgGoLogo size={140} />
          </div>
        </div>

        {/* Premium branding */}
        <div className="text-center space-y-3">
          <h1 className="text-6xl font-black text-white tracking-tighter drop-shadow-lg">
            AgGo
          </h1>
          <p className="text-green-200 text-base font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2">
            <Zap size={14} className="text-green-400" />
            Smart Farming Platform
          </p>
          {/* Three pillars */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-xs text-yellow-300 font-bold bg-white/10 px-2.5 py-1 rounded-full">🚜 Equipment</span>
            <span className="text-white/30 text-xs">•</span>
            <span className="text-xs text-green-300 font-bold bg-white/10 px-2.5 py-1 rounded-full">🌾 Marketplace</span>
            <span className="text-white/30 text-xs">•</span>
            <span className="text-xs text-sky-300 font-bold bg-white/10 px-2.5 py-1 rounded-full">🛒 Shops</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-green-300 font-semibold">Loading...</span>
        </div>
      </div>
    </div>
  );
}
