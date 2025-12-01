import { ArrowLeft, Star, Tractor, MapPin, Phone, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useEffect, useState } from 'react';

export default function Drivers() {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const itemsParam = searchParams.get('items');
  const selectedTypes = itemsParam ? itemsParam.split(',') : [];

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24">
      <div className="bg-white/80 backdrop-blur-xl px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center gap-4 border-b border-white/20">
        <Link href="/">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} className="text-gray-800" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {selectedTypes.length > 0 ? 'Matching Owners' : 'Nearby Owners'}
          </h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Within 15km radius</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {selectedTypes.length > 0 ? (
            selectedTypes.map(type => (
              <span key={type} className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-green-500 shadow-lg shadow-green-500/20 animate-in zoom-in duration-300">
                Seeking: {type}
              </span>
            ))
          ) : (
            <>
              <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm">Has Tractor</span>
              <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm">Has Trolley</span>
            </>
          )}
        </div>

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Available Now</h2>
        
        {/* Only show relevant drivers if filtering is active (Mock logic for demo) */}
        <DriverCard 
          id="d1"
          name="Ram Lal"
          village="Rampur Village"
          equipment={['Tractor', 'Trolley']}
          rating="4.9"
          distance="2.5 km"
          status="online"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
          itemsParam={itemsParam}
        />
        
        {/* Show others if they match or if no filter */}
        {(!itemsParam || itemsParam.includes('Tractor')) && (
           <DriverCard 
            id="d2"
            name="Balwinder Singh"
            village="Kishanpur"
            equipment={['Tractor', 'Harvester']}
            rating="4.7"
            distance="5.2 km"
            status="online"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
            itemsParam={itemsParam}
          />
        )}

        {(!itemsParam || itemsParam.includes('Seeder')) && (
           <DriverCard 
            id="d3"
            name="Mukesh Patel"
            village="Shyam Nagar"
            equipment={['Seeder', 'Rotavator']}
            rating="4.5"
            distance="8.0 km"
            status="online"
            image="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop"
            itemsParam={itemsParam}
          />
        )}

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-8 mb-3 ml-1">Currently Busy / Offline</h2>
        
        <DriverCard 
          id="d4"
          name="Suresh Kumar"
          village="Rampur Village"
          equipment={['Tractor']}
          rating="4.2"
          status="offline"
          image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
          itemsParam={itemsParam}
        />
      </div>
      <BottomNav />
    </div>
  );
}

function DriverCard({ id, name, village, equipment, rating, distance, status, image, itemsParam }: any) {
  const isOnline = status === 'online';
  const link = isOnline ? `/driver/${id}${itemsParam ? `?items=${itemsParam}` : ''}` : "#";
  
  return (
    <Link href={link}>
      <div className={`relative overflow-hidden glass rounded-3xl p-1 border border-white/40 transition-all duration-300 ${isOnline ? 'active:scale-[0.98] hover:shadow-xl hover:border-green-200 cursor-pointer' : 'opacity-60 grayscale cursor-not-allowed'}`}>
        <div className="bg-white/50 rounded-[1.25rem] p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-4 border-white rounded-full flex items-center justify-center ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
                {isOnline && <div className="w-full h-full rounded-full animate-ping opacity-20 bg-green-500 absolute"></div>}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{name}</h3>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{village}</p>
                </div>
                {distance && (
                  <span className="text-[10px] font-bold text-primary bg-green-50/80 px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                    <MapPin size={10} /> {distance}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-xs font-bold text-gray-700 mt-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                <span>{rating} Rating</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-4 pt-3 border-t border-gray-100/50">
            {equipment.map((item: string, i: number) => (
              <span key={i} className="text-[10px] font-bold bg-gray-100/80 text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Tractor size={12} className="text-gray-400" /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
