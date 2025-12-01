import { MapPin } from 'lucide-react';

export default function LocationCard() {
  return (
    <div className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-4 relative flex items-center gap-3">
          {/* Icon */}
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-green-50 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-100"></div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Your Current Location</p>
            <p className="text-sm font-bold text-gray-900 truncate">HSR Layout, Sector 2</p>
          </div>

          {/* Favorite Icon maybe? */}
          <div className="text-gray-300">
             <MapPin size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
