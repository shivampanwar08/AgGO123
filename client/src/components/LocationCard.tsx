import { MapPin, Search, Circle, Square } from 'lucide-react';

export default function LocationCard() {
  return (
    <div className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-4 space-y-4 relative">
          {/* Connecting Line */}
          <div className="absolute left-[27px] top-9 bottom-9 w-0.5 bg-gray-200 z-0"></div>

          {/* Pickup */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-50"></div>
            </div>
            <div className="flex-1 border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Pickup</p>
              <p className="text-sm font-semibold text-gray-900 truncate">Current Location</p>
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex items-center gap-3 relative z-10">
             <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 bg-red-500 rounded-sm ring-4 ring-red-50"></div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Dropoff</p>
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-sm font-medium text-gray-900">Select Destination</span>
                <Search size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
