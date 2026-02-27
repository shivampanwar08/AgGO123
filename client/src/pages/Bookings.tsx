import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { useApp } from '@/lib/appContext';
import BottomNav from '@/components/BottomNav';

export default function Bookings() {
  const { darkMode, bookings } = useApp();
  const [, setLocation] = useLocation();

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`${bgClass} h-full flex flex-col transition-colors duration-300`}>
      <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md p-4 flex items-center gap-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button onClick={() => setLocation('/settings')} className="p-2 hover:bg-gray-100/10 rounded-full transition-colors">
          <ArrowLeft size={20} className={textClass} />
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>My Bookings</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 no-scrollbar">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <CalendarIcon size={48} className="mb-4" />
            <p className="font-medium">No bookings yet</p>
          </div>
        ) : (
          bookings.map((booking, idx) => (
            <div key={idx} className={`${cardClass} border rounded-2xl p-4 shadow-sm`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className={`font-bold ${textClass}`}>{booking.equipmentName}</h3>
                  <p className={`text-xs ${textMutedClass}`}>Provider: {booking.providerName}</p>
                </div>
                <div className="bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span className="text-[10px] font-bold text-green-500 uppercase">Confirmed</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-dashed border-gray-200">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={14} className="text-blue-500" />
                  <span className={`text-xs font-medium ${textClass}`}>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-500" />
                  <span className={`text-xs font-medium ${textClass}`}>{booking.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
