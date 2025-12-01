import { Drawer } from 'vaul';
import { Bike, Car, CarTaxiFront, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function VehicleSheet() {
  const [snap, setSnap] = useState<number | string | null>('140px');
  const [, setLocation] = useLocation();

  return (
    <Drawer.Root 
      snapPoints={['140px', '320px', 1]} 
      activeSnapPoint={snap} 
      setActiveSnapPoint={setSnap}
      modal={false}
      open={true}
    >
      <Drawer.Content className="fixed bottom-16 left-0 right-0 z-30 flex flex-col bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] h-[85vh] max-h-[96%] outline-none pb-16">
        {/* Handle */}
        <div className="p-4 pb-0 flex justify-center flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900">Available Rides</h3>
          <p className="text-sm text-gray-500">Select a ride to see drivers.</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          <VehicleOption 
            icon={<Bike size={24} className="text-yellow-600" />}
            name="Bike"
            eta="2 mins"
            price="₹45"
            desc="Fastest way to beat traffic"
            tag="Cheapest"
            color="bg-yellow-50 border-yellow-200"
            onClick={() => setLocation('/drivers')}
          />
          <VehicleOption 
            icon={<CarTaxiFront size={24} className="text-black" />}
            name="Auto"
            eta="4 mins"
            price="₹78"
            desc="Hassle-free auto rides"
            tag="Popular"
            color="bg-gray-50 border-gray-200"
            onClick={() => setLocation('/drivers')}
          />
           <VehicleOption 
            icon={<Car size={24} className="text-gray-800" />}
            name="Mini"
            eta="6 mins"
            price="₹145"
            desc="Comfortable hatchbacks"
            color="bg-white border-gray-100"
            onClick={() => setLocation('/drivers')}
          />
           <VehicleOption 
            icon={<Car size={24} className="text-gray-800" />}
            name="Prime"
            eta="8 mins"
            price="₹180"
            desc="Spacious sedans, top drivers"
            color="bg-white border-gray-100"
            onClick={() => setLocation('/drivers')}
          />
          <VehicleOption 
            icon={<CarTaxiFront size={24} className="text-green-600" />}
            name="EV Auto"
            eta="5 mins"
            price="₹75"
            desc="Eco-friendly rides"
            tag="Eco"
            color="bg-green-50 border-green-100"
            onClick={() => setLocation('/drivers')}
          />
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}

function VehicleOption({ icon, name, eta, price, desc, tag, color, onClick }: any) {
  return (
    <div onClick={onClick} className={`cursor-pointer relative flex items-center p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${color}`}>
      {tag && (
        <span className="absolute -top-2.5 right-4 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          {tag}
        </span>
      )}
      
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mr-4 flex-shrink-0">
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-900 text-base">{name}</h4>
          <span className="font-bold text-gray-900 text-lg">{price}</span>
        </div>
        
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-xs text-gray-500 font-medium">{desc}</p>
          <div className="flex items-center gap-1 text-gray-500 bg-white/50 px-1.5 py-0.5 rounded-md">
             <Clock size={10} />
             <span className="text-xs font-bold">{eta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
