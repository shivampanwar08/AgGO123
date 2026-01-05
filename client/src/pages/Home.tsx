import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/appContext";
import { t } from "@/lib/translations";
import { Wrench, Leaf, ShoppingCart, MapPin, Star, Check, Tractor } from "lucide-react";

export default function Home() {
  const { darkMode, userRole, equipmentData, landData, shopperData, language, allEquipmentRenters, allLandOwners, allShoppers } = useApp();

  // Helper to translate equipment/land/product descriptions
  const getTranslatedDesc = (key: string, fallback: string) => {
    const translated = t(key, language);
    return translated !== key ? translated : fallback;
  };
  
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  // Equipment Renter View
  if (userRole === 'equipment-renter' && equipmentData) {
    return (
      <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Wrench size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Equipment</h1>
              <p className="text-xs text-blue-100 font-semibold">{equipmentData.ownerName}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className={`${cardClass} rounded-2xl border p-5 shadow-lg`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Location</p>
                <p className={`text-base font-bold ${textClass} mt-1`}>{equipmentData.village}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Phone</p>
                <p className={`text-base font-bold ${textClass} mt-1 font-mono`}>{equipmentData.phone.slice(-6)}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Listings</p>
                <p className={`text-base font-bold text-blue-500 mt-1`}>{equipmentData.equipment.length}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3 flex items-center gap-2`}>
              📦 Equipment Inventory
            </h2>
            <div className="space-y-3">
              {equipmentData.equipment.map((item) => {
                const descKey = item.name.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
                const desc = getTranslatedDesc(`${descKey}_`, item.name);
                return (
                  <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${textClass}`}>{item.name}</p>
                        <p className={`text-sm ${textMutedClass} mt-1`}>{desc}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold text-blue-500`}>₹{item.pricePerDay}</p>
                        <p className={`text-xs ${textMutedClass}`}>/day</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Land Owner View
  if (userRole === 'land-owner' && landData) {
    return (
      <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Leaf size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Lands</h1>
              <p className="text-xs text-amber-100 font-semibold">{landData.ownerName}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className={`${cardClass} rounded-2xl border p-5 shadow-lg`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Location</p>
                <p className={`text-base font-bold ${textClass} mt-1`}>{landData.village}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Total Acres</p>
                <p className={`text-base font-bold text-amber-500 mt-1`}>{landData.lands.reduce((sum, l) => sum + l.size, 0)}</p>
              </div>
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Listings</p>
                <p className={`text-base font-bold text-amber-500 mt-1`}>{landData.lands.length}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3 flex items-center gap-2`}>
              🌾 Land Listings
            </h2>
            <div className="space-y-3">
              {landData.lands.map((item) => {
                const soilKey = item.soilType.toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, -1);
                const waterKey = item.waterAccess.toLowerCase().replace(/[^a-z0-9_]/g, '_').slice(0, -1);
                const translatedSoil = getTranslatedDesc(soilKey, item.soilType);
                const translatedWater = getTranslatedDesc(waterKey, item.waterAccess);
                return (
                  <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className={`font-bold text-lg ${textClass}`}>{item.size} {t('acres', language) || 'Acres'}</p>
                        <p className={`text-sm ${textMutedClass} mt-1`}>{translatedSoil}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold text-amber-500`}>₹{item.pricePerAcre}</p>
                        <p className={`text-xs ${textMutedClass}`}>/acre</p>
                      </div>
                    </div>
                    <p className={`text-xs font-semibold ${textMutedClass} flex items-center gap-1`}>💧 {translatedWater}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Shopper View
  if (userRole === 'shopper' && shopperData) {
    return (
      <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{shopperData.shopName}</h1>
              <p className="text-xs text-purple-100 font-semibold">{shopperData.shopOwner}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className={`${cardClass} rounded-2xl border p-5 shadow-lg`}>
            <div className="space-y-3">
              <div>
                <p className={`text-xs font-bold ${textMutedClass} uppercase tracking-wider`}>Shop Address</p>
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
            <h2 className={`text-lg font-bold ${textClass} mb-3 flex items-center gap-2`}>
              🛍️ Product Inventory
            </h2>
            <div className="space-y-3">
              {shopperData.products.map((item) => {
                const prodKey = item.name.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
                const prodDesc = getTranslatedDesc(`${prodKey}_`, item.name);
                return (
                  <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className={`font-bold text-lg ${textClass}`}>{prodDesc}</p>
                        <p className={`text-xs font-semibold ${textMutedClass} mt-1`}>{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold text-purple-500`}>₹{item.price}</p>
                      </div>
                    </div>
                    <p className={`text-xs ${textMutedClass} flex items-center gap-1`}>📦 Stock: <span className="font-bold">{item.quantity} units</span></p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Default Regular User View
  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden ${bgClass} flex flex-col transition-colors`}>
      {/* Main Visual Area */}
      <div className="flex-1 relative pb-16 overflow-y-auto no-scrollbar">
        <MapBackground />
        <LocationCard />

        {/* Dynamic Listings Section */}
        <div className="relative z-10 p-5 space-y-6 mt-4 pb-20">
          {/* Active Drivers/Equipment */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-lg font-bold ${textClass}`}>🚜 Nearby Equipment</h2>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {allEquipmentRenters.map((renter, idx) => (
                <div key={idx} className={`${cardClass} border rounded-2xl p-3 min-w-[280px] shadow-sm flex flex-col gap-3`}>
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {renter.equipment.find(e => e.image)?.image ? (
                        <img src={renter.equipment.find(e => e.image)?.image} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <Tractor className="text-blue-500" size={24} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold ${textClass} truncate`}>{renter.ownerName}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-blue-500" />
                        <span className={`text-[10px] font-bold ${textMutedClass} truncate uppercase tracking-tighter`}>{renter.village}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                          <Star size={10} className="text-yellow-400 fill-yellow-400" />
                          <span className={`text-[10px] font-bold ${textClass}`}>4.8</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <div className="flex items-center gap-0.5 text-green-500">
                          <Check size={10} />
                          <span className="text-[9px] font-bold uppercase">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100/10">
                    {renter.equipment.slice(0, 3).map((eq, i) => (
                      <span key={i} className={`text-[9px] font-bold ${darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-50 text-gray-500'} px-2 py-0.5 rounded-md`}>
                        {eq.name}
                      </span>
                    ))}
                    {renter.equipment.length > 3 && <span className="text-[9px] font-bold text-blue-500">+{renter.equipment.length - 3} more</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Agri Shops */}
          {allShoppers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-lg font-bold ${textClass}`}>🛒 Local Agri Shops</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {allShoppers.map((shop, idx) => (
                  <div key={idx} className={`${cardClass} border rounded-2xl p-4 min-w-[240px] shadow-sm`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <ShoppingCart className="text-purple-500" size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`font-bold ${textClass} truncate`}>{shop.shopName}</h3>
                        <p className={`text-[10px] font-bold ${textMutedClass} uppercase tracking-wider`}>{shop.village}</p>
                      </div>
                    </div>
                    <div className="text-[11px] font-medium text-purple-500">
                      {shop.products.length} Products Available
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Lands */}
          {allLandOwners.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-lg font-bold ${textClass}`}>🌾 Available Lands</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {allLandOwners.slice(0, 4).map((owner, idx) => (
                  <div key={idx} className={`${cardClass} border rounded-2xl p-3 shadow-sm`}>
                    <div className="flex flex-col gap-2">
                      <div className="w-full aspect-[4/3] rounded-xl bg-amber-500/10 flex items-center justify-center overflow-hidden">
                        {owner.lands.find(l => l.image)?.image ? (
                          <img src={owner.lands.find(l => l.image)?.image} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <Leaf className="text-amber-500" size={24} />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-bold ${textClass} text-sm`}>{owner.lands[0].size} Acres</h3>
                        <p className={`text-[10px] font-bold ${textMutedClass} uppercase truncate`}>{owner.village}</p>
                        <p className="text-xs font-black text-amber-500 mt-1">₹{owner.lands[0].pricePerAcre}/acre</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet for Vehicles */}
      <VehicleSheet />
      
      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
