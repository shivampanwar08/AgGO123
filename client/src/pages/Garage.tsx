import { ArrowLeft, MapPin, Phone, Search, Calendar as CalendarIcon, Clock, Wrench } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, addDays, isSameDay } from 'date-fns';

const garageData = [
  {
    id: 'g1',
    name: "Rampur Farm Mechanics",
    village: 'Rampur Village',
    garageAddress: 'Main Road, Near Mandi',
    openHours: '6:00 AM - 8:00 PM',
    distance: '2.5 km',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a78e?w=100&h=100&fit=crop',
    machines: [
      { id: 'm1', type: 'Tractor 55HP', price: 1200, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop', bookedDates: [addDays(new Date(), 1), addDays(new Date(), 2)] },
      { id: 'm2', type: 'Harvester', price: 2500, image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop', bookedDates: [] },
      { id: 'm3', type: 'Trolley', price: 500, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop', bookedDates: [new Date()] }
    ]
  },
  {
    id: 'g2',
    name: "Singh Auto Works",
    village: 'Sector 5',
    garageAddress: 'Industrial Area Block C',
    openHours: '7:00 AM - 6:00 PM',
    distance: '4.2 km',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=100&h=100&fit=crop',
    machines: [
      { id: 'm4', type: 'Rotavator', price: 800, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop', bookedDates: [] },
      { id: 'm5', type: 'Seeder', price: 600, image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop', bookedDates: [addDays(new Date(), 3)] }
    ]
  },
  {
    id: 'g3',
    name: "Kishanpur Service Center",
    village: 'Kishanpur',
    garageAddress: 'Agricultural Hub',
    openHours: '6:30 AM - 9:00 PM',
    distance: '6.8 km',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=100&h=100&fit=crop',
    machines: [
      { id: 'm6', type: 'Tractor 45HP', price: 1000, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop', bookedDates: [] },
      { id: 'm7', type: 'Harvester', price: 2400, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop', bookedDates: [addDays(new Date(), 1)] },
      { id: 'm8', type: 'Trolley', price: 450, image: 'https://images.unsplash.com/photo-1605986753494-3a2e3b03c9d5?w=100&h=100&fit=crop', bookedDates: [] }
    ]
  }
];

export default function Garage() {
  const { darkMode, language } = useApp();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter garages based on search
  const filteredGarages = garageData.filter(garage => 
    garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    garage.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
    garage.machines.some(m => m.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBook = () => {
    if (!selectedDate || !selectedMachine) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedMachine(null);
    }, 2000);
  };

  const isDateDisabled = (date: Date) => {
    if (!selectedMachine) return false;
    return selectedMachine.bookedDates.some((d: Date) => isSameDay(d, date));
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full flex flex-col relative overflow-hidden transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl px-4 py-4 z-10 shadow-sm border-b transition-colors flex-shrink-0`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLocation('/settings')}
            className={`w-10 h-10 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full flex items-center justify-center transition-colors`}
          >
            <ArrowLeft size={20} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
          </button>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>AgGo Garage</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 no-scrollbar">
        <div className="relative">
           <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
           <input 
             type="text" 
             placeholder="Search garages, tractors, harvesters..." 
             className={`w-full ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all border`}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>

        <div className="space-y-4">
          <h2 className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-widest mt-2`}>
            Nearby Garages ({filteredGarages.length})
          </h2>

          {filteredGarages.length === 0 ? (
             <div className={`text-center py-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
               <p>No garages found matching "{searchQuery}"</p>
             </div>
          ) : (
            filteredGarages.map((garage) => (
              <div key={garage.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border overflow-hidden shadow-sm`}>
                <div className={`p-4 ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gradient-to-r from-blue-50/50 to-transparent border-gray-100'} border-b`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                       <img src={garage.image} alt={garage.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{garage.name}</h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                        <MapPin size={12} /> {garage.village} • {garage.distance}
                      </p>
                    </div>
                    <div className="text-right">
                       <div className={`text-[10px] font-bold ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'} px-2 py-0.5 rounded-full mb-1 inline-block`}>
                         Open: {garage.openHours}
                       </div>
                       <button className={`${darkMode ? 'text-blue-400' : 'text-blue-600 hover:text-blue-700'} font-bold text-xs flex items-center justify-end gap-1`}>
                        <Phone size={14} /> Call
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 grid gap-3 ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                  {garage.machines.map((machine) => (
                    <div key={machine.id} className={`flex gap-3 p-2 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <div className={`w-16 h-16 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} overflow-hidden flex-shrink-0`}>
                         <img src={machine.image} alt={machine.type} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{machine.type}</h4>
                             <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5 flex items-center gap-1`}>
                               <Clock size={10} /> Daily Rate
                             </p>
                           </div>
                           <div className="text-right">
                             <div className={`font-bold text-base ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>₹{machine.price}</div>
                           </div>
                         </div>
                         
                         <button 
                           onClick={() => setSelectedMachine({...machine, garageName: garage.name})}
                           className={`w-full mt-2 text-xs font-bold py-1.5 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} transition-colors flex items-center justify-center gap-1`}
                         >
                           <CalendarIcon size={12} /> Book / Check Availability
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedMachine && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 animate-in fade-in duration-200 p-4">
          <div className={`w-full max-w-sm max-h-[90vh] flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200`}>
            {bookingSuccess ? (
               <div className="p-8 text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CalendarIcon className="text-green-600" size={32} />
                 </div>
                 <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Booking Confirmed!</h3>
                 <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                   You have successfully booked the {selectedMachine.type} for {selectedDate ? format(selectedDate, 'PPP') : ''}.
                 </p>
               </div>
            ) : (
              <>
                <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shrink-0`}>
                  <div>
                    <h3 className="font-bold text-lg">Book Equipment</h3>
                    <p className="text-xs text-blue-100 opacity-90">{selectedMachine.garageName}</p>
                  </div>
                  <button onClick={() => setSelectedMachine(null)} className="text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full">
                    ✕
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto">
                  <div className="flex gap-3 mb-4">
                    <img src={selectedMachine.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMachine.type}</h4>
                      <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-bold`}>₹{selectedMachine.price} / day</p>
                    </div>
                  </div>

                  <div className={`rounded-xl border ${darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'} p-2 mb-4 flex justify-center`}>
                    <style>{`
                      .rdp { --rdp-cell-size: 32px; --rdp-accent-color: #3b82f6; --rdp-background-color: #eff6ff; margin: 0; font-size: 0.85rem; }
                      .rdp-month { width: 100%; }
                      .rdp-table { max-width: 100%; }
                      ${darkMode ? '.rdp { --rdp-accent-color: #3b82f6; --rdp-background-color: #1e293b; color: #e2e8f0; } .rdp-day_selected:not([disabled]) { color: white; } .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: #374151; }' : ''}
                    `}</style>
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={[
                        { before: new Date() },
                        (date) => isDateDisabled(date)
                      ]}
                      modifiers={{
                        booked: (date) => isDateDisabled(date)
                      }}
                      modifiersStyles={{
                        booked: { color: '#ef4444', textDecoration: 'line-through', opacity: 0.5 }
                      }}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-blue-50'} flex justify-between items-center`}>
                      <span className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Selected Date</span>
                      <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>{selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}</span>
                    </div>

                    <button 
                      onClick={handleBook}
                      disabled={!selectedDate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
