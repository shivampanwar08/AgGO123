import { MapPin } from 'lucide-react';
import { useApp } from '@/lib/appContext';

export default function LocationCard() {
  const { darkMode } = useApp();

  return (
    <div className="absolute top-4 left-4 right-4 z-20">
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl border overflow-hidden transition-colors`}>
        <div className="p-4 relative flex items-center gap-3">
          {/* Icon */}
          <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-green-900/40' : 'bg-green-50'} rounded-full`}>
            <div className={`w-3 h-3 ${darkMode ? 'bg-green-400 ring-green-900/40' : 'bg-green-500 ring-green-100'} rounded-full ring-4`}></div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-medium uppercase tracking-wider mb-0.5`}>Your Current Location</p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>HSR Layout, Sector 2</p>
          </div>

          {/* Favorite Icon maybe? */}
          <div className={darkMode ? 'text-gray-600' : 'text-gray-300'}>
             <MapPin size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
