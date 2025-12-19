import { User, Settings as SettingsIcon, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Edit2, MapPin, Phone, Leaf, Search } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

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

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'landrent'>('profile');
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {activeTab === 'profile' && (
      <>
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
      </>
      )}

      {activeTab === 'landrent' && (
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Land Rental Marketplace</h1>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by farmer name, village, soil type..." 
              className="w-full bg-white text-gray-900 rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all border border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Farms ({filteredLands.length})</h2>

          <div className="space-y-4">
            {filteredLands.map(land => (
              <div key={land.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="p-4">
                  <div className="flex gap-4 mb-4">
                    <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={land.image} alt={land.farmerName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{land.farmerName}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin size={12} /> {land.village} • {land.distance}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-2xl text-green-600">₹{land.pricePerAcre}</div>
                          <span className="text-[10px] text-gray-500">per acre</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-green-50/50 rounded-lg">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Land Size</p>
                      <p className="font-bold text-gray-900">{land.landSize}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Soil Type</p>
                      <p className="font-bold text-gray-900 text-sm">{land.soilType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Water Access</p>
                      <p className="font-bold text-gray-900 text-sm">{land.waterAccess}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Condition</p>
                      <p className="font-bold text-green-600">{land.condition}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="text-gray-600">{land.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">Verified Owner</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-green-500 text-green-600 font-bold py-2.5 rounded-lg text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                      <Phone size={16} />
                      Call Now
                    </button>
                    <button className="flex-1 bg-green-500 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-green-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLands.length === 0 && searchQuery && (
            <div className="text-center py-10 text-gray-400">
              <Leaf size={40} className="mx-auto mb-3 opacity-30" />
              <p>No farms found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Tab Navigation for Settings */}
      {activeTab === 'profile' ? (
        <div className="fixed bottom-24 left-4 right-4 z-40">
          <button 
            onClick={() => setActiveTab('landrent')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Leaf size={18} />
            Explore Land Rentals
          </button>
        </div>
      ) : (
        <div className="fixed bottom-24 left-4 right-4 z-40">
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
          >
            Back to Profile
          </button>
        </div>
      )}

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
