import { Link, useLocation } from 'wouter';
import { Home, Users, ShoppingBag, Settings } from 'lucide-react';

export default function BottomNav() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 h-16 px-2">
      <div className="grid grid-cols-4 h-full">
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
    <Link href={to} className={`flex flex-col items-center justify-center gap-1 ${active ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className={`transition-all duration-200 ${active ? 'scale-110 text-yellow-500' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold ${active ? 'text-black' : ''}`}>
        {label}
      </span>
    </Link>
  );
}
