import { ArrowLeft, Star, MapPin, Wallet } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Billing() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm border-b border-white/20">
        <button onClick={() => setLocation('/drivers')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Confirm Booking</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Route Summary */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-6 relative overflow-hidden">
            <div className="absolute left-[29px] top-8 bottom-8 w-0.5 bg-gray-200/80 border-l border-dashed border-gray-300 z-0"></div>

            <div className="flex gap-4 relative z-10 mb-6">
              <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 mt-1 ring-4 ring-green-500/20 shadow-lg shadow-green-500/30"></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Pickup</p>
                <p className="font-bold text-gray-900 text-lg">HSR Layout, Sector 2</p>
              </div>
            </div>

             <div className="flex gap-4 relative z-10">
              <div className="w-4 h-4 bg-black rounded-sm flex-shrink-0 mt-1 ring-4 ring-gray-200 shadow-lg"></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Dropoff</p>
                <p className="font-bold text-gray-900 text-lg">Koramangala 4th Block</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-lg tracking-tight">Payment Breakdown</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Ride Fare</span>
                <span className="font-bold text-gray-900">₹45.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Access Fee</span>
                <span className="font-bold text-gray-900">₹5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 font-bold">Discount</span>
                <span className="text-green-600 font-bold">-₹10.00</span>
              </div>
              <div className="pt-4 border-t border-gray-200/50 flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹40.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="glass rounded-3xl p-1 cursor-pointer active:scale-[0.98] transition-transform">
           <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4 flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
                 <Wallet size={20} />
               </div>
               <div>
                 <p className="font-bold text-gray-900">Cash Payment</p>
                 <p className="text-xs text-gray-500 font-medium">Default method</p>
               </div>
             </div>
             <button className="text-primary text-sm font-bold px-4 py-2 bg-green-50 rounded-lg">Change</button>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-white via-white/90 to-transparent pt-10">
        <button 
          onClick={() => setLocation('/tracking')}
          className="w-full bg-black text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-black/20 transition-all active:scale-95 flex justify-center items-center gap-2 neon-glow"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
