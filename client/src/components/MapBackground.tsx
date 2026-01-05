import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tractor, Truck, Sprout, Leaf, Cloud, CloudRain, Sun, Wind } from 'lucide-react';
import mapImage from '@assets/generated_images/satellite_view_of_agricultural_fields_punjab.png';

// Mock vehicle data for simulation
const vehicles = [
  { id: 1, type: 'tractor', x: 20, y: 30, delay: 0 },
  { id: 2, type: 'harvester', x: 80, y: 60, delay: 2 },
  { id: 3, type: 'trolley', x: 40, y: 80, delay: 1 },
  { id: 4, type: 'tractor', x: 60, y: 20, delay: 4 },
  { id: 5, type: 'harvester', x: 10, y: 50, delay: 3 },
];

interface WeatherData {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  cloudCover: number;
  description: string;
  isRaining: boolean;
}

export default function MapBackground() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Fetch weather for current location (using Open-Meteo free API - no API key needed)
    const fetchWeather = async () => {
      try {
        // Use default coordinates (farmer's location in Punjab, India)
        const latitude = 31.1704;
        const longitude = 77.1734;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover&timezone=auto`
        );
        
        if (response.ok) {
          const data = await response.json();
          const current = data.current;
          
          // Interpret weather codes (WMO)
          const weatherCodes: { [key: number]: { description: string; isRaining: boolean } } = {
            0: { description: 'Clear Sky', isRaining: false },
            1: { description: 'Mainly Clear', isRaining: false },
            2: { description: 'Partly Cloudy', isRaining: false },
            3: { description: 'Overcast', isRaining: false },
            45: { description: 'Foggy', isRaining: false },
            48: { description: 'Depositing Rime Fog', isRaining: false },
            51: { description: 'Light Drizzle', isRaining: true },
            53: { description: 'Moderate Drizzle', isRaining: true },
            55: { description: 'Dense Drizzle', isRaining: true },
            61: { description: 'Slight Rain', isRaining: true },
            63: { description: 'Moderate Rain', isRaining: true },
            65: { description: 'Heavy Rain', isRaining: true },
            71: { description: 'Slight Snow', isRaining: false },
            73: { description: 'Moderate Snow', isRaining: false },
            75: { description: 'Heavy Snow', isRaining: false },
            77: { description: 'Snow Grains', isRaining: false },
            80: { description: 'Slight Rain Showers', isRaining: true },
            81: { description: 'Moderate Rain Showers', isRaining: true },
            82: { description: 'Violent Rain Showers', isRaining: true },
            85: { description: 'Slight Snow Showers', isRaining: false },
            86: { description: 'Heavy Snow Showers', isRaining: false },
            95: { description: 'Thunderstorm', isRaining: true },
            96: { description: 'Thunderstorm with Hail', isRaining: true },
            99: { description: 'Thunderstorm with Heavy Hail', isRaining: true },
          };

          const weatherInfo = weatherCodes[current.weather_code] || { description: 'Unknown', isRaining: false };

          setWeather({
            temperature: Math.round(current.temperature_2m),
            humidity: current.relative_humidity_2m,
            weatherCode: current.weather_code,
            windSpeed: Math.round(current.wind_speed_10m),
            cloudCover: current.cloud_cover,
            description: weatherInfo.description,
            isRaining: weatherInfo.isRaining,
          });
        }
      } catch (error) {
        console.log('Weather fetch failed, using default conditions');
        // Set default sunny weather on error
        setWeather({
          temperature: 28,
          humidity: 65,
          weatherCode: 0,
          windSpeed: 5,
          cloudCover: 20,
          description: 'Clear Sky',
          isRaining: false,
        });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-green-50 z-0">
      {/* Static Map Image */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 ${
          weather?.isRaining ? 'opacity-70' : weather?.cloudCover && weather.cloudCover > 60 ? 'opacity-80' : 'opacity-90'
        }`}
        style={{ backgroundImage: `url(${mapImage})` }}
      />

      {/* Sky overlay based on weather */}
      {weather && (
        <div className="absolute inset-0 w-full h-full">
          {/* Sunny Sky */}
          {!weather.isRaining && weather.cloudCover < 30 && (
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300/0 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Cloudy Sky */}
          {!weather.isRaining && weather.cloudCover >= 30 && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-400/20 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Rainy Sky */}
          {weather.isRaining && (
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600/40 via-gray-500/20 to-transparent pointer-events-none" />
          )}

          {/* Animated Clouds */}
          {weather.cloudCover > 20 && (
            <>
              <Cloud className="absolute top-10 left-10 text-white/50 z-5 opacity-70" size={80} />
              <motion.div
                animate={{ x: 50 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-20 right-0 z-5"
              >
                <Cloud className="text-white/40" size={100} />
              </motion.div>
              <Cloud className="absolute top-1/4 right-20 text-white/40 z-5 opacity-60" size={70} />
            </>
          )}

          {/* Rain Effect */}
          {weather.isRaining && (
            <>
              <div className="absolute inset-0 pointer-events-none z-5">
                {/* Animated raindrops */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, opacity: 1 }}
                    animate={{ y: window.innerHeight, opacity: 0 }}
                    transition={{
                      duration: 2 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'linear',
                    }}
                    className="absolute w-0.5 h-8 bg-blue-300/60 rounded-full"
                    style={{
                      left: `${(i * 8.33)}%`,
                      filter: 'blur(0.5px)',
                    }}
                  />
                ))}
              </div>
              {/* Additional rain streaks */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/10 to-blue-200/5 pointer-events-none z-5" />
            </>
          )}
        </div>
      )}

      {/* Weather Info Badge */}
      {weather && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="fixed top-20 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/30"
        >
          <div className="flex items-center gap-2">
            {weather.isRaining ? (
              <CloudRain className="text-blue-500" size={20} />
            ) : weather.cloudCover > 60 ? (
              <Cloud className="text-gray-500" size={20} />
            ) : (
              <Sun className="text-yellow-500" size={20} />
            )}
            <div className="text-xs">
              <p className="font-bold text-gray-900">{weather.temperature}°C</p>
              <p className="text-gray-600 text-[11px]">{weather.description}</p>
            </div>
          </div>
          <div className="text-[10px] text-gray-600 mt-1 flex items-center gap-1">
            <Wind size={12} /> {weather.windSpeed} km/h
          </div>
        </motion.div>
      )}

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
