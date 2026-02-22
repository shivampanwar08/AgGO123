import { ArrowLeft, Star, MapPin, Phone, TrendingUp, Plus, Check, Search, Leaf, Droplet, Users, MessageSquare, Send, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

const farmersWithCrops = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    village: 'Rampur Village',
    phone: '+91 98765 43210',
    crops: [
      { 
        id: 'c1', 
        name: 'Organic Wheat', 
        qty: '500kg', 
        pricePerUnit: 28, 
        buyersOffering: 5, 
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop',
        comments: [
          { id: 'com1', userName: 'Amit', text: 'Is this 100% organic?', timestamp: '2h ago' }
        ]
      },
      { id: 'c2', name: 'Fresh Tomatoes', qty: '200kg', pricePerUnit: 12, buyersOffering: 3, image: 'https://images.unsplash.com/photo-1592841494149-fd9025c6f9d8?w=100&h=100&fit=crop' }
    ],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    distance: '3.2 km'
  },
  {
    id: 'f2',
    name: 'Priya Singh',
    village: 'Sector 5',
    phone: '+91 87654 32109',
    crops: [
      { id: 'c3', name: 'Natural Pesticide (Neem)', qty: '50L', pricePerUnit: 450, buyersOffering: 8, image: 'https://images.unsplash.com/photo-1585518419759-87a8d10a1c5e?w=100&h=100&fit=crop' },
      { id: 'c4', name: 'Organic Rice', qty: '1000kg', pricePerUnit: 45, buyersOffering: 6, image: 'https://images.unsplash.com/photo-1586362891453-8aa3308e6250?w=100&h=100&fit=crop' }
    ],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    distance: '5.1 km'
  }
];

const buyersList = [
  {
    id: 'b1',
    name: 'Green Valley Traders',
    type: 'Organic Buyer',
    location: '2.5 km away',
    crops: ['Wheat', 'Rice', 'Tomatoes'],
    priceOffer: { wheat: 30, rice: 48, tomatoes: 14 },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    rating: 4.7,
    contact: '+91 98765 43210'
  },
  {
    id: 'b2',
    name: 'Urban Fresh Supplies',
    type: 'Retail Chain',
    location: '4.2 km away',
    crops: ['Vegetables', 'Fruits', 'Organic Products'],
    priceOffer: { wheat: 29, rice: 46, tomatoes: 15 },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    rating: 4.5,
    contact: '+91 87654 32109'
  },
  {
    id: 'b3',
    name: 'Farmer Cooperative',
    type: 'Collective Buyer',
    location: '1.8 km away',
    crops: ['All Crops', 'Pesticides', 'Natural Products'],
    priceOffer: { wheat: 32, rice: 50, tomatoes: 13 },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    rating: 4.9,
    contact: '+91 76543 21098'
  },
  {
    id: 'b4',
    name: 'Agro Processing Ltd',
    type: 'Processor',
    location: '7.5 km away',
    crops: ['Wheat', 'Rice', 'Maize'],
    priceOffer: { wheat: 27, rice: 44, tomatoes: 11 },
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    rating: 4.4,
    contact: '+91 65432 10987'
  }
];

