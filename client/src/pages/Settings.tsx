import { User, Settings as SettingsIcon, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Farmer John',
    phone: '+91 98765 43210',
    email: 'farmer.john@aggo.com',
    village: 'Rampur Village',
    bankAccount: '****1234',
    walletBalance: 2450
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Profile Header */}
      <div className="glass rounded-b-3xl p-1 shadow-lg">
        <div className="bg-white/60 backdrop-blur-sm rounded-b-[1.25rem] p-6">
          <div className="flex items-start gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600 text-sm mt-1">{profile.phone}</p>
                <div className="mt-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-lg inline-block">
                  Gold Member
                </div>
              </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Edit2 size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Mode */}
      {isEditing && (
        <div className="p-4 space-y-4 mt-4">
          <div className="glass rounded-3xl p-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full mt-2 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full mt-2 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Village</label>
                <input type="text" value={profile.village} onChange={(e) => setProfile({...profile, village: e.target.value})} className="w-full mt-2 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <button onClick={() => setIsEditing(false)} className="w-full bg-green-500 text-white font-bold py-3 rounded-xl mt-4 active:scale-95 transition-transform">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="p-4 space-y-4 mt-4">
        
        {/* Wallet Section */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Wallet Balance</p>
                  <p className="text-xs text-gray-500">₹{profile.walletBalance}</p>
                </div>
              </div>
              <button className="text-green-600 font-bold text-sm">Add Money</button>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] overflow-hidden">
            <MenuItem icon={<Bell size={20} />} label="Notifications" onClick={() => alert('Notifications: You have 3 new messages')} />
            <MenuItem icon={<SettingsIcon size={20} />} label="App Settings" onClick={() => alert('Settings: Dark Mode, Language, Units')} />
          </div>
        </div>

        {/* Section 2 */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] overflow-hidden">
            <MenuItem icon={<HelpCircle size={20} />} label="Help & Support" onClick={() => alert('Support: Call +91 1800-1234567 or visit aggo.com/support')} />
            <MenuItem icon={<User size={20} />} label="About AgGo" onClick={() => alert('AgGo v1.0.0 - Agriculture Equipment Rental Platform')} />
          </div>
        </div>

        {/* Logout */}
        <button className="glass rounded-3xl p-1 w-full active:scale-95 transition-transform">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4 flex items-center gap-4 text-red-500 font-bold">
             <LogOut size={20} />
             <span>Log Out</span>
          </div>
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">AgGo Version 1.0.0 | © 2025</p>
      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 border-b border-gray-100/50 last:border-0 hover:bg-gray-50/50 transition-colors active:scale-95">
      <div className="flex items-center gap-4 text-gray-700">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300" />
    </button>
  );
}
