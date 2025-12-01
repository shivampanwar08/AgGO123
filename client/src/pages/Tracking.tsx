import { ArrowLeft, Star, Circle, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLocation } from 'wouter';
import MapBackground from '@/components/MapBackground';

export default function DriverTracking() {
  const [, setLocation] = useLocation();

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

      {/* Driver Info Card (Bottom Sheet style) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 font-medium mb-1">Arriving in</span>
            <h2 className="text-3xl font-bold text-gray-900">2 mins</h2>
          </div>
          
          <div className="bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
            <span className="text-sm font-bold text-yellow-700">KA 05 MP 2992</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Driver" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Rajesh Kumar</h3>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-gray-900">4.8</span>
              <span>•</span>
              <span>Honda Activa</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Phone size={20} />
            </button>
             <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <MessageCircle size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 relative">
            <div className="w-4 h-4 mt-1 bg-green-500 rounded-full flex-shrink-0 ring-4 ring-green-50"></div>
            <div className="flex-1 border-b border-gray-100 pb-4">
              <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Pickup</p>
              <p className="font-medium text-gray-900">HSR Layout, Sector 2</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
             <div className="w-4 h-4 mt-1 bg-red-500 rounded-sm flex-shrink-0 ring-4 ring-red-50"></div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase font-bold mb-0.5">Dropoff</p>
              <p className="font-medium text-gray-900">Koramangala 4th Block</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center gap-2">
             <ShieldCheck size={16} className="text-green-600" />
             <span>Ride insured</span>
          </div>
          <button className="text-red-500 font-bold">Cancel Ride</button>
        </div>
      </div>
    </div>
  );
}
