import { ArrowLeft, Star, MapPin, Phone, Search, ShoppingCart, TrendingDown } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

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
    isOpen: true,
    phone: "+91 98765 00001",
    products: [
      { name: 'Urea Fertilizer (45kg)', category: 'Fertilizers', price: 270, quantity: 100, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' },
      { name: 'DAP Fertilizer (50kg)', category: 'Fertilizers', price: 1350, quantity: 50, image: 'https://images.unsplash.com/photo-1563456022-c63b540133b3?w=100&h=100&fit=crop' },
      { name: 'Tractor Engine Oil (5L)', category: 'Spare Parts', price: 1850, quantity: 20, image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 's2',
    name: "Agro Machinery Parts",
    type: "Spare Parts & Repair",
    rating: "4.5",
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=100&h=100&fit=crop",
    isOpen: true,
    phone: "+91 98765 00002",
    products: [
      { name: 'Urea Fertilizer (45kg)', category: 'Fertilizers', price: 266, quantity: 80, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' },
      { name: 'Tractor Engine Oil (5L)', category: 'Spare Parts', price: 1800, quantity: 15, image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 's3',
    name: "Green Fields Supplies",
    type: "Pesticides",
    rating: "4.9",
    distance: "3.8 km",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=100&h=100&fit=crop",
    isOpen: false,
    phone: "+91 98765 00003",
    products: [
      { name: 'Urea Fertilizer (45kg)', category: 'Fertilizers', price: 285, quantity: 0, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' },
      { name: 'DAP Fertilizer (50kg)', category: 'Fertilizers', price: 1380, quantity: 30, image: 'https://images.unsplash.com/photo-1563456022-c63b540133b3?w=100&h=100&fit=crop' }
    ]
  }
];

export default function Shops() {
  const { darkMode, language, allShoppers } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [highlightedShopId, setHighlightedShopId] = useState<string | null>(null);

  const handleSelectShop = (shopId: string) => {
    setSearchQuery(''); // Clear search to show shops list
    setHighlightedShopId(shopId);
    // Scroll to the shop
    setTimeout(() => {
      const element = document.getElementById(shopId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Transform allShoppers to match ShopCard props
  const userShops = allShoppers.map((shop, index) => ({
    id: `user-shop-${index}`,
    name: shop.shopName,
    type: "Local Seller",
    rating: "New",
    distance: "Nearby",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=100&h=100&fit=crop",
    isOpen: true,
    phone: shop.phone,
    products: shop.products // Pass products to the card
  }));

  const allShopsList = [...shops, ...userShops];

  // Logic to merge products for comparison
  const getAllProductsForComparison = () => {
    // Start with the base catalog (deep copy to avoid mutation)
    const mergedCatalog = JSON.parse(JSON.stringify(productCatalog));
    
    allShoppers.forEach((shopper, shopIndex) => {
      shopper.products.forEach(prod => {
        // Check if this product already exists in the catalog (fuzzy match by name)
        const existingProduct = mergedCatalog.find((p: any) => 
          p.name.toLowerCase().includes(prod.name.toLowerCase()) || 
          prod.name.toLowerCase().includes(p.name.toLowerCase())
        );

        const shopId = `user-shop-${shopIndex}`;
        const priceEntry = { 
          shopId, 
          price: prod.price, 
          inStock: prod.quantity > 0 
        };

        if (existingProduct) {
          // Add this shopper's price to the existing product
          // Check if this shop already has a price listed (update it if so)
          const existingPriceIndex = existingProduct.prices.findIndex((p: any) => p.shopId === shopId);
          if (existingPriceIndex >= 0) {
            existingProduct.prices[existingPriceIndex] = priceEntry;
          } else {
            existingProduct.prices.push(priceEntry);
          }
        } else {
          // Product doesn't exist in catalog, add it as a new entry
          // But first check if we already added this "new" product from another shopper
          const alreadyAddedProduct = mergedCatalog.find((p: any) => p.name === prod.name);
          
          if (alreadyAddedProduct) {
             alreadyAddedProduct.prices.push(priceEntry);
          } else {
            mergedCatalog.push({
              id: `sp-${shopIndex}-${prod.id}`,
              name: prod.name,
              category: prod.category,
              image: prod.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop',
              prices: [priceEntry]
            });
          }
        }
      });
    });

    return mergedCatalog;
  };

  const allProducts = getAllProductsForComparison();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const results = allProducts.filter((product: any) => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full flex flex-col relative overflow-hidden transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 py-4 z-10 shadow-sm space-y-3 transition-colors flex-shrink-0`}>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('agri_shops', language)}</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
          <input 
            type="text" 
            placeholder={t('search_products', language)}
            className={`w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all border`}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 no-scrollbar">
        {searchQuery.length > 1 ? (
          // Search Results View (Comparison)
          <div className="space-y-6">
            <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>
              {t('found_products', language)} {searchResults.length} {t('products', language)}
            </h2>
            
            {searchResults.map(product => (
              <ProductComparisonCard 
                key={product.id} 
                product={product} 
                onSelectShop={handleSelectShop}
              />
            ))}

            {searchResults.length === 0 && (
              <div className={`text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <p>{t('no_products_found', language)} "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          // Default Shop List View
          <>
            <div className="flex justify-between items-center">
              <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>{t('all_shops', language)}</h2>
              <span className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'} font-bold`}>{t('view_map', language)}</span>
            </div>

            {allShopsList.map(shop => (
              <ShopCard 
                key={shop.id} 
                {...shop} 
                highlighted={highlightedShopId === shop.id}
              />
            ))}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function ProductComparisonCard({ product, onSelectShop }: any) {
  const { darkMode, language, allShoppers } = useApp();
  // Sort prices low to high
  const sortedPrices = [...product.prices].sort((a: any, b: any) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  // Helper to find shop name
  const getShopDetails = (shopId: string) => {
    // Check static shops
    const staticShop = shops.find(s => s.id === shopId);
    if (staticShop) return staticShop;

    // Check shopper shops (format: user-shop-{index})
    if (shopId.startsWith('user-shop-')) {
      const index = parseInt(shopId.split('-')[2]);
      const shopper = allShoppers[index];
      if (shopper) {
        return {
          name: shopper.shopName,
          distance: "Nearby", // Or calculate real distance if we had coords
          isOpen: true,
          id: shopId
        };
      }
    }
    return { name: "Unknown Shop", distance: "?", isOpen: false, id: shopId };
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border overflow-hidden shadow-sm transition-colors`}>
      {/* Product Header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-50'} flex gap-4`}>
        <div className={`w-16 h-16 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} overflow-hidden flex-shrink-0`}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{product.category}</p>
          <div className={`inline-flex items-center gap-1 ${darkMode ? 'bg-green-900/40 text-green-400' : 'bg-green-50 text-green-700'} px-2 py-1 rounded-md text-xs font-bold`}>
            <TrendingDown size={12} />
            {t('best_price', language)}: ₹{bestPrice.price}
          </div>
        </div>
      </div>

      {/* Price List */}
      <div className={`${darkMode ? 'divide-gray-700' : 'divide-gray-50'} divide-y`}>
        {sortedPrices.map((offer: any, index: number) => {
          const shop = getShopDetails(offer.shopId);
          const isCheapest = index === 0;

          return (
            <div 
              key={offer.shopId} 
              className={`p-3 flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-all ${isCheapest ? darkMode ? 'bg-green-900/20' : 'bg-green-50/30' : ''}`}
              onClick={() => onSelectShop(offer.shopId)}
            >
              <div className="flex items-center gap-3">
                 <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isCheapest ? darkMode ? 'text-white' : 'text-gray-900' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {shop.name}
                    </span>
                    <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} flex items-center gap-1`}>
                      <MapPin size={10} /> {shop.distance}
                    </span>
                 </div>
              </div>
              
              <div className="text-right">
                <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{offer.price}</div>
                {offer.inStock ? (
                   <span className={`text-[10px] ${darkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>{t('in_stock', language)}</span>
                ) : (
                   <span className="text-[10px] text-red-500 font-medium">{t('out_of_stock', language)}</span>
                )}
              </div>
              
              {offer.inStock && (
                 <div className="ml-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm">
                   <ShoppingCart size={14} />
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShopCard({ id, name, type, rating, distance, image, isOpen, products, phone, highlighted }: any) {
  const { darkMode } = useApp();
  const [expanded, setExpanded] = useState(highlighted || false);
  
  return (
    <div 
      id={id}
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-4 rounded-xl border shadow-sm hover:shadow-md transition-all ${highlighted ? 'ring-2 ring-green-500' : ''}`}
    >
      <div className="flex gap-4">
        <div className={`w-20 h-20 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex-shrink-0`}>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
            {isOpen ? (
               <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">OPEN</span>
            ) : (
               <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">CLOSED</span>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mb-1">{type}</p>
          {phone && (
            <p className="text-[10px] font-bold text-green-600 flex items-center gap-1 mt-1">
              <Phone size={10} /> {phone}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-2">
             <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span>{rating}</span>
              <span className="text-gray-300">•</span>
              <span>{distance}</span>
            </div>
            
            <div className="flex gap-2">
              {products && products.length > 0 && (
                <button 
                  onClick={() => setExpanded(!expanded)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}
                >
                  {expanded ? 'Hide Items' : `View Items (${products.length})`}
                </button>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100">
                  <Phone size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {expanded && products && (
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} grid gap-3 animate-in slide-in-from-top-2 duration-200`}>
          {products.map((item: any, idx: number) => (
            <div key={idx} className={`flex justify-between items-center p-2 rounded-lg ${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden`}>
                   {item.image ? (
                     <img src={item.image} className="w-full h-full object-cover" />
                   ) : (
                     <ShoppingCart size={16} className="text-gray-400" />
                   )}
                </div>
                <div>
                  <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.category}</p>
                </div>
              </div>
              <div className={`text-sm font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                ₹{item.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
