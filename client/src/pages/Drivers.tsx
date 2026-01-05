import { ArrowLeft, Star, Tractor, MapPin, Phone, User, Check } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useEffect, useState } from 'react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

export default function Drivers() {
  const { darkMode, language } = useApp();
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const itemsParam = searchParams.get('items');
  const selectedTypes = itemsParam ? itemsParam.split(',') : [];

  return (
    <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'} min-h-screen pb-24 transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center gap-4 border-b transition-colors`}>
        <Link href="/">
          <button className={`w-10 h-10 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}>
            <ArrowLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
        </Link>
        <div>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            {selectedTypes.length > 0 ? t('matching_owners', language) : t('nearby_owners', language)}
          </h1>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium uppercase tracking-widest`}>{t('within_radius', language)}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {selectedTypes.length > 0 ? (
            selectedTypes.map(type => (
              <span key={type} className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-green-500 shadow-lg shadow-green-500/20 animate-in zoom-in duration-300">
                {t('seeking', language)}: {type}
              </span>
            ))
          ) : (
            <>
              <span className={`${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-gray-600'} border px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm`}>{t('has', language)} {t('tractor', language)}</span>
              <span className={`${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-gray-600'} border px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm`}>{t('has', language)} {t('trolley', language)}</span>
            </>
          )}
        </div>

        <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-3 ml-1`}>{t('available_now', language)}</h2>
        
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

        <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-8 mb-3 ml-1`}>{t('busy_offline', language)}</h2>
        
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
  const { darkMode, language } = useApp();
  const isOnline = status === 'online';
  const link = isOnline ? `/driver/${id}${itemsParam ? `?items=${itemsParam}` : ''}` : "#";
  
  return (
    <Link href={link}>
      <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
        darkMode 
          ? `bg-gray-800/40 border border-gray-700/50 ${isOnline ? 'active:scale-[0.98] hover:bg-gray-800/60 hover:border-green-500/50 cursor-pointer shadow-lg' : 'opacity-60 grayscale cursor-not-allowed'}`
          : `bg-white border border-gray-200 ${isOnline ? 'active:scale-[0.98] hover:shadow-md hover:border-green-300 cursor-pointer shadow-sm' : 'opacity-60 grayscale cursor-not-allowed'}`
      }`}>
        <div className="p-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className={`w-14 h-14 rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 ${darkMode ? 'border-gray-800' : 'border-white'} rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
                {isOnline && <div className="w-full h-full rounded-full animate-ping opacity-25 bg-green-500 absolute"></div>}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-base truncate leading-tight`}>{name}</h3>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-bold uppercase tracking-wider truncate mt-0.5`}>{village}</p>
                </div>
                {distance && (
                  <span className={`text-[9px] font-black ${darkMode ? 'text-green-400' : 'text-green-600'} flex items-center gap-0.5 whitespace-nowrap`}>
                    <MapPin size={10} strokeWidth={3} /> {distance}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className={`text-[11px] font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{rating}</span>
                </div>
                <div className={`h-3 w-[1px] ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                  <Check size={10} strokeWidth={3} /> Verified
                </div>
              </div>
            </div>
          </div>

          <div className={`flex gap-1.5 flex-wrap mt-3 pt-2.5 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
            {equipment.map((item: string, i: number) => (
              <span key={i} className={`text-[9px] font-bold ${darkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-50 text-gray-500'} px-2 py-0.5 rounded-md flex items-center gap-1`}>
                <Tractor size={10} /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}