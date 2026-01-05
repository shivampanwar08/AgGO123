import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Tractor, User } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import type { EquipmentRenterData } from '@/lib/appContext';

interface EquipmentRenterFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function EquipmentRenterForm({ onBack, onSubmit }: EquipmentRenterFormProps) {
  const { darkMode, language, setEquipmentData } = useApp();
  const [equipment, setEquipment] = useState([
    { id: 1, name: 'Tractor', pricePerDay: 800, quantity: 1 }
  ]);
  const [formData, setFormData] = useState({
    ownerName: '',
    village: '',
    phone: '',
    bankAccount: '',
    isDriver: false,
    drivingLicense: ''
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

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateEquipment(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, drivingLicense: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const data: EquipmentRenterData = {
      ownerName: formData.ownerName,
      village: formData.village,
      phone: formData.phone,
      bankAccount: formData.bankAccount,
      isDriver: formData.isDriver,
      drivingLicense: formData.drivingLicense,
      equipment: equipment as any
    };
    setEquipmentData(data);
    onSubmit();
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
          <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50/50">
            <input
              type="checkbox"
              id="isDriver"
              checked={formData.isDriver}
              onChange={(e) => setFormData({ ...formData, isDriver: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isDriver" className={`text-sm font-bold ${textClass}`}>
              I will also provide driving services
            </label>
          </div>

          {formData.isDriver && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Driving License (Photo)</label>
              <div className="mt-2 flex items-center gap-4">
                <label className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-400'} rounded-xl p-4 transition-colors cursor-pointer group`}>
                  <input type="file" accept="image/*" onChange={handleLicenseUpload} className="hidden" />
                  {formData.drivingLicense ? (
                    <img src={formData.drivingLicense} alt="License" className="w-full h-32 object-cover rounded-lg" />
                  ) : (
                    <>
                      <User size={24} className={textMutedClass} />
                      <span className={`text-xs font-bold ${textMutedClass} mt-2`}>Upload License</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          )}
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-xs font-bold ${textMutedClass} uppercase tracking-widest`}>Equipment Photo</label>
                    <label className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed ${darkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-400'} rounded-xl p-3 transition-colors cursor-pointer group`}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(item.id, e)} className="hidden" />
                      {(item as any).image ? (
                        <img src={(item as any).image} alt="Equipment" className="w-full h-20 object-cover rounded-lg" />
                      ) : (
                        <>
                          <Tractor size={20} className={textMutedClass} />
                          <span className={`text-[10px] font-bold ${textMutedClass} mt-1`}>Upload Photo</span>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="space-y-2">
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
                  </div>
                </div>
                <button
                  onClick={() => removeEquipment(item.id)}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors active:scale-95 text-xs"
                >
                  <Trash2 size={12} /> Remove Equipment
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 hover:opacity-90 active:scale-95 transition-all"
        >
          {t('submit_profile', language)}
        </button>
      </div>
    </div>
  );
}
