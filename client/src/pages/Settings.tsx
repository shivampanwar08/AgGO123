import { User, Settings as SettingsIcon, Bell, CreditCard, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Settings() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-white p-6 pb-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Farmer John</h1>
            <p className="text-gray-500">+91 98765 43210</p>
            <div className="mt-2 bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full inline-block border border-yellow-200">
              Gold Member
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-4 -mt-4">
        
        {/* Section 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem icon={<CreditCard size={20} />} label="Payments & Wallets" />
          <MenuItem icon={<Bell size={20} />} label="Notifications" />
          <MenuItem icon={<SettingsIcon size={20} />} label="App Settings" />
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem icon={<HelpCircle size={20} />} label="Help & Support" />
          <MenuItem icon={<User size={20} />} label="About AgGo" />
        </div>

        {/* Logout */}
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 text-red-500 font-bold">
           <LogOut size={20} />
           <span>Log Out</span>
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">AgGo Version 1.0.0</p>
      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({ icon, label }: any) {
  return (
    <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 text-gray-700">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </button>
  );
}
