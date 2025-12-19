import { ArrowLeft, Star, MapPin, Phone, Search, ShoppingCart, TrendingDown } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';
import { useApp } from '@/lib/appContext';

// Mock Data for Product Comparison
const productCatalog = [
  {
    id: 'p1',
    name: 'Urea Fertilizer (45kg)',
    category: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop',
    prices: [
      { shopId: 's2', price: 266, inStock: true }, // Agro Machinery (Cheapest)
      { shopId: 's1', price: 270, inStock: true }, // Kisan Seva
      { shopId: 's3', price: 285, inStock: false }, // Green Fields
    ]
  },
  {
    id: 'p2',
    name: 'DAP Fertilizer (50kg)',
    category: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1563456022-c63b540133b3?w=100&h=100&fit=crop',
    prices: [
      { shopId: 's1', price: 1350, inStock: true },
      { shopId: 's3', price: 1380, inStock: true },
    ]
  },
  {
    id: 'p3',
    name: 'Tractor Engine Oil (5L)',
    category: 'Spare Parts',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=100&h=100&fit=crop',
    prices: [
      { shopId: 's2', price: 1800, inStock: true },
      { shopId: 's1', price: 1850, inStock: true },
    ]
  }
];

const shops = [
  {
    id: 's1',
    name: "Kisan Seva Kendra",
    type: "Seeds & Fertilizers",
    rating: "4.8",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop",
    isOpen: true
  },
  {
    id: 's2',
    name: "Agro Machinery Parts",
    type: "Spare Parts & Repair",
    rating: "4.5",
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=100&h=100&fit=crop",
    isOpen: true
  },
  {
    id: 's3',
    name: "Green Fields Supplies",
    type: "Pesticides",
    rating: "4.9",
    distance: "3.8 km",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=100&h=100&fit=crop",
    isOpen: false
  }
];

export default function Shops() {
  const { darkMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const results = productCatalog.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen pb-20 transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-4 sticky top-0 z-10 shadow-sm space-y-3`}>
        <h1 className="text-xl font-bold">Agri Shops Nearby</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Urea, DAP, Seeds..." 
            className="w-full bg-gray-100 text-gray-900 rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {searchQuery.length > 1 ? (
          // Search Results View (Comparison)
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Found {searchResults.length} Products
            </h2>
            
            {searchResults.map(product => (
              <ProductComparisonCard key={product.id} product={product} />
            ))}

            {searchResults.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p>No products found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          // Default Shop List View
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">All Shops</h2>
              <span className="text-xs text-green-600 font-bold">View Map</span>
            </div>

            {shops.map(shop => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function ProductComparisonCard({ product }: any) {
  // Sort prices low to high
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      {/* Product Header */}
      <div className="p-4 border-b border-gray-50 flex gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-bold">
            <TrendingDown size={12} />
            Best Price: ₹{bestPrice.price}
          </div>
        </div>
      </div>

      {/* Price List */}
      <div className="divide-y divide-gray-50">
        {sortedPrices.map((offer, index) => {
          const shop = shops.find(s => s.id === offer.shopId);
          const isCheapest = index === 0;

          return (
            <div key={offer.shopId} className={`p-3 flex items-center justify-between ${isCheapest ? 'bg-green-50/30' : ''}`}>
              <div className="flex items-center gap-3">
                 <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isCheapest ? 'text-gray-900' : 'text-gray-600'}`}>
                      {shop?.name}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MapPin size={10} /> {shop?.distance}
                    </span>
                 </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900">₹{offer.price}</div>
                {offer.inStock ? (
                   <span className="text-[10px] text-green-600 font-medium">In Stock</span>
                ) : (
                   <span className="text-[10px] text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
              
              {offer.inStock && (
                 <button className="ml-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                   <ShoppingCart size={14} />
                 </button>
              )}
            </div>
          );
        })}
      </div>
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
