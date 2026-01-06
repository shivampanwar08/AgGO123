import { Link, useLocation } from 'wouter';
import { Home, Users, ShoppingBag, Settings, Leaf, MapPin } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

export default function BottomNav() {
  const [location] = useLocation();
  const { language, darkMode, userRole } = useApp();

  const isActive = (path: string) => location === path;

  const getNavItems = () => {
    if (userRole === 'equipment-renter') {
      return [
        { to: "/", icon: <Home size={22} />, label: t('home', language) },
        { to: "/drivers", icon: <Users size={22} />, label: t('drivers', language) },
        { to: "/settings", icon: <Settings size={22} />, label: t('settings', language) },
      ];
    }
    
    if (userRole === 'land-owner') {
      return [
        { to: "/", icon: <Home size={22} />, label: t('home', language) },
        { to: "/land-rental", icon: <MapPin size={22} />, label: "Land" },
        { to: "/settings", icon: <Settings size={22} />, label: t('settings', language) },
      ];
    }
    
    if (userRole === 'shopper') {
      return [
        { to: "/", icon: <Home size={22} />, label: t('home', language) },
        { to: "/shops", icon: <ShoppingBag size={22} />, label: t('shops', language) },
        { to: "/settings", icon: <Settings size={22} />, label: t('settings', language) },
      ];
    }

    return [
      { to: "/", icon: <Home size={22} />, label: t('home', language) },
      { to: "/drivers", icon: <Users size={22} />, label: t('drivers', language) },
      { to: "/marketplace", icon: <Leaf size={22} />, label: t('market', language) },
      { to: "/shops", icon: <ShoppingBag size={22} />, label: t('shops', language) },
      { to: "/settings", icon: <Settings size={22} />, label: t('settings', language) },
    ];
  };

  const navItems = getNavItems();
  const gridCols = navItems.length === 3 ? 'grid-cols-3' : 'grid-cols-5';

  return (
    <div className={`absolute bottom-0 left-0 right-0 w-full max-w-md mx-auto backdrop-blur-2xl border-t shadow-2xl z-50 h-16 px-2 pb-1 transition-colors ${
      darkMode 
        ? 'bg-gray-900/95 border-gray-800/50' 
        : 'bg-white/95 border-white/40'
    }`}>
      <div className={`grid ${gridCols} h-full items-center gap-1`}>
        {navItems.map((item) => (
          <NavItem 
            key={item.to}
            to={item.to} 
            icon={item.icon} 
            label={item.label} 
            active={isActive(item.to)} 
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, active, darkMode }: any) {
  return (
    <Link href={to} className={`relative flex flex-col items-center justify-center gap-1.5 transition-all duration-300 rounded-2xl py-2 px-1 ${
      active 
        ? darkMode 
          ? 'bg-green-900/40 text-green-400' 
          : 'bg-green-50 text-green-600'
        : darkMode
          ? 'text-gray-500 hover:text-gray-300'
          : 'text-gray-400 hover:text-gray-600'
    }`}>
      <div className={`transition-all duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-bold tracking-wide transition-all duration-300 ${
        active ? 'opacity-100 text-xs' : 'opacity-60 text-[8px]'
      }`}>
        {label}
      </span>
      {active && (
        <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${
          darkMode ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-green-600 shadow-[0_0_8px_#16a34a]'
        }`} />
      )}
    </Link>
  );
}
