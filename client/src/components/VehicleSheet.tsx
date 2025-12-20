import { Drawer } from 'vaul';
import { Tractor, Truck, Sprout, Wheat, Cog, Check } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useApp } from '@/lib/appContext';

export default function EquipmentSheet() {
  const { darkMode } = useApp();
  const [snap, setSnap] = useState<number | string | null>('320px');
  const [, setLocation] = useLocation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (name: string) => {
    setSelectedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <Drawer.Root 
      snapPoints={['140px', '320px', 1]} 
      activeSnapPoint={snap} 
      setActiveSnapPoint={setSnap}
      modal={false}
      open={true}
    >
      <Drawer.Content className={`fixed bottom-16 left-0 right-0 z-30 flex flex-col ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] h-[85vh] max-h-[96%] outline-none pb-16 border-t ${darkMode ? 'border-gray-700/50' : 'border-white/50'} transition-colors`}>
        {/* Handle */}
        <div className="p-4 pb-0 flex justify-center flex-shrink-0">
          <div className={`w-16 h-1.5 ${darkMode ? 'bg-gray-600/50' : 'bg-gray-300/50'} rounded-full mb-2 backdrop-blur-sm`} />
        </div>

        {/* Header */}
        <div className={`px-6 pb-4 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-100/50'} flex-shrink-0 flex justify-between items-center`}>
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>Rent Equipment</h3>
            <p className={`text-xs uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold mt-1`}>Select Machines</p>
          </div>
          {selectedItems.length > 0 && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-green-500/30">
              {selectedItems.length} Selected
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          <EquipmentOption 
            icon={<Tractor size={24} className="text-green-600" />}
            name="Tractor"
            price="₹800/hr"
            desc="45HP - 55HP Heavy Duty"
            tag="Popular"
            selected={selectedItems.includes('Tractor')}
            onClick={() => toggleItem('Tractor')}
          />
          <EquipmentOption 
            icon={<Truck size={24} className="text-amber-700" />}
            name="Trolley"
            price="₹300/hr"
            desc="Hydraulic Tipping Trolley"
            selected={selectedItems.includes('Trolley')}
            onClick={() => toggleItem('Trolley')}
          />
           <EquipmentOption 
            icon={<Sprout size={24} className="text-orange-500" />}
            name="Harvester"
            price="₹2500/hr"
            desc="Combine Harvester for Wheat/Paddy"
            selected={selectedItems.includes('Harvester')}
            onClick={() => toggleItem('Harvester')}
          />
           <EquipmentOption 
            icon={<Cog size={24} className="text-gray-600" />}
            name="Rotavator"
            price="₹500/hr"
            desc="7 Feet Rotavator"
            selected={selectedItems.includes('Rotavator')}
            onClick={() => toggleItem('Rotavator')}
          />
          <EquipmentOption 
            icon={<Wheat size={24} className="text-yellow-600" />}
            name="Seeder"
            price="₹400/hr"
            desc="Multi-crop Planter"
            tag="Season Special"
            selected={selectedItems.includes('Seeder')}
            onClick={() => toggleItem('Seeder')}
          />
        </div>

        {/* Footer Action - Rendered as a flex item at the bottom */}
        {selectedItems.length > 0 && (
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700/50 bg-gray-800/80' : 'border-gray-100/50 bg-white/80'} backdrop-blur-md z-50 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]`}>
            <button 
              onClick={() => {
                const query = selectedItems.join(',');
                setLocation(`/drivers?items=${query}`);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-green-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 animate-in slide-in-from-bottom-4 duration-200"
            >
              Proceed ({selectedItems.length})
            </button>
          </div>
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
}

interface EquipmentOptionProps {
  icon: React.ReactNode;
  name: string;
  price: string;
  desc: string;
  tag?: string;
  selected: boolean;
  onClick: () => void;
}

function EquipmentOption({ icon, name, price, desc, tag, selected, onClick }: EquipmentOptionProps) {
  const { darkMode } = useApp();

  return (
    <div 
      onClick={onClick} 
      className={`cursor-pointer relative flex items-center p-4 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
        selected 
          ? `${darkMode ? 'bg-green-900/40 border-green-600' : 'bg-green-50/80 border-green-500'} shadow-lg shadow-green-500/10` 
          : `${darkMode ? 'bg-gray-700/60 border-gray-600 hover:border-green-600 hover:bg-gray-700/80' : 'bg-white/60 border-gray-100 hover:border-green-200 hover:bg-white/80'}`
      }`}
    >
      {tag && (
        <span className={`absolute -top-2.5 right-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-black text-white'} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md`}>
          {tag}
        </span>
      )}
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border mr-4 flex-shrink-0 transition-colors duration-300 ${selected ? `${darkMode ? 'bg-gray-800 border-green-600' : 'bg-white border-green-200'}` : `${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-gray-50 border-gray-100'}`}`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-lg tracking-tight`}>{name}</h4>
          <span className="font-bold text-green-500 text-lg">{price}</span>
        </div>
        
        <div className="flex justify-between items-center mt-0.5">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-semibold uppercase tracking-wide`}>{desc}</p>
        </div>
      </div>

      {selected && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-1.5 shadow-lg shadow-green-500/30 animate-in zoom-in duration-200">
          <Check size={14} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}
