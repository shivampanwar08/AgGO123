import { User, Settings as SettingsIcon, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Edit2, MapPin, Phone, Leaf, Search, Languages, Moon, Sun, Users, Wrench } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import type { Language } from '@/lib/translations';
import RoleChangeFlow from './RoleChangeFlow';
import { useLocation } from 'wouter';

export default function Settings() {
  const { language, setLanguage, darkMode, setDarkMode, setUserRole, profileName, setProfileName } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [, setLocation] = useLocation();

  const [profile, setProfile] = useState({
    name: profileName,
    phone: '+91 98765 43210',
    email: 'farmer.john@aggo.com',
    village: 'Rampur Village',
    bankAccount: '****1234',
    walletBalance: 2450
  });

  const handleSaveProfile = () => {
    setProfileName(profile.name);
    setIsEditing(false);
  };

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
    <div className={`${bgClass} h-full flex flex-col relative overflow-hidden transition-colors duration-300`}>
      {/* Profile Section - Always Visible */}
      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
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
              <button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl mt-4 active:scale-95 transition-transform shadow-lg shadow-green-500/20">{t('save_changes', language)}</button>
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
            <MenuItem icon={<Leaf size={20} />} label={t('land_rental', language) || 'Land Rental Marketplace'} onClick={() => setLocation('/land-rental')} darkMode={darkMode} />
            <MenuItem icon={<Wrench size={20} />} label={'AgGo Garage'} onClick={() => setLocation('/garage')} darkMode={darkMode} />
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
