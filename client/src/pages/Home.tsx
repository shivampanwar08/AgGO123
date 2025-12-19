import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/lib/appContext";

export default function Home() {
  const { darkMode } = useApp();
  
  return (
    <div className={`relative w-full h-[100dvh] overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col transition-colors`}>
      {/* Main Visual Area */}
      <div className="flex-1 relative pb-16"> {/* pb-16 for bottom nav space */}
        <MapBackground />
        <LocationCard />
      </div>

      {/* Bottom Sheet for Vehicles */}
      <VehicleSheet />
      
      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
