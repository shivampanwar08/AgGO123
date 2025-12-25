import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/appContext";
import { Wrench, Leaf, ShoppingCart } from "lucide-react";

export default function Home() {
  const { darkMode, userRole, equipmentData, landData, shopperData, language } = useApp();
  
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
              {equipmentData.equipment.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`font-bold text-lg ${textClass}`}>{item.name}</p>
                      <p className={`text-sm ${textMutedClass} mt-1`}>Available Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold text-blue-500`}>₹{item.pricePerDay}</p>
                      <p className={`text-xs ${textMutedClass}`}>/day</p>
                    </div>
                  </div>
                </div>
              ))}
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
              {landData.lands.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className={`font-bold text-lg ${textClass}`}>{item.size} Acres</p>
                      <p className={`text-sm ${textMutedClass} mt-1`}>{item.soilType}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold text-amber-500`}>₹{item.pricePerAcre}</p>
                      <p className={`text-xs ${textMutedClass}`}>/acre</p>
                    </div>
                  </div>
                  <p className={`text-xs font-semibold ${textMutedClass} flex items-center gap-1`}>💧 {item.waterAccess}</p>
                </div>
              ))}
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
              {shopperData.products.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className={`font-bold text-lg ${textClass}`}>{item.name}</p>
                      <p className={`text-xs font-semibold ${textMutedClass} mt-1`}>{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold text-purple-500`}>₹{item.price}</p>
                    </div>
                  </div>
                  <p className={`text-xs ${textMutedClass} flex items-center gap-1`}>📦 Stock: <span className="font-bold">{item.quantity} units</span></p>
                </div>
              ))}
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
      <div className="flex-1 relative pb-16">
        <MapBackground />
        <LocationCard />
      </div>

      {/* Bottom Sheet for Vehicles */}
      <VehicleSheet />
      
      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
