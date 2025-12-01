import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Car, CarTaxiFront, MapPin } from 'lucide-react';
import mapImage from '@assets/generated_images/minimalist_light-colored_city_map_top-down_view_for_navigation_background.png';

// Mock vehicle data for simulation
const vehicles = [
  { id: 1, type: 'bike', x: 20, y: 30, delay: 0 },
  { id: 2, type: 'auto', x: 80, y: 60, delay: 2 },
  { id: 3, type: 'cab', x: 40, y: 80, delay: 1 },
  { id: 4, type: 'bike', x: 60, y: 20, delay: 4 },
  { id: 5, type: 'cab', x: 10, y: 50, delay: 3 },
];

export default function MapBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-100 z-0">
      {/* Static Map Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${mapImage})` }}
      />

      {/* Animated Vehicles */}
      {vehicles.map((v) => (
        <VehicleMarker key={v.id} {...v} />
      ))}

      {/* Current User Location (Centerish) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute -top-6 -left-6"></div>
          <div className="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg relative z-10"></div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap shadow-md">
            You are here
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleMarker({ type, x, y, delay }: { type: string, x: number, y: number, delay: number }) {
  // Random movement simulation
  return (
    <motion.div
      initial={{ top: `${y}%`, left: `${x}%` }}
      animate={{ 
        top: [`${y}%`, `${y + (Math.random() * 10 - 5)}%`, `${y}%`],
        left: [`${x}%`, `${x + (Math.random() * 10 - 5)}%`, `${x}%`],
        rotate: [0, Math.random() * 360, 0]
      }}
      transition={{ 
        duration: 20 + Math.random() * 10, 
        repeat: Infinity, 
        ease: "linear",
        delay: delay 
      }}
      className="absolute z-10 p-1.5 bg-white rounded-full shadow-md text-gray-800"
    >
      {type === 'bike' && <Bike size={16} fill="currentColor" className="text-yellow-500" />}
      {type === 'auto' && <CarTaxiFront size={16} fill="currentColor" className="text-black" />}
      {type === 'cab' && <Car size={16} fill="currentColor" className="text-gray-700" />}
    </motion.div>
  );
}
