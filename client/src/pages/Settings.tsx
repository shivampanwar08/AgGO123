import { User, Settings as SettingsIcon, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Edit2, MapPin, Phone, Leaf, Search, Languages, Moon, Sun, Users } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import type { Language } from '@/lib/translations';
import RoleChangeFlow from './RoleChangeFlow';

const landListings = [
  {
    id: 'l1',
    farmerName: 'Rajesh Singh',
    village: 'Rampur Village',
    distance: '2.5 km',
    landSize: '25 acres',
    pricePerAcre: 8500,
    soilType: 'Black Soil - Fertile',
    waterAccess: 'Bore well + Canal',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop',
    phone: '+91 98765 43210',
    rating: 4.8
  },
  {
    id: 'l2',
    farmerName: 'Priya Patel',
    village: 'Sector 5',
    distance: '4.2 km',
    landSize: '15 acres',
    pricePerAcre: 6500,
    soilType: 'Red Soil - Good Drainage',
    waterAccess: 'Tube well',
    condition: 'Very Good',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop',
    phone: '+91 87654 32109',
    rating: 4.6
  },
  {
    id: 'l3',
    farmerName: 'Mukesh Kumar',
    village: 'Kishanpur',
    distance: '6.8 km',
    landSize: '40 acres',
    pricePerAcre: 5500,
    soilType: 'Loamy Soil - Balanced',
    waterAccess: 'Canal only',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop',
    phone: '+91 76543 21098',
    rating: 4.4
  },
  {
    id: 'l4',
    farmerName: 'Suresh Yadav',
    village: 'Sector 7',
    distance: '3.5 km',
    landSize: '20 acres',
    pricePerAcre: 7500,
    soilType: 'Black Soil - Premium',
    waterAccess: 'Bore well + Canal + Tank',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop',
    phone: '+91 65432 10987',
    rating: 4.9
  }
];

