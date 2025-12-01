import { ArrowLeft, Star, MapPin, Tractor, Plus, Check, ShieldCheck } from 'lucide-react';
import { useLocation, useRoute } from 'wouter';
import { useState } from 'react';

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
    { id: 'e2', name: 'Hydraulic Trolley', type: 'Trolley', price: 300, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' }, // Placeholder image
    { id: 'e3', name: '7ft Rotavator', type: 'Rotavator', price: 500, image: 'https://images.unsplash.com/photo-1530267981375-273474d11e61?w=100&h=100&fit=crop' }, // Placeholder
    { id: 'e4', name: 'Seed Drill', type: 'Seeder', price: 400, image: 'https://images.unsplash.com/photo-1595842878568-388444927064?w=100&h=100&fit=crop' }, // Placeholder
  ]
};

export default function DriverProfile() {
  const [, setLocation] = useLocation();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setAddedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Image Area */}
      <div className="relative h-48 bg-green-600">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => setLocation('/drivers')}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl border-4 border-white shadow-md overflow-hidden -mt-10 bg-gray-200">
                <img src={driverData.image} alt={driverData.name} className="w-full h-full object-cover" />
              </div>
              <div className="pt-1">
                <h1 className="text-xl font-bold text-gray-900">{driverData.name}</h1>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>{driverData.village}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-yellow-700">{driverData.rating}</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">{driverData.trips} Trips</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
             <div className="flex items-center gap-2 text-sm text-gray-600">
               <ShieldCheck size={18} className="text-green-600" />
               <span>Verified Owner</span>
             </div>
             <div className="flex items-center gap-2 text-sm text-gray-600">
               <span className="font-bold">Since {driverData.joined}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="p-4 mt-2">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Available Equipment</h2>
        <div className="space-y-3">
          {driverData.equipment.map(item => (
            <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="font-bold text-green-700">₹{item.price}/hr</span>
                  
                  <button 
                    onClick={() => toggleItem(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                      addedItems.includes(item.id)
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-primary text-white shadow-md active:scale-95'
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
          ))}
        </div>
      </div>

      {/* Checkout Floating Bar */}
      {addedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">{addedItems.length} items selected</span>
            <span className="font-bold text-lg">₹{addedItems.reduce((acc, id) => acc + (driverData.equipment.find(e => e.id === id)?.price || 0), 0)}/hr</span>
          </div>
          <button 
            onClick={() => setLocation('/billing')}
            className="w-full bg-primary hover:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95"
          >
            Proceed to Book
          </button>
        </div>
      )}
    </div>
  );
}
