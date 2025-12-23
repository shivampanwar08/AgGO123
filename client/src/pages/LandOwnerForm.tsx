import { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import type { LandOwnerData } from '@/lib/appContext';

interface LandOwnerFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function LandOwnerForm({ onBack, onSubmit }: LandOwnerFormProps) {
  const { darkMode, language, setLandData } = useApp();
  const [lands, setLands] = useState([
    { id: 1, size: 2, soilType: 'Black Soil', waterAccess: 'Well + Borewell', pricePerAcre: 800 }
  ]);
  const [formData, setFormData] = useState({
    ownerName: '',
    village: '',
    phone: '',
    bankAccount: ''
  });

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const inputClass = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900';

  const addLand = () => {
    const newId = Math.max(...lands.map(l => l.id), 0) + 1;
    setLands([...lands, { id: newId, size: 1, soilType: '', waterAccess: '', pricePerAcre: 0 }]);
  };

  const removeLand = (id: number) => {
    setLands(lands.filter(l => l.id !== id));
  };

  const updateLand = (id: number, field: string, value: any) => {
    setLands(lands.map(l => 
      l.id === id ? { ...l, [field]: value } : l
    ));
  };

  const handleSubmit = () => {
    const data: LandOwnerData = {
      ownerName: formData.ownerName,
      village: formData.village,
      phone: formData.phone,
      bankAccount: formData.bankAccount,
      lands: lands
    };
    setLandData(data);
    onSubmit();
  };

  return (
    <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
      <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 flex items-center gap-3 shadow-lg">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{t('list_land', language)}</h1>
          <p className="text-xs opacity-90">{t('add_your_lands', language)}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className={`${cardClass} rounded-2xl p-4 border space-y-4`}>
          <h2 className={`font-bold ${textClass} text-lg`}>{t('personal_info', language)}</h2>
          
          <div>
            <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>{t('name', language)}</label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              placeholder="Full Name"
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500`}
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
                className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500`}
              />
            </div>
            <div>
              <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765"
                className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500`}
              />
            </div>
          </div>

          <div>
            <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Bank Account</label>
            <input
              type="text"
              value={formData.bankAccount}
              onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              placeholder="****1234"
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500`}
            />
          </div>
        </div>

        <div className={`${cardClass} rounded-2xl p-4 border space-y-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-bold ${textClass} text-lg`}>{t('land_details', language)}</h2>
            <button
              onClick={addLand}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-3 rounded-lg flex items-center gap-1 text-sm active:scale-95 transition-transform"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <div className="space-y-3">
            {lands.map((item) => (
              <div key={item.id} className={`p-3 border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-xl space-y-2`}>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className={`text-xs font-bold ${textMutedClass}`}>Size (Acres)</label>
                    <input
                      type="number"
                      value={item.size}
                      onChange={(e) => updateLand(item.id, 'size', parseFloat(e.target.value) || 0)}
                      placeholder="2"
                      step="0.5"
                      className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold ${textMutedClass}`}>Price/Acre</label>
                    <input
                      type="number"
                      value={item.pricePerAcre}
                      onChange={(e) => updateLand(item.id, 'pricePerAcre', parseInt(e.target.value) || 0)}
                      placeholder="₹800"
                      className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500`}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => removeLand(item.id)}
                      className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors active:scale-95"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.soilType}
                    onChange={(e) => updateLand(item.id, 'soilType', e.target.value)}
                    placeholder="Soil Type"
                    className={`p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                  <input
                    type="text"
                    value={item.waterAccess}
                    onChange={(e) => updateLand(item.id, 'waterAccess', e.target.value)}
                    placeholder="Water Access"
                    className={`p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-amber-500/30 hover:opacity-90 active:scale-95 transition-all"
        >
          {t('submit_profile', language)}
        </button>
      </div>
    </div>
  );
}
