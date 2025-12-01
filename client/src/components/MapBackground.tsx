import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tractor, Truck, Sprout, Leaf } from 'lucide-react';
import mapImage from '@assets/generated_images/top-down_rural_farm_map_with_fields_and_dirt_roads.png';

// Mock vehicle data for simulation
const vehicles = [
  { id: 1, type: 'tractor', x: 20, y: 30, delay: 0 },
  { id: 2, type: 'harvester', x: 80, y: 60, delay: 2 },
  { id: 3, type: 'trolley', x: 40, y: 80, delay: 1 },
  { id: 4, type: 'tractor', x: 60, y: 20, delay: 4 },
  { id: 5, type: 'harvester', x: 10, y: 50, delay: 3 },
];

export default function MapBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-green-50 z-0">
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
          <div className="w-16 h-16 bg-green-500/20 rounded-full animate-ping absolute -top-6 -left-6"></div>
          <div className="w-4 h-4 bg-green-600 border-2 border-white rounded-full shadow-lg relative z-10"></div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap shadow-md border border-green-500">
            My Farm
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleMarker({ type, x, y, delay }: { type: string, x: number, y: number, delay: number }) {
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
      className="absolute z-10 p-1.5 bg-white rounded-full shadow-md text-gray-800 border border-green-100"
    >
      {type === 'tractor' && <Tractor size={16} fill="currentColor" className="text-green-600" />}
      {type === 'harvester' && <Sprout size={16} fill="currentColor" className="text-orange-500" />}
      {type === 'trolley' && <Truck size={16} fill="currentColor" className="text-amber-700" />}
    </motion.div>
  );
}
