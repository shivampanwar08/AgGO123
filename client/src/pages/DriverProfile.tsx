import { ArrowLeft, Star, MapPin, Tractor, Plus, Check, ShieldCheck, Calendar, Clock } from 'lucide-react';
import { useLocation, useRoute } from 'wouter';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/appContext';

export default function DriverProfile() {
  const { darkMode, allEquipmentRenters, addBooking } = useApp();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/driver/:id");
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  
  // Find driver based on ID from URL
  const driver = allEquipmentRenters.find(d => d.id === params?.id);

  // If driver not found, fallback or redirect (handled gracefully by optional chaining in UI for now)
  const driverData = driver ? {
    id: driver.id,
    name: driver.ownerName,
    village: driver.village,
    image: driver.equipment[0]?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4.8, // Mock rating as it's not in context yet
    trips: 124, // Mock trips
    joined: '2023',
    equipment: driver.equipment.map(e => ({
      id: `e-${driver.id}-${e.id}`,
      name: e.name,
      type: e.name, // Using name as type for now or map properly if type exists
      price: e.pricePerDay / 8, // Converting day price to approx hourly for display or just use day price
      image: e.image || 'https://images.unsplash.com/photo-1592600584051-38a3c93d8065?w=100&h=100&fit=crop',
      rawPrice: e.pricePerDay
    }))
  } : null;

  useEffect(() => {
    // Read items from URL query params
    const searchParams = new URLSearchParams(window.location.search);
    const itemsParam = searchParams.get('items');
    
    if (itemsParam && driverData) {
      const selectedTypes = itemsParam.split(',');
      // Find matching equipment IDs based on types selected on home screen
      const initialIds = driverData.equipment
        .filter(e => selectedTypes.some(t => e.name.toLowerCase().includes(t.toLowerCase())))
        .map(e => e.id);
      
      setAddedItems(initialIds);
    }
  }, [driverData]);

  if (!driverData) {
    return <div className="p-10 text-center">Driver not found</div>;
  }

  const toggleItem = (id: string) => {
    setAddedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleConfirmBooking = () => {
    if (addedItems.length === 0) return;
    
    const selectedDate = bookingDate || new Date().toISOString().split('T')[0];
    const selectedTime = bookingTime || '10:00';

    addedItems.forEach(itemId => {
      const item = driverData.equipment.find(e => e.id === itemId);
      if (item) {
        addBooking({
          id: `b-${Date.now()}-${item.id}`,
          equipmentName: item.name,
          providerName: driverData.name,
          date: selectedDate,
          time: selectedTime,
          status: 'confirmed'
        });
      }
    });

    alert('Booking Confirmed!');
    setShowBookingModal(false);
    setLocation('/bookings');
  };

  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full flex flex-col relative overflow-hidden transition-colors`}>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Header Image Area */}
      <div className={`relative h-64 ${darkMode ? 'bg-green-700' : 'bg-green-600'} overflow-hidden transition-colors`}>
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => setLocation('/drivers')}
            className="w-12 h-12 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors border border-white/10"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80')] bg-cover bg-center opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-16 bg-gradient-to-t from-black/90 to-transparent">
           <h1 className="text-3xl font-bold text-white tracking-tight">{driverData.name}</h1>
           <div className="flex items-center gap-2 text-white/80 mt-1">
              <MapPin size={16} />
              <span className="text-sm font-medium tracking-wide uppercase">{driverData.village}</span>
            </div>
        </div>
      </div>

      {/* Profile Stats Card */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="glass rounded-3xl p-1">
          <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md rounded-[1.25rem] p-4 flex justify-between items-center transition-colors`}>
             <div className={`flex flex-col items-center px-4 border-r ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
               <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{driverData.rating}</span>
               <div className="flex text-yellow-400 text-xs">★★★★★</div>
               <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} uppercase font-bold mt-1`}>Rating</span>
             </div>
             <div className={`flex flex-col items-center px-4 border-r ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
               <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{driverData.trips}</span>
               <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} uppercase font-bold mt-1`}>Trips</span>
             </div>
             <div className="flex flex-col items-center px-4">
               <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>3Y</span>
               <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} uppercase font-bold mt-1`}>Exp</span>
             </div>
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="p-4 mt-4">
        <h2 className={`text-sm font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mb-4 ml-1`}>Inventory</h2>
        <div className="space-y-4">
          {driverData.equipment.map(item => (
            <div key={item.id} className={`glass rounded-3xl p-1 transition-all duration-300 ${addedItems.includes(item.id) ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20' : ''}`}>
              <div className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-[1.25rem] p-3 flex gap-4 transition-colors`}>
                <div className={`w-24 h-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-2xl overflow-hidden flex-shrink-0 shadow-sm`}>
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-base leading-tight`}>{item.name}</h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold uppercase tracking-wide mt-1`}>{item.type}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                       <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.price}</span>
                       <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'} font-medium`}>/hr</span>
                       <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>₹{item.rawPrice}/day</p>
                    </div>
                    
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        addedItems.includes(item.id)
                          ? `${darkMode ? 'bg-gray-700 text-green-400 border-gray-600' : 'bg-black text-white border-gray-700'} border`
                          : `${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-black border-gray-200'} border`
                      }`}
                    >
                      {addedItems.includes(item.id) ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>

      {/* Checkout Floating Bar */}
      {addedItems.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-50">
           <div className="glass-dark rounded-3xl p-1 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
             <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-black/80'} backdrop-blur-xl rounded-[1.25rem] p-4 flex flex-col gap-3 transition-colors`}>
                <div className="flex items-center justify-between pl-2">
                  <div className="flex flex-col">
                    <span className={`text-xs text-gray-400 font-medium uppercase tracking-wide`}>{addedItems.length} items</span>
                    <span className={`font-bold text-xl text-white`}>₹{addedItems.reduce((acc, id) => acc + (driverData.equipment.find(e => e.id === id)?.price || 0), 0)}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowBookingModal(true)}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95"
                    >
                      Book Later
                    </button>
                    <button 
                      onClick={handleConfirmBooking}
                      className="bg-green-500 hover:bg-green-400 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-green-500/40 transition-all active:scale-95 neon-glow"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
             </div>
           </div>
        </div>
      )}

      {showBookingModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowBookingModal(false)} />
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} w-full rounded-t-[2.5rem] p-8 relative z-10 animate-in slide-in-from-bottom duration-300`}>
            <h2 className={`text-2xl font-black ${textClass} mb-6`}>Schedule Booking</h2>
            
            <div className="space-y-6">
              <div>
                <label className={`text-[10px] font-black uppercase tracking-widest ${textMutedClass} mb-2 block`}>Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-2xl pl-12 pr-4 py-4 font-bold text-sm ${textClass}`} 
                  />
                </div>
              </div>

              <div>
                <label className={`text-[10px] font-black uppercase tracking-widest ${textMutedClass} mb-2 block`}>Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="time" 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-2xl pl-12 pr-4 py-4 font-bold text-sm ${textClass}`} 
                  />
                </div>
              </div>

              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-green-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-500/20 active:scale-95 transition-transform mt-4"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
