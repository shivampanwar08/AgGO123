import { MapPin, Navigation } from 'lucide-react';
import { useApp } from '@/lib/appContext';

export default function LocationCard() {
  const { darkMode } = useApp();

  return (
    <div className="absolute top-4 left-4 right-4 z-20">
      <div className={`${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-white/50'
      } rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 backdrop-blur-xl hover:shadow-3xl`}>
        <div className="p-3 relative flex items-center gap-3">
          {/* Location Indicator */}
          <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${
            darkMode 
              ? 'bg-gradient-to-br from-green-900/60 to-green-900/30' 
              : 'bg-gradient-to-br from-green-100 to-green-50'
          } rounded-full ring-2 ${
            darkMode ? 'ring-green-500/30' : 'ring-green-200'
          } shadow-lg`}>
            <Navigation size={20} className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold uppercase tracking-wider`}>Your Location</p>
            <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>Sector 2, HSR Layout</p>
          </div>

          {/* Badge */}
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap hidden ${
            darkMode
              ? 'bg-green-900/40 text-green-300'
              : 'bg-green-100 text-green-700'
          }`}>
            Active
          </div>
        </div>
      </div>
    </div>
  );
}
