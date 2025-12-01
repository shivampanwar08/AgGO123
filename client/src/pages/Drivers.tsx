import { ArrowLeft, Star, Circle } from 'lucide-react';
import { Link } from 'wouter';
import BottomNav from '@/components/BottomNav';

export default function Drivers() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold">Drivers Nearby</h1>
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Online Drivers</h2>
        
        {/* Online Drivers List */}
        <DriverCard 
          name="Rajesh Kumar"
          vehicle="Honda Activa"
          rating="4.8"
          distance="0.5 km"
          status="online"
          image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
        />
        <DriverCard 
          name="Amit Singh"
          vehicle="TVS Jupiter"
          rating="4.5"
          distance="1.2 km"
          status="online"
          image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
        />
         <DriverCard 
          name="Priya Sharma"
          vehicle="Hero Pleasure"
          rating="4.9"
          distance="2.0 km"
          status="online"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        />

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">Offline Drivers</h2>
        
        <DriverCard 
          name="Suresh Reddy"
          vehicle="Bajaj Pulsar"
          rating="4.2"
          status="offline"
          image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
        />
        <DriverCard 
          name="Kiran Rao"
          vehicle="Honda Dio"
          rating="4.6"
          status="offline"
          image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop"
        />
      </div>
      <BottomNav />
    </div>
  );
}

function DriverCard({ name, vehicle, rating, distance, status, image }: any) {
  const isOnline = status === 'online';
  
  return (
    <Link href={isOnline ? "/billing" : "#"}>
      <div className={`bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 transition-all ${isOnline ? 'active:scale-[0.98] hover:shadow-md' : 'opacity-60 cursor-not-allowed'}`}>
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900">{name}</h3>
            {distance && (
              <span className="text-xs font-bold text-primary-700 bg-yellow-50 px-2 py-0.5 rounded-full">
                {distance}
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mb-1">{vehicle}</p>
          
          <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
