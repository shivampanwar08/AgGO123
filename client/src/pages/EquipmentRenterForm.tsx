import { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

interface EquipmentRenterFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function EquipmentRenterForm({ onBack, onSubmit }: EquipmentRenterFormProps) {
  const { darkMode, language } = useApp();
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Tractor', pricePerDay: 800, quantity: 1 }
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

  const addEquipment = () => {
    const newId = Math.max(...equipment.map(e => e.id), 0) + 1;
    setEquipment([...equipment, { id: newId, name: '', pricePerDay: 0, quantity: 1 }]);
  };

  const removeEquipment = (id: number) => {
    setEquipment(equipment.filter(e => e.id !== id));
  };

  const updateEquipment = (id: number, field: string, value: any) => {
    setEquipment(equipment.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  return (
    <div className={`${bgClass} min-h-screen pb-24 transition-colors duration-300`}>
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center gap-3 shadow-lg">
        <button onClick={onBack} className="active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{t('list_equipment', language)}</h1>
          <p className="text-xs opacity-90">{t('add_your_machines', language)}</p>
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
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765"
                className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className={`w-full mt-2 p-3 ${inputClass} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        <div className={`${cardClass} rounded-2xl p-4 border space-y-4`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-bold ${textClass} text-lg`}>{t('equipment_inventory', language)}</h2>
            <button
              onClick={addEquipment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg flex items-center gap-1 text-sm active:scale-95 transition-transform"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <div className="space-y-3">
            {equipment.map((item) => (
              <div key={item.id} className={`p-3 border ${darkMode ? 'bg-gray-700/30 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-xl space-y-2`}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateEquipment(item.id, 'name', e.target.value)}
                  placeholder="Equipment name (Tractor, Harvester...)"
                  className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className={`text-xs font-bold ${textMutedClass}`}>Price/Day</label>
                    <input
                      type="number"
                      value={item.pricePerDay}
                      onChange={(e) => updateEquipment(item.id, 'pricePerDay', parseInt(e.target.value) || 0)}
                      placeholder="₹800"
                      className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold ${textMutedClass}`}>Qty</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateEquipment(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      className={`w-full p-2 ${inputClass} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => removeEquipment(item.id)}
                      className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors active:scale-95"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 hover:opacity-90 active:scale-95 transition-all"
        >
          {t('submit_profile', language)}
        </button>
      </div>
    </div>
  );
}
