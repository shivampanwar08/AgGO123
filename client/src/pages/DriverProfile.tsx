import { ArrowLeft, Star, MapPin, Tractor, Plus, Check, ShieldCheck } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';

// Mock data for a specific driver
const driverData = {
  id: 'd1',
  name: 'Ram Lal',
  village: 'Rampur Village',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  rating: 4.9,
  trips: 124,
  joined: '2021',
  equipment: [
    { id: 'e1', name: 'Mahindra 575 DI Tractor', type: 'Tractor', price: 800, image: 'https://images.unsplash.com/photo-1592600584051-38a3c93d8065?w=100&h=100&fit=crop' },
    { id: 'e2', name: 'Hydraulic Trolley', type: 'Trolley', price: 300, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' }, 
    { id: 'e3', name: '7ft Rotavator', type: 'Rotavator', price: 500, image: 'https://images.unsplash.com/photo-1530267981375-273474d11e61?w=100&h=100&fit=crop' }, 
    { id: 'e4', name: 'Seed Drill', type: 'Seeder', price: 400, image: 'https://images.unsplash.com/photo-1595842878568-388444927064?w=100&h=100&fit=crop' }, 
  ]
};

export default function DriverProfile() {
  const [, setLocation] = useLocation();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  useEffect(() => {
    // Read items from URL query params
    const searchParams = new URLSearchParams(window.location.search);
    const itemsParam = searchParams.get('items');
    
    if (itemsParam) {
      const selectedTypes = itemsParam.split(',');
      // Find matching equipment IDs based on types selected on home screen
      const initialIds = driverData.equipment
        .filter(e => selectedTypes.includes(e.type))
        .map(e => e.id);
      
      setAddedItems(initialIds);
    }
  }, []);

  const toggleItem = (id: string) => {
    setAddedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header Image Area */}
      <div className="relative h-64 bg-green-600 overflow-hidden">
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
          <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex justify-between items-center">
             <div className="flex flex-col items-center px-4 border-r border-gray-200/50">
               <span className="text-2xl font-bold text-gray-900">{driverData.rating}</span>
               <div className="flex text-yellow-400 text-xs">★★★★★</div>
               <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Rating</span>
             </div>
             <div className="flex flex-col items-center px-4 border-r border-gray-200/50">
               <span className="text-2xl font-bold text-gray-900">{driverData.trips}</span>
               <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Trips</span>
             </div>
             <div className="flex flex-col items-center px-4">
               <span className="text-2xl font-bold text-gray-900">3Y</span>
               <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Exp</span>
             </div>
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="p-4 mt-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Inventory</h2>
        <div className="space-y-4">
          {driverData.equipment.map(item => (
            <div key={item.id} className={`glass rounded-3xl p-1 transition-all duration-300 ${addedItems.includes(item.id) ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20' : ''}`}>
              <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-3 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">{item.type}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                       <span className="font-bold text-xl text-gray-900">₹{item.price}</span>
                       <span className="text-xs text-gray-400 font-medium">/hr</span>
                    </div>
                    
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        addedItems.includes(item.id)
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-gray-200'
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

      {/* Checkout Floating Bar */}
      {addedItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
           <div className="glass-dark rounded-3xl p-1 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
             <div className="bg-black/80 backdrop-blur-xl rounded-[1.25rem] p-4 flex items-center justify-between">
                <div className="flex flex-col pl-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{addedItems.length} items</span>
                  <span className="font-bold text-xl text-white">₹{addedItems.reduce((acc, id) => acc + (driverData.equipment.find(e => e.id === id)?.price || 0), 0)}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                </div>
                <button 
                  onClick={() => setLocation('/billing')}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold text-base py-3 px-8 rounded-xl shadow-lg shadow-green-500/40 transition-all active:scale-95 neon-glow"
                >
                  Book Now
                </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
