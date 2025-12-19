import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-700 flex items-center justify-center z-[100] transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white rounded-full p-6 shadow-2xl">
            <Leaf size={48} className="text-green-600" fill="currentColor" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
            AgGo
          </h1>
          <p className="text-green-100 text-sm font-bold uppercase tracking-widest mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Smart Farming Platform
          </p>
        </div>

        <div className="mt-8 flex gap-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
