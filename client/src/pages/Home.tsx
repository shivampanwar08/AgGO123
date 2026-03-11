import { useState } from "react";
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
    const { bookings, updateBookingStatus, getPricingSuggestion } = useApp();
    const [expandedPricing, setExpandedPricing] = useState<string | null>(null);
    const myRequests = bookings.filter(b => b.status === 'confirmed');
    const acceptedCount = bookings.filter(b => b.status === 'accepted').length;
    const completedCount = bookings.filter(b => b.status === 'completed').length;

    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-6 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Wrench size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black">Equipment Rental</h1>
              <p className="text-sm text-blue-100 font-bold">{equipmentData.ownerName}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-100 uppercase">Active</p>
              <p className="text-2xl font-black mt-1">{acceptedCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-100 uppercase">Pending</p>
              <p className="text-2xl font-black mt-1">{myRequests.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-100 uppercase">Completed</p>
              <p className="text-2xl font-black mt-1">{completedCount}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
          {myRequests.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className={`text-lg font-black ${textClass}`}>📋 New Requests</h2>
                <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">{myRequests.length}</span>
              </div>
              {myRequests.map((req) => (
                <div key={req.id} className={`${cardClass} rounded-2xl border-2 border-blue-200/50 p-5 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex gap-4 mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                      <Tractor className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-black ${textClass} text-lg`}>{req.equipmentName}</p>
                      <p className={`text-xs ${textMutedClass} font-bold`}>📅 {req.date} • ⏰ {req.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-600">₹500</p>
                      <p className="text-[10px] font-bold text-blue-500">/rental</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateBookingStatus(req.id, 'accepted')}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black py-3 rounded-xl shadow-lg active:scale-95 transition-all hover:shadow-xl"
                    >
                      ✓ Accept Request
                    </button>
                    <button className="px-4 bg-red-500/10 text-red-600 text-xs font-black rounded-xl hover:bg-red-500/20 transition-colors">
                      ✕ Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h2 className={`text-lg font-black ${textClass} px-1`}>🔧 My Equipment</h2>
            <div className="grid gap-4">
              {equipmentData.equipment.map((item) => {
                const pricing = getPricingSuggestion('equipment', item.name, item.pricePerDay);
                const isExpanded = expandedPricing === `eq-${item.id}`;
                return (
                  <div key={item.id} className={`${cardClass} rounded-2xl border p-5 shadow-md hover:shadow-lg transition-all`}>
                    <div className="flex gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                        <Tractor className="text-blue-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-black ${textClass} text-base`}>{item.name}</p>
                        <p className={`text-xs ${textMutedClass} mt-1`}>Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <p className="text-xl font-black text-blue-600">₹{item.pricePerDay}</p>
                        <p className={`text-[10px] font-bold ${textMutedClass}`}>per day</p>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700/50 space-y-2">
                        <div className={`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3`}>
                          <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">💡 Pricing Suggestion</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className={textMutedClass}>Market Average:</span>
                              <span className="font-bold text-gray-900 dark:text-white">₹{pricing.marketAvg}/day</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={textMutedClass}>Suggested Price:</span>
                              <span className="font-bold text-blue-600">₹{pricing.suggested}/day</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-blue-200 dark:border-blue-700/50">
                              <span className={textMutedClass}>Adjustment:</span>
                              <span className={`font-black ${pricing.percentChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {pricing.percentChange > 0 ? '+' : ''}{pricing.percentChange}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                      <button 
                        onClick={() => setExpandedPricing(isExpanded ? null : `eq-${item.id}`)}
                        className="flex-1 text-xs font-black text-blue-600 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        {isExpanded ? '← Price Insights' : 'Price Insights →'}
                      </button>
                      <button className="text-xs font-black text-blue-600 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors px-3">
                        Edit →
                      </button>
                    </div>
                  </div>
                );
              })}
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
    const { bookings, updateBookingStatus, getPricingSuggestion } = useApp();
    const [expandedPricing, setExpandedPricing] = useState<string | null>(null);
    const myRequests = bookings.filter(b => b.status === 'confirmed');
    const acceptedCount = bookings.filter(b => b.status === 'accepted').length;
    const totalAcres = landData.lands.reduce((sum, l) => sum + l.size, 0);

    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-white p-6 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Leaf size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black">Land Rentals</h1>
              <p className="text-sm text-amber-100 font-bold">{landData.ownerName}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-amber-100 uppercase">Total</p>
              <p className="text-2xl font-black mt-1">{totalAcres}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-amber-100 uppercase">Pending</p>
              <p className="text-2xl font-black mt-1">{myRequests.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-amber-100 uppercase">Active</p>
              <p className="text-2xl font-black mt-1">{acceptedCount}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
          {myRequests.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className={`text-lg font-black ${textClass}`}>🔔 Rental Inquiries</h2>
                <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">{myRequests.length}</span>
              </div>
              {myRequests.map((req) => (
                <div key={req.id} className={`${cardClass} rounded-2xl border-2 border-amber-200/50 p-5 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex gap-4 mb-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex-shrink-0">
                      <MapPin className="text-amber-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-black ${textClass} text-lg`}>Land Inquiry</p>
                      <p className={`text-xs ${textMutedClass} font-bold`}>📅 {req.date} • Duration: 3 months</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-amber-600">₹5k</p>
                      <p className="text-[10px] font-bold text-amber-500">/month</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateBookingStatus(req.id, 'accepted')}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black py-3 rounded-xl shadow-lg active:scale-95 transition-all hover:shadow-xl"
                    >
                      ✓ Accept Inquiry
                    </button>
                    <button className="px-4 bg-red-500/10 text-red-600 text-xs font-black rounded-xl hover:bg-red-500/20 transition-colors">
                      📞 Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h2 className={`text-lg font-black ${textClass} px-1`}>🌾 My Land Properties</h2>
            <div className="grid gap-4">
              {landData.lands.map((item) => {
                const pricing = getPricingSuggestion('land', item.soilType, item.pricePerAcre);
                const isExpanded = expandedPricing === `land-${item.id}`;
                return (
                  <div key={item.id} className={`${cardClass} rounded-2xl border p-5 shadow-md hover:shadow-lg transition-all overflow-hidden`}>
                    {(item as any).image && (
                      <div className="mb-4 -m-5 mb-4">
                        <img src={(item as any).image} alt="Land" className="w-full h-32 object-cover" />
                      </div>
                    )}
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <p className={`font-black ${textClass} text-base`}>{item.size} Acres</p>
                        <p className={`text-xs ${textMutedClass} mt-1`}>🌱 Soil: {item.soilType}</p>
                        <p className={`text-xs ${textMutedClass}`}>💧 Water: {item.waterAccess}</p>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <p className="text-2xl font-black text-amber-600">₹{item.pricePerAcre}</p>
                        <p className={`text-[10px] font-bold ${textMutedClass}`}>per acre</p>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-700/50 space-y-2">
                        <div className={`bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3`}>
                          <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase mb-2">💡 Pricing Suggestion</p>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className={textMutedClass}>Market Average:</span>
                              <span className="font-bold text-gray-900 dark:text-white">₹{pricing.marketAvg}/acre</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={textMutedClass}>Suggested Price:</span>
                              <span className="font-bold text-amber-600">₹{pricing.suggested}/acre</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-amber-200 dark:border-amber-700/50">
                              <span className={textMutedClass}>Adjustment:</span>
                              <span className={`font-black ${pricing.percentChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {pricing.percentChange > 0 ? '+' : ''}{pricing.percentChange}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                      <button 
                        onClick={() => setExpandedPricing(isExpanded ? null : `land-${item.id}`)}
                        className="flex-1 text-xs font-black text-amber-600 py-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                      >
                        {isExpanded ? '← Price Insights' : 'Price Insights →'}
                      </button>
                      <button className="text-xs font-black text-amber-600 py-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors px-3">
                        Edit →
                      </button>
                    </div>
                  </div>
                );
              })}
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
    const { bookings, updateBookingStatus, cartItems } = useApp();
    const myOrders = bookings.filter(b => b.status === 'confirmed' || b.type === 'cart');
    const acceptedCount = bookings.filter(b => b.status === 'accepted').length;
    const totalProducts = (shopperData.products.length + cartItems.length);

    return (
      <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex-shrink-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white p-6 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <ShoppingCart size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black">{shopperData.shopName}</h1>
              <p className="text-sm text-purple-100 font-bold">{shopperData.shopOwner}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-purple-100 uppercase">Products</p>
              <p className="text-2xl font-black mt-1">{totalProducts}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-purple-100 uppercase">Pending</p>
              <p className="text-2xl font-black mt-1">{myOrders.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
              <p className="text-[10px] font-bold text-purple-100 uppercase">Accepted</p>
              <p className="text-2xl font-black mt-1">{acceptedCount}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-24">
          {myOrders.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className={`text-lg font-black ${textClass}`}>📦 New Orders</h2>
                <span className="bg-purple-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">{myOrders.length}</span>
              </div>
              {myOrders.map((req) => (
                <div key={req.id} className={`${cardClass} rounded-2xl border-2 border-purple-200/50 p-5 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex gap-4 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex-shrink-0">
                      <ShoppingCart className="text-purple-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-black ${textClass} text-lg`}>Customer Order</p>
                      <p className={`text-xs ${textMutedClass} font-bold`}>📅 Pickup: {req.date} • {req.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-purple-600">₹1.2k</p>
                      <p className="text-[10px] font-bold text-purple-500">total</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateBookingStatus(req.id, 'accepted')}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black py-3 rounded-xl shadow-lg active:scale-95 transition-all hover:shadow-xl"
                    >
                      ✓ Accept Order
                    </button>
                    <button className="px-4 bg-blue-500/10 text-blue-600 text-xs font-black rounded-xl hover:bg-blue-500/20 transition-colors">
                      💬 Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h2 className={`text-lg font-black ${textClass} px-1`}>🛒 Product Inventory</h2>
            <div className="grid gap-4">
              {cartItems.length > 0 && (
                <div className="border-2 border-green-400 bg-green-50/50 dark:bg-green-900/10 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-green-700 dark:text-green-400 mb-2">🆕 Recently Added ({cartItems.length})</h3>
                  <div className="space-y-2">
                    {cartItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                        <span className="text-green-600 dark:text-green-400 font-black">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {shopperData.products.map((item) => (
                <div key={item.id} className={`${cardClass} rounded-2xl border p-5 shadow-md hover:shadow-lg transition-all overflow-hidden`}>
                  {(item as any).image && (
                    <div className="mb-4 -m-5 mb-4">
                      <img src={(item as any).image} alt={item.name} className="w-full h-32 object-cover" />
                    </div>
                  )}
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <p className={`font-black ${textClass} text-base`}>{item.name}</p>
                      <p className={`text-xs ${textMutedClass} mt-1`}>Category: {item.category}</p>
                      <p className={`text-xs font-bold mt-2 ${item.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.quantity > 0 ? `📦 ${item.quantity} in stock` : '❌ Out of stock'}
                      </p>
                    </div>
                    <div className="text-right flex flex-col justify-center">
                      <p className="text-2xl font-black text-purple-600">₹{item.price}</p>
                      <p className={`text-[10px] font-bold ${textMutedClass}`}>per unit</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full text-xs font-black text-purple-600 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                      Manage Stock →
                    </button>
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
