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
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wrench size={24} /> My Equipment
          </h1>
          <p className="text-sm opacity-90">{equipmentData.ownerName}</p>
        </div>

        <div className="p-4 space-y-3">
          <div className={`${cardClass} rounded-xl border p-4`}>
            <p className={`text-xs font-bold ${textMutedClass} uppercase`}>📍 Location</p>
            <p className={`text-lg font-bold ${textClass}`}>{equipmentData.village}</p>
            <p className={`text-sm ${textMutedClass}`}>📱 {equipmentData.phone}</p>
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>Equipment Listed ({equipmentData.equipment.length})</h2>
            <div className="space-y-2">
              {equipmentData.equipment.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-lg p-3`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-bold ${textClass}`}>{item.name}</p>
                      <p className={`text-xs ${textMutedClass}`}>Qty: {item.quantity}</p>
                    </div>
                    <p className={`text-lg font-bold text-blue-500`}>₹{item.pricePerDay}/day</p>
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
        <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Leaf size={24} /> My Lands
          </h1>
          <p className="text-sm opacity-90">{landData.ownerName}</p>
        </div>

        <div className="p-4 space-y-3">
          <div className={`${cardClass} rounded-xl border p-4`}>
            <p className={`text-xs font-bold ${textMutedClass} uppercase`}>📍 Location</p>
            <p className={`text-lg font-bold ${textClass}`}>{landData.village}</p>
            <p className={`text-sm ${textMutedClass}`}>📱 {landData.phone}</p>
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>Lands Listed ({landData.lands.length})</h2>
            <div className="space-y-2">
              {landData.lands.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-lg p-3`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-bold ${textClass}`}>{item.size} Acres</p>
                      <p className={`text-xs ${textMutedClass}`}>{item.soilType}</p>
                      <p className={`text-xs ${textMutedClass}`}>{item.waterAccess}</p>
                    </div>
                    <p className={`text-lg font-bold text-amber-500`}>₹{item.pricePerAcre}/acre</p>
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

  // Shopper View
  if (userRole === 'shopper' && shopperData) {
    return (
      <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart size={24} /> {shopperData.shopName}
          </h1>
          <p className="text-sm opacity-90">{shopperData.shopOwner}</p>
        </div>

        <div className="p-4 space-y-3">
          <div className={`${cardClass} rounded-xl border p-4`}>
            <p className={`text-xs font-bold ${textMutedClass} uppercase`}>📍 Location</p>
            <p className={`text-lg font-bold ${textClass}`}>{shopperData.village}</p>
            <p className={`text-sm ${textMutedClass}`}>{shopperData.shopAddress}</p>
            <p className={`text-sm ${textMutedClass}`}>📱 {shopperData.phone}</p>
          </div>

          <div>
            <h2 className={`text-lg font-bold ${textClass} mb-3`}>Products ({shopperData.products.length})</h2>
            <div className="space-y-2">
              {shopperData.products.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-lg p-3`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-bold ${textClass}`}>{item.name}</p>
                      <p className={`text-xs ${textMutedClass}`}>{item.category} • Stock: {item.quantity}</p>
                    </div>
                    <p className={`text-lg font-bold text-purple-500`}>₹{item.price}</p>
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
