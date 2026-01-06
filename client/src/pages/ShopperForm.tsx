import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import type { ShopperData } from '@/lib/appContext';

interface ShopperFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function ShopperForm({ onBack, onSubmit }: ShopperFormProps) {
  const { darkMode, language, setShopperData, addShopper } = useApp();
  const [products, setProducts] = useState([
    { id: 1, name: 'Urea Fertilizer', category: 'Fertilizers', price: 650, quantity: 50, image: '' }
  ]);

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProduct(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState({
    shopName: 'My Agri Shop',
    shopOwner: '',
    village: '',
    phone: '',
    shopAddress: '',
    bankAccount: ''
  });

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900';

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { id: newId, name: '', category: '', price: 0, quantity: 0, image: '' }]);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: number, field: string, value: any) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = () => {
    const data: ShopperData = {
      shopName: formData.shopName,
      shopOwner: formData.shopOwner,
      village: formData.village,
      phone: formData.phone,
      shopAddress: formData.shopAddress,
      bankAccount: formData.bankAccount,
      products: products
    };
    addShopper(data);
    setShopperData(data);
    onSubmit();
  };

  return (
    <div className={`${bgClass} h-screen flex flex-col transition-colors duration-300`}>
      <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 flex items-center gap-3 shadow-lg">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{t('setup_shop', language)}</h1>
          <p className="text-xs opacity-90">{t('add_shop_products', language)}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        <div className={`${cardClass} rounded-2xl p-4 border space-y-4`}>
          <h2 className={`font-bold ${textClass} text-lg`}>{t('shop_info', language)}</h2>
          
          <div>
            <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('shop_name', language)}</label>
            <input
              type="text"
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              placeholder="My Agri Shop"
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          <div>
            <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('owner_name', language)}</label>
            <input
              type="text"
              value={formData.shopOwner}
              onChange={(e) => setFormData({ ...formData, shopOwner: e.target.value })}
              placeholder="Full Name"
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('village', language)}</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder="Village"
                className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
            <div>
              <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765"
                className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>

          <div>
            <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('shop_address', language)}</label>
            <input
              type="text"
              value={formData.shopAddress}
              onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
              placeholder="Shop Location"
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          <div>
            <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Bank Account</label>
            <input
              type="text"
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              placeholder="****1234"
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>

        <div className={`${cardClass} rounded-2xl p-4 border space-y-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-bold ${textClass} text-lg`}>{t('products_inventory', language)}</h2>
            <button
              onClick={addProduct}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-3 rounded-lg flex items-center gap-1 text-sm active:scale-95 transition-transform"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <div className="space-y-3">
            {products.map((item) => (
              <div key={item.id} className={`p-3 border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-xl space-y-2`}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateProduct(item.id, 'name', e.target.value)}
                  placeholder="Product name"
                  className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Product Photo</label>
                    <label className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-700 hover:border-purple-500' : 'border-gray-300 hover:border-purple-400'} rounded-xl p-3 transition-colors cursor-pointer group`}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} className="hidden" />
                      {(item as any).image ? (
                        <img src={(item as any).image} alt="Product" className="w-full h-20 object-cover rounded-lg" />
                      ) : (
                        <>
                          <ShoppingCart size={20} className={textMutedClass} />
                          <span className={`text-[10px] font-bold ${textMutedClass} mt-1`}>Upload Photo</span>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className={`text-xs font-bold ${textMutedClass}`}>Price</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateProduct(item.id, 'price', parseInt(e.target.value) || 0)}
                        placeholder="₹"
                        className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-bold ${textMutedClass}`}>Qty</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateProduct(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        min="0"
                        className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeProduct(item.id)}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors active:scale-95 text-xs"
                >
                  <Trash2 size={12} /> Remove Product
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-purple-500/30 hover:opacity-90 active:scale-95 transition-all"
        >
          {t('submit_profile', language)}
        </button>
      </div>
    </div>
  );
}
