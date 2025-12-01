import { ArrowLeft, Trash2, CheckCircle2, Circle, User, Carrot } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

export default function Billing() {
  const [, setLocation] = useLocation();
  const [withDriver, setWithDriver] = useState(true);
  const [items, setItems] = useState(['Tractor', 'Trolley']);

  const removeItem = (itemToRemove: string) => {
    setItems(prev => prev.filter(i => i !== itemToRemove));
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => setLocation('/drivers')}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Confirm Rental</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Driver Toggle */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Service Type</h3>
          <div className="flex gap-3">
            <button 
              onClick={() => setWithDriver(true)}
              className={`flex-1 py-3 px-2 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${withDriver ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-100 text-gray-500'}`}
            >
              <User size={24} />
              <span className="text-xs font-bold">With Driver</span>
            </button>
            <button 
              onClick={() => setWithDriver(false)}
              className={`flex-1 py-3 px-2 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${!withDriver ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-100 text-gray-500'}`}
            >
              <Carrot size={24} />
              <span className="text-xs font-bold">Self Drive</span>
            </button>
          </div>
        </div>

        {/* Selected Equipment */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Selected Equipment</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{item}</span>
                <button onClick={() => removeItem(item)} className="text-red-500 p-2 hover:bg-red-50 rounded-full">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {items.length === 0 && <p className="text-sm text-gray-400 italic">No equipment selected.</p>}
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Estimated Bill (Per Hour)</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Equipment Total</span>
              <span className="font-medium">₹{items.length * 800}.00</span>
            </div>
            {withDriver && (
               <div className="flex justify-between">
                <span className="text-gray-600">Driver Fee</span>
                <span className="font-medium">₹200.00</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">₹50.00</span>
            </div>
            <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between text-base font-bold text-green-700">
              <span>Total / hr</span>
              <span>₹{items.length * 800 + (withDriver ? 200 : 0) + 50}.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20">
        <button 
          onClick={() => setLocation(`/tracking?driver=${withDriver}`)}
          disabled={items.length === 0}
          className="w-full bg-primary hover:bg-green-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {withDriver ? 'Request Driver' : 'Rent & Pickup'}
        </button>
      </div>
    </div>
  );
}
