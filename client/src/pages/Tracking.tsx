import { ArrowLeft, Star, Phone, MessageCircle, ShieldCheck, Navigation } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import MapBackground from '@/components/MapBackground';

export default function Tracking() {
  const [, setLocation] = useLocation();
  const [eta, setEta] = useState(15);
  const searchParams = new URLSearchParams(window.location.search);
  const withDriver = searchParams.get('driver') === 'true';

  useEffect(() => {
    if (withDriver) {
      const interval = setInterval(() => {
        setEta(prev => (prev > 0 ? prev - 1 : 0));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [withDriver]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapBackground />
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={() => setLocation('/')}
          className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center border border-white/20 hover:bg-white transition-all"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
      </div>

      {/* Info Card */}
      <div className="absolute bottom-0 left-0 right-0 z-30 glass rounded-t-3xl p-1 shadow-2xl">
        <div className="bg-white/80 backdrop-blur-md rounded-t-[1.75rem] p-6 pb-8">
        
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium mb-1">
                {withDriver ? 'Driver arriving in' : 'Distance to Pickup'}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                {withDriver ? `${eta} mins` : '2.5 km'}
              </h2>
            </div>
            
            {!withDriver && (
               <button className="bg-black text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
                 <Navigation size={18} /> Start Nav
               </button>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Owner" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Ram Lal</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">4.9</span>
                <span>•</span>
                <span className="text-xs">Mahindra 575 DI</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                <Phone size={18} />
              </button>
               <button className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                <MessageCircle size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {withDriver ? (
               <>
                <div className="flex items-start gap-3 relative">
                  <div className="w-4 h-4 mt-1 bg-green-500 rounded-full flex-shrink-0 ring-4 ring-green-100 animate-pulse"></div>
                  <div className="flex-1 border-b border-gray-200/50 pb-4">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Coming From</p>
                    <p className="font-bold text-gray-900">Ram Lal's Farm, Sector 4</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                   <div className="w-4 h-4 mt-1 bg-black rounded-sm flex-shrink-0 ring-4 ring-gray-200"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Destination</p>
                    <p className="font-bold text-gray-900">Your Farm Location</p>
                  </div>
                </div>
               </>
            ) : (
               <>
                <div className="flex items-start gap-3 relative">
                  <div className="w-4 h-4 mt-1 bg-green-500 rounded-full flex-shrink-0 ring-4 ring-green-100 animate-pulse"></div>
                  <div className="flex-1 border-b border-gray-200/50 pb-4">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Current Location</p>
                    <p className="font-bold text-gray-900">Your Farm Location</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                   <div className="w-4 h-4 mt-1 bg-black rounded-sm flex-shrink-0 ring-4 ring-gray-200"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Pickup Equipment At</p>
                    <p className="font-bold text-gray-900">Ram Lal's Farm, Sector 4</p>
                  </div>
                </div>
               </>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <ShieldCheck size={16} className="text-green-600" />
               <span className="text-sm font-medium text-gray-600">Equipment Insured</span>
            </div>
            <button className="text-red-500 font-bold text-sm hover:text-red-600 transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
