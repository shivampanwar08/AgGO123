import { Bell, ArrowLeft, TrendingUp, CheckCircle, Clock, IndianRupee } from 'lucide-react';
import { useLocation } from 'wouter';
import { useApp } from '@/lib/appContext';
import BottomNav from '@/components/BottomNav';

export default function Notifications() {
  const { darkMode, bookings, updateBookingStatus, userRole } = useApp();
  const [, setLocation] = useLocation();

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  // Filter bookings by current role
  const roleFilteredBookings = bookings.filter(b => {
    if (userRole === 'equipment-renter') return b.roleType === 'equipment-renter' || (!b.roleType && !b.type);
    if (userRole === 'land-owner') return b.roleType === 'land-owner';
    if (userRole === 'shopper') return b.roleType === 'shopper' || b.type === 'cart';
    return true;
  });

  const myRequests = roleFilteredBookings.filter(b => b.status === 'confirmed');
  const history = roleFilteredBookings.filter(b => b.status !== 'confirmed');
  
  // Role-specific title
  const getTitle = () => {
    if (userRole === 'equipment-renter') return '🔧 Equipment Requests';
    if (userRole === 'land-owner') return '🌾 Land Rental Inquiries';
    if (userRole === 'shopper') return '🛒 Customer Contacts';
    return 'Activity & Earnings';
  };

  // Calculate earnings (mock logic)
  const totalEarnings = history.length * 500;

  return (
    <div className={`${bgClass} h-full flex flex-col transition-colors duration-300`}>
      <div className={`${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md p-4 flex items-center gap-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button onClick={() => setLocation('/')} className="p-2 hover:bg-gray-100/10 rounded-full transition-colors">
          <ArrowLeft size={20} className={textClass} />
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>{getTitle()}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 no-scrollbar">
        {/* Show earnings card only for sellers/renters */}
        {(userRole === 'equipment-renter' || userRole === 'land-owner' || userRole === 'shopper') && (
          <div className="bg-gradient-to-br from-green-600 to-green-400 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-green-100 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
                <h2 className="text-3xl font-black mt-1 flex items-center">
                  <IndianRupee size={24} strokeWidth={3} />
                  {totalEarnings}
                </h2>
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
              <p className="text-[10px] font-bold uppercase text-green-50 opacity-80">Recent Payout</p>
              <p className="text-sm font-black">₹{history.length > 0 ? 500 : 0} • Processing</p>
            </div>
          </div>
        )}

        {/* New Requests Section */}
        <div className="space-y-4">
          <h3 className={`text-sm font-black ${textMutedClass} uppercase tracking-widest`}>
            {userRole === 'equipment-renter' && '📋 Pending Rental Requests'}
            {userRole === 'land-owner' && '🔔 Land Rental Inquiries'}
            {userRole === 'shopper' && '👥 Customer Contact Requests'}
            {!userRole && 'Pending Requests'}
          </h3>
          {myRequests.length === 0 ? (
            <div className={`${cardClass} border rounded-2xl p-8 text-center opacity-50`}>
              <Clock size={32} className="mx-auto mb-2" />
              <p className="text-xs font-bold">No new requests at the moment</p>
            </div>
          ) : (
            myRequests.map((req) => (
              <div key={req.id} className={`${cardClass} border-2 ${
                userRole === 'land-owner' ? 'border-amber-500/30' : userRole === 'shopper' ? 'border-purple-500/30' : 'border-blue-500/30'
              } rounded-2xl p-4 shadow-sm relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 ${
                  userRole === 'land-owner' ? 'bg-amber-500' : userRole === 'shopper' ? 'bg-purple-500' : 'bg-blue-500'
                } text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg`}>NEW</div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className={`font-black ${textClass}`}>{req.equipmentName || 'New Request'}</p>
                    <p className={`text-[10px] font-bold ${textMutedClass}`}>
                      {userRole === 'shopper' ? 'Contact from: ' : 'Request from: '}{req.userName || 'Customer'}
                    </p>
                  </div>
                  <p className={`font-black ${
                    userRole === 'land-owner' ? 'text-amber-500' : userRole === 'shopper' ? 'text-purple-500' : 'text-blue-500'
                  }`}>₹{req.price || 500}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => updateBookingStatus(req.id, 'accepted')}
                    className={`flex-1 ${
                      userRole === 'land-owner' ? 'bg-amber-500' : userRole === 'shopper' ? 'bg-purple-500' : 'bg-blue-500'
                    } text-white text-xs font-black py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform`}
                  >
                    {userRole === 'shopper' ? 'Accept Contact' : 'Accept'}
                  </button>
                  <button className={`px-4 ${darkMode ? 'bg-gray-700' : 'bg-white'} border text-xs font-bold rounded-xl`}>
                    {userRole === 'shopper' ? 'Reject' : 'Decline'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Activity History */}
        <div className="space-y-4">
          <h3 className={`text-sm font-black ${textMutedClass} uppercase tracking-widest`}>Recent Activity</h3>
          <div className="space-y-3">
            {history.length === 0 ? (
              <p className="text-center text-xs opacity-50 py-4">No recent activity</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className={`${cardClass} border rounded-2xl p-4 flex items-center gap-4`}>
                  <div className={`p-2 rounded-xl ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    <CheckCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-black ${textClass}`}>{item.equipmentName} - {item.status === 'completed' ? 'Successful' : 'Accepted'}</p>
                    <p className={`text-[10px] font-bold ${textMutedClass}`}>{item.date} • {item.time}</p>
                  </div>
                  <p className={`text-xs font-black ${item.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>+₹500</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}