export default function Marketplace() {
  const { darkMode, language, marketplaceItems, addMarketplaceItem, removeMarketplaceItem } = useApp();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'browse' | 'sell'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  // Helper to get user profile info
  const getUserProfile = () => {
    const role = localStorage.getItem('aggo_user_role');
    const phone = localStorage.getItem('aggo_user_phone') || 'Unknown';
    let name = 'Farmer';
    let village = 'Local Village';

    if (role === 'equipment-renter') {
      const data = localStorage.getItem('aggo_equipment_data');
      if (data) {
        const parsed = JSON.parse(data);
        name = parsed.ownerName || name;
        village = parsed.village || village;
      }
    } else if (role === 'land-owner') {
      const data = localStorage.getItem('aggo_land_data');
      if (data) {
        const parsed = JSON.parse(data);
        name = parsed.ownerName || name;
        village = parsed.village || village;
      }
    } else if (role === 'shopper') {
      const data = localStorage.getItem('aggo_shopper_data');
      if (data) {
        const parsed = JSON.parse(data);
        name = parsed.shopOwner || name;
        village = parsed.village || village;
      }
    }

    return { name, village, phone };
  };

  // Form State
  const [newCrop, setNewCrop] = useState({
    name: '',
    qty: '',
    price: '',
    unit: 'kg',
    image: ''
  });

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.qty || !newCrop.price) return;
    const userProfile = getUserProfile();
    const newItem = {
      id: `m-${Date.now()}`,
      sellerName: userProfile.name,
      village: userProfile.village,
      phone: userProfile.phone,
      cropName: newCrop.name,
      quantity: `${newCrop.qty} ${newCrop.unit}`,
      price: Number(newCrop.price),
      image: newCrop.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop',
      isUserListing: true,
      comments: []
    };
    addMarketplaceItem(newItem);
    setNewCrop({ name: '', qty: '', price: '', unit: 'kg', image: '' });
  };

  const sellersMap = new Map();
  marketplaceItems.forEach(item => {
    if (!sellersMap.has(item.sellerName)) {
      sellersMap.set(item.sellerName, {
        id: `s-${item.sellerName.replace(/\s+/g, '-')}`,
        name: item.sellerName,
        village: item.village,
        phone: item.phone,
        crops: [],
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        distance: '2.5 km'
      });
    }
    sellersMap.get(item.sellerName).crops.push({
      id: item.id,
      name: item.cropName,
      qty: item.quantity,
      pricePerUnit: item.price,
      buyersOffering: Math.floor(Math.random() * 5) + 1,
      image: item.image,
      comments: item.comments || []
    });
  });

  const allListings = [...farmersWithCrops, ...Array.from(sellersMap.values())];
  const uniqueListings = Array.from(new Map(allListings.map(item => [item.name, item])).values());
  const filteredFarmers = uniqueListings.filter(farmer => 
    farmer.crops.some((crop: any) => crop.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const myListedCrops = marketplaceItems.filter(item => item.isUserListing);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full flex flex-col relative overflow-hidden transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl px-4 py-4 z-10 shadow-sm border-b transition-colors flex-shrink-0`}>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setLocation('/')} className={`w-10 h-10 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}>
            <ArrowLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>Crop Marketplace</h1>
        </div>
        <div className={`flex gap-2 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} p-1 rounded-xl`}>
          <button onClick={() => setActiveTab('browse')} className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${activeTab === 'browse' ? `${darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-primary shadow-md'}` : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}`}>Browse Farmers</button>
          <button onClick={() => setActiveTab('sell')} className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${activeTab === 'sell' ? `${darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-primary shadow-md'}` : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}`}>Sell My Crops</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {activeTab === 'browse' && (
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input type="text" placeholder="Search crops, pesticides..." className={`w-full ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all border`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="space-y-6">
              <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-4`}>Available Crops</h2>
              {filteredFarmers.map(farmer => (
                <div key={farmer.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl border shadow-xl overflow-hidden mb-6`}>
                  <div className={`p-4 ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gradient-to-r from-green-50/50 to-transparent border-gray-100'} border-b flex items-center gap-3`}>
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100"><img src={farmer.image} className="w-full h-full object-cover" /></div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{farmer.name}</h3>
                      <p className="text-xs text-gray-500">{farmer.village} • {farmer.distance}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs font-bold"><Star size={14} className="text-yellow-400 fill-yellow-400" />{farmer.rating}</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {farmer.crops.map((crop: any) => (
                      <div key={crop.id} className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setSelectedCrop(crop)}>
                        <div className="flex gap-6">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner"><img src={crop.image} className="w-full h-full object-cover" /></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div><h4 className="text-lg font-black">{crop.name}</h4><span className="text-xs text-gray-500">Qty: {crop.qty}</span></div>
                              <div className="text-right"><div className="text-2xl font-black text-green-600">₹{crop.pricePerUnit}</div><span className="text-[9px] text-gray-400 uppercase font-black">per unit</span></div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dashed border-gray-200"><TrendingUp size={14} className="text-green-600" /><span className="text-xs font-bold text-green-600">{crop.buyersOffering} buyers interested</span></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="p-4 space-y-4">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-[2.5rem] border p-8 shadow-2xl`}>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3"><Plus size={24} className="text-green-500" />{t('add_crop', language)}</h2>
              <div className="space-y-5">
                <div><label className="text-[10px] font-black uppercase mb-2 block ml-1 text-gray-400">Crop Name</label><input type="text" value={newCrop.name} onChange={(e) => setNewCrop({...newCrop, name: e.target.value})} placeholder="e.g. Wheat, Rice, Cotton" className="w-full rounded-2xl px-6 py-4 text-sm font-bold border outline-none" /></div>
                <div className="flex gap-4">
                  <div className="flex-1"><label className="text-[10px] font-black uppercase mb-2 block ml-1 text-gray-400">Quantity</label><input type="number" value={newCrop.qty} onChange={(e) => setNewCrop({...newCrop, qty: e.target.value})} className="w-full rounded-2xl px-6 py-4 text-sm font-bold border outline-none" /></div>
                  <div className="w-32"><label className="text-[10px] font-black uppercase mb-2 block ml-1 text-gray-400">Unit</label><select value={newCrop.unit} onChange={(e) => setNewCrop({...newCrop, unit: e.target.value})} className="w-full rounded-2xl px-4 py-4 text-sm font-bold border outline-none"><option value="kg">kg</option><option value="quintal">quintal</option><option value="ton">ton</option></select></div>
                </div>
                <div><label className="text-[10px] font-black uppercase mb-2 block ml-1 text-gray-400">Expected Price</label><input type="number" value={newCrop.price} onChange={(e) => setNewCrop({...newCrop, price: e.target.value})} className="w-full rounded-2xl px-6 py-4 text-sm font-bold border outline-none" /></div>
                <div>
                  <label className="text-[10px] font-black uppercase mb-2 block ml-1 text-gray-400">Crop Image URL</label>
                  <input 
                    type="text" 
                    value={newCrop.image} 
                    onChange={(e) => setNewCrop({...newCrop, image: e.target.value})} 
                    placeholder="Paste image link here..." 
                    className="w-full rounded-2xl px-6 py-4 text-sm font-bold border outline-none" 
                  />
                </div>
                <button onClick={handleAddCrop} className="w-full bg-green-500 text-white font-black py-5 rounded-2xl shadow-2xl mt-4">List Crop for Sale</button>
              </div>
            </div>

            {/* Best Buyers Section */}
            <div className="space-y-4">
              <h2 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'} mt-10 mb-4 px-2 tracking-tight`}>{t('best_buyers', language)}</h2>
              <div className="space-y-4">
                {buyersList.map(buyer => (
                  <div key={buyer.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-[2.5rem] border overflow-hidden shadow-xl hover:shadow-green-500/5 hover:-translate-y-1 transition-all group`}>
                    <div className="p-8">
                      <div className="flex items-start gap-6 mb-8">
                        <div className={`w-16 h-16 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} overflow-hidden flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform`}>
                          <img src={buyer.image} alt={buyer.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight leading-none mb-1 group-hover:text-green-500 transition-colors`}>{buyer.name}</h3>
                              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{buyer.type}</p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-lg">
                              <Star size={12} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-black text-yellow-600">{buyer.rating}</span>
                            </div>
                          </div>
                          <p className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1 mt-2`}>
                            <MapPin size={12} /> {buyer.location}
                          </p>
                        </div>
                      </div>

                      <div className={`${darkMode ? 'bg-green-500/5' : 'bg-green-50/30'} rounded-3xl p-6 mb-8 border border-green-500/10`}>
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4 flex items-center gap-2`}>
                          <TrendingUp size={12} /> Current Market Offers
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center group/price">
                            <div className={`text-xl font-black ${darkMode ? 'text-green-400' : 'text-green-600'} tracking-tighter group-hover:scale-110 transition-transform`}>₹{buyer.priceOffer.wheat}</div>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Wheat/kg</span>
                          </div>
                          <div className="text-center group/price">
                            <div className={`text-xl font-black ${darkMode ? 'text-green-400' : 'text-green-600'} tracking-tighter group-hover:scale-110 transition-transform`}>₹{buyer.priceOffer.rice}</div>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Rice/kg</span>
                          </div>
                          <div className="text-center group/price">
                            <div className={`text-xl font-black ${darkMode ? 'text-green-400' : 'text-green-600'} tracking-tighter group-hover:scale-110 transition-transform`}>₹{buyer.priceOffer.tomatoes}</div>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Veg/kg</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <a href={`tel:${buyer.contact}`} className={`flex-1 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border font-black py-4 rounded-2xl text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all`}>
                          <Phone size={16} fill="currentColor" strokeWidth={0} />
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedCrop && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCrop(null)}></div>
          <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} w-full max-w-lg rounded-t-[3.5rem] sm:rounded-[3.5rem] overflow-hidden relative z-10 shadow-2xl animate-in slide-in-from-bottom-20 duration-500 max-h-[95vh] flex flex-col`}>
            <div className="absolute top-8 right-8 z-20"><button onClick={() => setSelectedCrop(null)} className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-2xl"><ArrowLeft className="rotate-90" size={28} /></button></div>
            <div className="overflow-y-auto no-scrollbar pb-12">
              <div className="relative h-[45vh] w-full overflow-hidden"><img src={selectedCrop.image} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" /><div className="absolute bottom-10 left-10 right-10"><h2 className="text-5xl font-black text-white leading-none tracking-tighter">{selectedCrop.name}</h2></div></div>
              <div className="px-10 pt-10">
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="bg-gray-50 p-6 rounded-[2.5rem] text-center"><p className="text-[10px] font-black text-gray-500 uppercase">Price</p><p className="text-3xl font-black text-green-500">₹{selectedCrop.pricePerUnit}</p></div>
                  <div className="bg-gray-50 p-6 rounded-[2.5rem] text-center"><p className="text-[10px] font-black text-gray-500 uppercase">Stock</p><p className="text-2xl font-black">{selectedCrop.qty}</p></div>
                  <div className="bg-gray-50 p-6 rounded-[2.5rem] text-center"><p className="text-[10px] font-black text-gray-500 uppercase">Demand</p><p className="text-2xl font-black text-blue-500">{selectedCrop.buyersOffering}</p></div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6 pb-6">
                  <button className="py-6 rounded-[2.5rem] font-black border flex items-center justify-center gap-3 uppercase text-xs">Locate</button>
                  <button className="bg-green-500 text-white font-black py-6 rounded-[2.5rem] flex items-center justify-center gap-3 uppercase text-xs">Call Farmer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
