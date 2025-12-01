import { ArrowLeft, Trash2, CheckCircle2, Circle, User, Carrot, Plus, Minus } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

export default function Billing() {
  const [, setLocation] = useLocation();
  const [withDriver, setWithDriver] = useState(true);
  const [items, setItems] = useState([{ name: 'Tractor', price: 800 }, { name: 'Trolley', price: 300 }]);
  const [hours, setHours] = useState(4);

  const removeItem = (itemToRemove: string) => {
    setItems(prev => prev.filter(i => i.name !== itemToRemove));
  };

  const totalEquipment = items.reduce((acc, item) => acc + item.price, 0);
  const subtotal = totalEquipment * hours;
  const driverFee = withDriver ? 200 * hours : 0;
  const platformFee = 50;
  const total = subtotal + driverFee + platformFee;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm border-b border-white/20">
        <button onClick={() => setLocation('/drivers')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Confirm Rental</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Duration */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Rental Duration</h3>
            <div className="flex items-center justify-between bg-gray-100/50 p-4 rounded-xl">
              <button onClick={() => setHours(Math.max(1, hours - 1))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center active:scale-90 transition-transform shadow-sm">
                <Minus size={18} />
              </button>
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-900">{hours}</span>
                <span className="text-gray-500 text-sm ml-2">hours</span>
              </div>
              <button onClick={() => setHours(hours + 1)} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center active:scale-90 transition-transform shadow-sm">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Driver Toggle */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Service Type</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setWithDriver(true)}
                className={`flex-1 py-3 px-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all font-bold text-sm ${withDriver ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-white text-gray-500'}`}
              >
                <User size={20} />
                With Driver
              </button>
              <button 
                onClick={() => setWithDriver(false)}
                className={`flex-1 py-3 px-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all font-bold text-sm ${!withDriver ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-white text-gray-500'}`}
              >
                <Carrot size={20} />
                Self Drive
              </button>
            </div>
          </div>
        </div>

        {/* Selected Equipment */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Equipment</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-800">{item.name} × {hours}h</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">₹{item.price * hours}</span>
                    <button onClick={() => removeItem(item.name)} className="text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Pricing</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Equipment ({hours}h)</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              {withDriver && (
                 <div className="flex justify-between">
                  <span className="text-gray-600">Driver Fee ({hours}h)</span>
                  <span className="font-bold">₹{driverFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-bold">₹{platformFee}</span>
              </div>
              <div className="pt-3 border-t border-dashed border-gray-300 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-white via-white/90 to-transparent pt-10">
        <button 
          onClick={() => setLocation(`/tracking?driver=${withDriver}`)}
          className="w-full bg-black text-white font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-95 transition-transform flex justify-center items-center gap-2"
        >
          Confirm (₹{total})
        </button>
      </div>
    </div>
  );
}
