import { ArrowLeft, Leaf, MapPin, Phone, Search, Droplet, Users, Briefcase, IndianRupee, Info } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

const demoWorkers = [
  {
    id: 'w1',
    name: 'Suresh Raina',
    experience: '10 years',
    location: 'Bhiwani, Haryana',
    ratePerAcre: 2500,
    specialty: 'Wheat & Mustard Harvesting',
    requirements: 'Needs tractor provided, 2 meals a day',
    phone: '+91 94160 12345',
    image: 'https://images.unsplash.com/photo-1595273670150-db0c3c39241f?w=100&h=100&fit=crop'
  },
  {
    id: 'w2',
    name: 'Balwinder Singh',
    experience: '15 years',
    location: 'Patiala, Punjab',
    ratePerAcre: 3000,
    specialty: 'Rice Paddy Specialist',
    requirements: 'Diesel for machinery, helper provided',
    phone: '+91 98123 45678',
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=100&h=100&fit=crop'
  },
  {
    id: 'w3',
    name: 'Ram Charan',
    experience: '8 years',
    location: 'Karnal, Punjab',
    ratePerAcre: 2200,
    specialty: 'Vegetable Farming & Irrigation',
    requirements: 'Accommodation if staying overnight',
    phone: '+91 99912 33445',
    image: 'https://images.unsplash.com/photo-1560693279-b139989a3f9e?w=100&h=100&fit=crop'
  }
];

const demoWorkerGroups = [
  {
    id: 'g1',
    name: 'Ekta Farmer Group',
    members: 8,
    experience: '12 years',
    location: 'Sirsa, Haryana',
    rentOffer: 15000,
    endYearBonus: '20% of net profit',
    specialty: 'Large Scale Wheat & Cotton',
    requirements: 'Minimum 50 acres, irrigation must be ready',
    phone: '+91 94160 55667',
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=100&h=100&fit=crop'
  },
  {
    id: 'g2',
    name: 'Punjab Youth Workers',
    members: 12,
    experience: '5 years',
    location: 'Moga, Punjab',
    rentOffer: 18000,
    endYearBonus: '₹5,000 fixed per acre',
    specialty: 'Rice Paddy & Potato',
    requirements: 'Storage room for equipment, electricity for pump',
    phone: '+91 98123 99887',
    image: 'https://images.unsplash.com/photo-1523348830342-d01f9fc9d53e?w=100&h=100&fit=crop'
  }
];

export default function LandRental() {
  const { darkMode, language, allLandOwners } = useApp();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'lands' | 'workers' | 'groups'>('lands');

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full flex flex-col relative overflow-hidden transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl px-4 py-4 z-10 shadow-sm border-b transition-colors flex-shrink-0`}>
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => setLocation('/settings')}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}
          >
            <ArrowLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>{t('land_rental', language) || 'Land Rental'}</h1>
        </div>

        <div className={`flex gap-2 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} p-1 rounded-xl overflow-x-auto no-scrollbar`}>
          <button 
            onClick={() => setActiveTab('lands')} 
            className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all duration-200 ${activeTab === 'lands' ? `${darkMode ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-600 shadow-md'}` : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}`}
          >
            Find Land
          </button>
          <button 
            onClick={() => setActiveTab('workers')} 
            className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all duration-200 ${activeTab === 'workers' ? `${darkMode ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-600 shadow-md'}` : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}`}
          >
            Single Workers
          </button>
          <button 
            onClick={() => setActiveTab('groups')} 
            className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all duration-200 ${activeTab === 'groups' ? `${darkMode ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-600 shadow-md'}` : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}`}
          >
            Worker Groups
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 no-scrollbar">
        <div className="relative">
           <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
           <input 
             type="text" 
             placeholder={activeTab === 'lands' ? "Search by location..." : "Search by specialty or location..."}
             className={`w-full ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500 transition-all border`}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        {activeTab === 'lands' ? (
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
        ) : activeTab === 'workers' ? (
          <div className="space-y-4">
            <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-2`}>
              Available Workers ({demoWorkers.length})
            </h2>
            
            <div className="space-y-4">
              {demoWorkers
                .filter(worker => 
                  !searchQuery || 
                  worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  worker.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  worker.location.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(worker => (
                <div key={worker.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm p-4`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      <img src={worker.image} alt={worker.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{worker.name}</h3>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                            <Briefcase size={12} /> {worker.experience} exp • {worker.specialty}
                          </p>
                        </div>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 flex items-center gap-1`}>
                        <MapPin size={12} /> {worker.location}
                      </p>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-amber-50/50'} rounded-xl p-3 border border-amber-500/10 mb-4`}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <IndianRupee size={14} className="text-amber-600" />
                        <span className={`text-sm font-black ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>₹{worker.ratePerAcre}</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">/ acre</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-0.5`}>Requirements</p>
                        <p className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{worker.requirements}</p>
                      </div>
                    </div>
                  </div>

                  <a href={`tel:${worker.phone}`} className={`w-full ${darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-500 text-white'} py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all`}>
                    <Phone size={16} fill="currentColor" strokeWidth={0} />
                    Hire Worker
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-2`}>
              Available Groups ({demoWorkerGroups.length})
            </h2>
            
            <div className="space-y-4">
              {demoWorkerGroups
                .filter(group => 
                  !searchQuery || 
                  group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  group.location.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(group => (
                <div key={group.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm p-4`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{group.name}</h3>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                            <Users size={12} /> {group.members} members • {group.specialty}
                          </p>
                        </div>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 flex items-center gap-1`}>
                        <MapPin size={12} /> {group.location}
                      </p>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-green-500/5'} rounded-xl p-3 border border-green-500/10 mb-4`}>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-1`}>Rent Offer</p>
                        <div className="flex items-center gap-1">
                          <IndianRupee size={12} className="text-green-600" />
                          <span className={`text-sm font-black ${darkMode ? 'text-green-400' : 'text-green-700'}`}>₹{group.rentOffer}</span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase">/ acre</span>
                        </div>
                      </div>
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-1`}>Yearly Bonus</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp size={12} className="text-blue-500" />
                          <span className={`text-sm font-black ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{group.endYearBonus}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pt-2 border-t border-dashed border-gray-200">
                      <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className={`text-[10px] font-black uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-0.5`}>Conditions</p>
                        <p className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{group.requirements}</p>
                      </div>
                    </div>
                  </div>

                  <a href={`tel:${group.phone}`} className={`w-full ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-500 text-white'} py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all`}>
                    <Phone size={16} fill="currentColor" strokeWidth={0} />
                    Call to Rent
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
