import { ArrowLeft, Star, MapPin, Phone, TrendingUp, Plus, Check, Search, Leaf, Droplet } from 'lucide-react';
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
    crops: [
      { id: 'c1', name: 'Organic Wheat', qty: '500kg', pricePerUnit: 28, buyersOffering: 5, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop' },
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
    crops: [
      { id: 'c3', name: 'Natural Pesticide (Neem)', qty: '50L', pricePerUnit: 450, buyersOffering: 8, image: 'https://images.unsplash.com/photo-1585518419759-87a8d10a1c5e?w=100&h=100&fit=crop' },
      { id: 'c4', name: 'Organic Rice', qty: '1000kg', pricePerUnit: 45, buyersOffering: 6, image: 'https://images.unsplash.com/photo-1586362891453-8aa3308e6250?w=100&h=100&fit=crop' }
    ],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    distance: '5.1 km'
  },
  {
    id: 'f3',
    name: 'Mukesh Patel',
    village: 'Kishanpur',
    crops: [
      { id: 'c5', name: 'Cow Dung Fertilizer', qty: '100kg', pricePerUnit: 8, buyersOffering: 4, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' },
      { id: 'c6', name: 'Fresh Maize', qty: '300kg', pricePerUnit: 18, buyersOffering: 2, image: 'https://images.unsplash.com/photo-1605027521069-43cb207b3c06?w=100&h=100&fit=crop' }
    ],
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    distance: '6.8 km'
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
  const { darkMode, language, allShoppers, allLandOwners } = useApp();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'land'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [myCrops, setMyCrops] = useState([
    { id: 'm1', name: 'Basmati Rice', qty: '800kg', unit: 'kg', image: 'https://images.unsplash.com/photo-1586362891453-8aa3308e6250?w=100&h=100&fit=crop' },
    { id: 'm2', name: 'Onions', qty: '300kg', unit: 'kg', image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop' }
  ]);

  // Transform Shopper Data to Marketplace format
  const shopListings = allShoppers.map(shop => ({
    id: `shop-${shop.phone}`,
    name: shop.shopName,
    village: shop.village,
    crops: shop.products.map(p => ({
      id: `prod-${p.id}`,
      name: p.name,
      qty: `${p.quantity} units`,
      pricePerUnit: p.price,
      buyersOffering: Math.floor(Math.random() * 10) + 1,
      image: p.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop', // Default image if none
      category: p.category
    })),
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=100&h=100&fit=crop',
    distance: '2.0 km'
  }));

  const allListings = [...farmersWithCrops, ...shopListings];

  const filteredFarmers = allListings.filter(farmer => 
    farmer.crops.some(crop => crop.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen pb-24 transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl px-4 py-4 sticky top-0 z-10 shadow-sm border-b transition-colors`}>
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => setLocation('/')}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}
          >
            <ArrowLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>Crop Marketplace</h1>
        </div>

        <div className={`flex gap-2 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100/50'} p-1 rounded-xl overflow-x-auto no-scrollbar`}>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 min-w-[100px] py-2.5 px-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === 'browse'
                ? `${darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-primary shadow-md'}`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`
            }`}
          >
            Browse Crops
          </button>
          <button
            onClick={() => setActiveTab('land')}
            className={`flex-1 min-w-[100px] py-2.5 px-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === 'land'
                ? `${darkMode ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-600 shadow-md'}`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`
            }`}
          >
            Rent Land
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 min-w-[100px] py-2.5 px-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === 'sell'
                ? `${darkMode ? 'bg-gray-800 text-green-400' : 'bg-white text-primary shadow-md'}`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`
            }`}
          >
            Sell My Crops
          </button>
        </div>
      </div>

      {activeTab === 'land' && (
        <div className="p-4 space-y-4">
          <div className="relative">
             <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
             <input 
               type="text" 
               placeholder="Search by location..." 
               className={`w-full ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-amber-500 transition-all border`}
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>

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
        </div>
      )}

      {activeTab === 'browse' && (
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
            <input 
              type="text" 
              placeholder="Search crops, pesticides..." 
              className={`w-full ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all border`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-4`}>
              Available Crops ({filteredFarmers.reduce((acc, f) => acc + f.crops.length, 0)})
            </h2>

            {filteredFarmers.length === 0 && searchQuery ? (
              <div className={`text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <p>No crops found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredFarmers.map(farmer => (
                <div key={farmer.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm`}>
                  <div className={`p-4 ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gradient-to-r from-green-50/50 to-transparent border-gray-100'} border-b`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{farmer.name}</h3>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                          <MapPin size={12} /> {farmer.village} • {farmer.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs font-bold">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          {farmer.rating}
                        </div>
                        <button className={`${darkMode ? 'text-green-400' : 'text-green-600 hover:text-green-700'} font-bold text-xs mt-1`}>Contact</button>
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'divide-gray-700' : 'divide-gray-100'} divide-y`}>
                    {farmer.crops.map(crop => (
                      <div key={crop.id} className={`p-4 ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'} transition-colors cursor-pointer`} onClick={() => setSelectedCrop(crop)}>
                        <div className="flex gap-4">
                          <div className={`w-16 h-16 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} overflow-hidden flex-shrink-0`}>
                            <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{crop.name}</h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>Quantity: {crop.qty}</p>
                              </div>
                              <div className="text-right">
                                <div className={`font-bold text-lg ${darkMode ? 'text-green-400' : 'text-green-600'}`}>₹{crop.pricePerUnit}</div>
                                <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>per unit</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
                              <TrendingUp size={12} className={darkMode ? 'text-green-400' : 'text-green-600'} />
                              <span className={darkMode ? 'text-green-400' : 'text-green-600'}>{crop.buyersOffering} buyers interested</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'sell' && (
        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <h2 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-2`}>{t('my_listed_crops', language)}</h2>
            
            {myCrops.map(crop => (
              <div key={crop.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm`}>
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className={`w-20 h-20 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} overflow-hidden flex-shrink-0`}>
                      <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{crop.name}</h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Available: {crop.qty}</p>
                      <button className="text-red-500 text-xs font-bold mt-2 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 transition-all active:scale-95">
              <Plus size={18} />
              {t('add_crop', language)}
            </button>
          </div>

          <h2 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-6 mb-2`}>{t('best_buyers', language)}</h2>

          <div className="space-y-3">
            {buyersList.map(buyer => (
              <div key={buyer.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all`}>
                <div className="p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} overflow-hidden flex-shrink-0`}>
                      <img src={buyer.image} alt={buyer.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{buyer.name}</h3>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{buyer.type}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          {buyer.rating}
                        </div>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'} mt-1`}>{buyer.location}</p>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50/50'} rounded-lg p-3 mb-3`}>
                    <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Price Offers:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>₹{buyer.priceOffer.wheat}</div>
                        <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wheat/kg</span>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>₹{buyer.priceOffer.rice}</div>
                        <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rice/kg</span>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>₹{buyer.priceOffer.tomatoes}</div>
                        <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Veg/kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className={`flex-1 ${darkMode ? 'bg-gray-700 border-green-600 text-green-400' : 'bg-white border-green-500 text-green-600'} border font-bold py-2 rounded-lg text-xs hover:opacity-80 transition-colors`}>
                      <Phone size={14} className="inline mr-1" />
                      Contact
                    </button>
                    <button className="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg text-xs hover:bg-green-600 transition-colors">
                      Negotiate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <h4 className="font-bold text-blue-900 text-sm mb-2">💡 Pro Tip</h4>
            <p className="text-xs text-blue-800">
              Your Basmati Rice is worth ₹32/kg at Farmer Cooperative. They're your best price! List it now to get contacted by multiple buyers.
            </p>
          </div>
        </div>
      )}

      {selectedCrop && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-t-3xl p-6 pb-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <button 
              onClick={() => setSelectedCrop(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="flex gap-4 mb-6">
              <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                <img src={selectedCrop.image} alt={selectedCrop.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{selectedCrop.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Available: {selectedCrop.qty}</p>
                <div className="font-bold text-2xl text-green-600 mt-2">₹{selectedCrop.pricePerUnit}</div>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-3 text-sm">Interested Buyers ({selectedCrop.buyersOffering})</h4>
            <div className="space-y-2 mb-6">
              {buyersList.slice(0, selectedCrop.buyersOffering).map(buyer => (
                <div key={buyer.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={buyer.image} alt={buyer.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xs text-gray-900">{buyer.name}</p>
                    <p className="text-[10px] text-gray-500">{buyer.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">₹{selectedCrop.pricePerUnit + 2}</p>
                    <p className="text-[10px] text-gray-500">offered</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/30 transition-all active:scale-95">
              Contact All Buyers
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
