import { ArrowLeft, Star, Phone, MessageCircle, ShieldCheck, Navigation } from 'lucide-react';
import { useLocation } from 'wouter';
import MapBackground from '@/components/MapBackground';

export default function Tracking() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const withDriver = searchParams.get('driver') === 'true';

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapBackground />
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={() => setLocation('/')}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
      </div>

      {/* Info Card */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-6 pb-8">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium mb-1">
              {withDriver ? 'Driver arriving in' : 'Distance to Pickup'}
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              {withDriver ? '15 mins' : '2.5 km'}
            </h2>
          </div>
          
          {!withDriver && (
             <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-green-200">
               <Navigation size={16} /> Start Nav
             </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Owner" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Ram Lal (Owner)</h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-gray-900">4.9</span>
              <span>•</span>
              <span>Mahindra 575 DI</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
              <Phone size={20} />
            </button>
             <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <MessageCircle size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {withDriver ? (
             // With Driver: Driver comes to User
             <>
              <div className="flex items-start gap-3 relative">
                <div className="w-4 h-4 mt-1 bg-primary rounded-full flex-shrink-0 ring-4 ring-green-50"></div>
                <div className="flex-1 border-b border-gray-100 pb-4">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Coming From</p>
                  <p className="font-medium text-gray-900">Ram Lal's Farm, Sector 4</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                 <div className="w-4 h-4 mt-1 bg-black rounded-sm flex-shrink-0 ring-4 ring-gray-100"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Destination</p>
                  <p className="font-medium text-gray-900">Your Farm Location</p>
                </div>
              </div>
             </>
          ) : (
             // Self Drive: User goes to Owner
             <>
              <div className="flex items-start gap-3 relative">
                <div className="w-4 h-4 mt-1 bg-primary rounded-full flex-shrink-0 ring-4 ring-green-50"></div>
                <div className="flex-1 border-b border-gray-100 pb-4">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Current Location</p>
                  <p className="font-medium text-gray-900">Your Farm Location</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                 <div className="w-4 h-4 mt-1 bg-black rounded-sm flex-shrink-0 ring-4 ring-gray-100"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Pickup Equipment At</p>
                  <p className="font-medium text-gray-900">Ram Lal's Farm, Sector 4</p>
                </div>
              </div>
             </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center gap-2">
             <ShieldCheck size={16} className="text-green-600" />
             <span>Equipment Insured</span>
          </div>
          <button className="text-red-500 font-bold">Cancel Request</button>
        </div>
      </div>
    </div>
  );
}
