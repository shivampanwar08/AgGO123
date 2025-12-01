import { ArrowLeft, Star, Tractor, MapPin, Phone, User } from 'lucide-react';
import { Link } from 'wouter';
import BottomNav from '@/components/BottomNav';

export default function Drivers() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center gap-3">
        <Link href="/">
          <ArrowLeft size={24} className="text-gray-700" />
        </Link>
        <div>
          <h1 className="text-lg font-bold">Nearby Owners</h1>
          <p className="text-xs text-gray-500">Within 15km radius</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Has Tractor</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Has Trolley</span>
        </div>

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Available Now</h2>
        
        <DriverCard 
          id="d1"
          name="Ram Lal"
          village="Rampur Village"
          equipment={['Tractor', 'Trolley']}
          rating="4.9"
          distance="2.5 km"
          status="online"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        />
        <DriverCard 
          id="d2"
          name="Balwinder Singh"
          village="Kishanpur"
          equipment={['Tractor', 'Harvester']}
          rating="4.7"
          distance="5.2 km"
          status="online"
          image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        />
         <DriverCard 
          id="d3"
          name="Mukesh Patel"
          village="Shyam Nagar"
          equipment={['Seeder', 'Rotavator']}
          rating="4.5"
          distance="8.0 km"
          status="online"
          image="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop"
        />

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2">Currently Busy / Offline</h2>
        
        <DriverCard 
          id="d4"
          name="Suresh Kumar"
          village="Rampur Village"
          equipment={['Tractor']}
          rating="4.2"
          status="offline"
          image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
        />
      </div>
      <BottomNav />
    </div>
  );
}

function DriverCard({ id, name, village, equipment, rating, distance, status, image }: any) {
  const isOnline = status === 'online';
  
  return (
    <Link href={isOnline ? `/driver/${id}` : "#"}>
      <div className={`bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-3 transition-all ${isOnline ? 'active:scale-[0.98] hover:shadow-md cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{name}</h3>
                <p className="text-xs text-gray-500 font-medium">{village}</p>
              </div>
              {distance && (
                <span className="text-xs font-bold text-primary bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <MapPin size={10} /> {distance}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs font-medium text-gray-600 mt-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span>{rating} Rating</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {equipment.map((item: string, i: number) => (
            <span key={i} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center gap-1">
              <Tractor size={10} /> {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
