import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col">
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
