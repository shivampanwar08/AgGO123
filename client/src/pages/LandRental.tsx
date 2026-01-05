import { ArrowLeft, Leaf, MapPin, Phone, Search, Droplet } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

export default function LandRental() {
  const { darkMode, language, allLandOwners } = useApp();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full flex flex-col relative overflow-hidden transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl px-4 py-4 z-10 shadow-sm border-b transition-colors flex-shrink-0`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation('/settings')}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}
          >
            <ArrowLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>{t('land_rental', language) || 'Land Rental'}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 no-scrollbar">
        <div className="relative">
           <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
           <input 
             type="text" 
             placeholder="Search by location..." 
             className={`w-full ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500 transition-all border`}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        <div className="space-y-4">
          <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-2`}>
            Available Lands ({allLandOwners.length})
          </h2>

          {allLandOwners.length === 0 ? (
             <div className={`text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
               <p>No lands available right now.</p>
             </div>
          ) : (
            allLandOwners
              .filter(owner => !searchQuery || owner.village.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((owner, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm`}>
                <div className={`p-4 ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gradient-to-r from-amber-50/50 to-transparent border-gray-100'} border-b`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-amber-100'}`}>
                       <Leaf className="text-amber-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{owner.ownerName}</h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                        <MapPin size={12} /> {owner.village}
                      </p>
                    </div>
                    <button className={`${darkMode ? 'text-amber-400' : 'text-amber-600 hover:text-amber-700'} font-bold text-xs flex items-center gap-1`}>
                      <Phone size={14} /> Contact
                    </button>
                  </div>
                </div>
                
                <div className={`p-4 grid gap-3 ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                  {owner.lands.map((land) => (
                    <div key={land.id} className="flex gap-4">
                      <div className={`w-20 h-20 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-amber-50'} overflow-hidden flex-shrink-0`}>
                         {land.image ? (
                           <img src={land.image} className="w-full h-full object-cover" alt="" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center">
                             <Leaf className="text-amber-300" size={24} />
                           </div>
                         )}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{land.size} Acres</h4>
                             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>{land.soilType} Soil</p>
                           </div>
                           <div className="text-right">
                             <div className={`font-bold text-lg ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>₹{land.pricePerAcre}</div>
                             <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>per acre</span>
                           </div>
                         </div>
                         
                         <div className="flex items-center gap-2 mt-2">
                           <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} flex items-center gap-1`}>
                             <Droplet size={10} /> {land.waterAccess}
                           </span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
