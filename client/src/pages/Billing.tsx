import { ArrowLeft, MapPin, Wallet } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Billing() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => setLocation('/drivers')}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Confirm Booking</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Route Summary */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-6 relative">
            {/* Connecting Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>

            <div className="flex gap-4 relative z-10">
              <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 mt-1 ring-4 ring-green-50"></div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Pickup</p>
                <p className="font-semibold text-gray-900">HSR Layout, Sector 2</p>
              </div>
            </div>

             <div className="flex gap-4 relative z-10">
              <div className="w-4 h-4 bg-red-500 rounded-sm flex-shrink-0 mt-1 ring-4 ring-red-50"></div>
              <div>
                <p className="text-sm text-gray-500 mb-0.5">Dropoff</p>
                <p className="font-semibold text-gray-900">Koramangala 4th Block</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Bill Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Ride Fare</span>
              <span className="font-medium">₹45.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Access Fee</span>
              <span className="font-medium">₹5.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600 font-medium">Discount</span>
              <span className="text-green-600 font-medium">-₹10.00</span>
            </div>
            <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between text-base font-bold">
              <span>Total Amount</span>
              <span>₹40.00</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
               <Wallet size={20} className="text-gray-600" />
             </div>
             <div>
               <p className="font-bold text-sm">Cash</p>
               <p className="text-xs text-gray-500">Pay after ride</p>
             </div>
           </div>
           <button className="text-yellow-600 text-sm font-bold">Change</button>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20">
        <button 
          onClick={() => setLocation('/tracking')}
          className="w-full bg-primary hover:bg-yellow-400 text-black font-bold text-lg py-4 rounded-xl shadow-lg shadow-yellow-200 transition-all active:scale-95"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
