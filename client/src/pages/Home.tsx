import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/appContext";
import { t } from "@/lib/translations";
import { Wrench, Leaf, ShoppingCart, MapPin, Star, Check, Tractor, Users, Store, ChevronRight } from "lucide-react";
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

  const NearbyListingsSection = () => (
    <div className="space-y-4 mt-6">
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

  // Equipment Renter View - Now includes quick access to other sections
  if (userRole === 'equipment-renter' && equipmentData) {
    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Wrench size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">My Equipment</h1>
              <p className="text-xs text-blue-100 font-semibold">{equipmentData.ownerName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-24">
          <div className={`${cardClass} rounded-2xl border p-4 shadow-lg`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Location</p>
                <p className={`text-sm font-bold ${textClass} mt-1`}>{equipmentData.village}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Phone</p>
                <p className={`text-sm font-bold ${textClass} mt-1 font-mono`}>{equipmentData.phone.slice(-6)}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Listings</p>
                <p className={`text-sm font-bold text-blue-500 mt-1`}>{equipmentData.equipment.length}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>📦 My Equipment</h2>
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
          <NearbyListingsSection />
        </div>
        <BottomNav />
      </div>
    );
  }

  // Land Owner View - Now includes quick access to other sections
  if (userRole === 'land-owner' && landData) {
    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Leaf size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">My Lands</h1>
              <p className="text-xs text-amber-100 font-semibold">{landData.ownerName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-24">
          <div className={`${cardClass} rounded-2xl border p-4 shadow-lg`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Location</p>
                <p className={`text-sm font-bold ${textClass} mt-1`}>{landData.village}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Total</p>
                <p className={`text-sm font-bold text-amber-500 mt-1`}>{landData.lands.reduce((sum, l) => sum + l.size, 0)} acres</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Listings</p>
                <p className={`text-sm font-bold text-amber-500 mt-1`}>{landData.lands.length}</p>
              </div>
            </div>
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
                  <p className={`text-xs ${textMutedClass}`}>💧 {item.waterAccess}</p>
                </div>
              ))}
            </div>
          </div>

          <QuickAccessSection />
          <NearbyListingsSection />
        </div>
        <BottomNav />
      </div>
    );
  }

  // Shopper View - Now includes quick access to other sections
  if (userRole === 'shopper' && shopperData) {
    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{shopperData.shopName}</h1>
              <p className="text-xs text-purple-100 font-semibold">{shopperData.shopOwner}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-24">
          <div className={`${cardClass} rounded-2xl border p-4 shadow-lg`}>
            <div className="space-y-2">
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Address</p>
                <p className={`text-sm font-bold ${textClass} mt-1`}>{shopperData.shopAddress}, {shopperData.village}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Phone</p>
                  <p className={`text-sm font-bold ${textClass} mt-1 font-mono`}>{shopperData.phone.slice(-6)}</p>
                </div>
                <div>
                  <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Products</p>
                  <p className={`text-sm font-bold text-purple-500 mt-1`}>{shopperData.products.length}</p>
                </div>
              </div>
            </div>
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
                  <p className={`text-xs ${textMutedClass}`}>📦 Stock: {item.quantity} units</p>
                </div>
              ))}
            </div>
          </div>

          <QuickAccessSection />
          <NearbyListingsSection />
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
