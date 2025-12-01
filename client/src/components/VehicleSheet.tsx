import { Drawer } from 'vaul';
import { Tractor, Truck, Sprout, Wheat, Cog, Check } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';

export default function EquipmentSheet() {
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
      <Drawer.Content className="fixed bottom-16 left-0 right-0 z-30 flex flex-col bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] h-[85vh] max-h-[96%] outline-none pb-16">
        {/* Handle */}
        <div className="p-4 pb-0 flex justify-center flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-gray-100 flex-shrink-0 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Rent Equipment</h3>
            <p className="text-sm text-gray-500">Select machines you need.</p>
          </div>
          {selectedItems.length > 0 && (
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
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
          <div className="p-4 border-t border-gray-100 bg-white z-50 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <button 
              onClick={() => {
                const query = selectedItems.join(',');
                setLocation(`/drivers?items=${query}`);
              }}
              className="w-full bg-primary hover:bg-green-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-2 animate-in slide-in-from-bottom-4 duration-200"
            >
              Find Drivers ({selectedItems.length})
            </button>
          </div>
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
}

function EquipmentOption({ icon, name, price, desc, tag, selected, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`cursor-pointer relative flex items-center p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${
        selected 
          ? 'bg-green-50 border-green-500 shadow-md' 
          : 'bg-white border-gray-100 hover:border-green-200'
      }`}
    >
      {tag && (
        <span className="absolute -top-2.5 right-4 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          {tag}
        </span>
      )}
      
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm border mr-4 flex-shrink-0 ${selected ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-100'}`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-900 text-base">{name}</h4>
          <span className="font-bold text-primary text-lg">{price}</span>
        </div>
        
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-xs text-gray-500 font-medium">{desc}</p>
        </div>
      </div>

      {selected && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}
    </div>
  );
}