const garageData = [
  {
    id: 'g1',
    village: 'Rampur Village',
    garageAddress: 'Main Road, Near Mandis',
    openHours: '6:00 AM - 8:00 PM',
    distance: '2.5 km',
    machines: [
      { id: 'm1', type: 'Tractor', available: true, date: 'Today', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop' },
      { id: 'm2', type: 'Harvester', available: true, date: 'Tomorrow', image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop' },
      { id: 'm3', type: 'Trolley', available: false, date: 'Jan 25', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'g2',
    village: 'Sector 5',
    garageAddress: 'Industrial Area Block C',
    openHours: '7:00 AM - 6:00 PM',
    distance: '4.2 km',
    machines: [
      { id: 'm4', type: 'Rotavator', available: true, date: 'Today', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop' },
      { id: 'm5', type: 'Seeder', available: true, date: 'Today', image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'g3',
    village: 'Sector 7',
    garageAddress: 'Agricultural Hub, Town Center',
    openHours: '6:30 AM - 9:00 PM',
    distance: '3.5 km',
    machines: [
      { id: 'm6', type: 'Tractor', available: true, date: 'Today', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' },
      { id: 'm7', type: 'Harvester', available: false, date: 'Jan 26', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop' },
      { id: 'm8', type: 'Trolley', available: true, date: 'Today', image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop' }
    ]
  }
];

export default function Settings() {
  const { language, setLanguage, darkMode, setDarkMode, setUserRole } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'landrent' | 'garage'>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [bookedMachines, setBookedMachines] = useState<string[]>([]);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Farmer John',
    phone: '+91 98765 43210',
    email: 'farmer.john@aggo.com',
    village: 'Rampur Village',
    bankAccount: '****1234',
    walletBalance: 2450
  });

  const filteredLands = landListings.filter(land =>
    land.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    land.soilType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  const handleRoleChangeComplete = () => {
    setShowRoleSelector(false);
  };

  if (showRoleSelector) {
    return <RoleChangeFlow onComplete={handleRoleChangeComplete} />;
  }

  return (
    <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
      {activeTab === 'garage' && (
        <div className="p-3 space-y-2.5">
          <h1 className={`text-xl font-bold ${textClass} mt-1 mb-2`}>{t('aago_garage', language)}</h1>

          <div className="space-y-2.5">
            {garageData.map(garage => (
              <div key={garage.id} className={`${cardClass} rounded-xl border overflow-hidden`}>
                <div className="p-2.5">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className={`font-bold text-sm ${textClass}`}>{garage.village}</h3>
                      <p className={`text-[11px] ${textMutedClass} flex items-center gap-0.5 mt-0.5 leading-snug`}>
                        <MapPin size={10} /> {garage.garageAddress}
                      </p>
                    </div>
                    <span className={`text-[9px] font-bold text-white ${darkMode ? 'bg-blue-600/80' : 'bg-blue-500/80'} px-1.5 py-0.5 rounded flex items-center gap-0.5 flex-shrink-0`}>
                      📍 {garage.distance}
                    </span>
                  </div>

                  <p className={`text-[9px] ${textMutedClass} font-bold uppercase tracking-tight mb-1.5`}>
                    ⏰ {t('open_hours', language)}: {garage.openHours}
                  </p>

                  <h4 className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-tight mb-1.5`}>
                    {t('available_machines', language)} ({garage.machines.filter(m => m.available).length})
                  </h4>

                  <div className="space-y-1">
                    {garage.machines.map(machine => (
                      <div 
                        key={machine.id}
                        className={`flex items-center gap-2 p-1.5 ${machine.available ? darkMode ? 'bg-green-900/20' : 'bg-green-50' : darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'} rounded`}
                      >
                        <img src={machine.image} alt={machine.type} className="w-9 h-9 rounded object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold ${textClass} truncate`}>{machine.type}</p>
                          <p className={`text-[10px] ${textMutedClass} truncate`}>{t('available_date', language)}: {machine.date}</p>
                        </div>
                        {machine.available ? (
                          <button
                            onClick={() => setBookedMachines([...bookedMachines, machine.id])}
                            disabled={bookedMachines.includes(machine.id)}
                            className={`${bookedMachines.includes(machine.id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white font-bold text-[10px] px-2 py-1 rounded transition-colors active:scale-95 flex-shrink-0 whitespace-nowrap`}
                          >
                            {bookedMachines.includes(machine.id) ? t('check_status', language) : t('book_now', language)}
                          </button>
                        ) : (
                          <span className={`text-[10px] font-bold ${darkMode ? 'text-red-400' : 'text-red-600'} flex-shrink-0 whitespace-nowrap`}>
                            {t('machine_unavailable', language)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
      <>
      <div className={`${cardClass} rounded-b-3xl p-1 shadow-lg border`}>
        <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-b-[1.25rem] p-6`}>
          <div className="flex items-start gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-2xl overflow-hidden border-4 ${darkMode ? 'border-gray-800' : 'border-white'} shadow-lg`}>
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${textClass}`}>{profile.name}</h1>
                <p className={`${textMutedClass} text-sm mt-1`}>{profile.phone}</p>
                <div className={`mt-2 ${darkMode ? 'bg-yellow-900/40 text-yellow-400' : 'bg-yellow-100 text-yellow-700'} text-xs font-bold px-3 py-1 rounded-lg inline-block`}>
                  {t('gold_member', language)}
                </div>
              </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}>
              <Edit2 size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="p-4 space-y-4 mt-4">
          <div className={`${cardClass} rounded-3xl p-1 border`}>
            <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-[1.25rem] p-4 space-y-4`}>
              <div>
                <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('name', language)}</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className={`w-full mt-2 p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('email', language)}</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className={`w-full mt-2 p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`} />
              </div>
              <div>
                <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('village', language)}</label>
                <input type="text" value={profile.village} onChange={(e) => setProfile({...profile, village: e.target.value})} className={`w-full mt-2 p-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`} />
              </div>
              <button onClick={() => setIsEditing(false)} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl mt-4 active:scale-95 transition-transform shadow-lg shadow-green-500/20">{t('save_changes', language)}</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4 mt-4">
        <div className={`${cardClass} rounded-3xl p-1 border`}>
          <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-[1.25rem] p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${darkMode ? 'bg-green-900/50' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                  <CreditCard size={18} className={darkMode ? 'text-green-400' : 'text-green-600'} />
                </div>
                <div>
                  <p className={`font-bold ${textClass} text-sm`}>{t('wallet_balance', language)}</p>
                  <p className={`text-xs ${textMutedClass}`}>₹{profile.walletBalance}</p>
                </div>
              </div>
              <button className={`${darkMode ? 'text-green-400' : 'text-green-600'} font-bold text-sm`}>{t('add_money', language)}</button>
            </div>
          </div>
        </div>

        <div className={`${cardClass} rounded-3xl p-1 border`}>
          <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-[1.25rem] overflow-hidden`}>
            <div className="relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`w-full flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700/50 hover:bg-gray-700/50' : 'border-gray-100/50 hover:bg-gray-50/50'} transition-colors active:scale-95`}
              >
                <div className={`flex items-center gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Languages size={20} />
                  <span className="font-medium text-sm">{t('language', language)}</span>
                </div>
                <ChevronRight size={18} className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} transition-transform ${showLanguageMenu ? 'rotate-90' : ''}`} />
              </button>
              
              {showLanguageMenu && (
                <div className={`${darkMode ? 'bg-gray-900 border-t border-gray-700/50' : 'bg-gray-50 border-t border-gray-100/50'}`}>
                  {(['en', 'hi', 'pa'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-6 py-3 font-bold text-sm transition-colors ${
                        language === lang
                          ? `${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'}`
                          : `${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      {lang === 'en' && '🇬🇧 ' + t('english', language)}
                      {lang === 'hi' && '🇮🇳 ' + t('hindi', language)}
                      {lang === 'pa' && '🇮🇳 ' + t('punjabi', language)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-between p-4 hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} transition-colors active:scale-95 border-t ${darkMode ? 'border-gray-700/50 hover:bg-gray-700/50' : 'border-gray-100/50 hover:bg-gray-50/50'}`}
            >
              <div className={`flex items-center gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                <span className="font-medium text-sm">{t('dark_mode', language)}</span>
              </div>
              <div className={`relative w-12 h-6 ${darkMode ? 'bg-green-600' : 'bg-gray-300'} rounded-full transition-colors`}>
                <div className={`absolute top-0.5 ${darkMode ? 'right-0.5' : 'left-0.5'} w-5 h-5 bg-white rounded-full transition-all shadow-md`}></div>
              </div>
            </button>
          </div>
        </div>

        <div className={`${cardClass} rounded-3xl p-1 border`}>
          <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-[1.25rem] overflow-hidden`}>
            <MenuItem icon={<SettingsIcon size={20} />} label={t('app_settings', language)} onClick={() => alert('Settings: Dark Mode, Language, Units')} darkMode={darkMode} />
          </div>
        </div>

        <div className={`${cardClass} rounded-3xl p-1 border`}>
          <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-[1.25rem] overflow-hidden`}>
            <MenuItem icon={<HelpCircle size={20} />} label={t('help_support', language)} onClick={() => alert('Support: Call +91 1800-1234567 or visit aggo.com/support')} darkMode={darkMode} />
            <MenuItem icon={<User size={20} />} label={t('about_aggo', language)} onClick={() => alert('AgGo v1.0.0 - Agriculture Equipment Rental Platform')} darkMode={darkMode} />
          </div>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem('aggo_user_phone');
            window.location.reload();
          }}
          className={`${cardClass} rounded-3xl p-1 w-full active:scale-95 transition-transform border`}
        >
          <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-[1.25rem] p-4 flex items-center gap-4 text-red-500 font-bold`}>
             <LogOut size={20} />
             <span>{t('logout', language)}</span>
          </div>
        </button>

        <p className={`text-center text-xs ${textMutedClass} pt-4`}>{t('version', language)}</p>
      </div>

      <BottomNav />
      </>
      )}

      {activeTab === 'landrent' && (
        <div className="p-3 space-y-2.5">
          <h1 className={`text-xl font-bold ${textClass} mt-1 mb-2`}>{t('land_rental', language)}</h1>

          <div className="relative mb-2">
            <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={16} />
            <input 
              type="text" 
              placeholder="Search by farmer name, village, soil type..." 
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'} rounded-lg pl-8 pr-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all border`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h2 className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-tight`}>Available Farms ({filteredLands.length})</h2>

          <div className="space-y-2.5">
            {filteredLands.map(land => (
              <div key={land.id} className={`${cardClass} rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all`}>
                <div className="p-2.5">
                  <div className="flex gap-2.5 mb-2">
                    <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden flex-shrink-0`}>
                      <img src={land.image} alt={land.farmerName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold ${textClass} text-sm truncate`}>{land.farmerName}</h3>
                          <p className={`text-[10px] ${textMutedClass} flex items-center gap-0.5 mt-0.5 truncate`}>
                            <MapPin size={10} /> {land.village} • {land.distance}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`font-bold text-base ${darkMode ? 'text-green-400' : 'text-green-600'}`}>₹{land.pricePerAcre}</div>
                          <span className={`text-[9px] ${textMutedClass}`}>per acre</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`grid grid-cols-2 gap-1 mb-2 p-1.5 ${darkMode ? 'bg-green-900/20' : 'bg-green-50/50'} rounded text-[9px]`}>
                    <div>
                      <p className={`${textMutedClass} font-bold uppercase`}>Size</p>
                      <p className={`font-bold ${textClass} text-xs`}>{land.landSize}</p>
                    </div>
                    <div>
                      <p className={`${textMutedClass} font-bold uppercase`}>Soil</p>
                      <p className={`font-bold ${textClass} text-xs`}>{land.soilType.split(' -')[0]}</p>
                    </div>
                    <div>
                      <p className={`${textMutedClass} font-bold uppercase`}>Water</p>
                      <p className={`font-bold ${textClass} text-xs`}>{land.waterAccess.split('+')[0].trim()}</p>
                    </div>
                    <div>
                      <p className={`${textMutedClass} font-bold uppercase`}>Status</p>
                      <p className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} text-xs`}>{land.condition.split(' -')[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className={textMutedClass}>{land.rating}</span>
                    </div>
                    <span className={`text-[9px] ${textMutedClass}`}>Verified</span>
                  </div>

                  <div className="flex gap-1.5">
                    <button className={`flex-1 ${darkMode ? 'bg-gray-700 border-green-600 text-green-400' : 'bg-white border-green-500 text-green-600'} border font-bold py-1.5 rounded text-xs hover:opacity-80 transition-opacity flex items-center justify-center gap-1`}>
                      <Phone size={12} />
                      Call
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-1.5 rounded text-xs hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLands.length === 0 && searchQuery && (
            <div className={`text-center py-10 ${textMutedClass}`}>
              <Leaf size={40} className="mx-auto mb-3 opacity-30" />
              <p>No farms found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="fixed bottom-24 left-4 right-4 z-40 flex gap-2">
        {activeTab !== 'profile' && (
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 ${cardClass} border-2 font-bold py-3 rounded-xl hover:opacity-80 transition-all active:scale-95 ${darkMode ? 'text-white' : 'text-gray-700'}`}
          >
            {t('profile', language)}
          </button>
        )}
        {activeTab !== 'landrent' && (
          <button 
            onClick={() => setActiveTab('landrent')}
            className={`flex-1 ${activeTab === 'profile' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30' : cardClass} font-bold py-3 rounded-xl hover:opacity-80 transition-all active:scale-95 flex items-center justify-center gap-1.5`}
          >
            <Leaf size={14} />
            {t('land_rental', language)}
          </button>
        )}
        {activeTab !== 'garage' && (
          <button 
            onClick={() => setActiveTab('garage')}
            className={`flex-1 ${activeTab === 'profile' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' : cardClass} font-bold py-3 rounded-xl hover:opacity-80 transition-all active:scale-95 flex items-center justify-center gap-1.5 text-sm`}
          >
            <span className="text-base">🏗️</span> {t('aago_garage', language)}
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({ icon, label, onClick, darkMode }: any) {
  const hoverClass = darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50';
  const borderClass = darkMode ? 'border-gray-700/50' : 'border-gray-100/50';
  const textColorClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const iconColorClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 border-b ${borderClass} last:border-0 ${hoverClass} transition-colors active:scale-95`}>
      <div className={`flex items-center gap-4 ${textColorClass}`}>
        <div className={iconColorClass}>{icon}</div>
        <span className="font-medium text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
    </button>
  );
}
