import { Link, useLocation } from 'wouter';
import { Home, Users, ShoppingBag, Settings } from 'lucide-react';

export default function BottomNav() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-2xl z-50 h-20 px-4 pb-4 rounded-t-3xl">
      <div className="grid grid-cols-4 h-full items-center">
        <NavItem 
          to="/" 
          icon={<Home size={24} />} 
          label="Home" 
          active={isActive('/')} 
        />
        <NavItem 
          to="/drivers" 
          icon={<Users size={24} />} 
          label="Drivers" 
          active={isActive('/drivers')} 
        />
        <NavItem 
          to="/shops" 
          icon={<ShoppingBag size={24} />} 
          label="Shops" 
          active={isActive('/shops')} 
        />
        <NavItem 
          to="/settings" 
          icon={<Settings size={24} />} 
          label="Settings" 
          active={isActive('/settings')} 
        />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, active }: any) {
  return (
    <Link href={to} className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className={`transition-all duration-300 p-2 rounded-xl ${active ? 'bg-green-100/50 -translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-wide transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 hidden'}`}>
        {label}
      </span>
      {active && (
        <div className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_currentColor]" />
      )}
    </Link>
  );
}
