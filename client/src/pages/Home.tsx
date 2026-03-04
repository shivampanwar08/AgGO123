import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/appContext";
import { t } from "@/lib/translations";
import { Wrench, Leaf, ShoppingCart, MapPin, Star, Check, Tractor, Users, Store, ChevronRight, Bell } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { darkMode, userRole, equipmentData, landData, shopperData, language, allEquipmentRenters, allLandOwners, allShoppers } = useApp();
  const [, setLocation] = useLocation();

  const getTranslatedDesc = (key: string, fallback: string) => {
    const translated = t(key, language);
    return translated !== key ? translated : fallback;
  };
  
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  const QuickAccessSection = () => {
    if (userRole === 'equipment-renter') {
      return (
        <div className="space-y-4 mt-6">
          <h2 className={`text-lg font-bold ${textClass} flex items-center gap-2`}>
            🚀 Quick Access
          </h2>
          <button
            onClick={() => setLocation('/drivers')}
            className={`${cardClass} border rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-shadow active:scale-95 w-full`}
          >
            <div className="p-2.5 bg-green-100 rounded-xl">
              <Users size={20} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className={`font-bold ${textClass}`}>{t('drivers', language)}</p>
              <p className={`text-xs ${textMutedClass}`}>Find drivers nearby</p>
            </div>
          </button>
        </div>
      );
    }
    
    if (userRole === 'land-owner') {
      return (
        <div className="space-y-4 mt-6">
          <h2 className={`text-lg font-bold ${textClass} flex items-center gap-2`}>
            🚀 Quick Access
          </h2>
          <button
            onClick={() => setLocation('/land-rental')}
            className={`${cardClass} border rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-shadow active:scale-95 w-full`}
          >
            <div className="p-2.5 bg-amber-100 rounded-xl">
              <MapPin size={20} className="text-amber-600" />
            </div>
            <div className="text-left">
              <p className={`font-bold ${textClass}`}>Land Marketplace</p>
              <p className={`text-xs ${textMutedClass}`}>Browse available lands</p>
            </div>
          </button>
        </div>
      );
    }
    
    if (userRole === 'shopper') {
      return (
        <div className="space-y-4 mt-6">
          <h2 className={`text-lg font-bold ${textClass} flex items-center gap-2`}>
            🚀 Quick Access
          </h2>
          <button
            onClick={() => setLocation('/shops')}
            className={`${cardClass} border rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-shadow active:scale-95 w-full`}
          >
            <div className="p-2.5 bg-purple-100 rounded-xl">
              <Store size={20} className="text-purple-600" />
            </div>
            <div className="text-left">
              <p className={`font-bold ${textClass}`}>{t('shops', language)}</p>
              <p className={`text-xs ${textMutedClass}`}>Browse all shops</p>
            </div>
          </button>
        </div>
      );
    }

    return null;
  };

  const NearbyListingsSection = () => {
    const { bookings } = useApp();
    const pendingBookings = bookings.filter(b => b.status === 'confirmed');
    
    return (
    <div className="space-y-4 mt-6">
      {pendingBookings.length > 0 && (
        <div className={`${cardClass} border-2 border-blue-500 bg-blue-500/5 rounded-2xl p-4 mb-6 animate-pulse`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Bell size={18} />
            </div>
            <div>
              <p className={`font-black ${textClass} text-sm`}>New Rental Request!</p>
              <p className="text-xs text-blue-500 font-bold">{pendingBookings.length} booking(s) pending for your attention</p>
            </div>
          </div>
          <button 
            onClick={() => setLocation('/bookings')}
            className="w-full mt-3 bg-blue-500 text-white text-xs font-black py-2 rounded-lg uppercase tracking-wider"
          >
            View Requests
          </button>
        </div>
      )}

      <h2 className={`text-lg font-bold ${textClass} flex items-center gap-2`}>
        📍 Nearby Listings
      </h2>
      
      {allEquipmentRenters.length > 0 && (
        <div className="space-y-2">
          <p className={`text-sm font-bold ${textMutedClass} uppercase tracking-wider`}>Equipment Available</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {allEquipmentRenters.slice(0, 3).map((renter, idx) => (
              <div key={idx} className={`${cardClass} border rounded-xl p-3 min-w-[200px] flex-shrink-0`}>
                <p className={`font-bold ${textClass} text-sm`}>{renter.ownerName}</p>
                <p className={`text-xs ${textMutedClass}`}>{renter.village}</p>
                <p className="text-xs text-blue-500 font-bold mt-1">{renter.equipment.length} items</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {allLandOwners.length > 0 && (
        <div className="space-y-2">
          <p className={`text-sm font-bold ${textMutedClass} uppercase tracking-wider`}>Land Available</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {allLandOwners.slice(0, 3).map((owner, idx) => (
              <div key={idx} className={`${cardClass} border rounded-xl p-3 min-w-[200px] flex-shrink-0`}>
                <p className={`font-bold ${textClass} text-sm`}>{owner.ownerName}</p>
                <p className={`text-xs ${textMutedClass}`}>{owner.village}</p>
                <p className="text-xs text-amber-500 font-bold mt-1">{owner.lands.reduce((s, l) => s + l.size, 0)} acres</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {allShoppers.length > 0 && (
        <div className="space-y-2">
          <p className={`text-sm font-bold ${textMutedClass} uppercase tracking-wider`}>Shops Nearby</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {allShoppers.slice(0, 3).map((shop, idx) => (
              <div key={idx} className={`${cardClass} border rounded-xl p-3 min-w-[200px] flex-shrink-0`}>
                <p className={`font-bold ${textClass} text-sm`}>{shop.shopName}</p>
                <p className={`text-xs ${textMutedClass}`}>{shop.village}</p>
                <p className="text-xs text-purple-500 font-bold mt-1">{shop.products.length} products</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    );
  };

  // Equipment Renter View
  if (userRole === 'equipment-renter' && equipmentData) {
    const { bookings, updateBookingStatus } = useApp();
    const myRequests = bookings.filter(b => b.status === 'confirmed');

    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Wrench size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Renter Dashboard</h1>
              <p className="text-xs text-blue-100 font-semibold">{equipmentData.ownerName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
          <div className={`${cardClass} rounded-2xl border p-4 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-black ${textClass}`}>Incoming Requests</h2>
              <div className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">
                {myRequests.length} NEW
              </div>
            </div>

            {myRequests.length === 0 ? (
              <div className="text-center py-8 opacity-50">
                <Bell size={32} className="mx-auto mb-2" />
                <p className="text-sm font-bold">No active requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myRequests.map((req) => (
                  <div key={req.id} className={`${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'} rounded-2xl p-4 border border-blue-200/50`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className={`font-black ${textClass}`}>{req.equipmentName}</p>
                        <p className={`text-[10px] font-bold ${textMutedClass} uppercase`}>Scheduled for {req.date}</p>
                      </div>
                      <p className="text-blue-600 font-black text-sm">₹500/hr</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => updateBookingStatus(req.id, 'accepted')}
                        className="flex-1 bg-green-500 text-white text-xs font-black py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform"
                      >
                        Accept Trip
                      </button>
                      <button className={`px-4 ${darkMode ? 'bg-gray-600' : 'bg-white'} border text-xs font-bold rounded-xl`}>Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>📦 My Inventory</h2>
            <div className="space-y-3">
              {equipmentData.equipment.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`font-bold ${textClass}`}>{item.name}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold text-blue-500`}>₹{item.pricePerDay}</p>
                      <p className={`text-xs ${textMutedClass}`}>/day</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <QuickAccessSection />
        </div>
        <BottomNav />
      </div>
    );
  }

  // Land Owner View
  if (userRole === 'land-owner' && landData) {
    const { bookings, updateBookingStatus } = useApp();
    const myRequests = bookings.filter(b => b.status === 'confirmed');

    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Leaf size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Landlord Dashboard</h1>
              <p className="text-xs text-amber-100 font-semibold">{landData.ownerName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
          <div className={`${cardClass} rounded-2xl border p-4 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-black ${textClass}`}>Rental Interests</h2>
              <div className="bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">
                {myRequests.length} NEW
              </div>
            </div>

            {myRequests.length === 0 ? (
              <div className="text-center py-8 opacity-50">
                <Bell size={32} className="mx-auto mb-2" />
                <p className="text-sm font-bold">No active interests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myRequests.map((req) => (
                  <div key={req.id} className={`${darkMode ? 'bg-gray-700/50' : 'bg-amber-50'} rounded-2xl p-4 border border-amber-200/50`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className={`font-black ${textClass}`}>{req.equipmentName}</p>
                        <p className={`text-[10px] font-bold ${textMutedClass} uppercase`}>Inquiry for {req.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => updateBookingStatus(req.id, 'accepted')}
                        className="flex-1 bg-amber-500 text-white text-xs font-black py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform"
                      >
                        Accept Inquiry
                      </button>
                      <button className={`px-4 ${darkMode ? 'bg-gray-600' : 'bg-white'} border text-xs font-bold rounded-xl`}>Call</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>🌾 My Land Listings</h2>
            <div className="space-y-3">
              {landData.lands.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`font-bold ${textClass}`}>{item.size} Acres</p>
                      <p className={`text-sm ${textMutedClass}`}>{item.soilType}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold text-amber-500`}>₹{item.pricePerAcre}</p>
                      <p className={`text-xs ${textMutedClass}`}>/acre</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <QuickAccessSection />
        </div>
        <BottomNav />
      </div>
    );
  }

  // Shopper View
  if (userRole === 'shopper' && shopperData) {
    const { bookings, updateBookingStatus } = useApp();
    const myOrders = bookings.filter(b => b.status === 'confirmed');

    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Shop Manager</h1>
              <p className="text-xs text-purple-100 font-semibold">{shopperData.shopName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
          <div className={`${cardClass} rounded-2xl border p-4 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-black ${textClass}`}>New Orders</h2>
              <div className="bg-purple-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">
                {myOrders.length} NEW
              </div>
            </div>

            {myOrders.length === 0 ? (
              <div className="text-center py-8 opacity-50">
                <Bell size={32} className="mx-auto mb-2" />
                <p className="text-sm font-bold">No pending orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((req) => (
                  <div key={req.id} className={`${darkMode ? 'bg-gray-700/50' : 'bg-purple-50'} rounded-2xl p-4 border border-purple-200/50`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className={`font-black ${textClass}`}>{req.equipmentName}</p>
                        <p className={`text-[10px] font-bold ${textMutedClass} uppercase`}>Pickup: {req.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => updateBookingStatus(req.id, 'accepted')}
                        className="flex-1 bg-purple-500 text-white text-xs font-black py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform"
                      >
                        Accept Order
                      </button>
                      <button className={`px-4 ${darkMode ? 'bg-gray-600' : 'bg-white'} border text-xs font-bold rounded-xl`}>Chat</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>🛍️ My Products</h2>
            <div className="space-y-3">
              {shopperData.products.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className={`font-bold ${textClass}`}>{item.name}</p>
                      <p className={`text-xs ${textMutedClass}`}>{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold text-purple-500`}>₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <QuickAccessSection />
        </div>
        <BottomNav />
      </div>
    );
  }

  // Default Regular User View (I Want to Hire - clean view)
  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden ${bgClass} flex flex-col transition-colors`}>
      <div className="flex-1 relative pb-16 overflow-y-auto no-scrollbar">
        <MapBackground />
        <LocationCard />
      </div>

      <VehicleSheet />
      <BottomNav />
    </div>
  );
}
