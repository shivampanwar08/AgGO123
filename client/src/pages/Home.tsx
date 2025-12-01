import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col">
      {/* Main Visual Area */}
      <div className="flex-1 relative">
        <MapBackground />
        <LocationCard />
        
        {/* Floating Menu Button (Hamburger) */}
        <button className="absolute top-4 left-4 z-30 hidden">
          <div className="bg-white p-2.5 rounded-full shadow-lg border border-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      {/* Bottom Sheet for Vehicles */}
      <VehicleSheet />
    </div>
  );
}
