import { ArrowLeft, Star, MapPin, Phone } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function Shops() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold">Agri Shops Nearby</h1>
      </div>

      <div className="p-4 space-y-4">
        <ShopCard 
          name="Kisan Seva Kendra"
          type="Seeds & Fertilizers"
          rating="4.8"
          distance="1.2 km"
          image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop"
          isOpen={true}
        />
        <ShopCard 
          name="Agro Machinery Parts"
          type="Spare Parts & Repair"
          rating="4.5"
          distance="2.5 km"
          image="https://images.unsplash.com/photo-1589923188900-85dae523342b?w=100&h=100&fit=crop"
          isOpen={true}
        />
        <ShopCard 
          name="Green Fields Supplies"
          type="Pesticides"
          rating="4.9"
          distance="3.8 km"
          image="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=100&h=100&fit=crop"
          isOpen={false}
        />
      </div>
      <BottomNav />
    </div>
  );
}

function ShopCard({ name, type, rating, distance, image, isOpen }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm hover:shadow-md transition-all">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900">{name}</h3>
          {isOpen ? (
             <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">OPEN</span>
          ) : (
             <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">CLOSED</span>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mb-1">{type}</p>
        
        <div className="flex items-center justify-between mt-2">
           <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span>{rating}</span>
            <span className="text-gray-300">•</span>
            <span>{distance}</span>
          </div>
          
          <button className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100">
            <Phone size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
