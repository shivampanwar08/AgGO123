# AgGo - Agricultural Equipment Rental App
## Complete Source Code

---

## TABLE OF CONTENTS
1. Global Theme & Styles
2. Main App Router
3. Pages
4. Components
5. Dependencies & Installation

---

# 1. GLOBAL THEME & STYLES

## File: `client/src/index.css`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: "Plus Jakarta Sans", sans-serif;

  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;

  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
}

/* AgGo Futuristic Theme */
:root {
  --background: 210 20% 98%;
  --foreground: 220 40% 10%;
  
  --card: 0 0% 100%;
  --card-foreground: 220 40% 10%;
  
  --popover: 0 0% 100%;
  --popover-foreground: 220 40% 10%;
  
  --primary: 142 70% 45%;
  --primary-foreground: 0 0% 100%;
  
  --secondary: 210 20% 94%;
  --secondary-foreground: 220 40% 10%;
  
  --muted: 210 20% 90%;
  --muted-foreground: 215 20% 45%;
  
  --accent: 142 70% 45%;
  --accent-foreground: 0 0% 100%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 210 20% 90%;
  --input: 210 20% 90%;
  --ring: 142 70% 45%;
  
  --radius: 1.5rem;
}

.dark {
  --background: 220 40% 5%;
  --foreground: 210 20% 98%;
  --card: 220 35% 10%;
  --card-foreground: 210 20% 98%;
  --popover: 220 35% 10%;
  --popover-foreground: 210 20% 98%;
  --primary: 142 80% 50%;
  --primary-foreground: 220 40% 5%;
  --secondary: 215 30% 15%;
  --secondary-foreground: 210 20% 98%;
  --muted: 215 30% 15%;
  --muted-foreground: 215 20% 65%;
  --accent: 215 30% 15%;
  --accent-foreground: 210 20% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 215 30% 15%;
  --input: 215 30% 15%;
  --ring: 142 80% 50%;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply font-sans antialiased bg-background text-foreground;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg;
  }
  
  .glass-dark {
    @apply bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl;
  }

  .neon-glow {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

---

# 2. MAIN APP ROUTER

## File: `client/src/App.tsx`

```typescript
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Drivers from "@/pages/Drivers";
import DriverProfile from "@/pages/DriverProfile";
import Billing from "@/pages/Billing";
import Tracking from "@/pages/Tracking";
import Shops from "@/pages/Shops";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/drivers" component={Drivers}/>
      <Route path="/driver/:id" component={DriverProfile}/>
      <Route path="/shops" component={Shops}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/billing" component={Billing}/>
      <Route path="/tracking" component={Tracking}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

---

# 3. PAGES

## File: `client/src/pages/Home.tsx`

```typescript
import MapBackground from "@/components/MapBackground";
import LocationCard from "@/components/LocationCard";
import VehicleSheet from "@/components/VehicleSheet";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col">
      <div className="flex-1 relative pb-16">
        <MapBackground />
        <LocationCard />
      </div>
      <VehicleSheet />
      <BottomNav />
    </div>
  );
}
```

---

## File: `client/src/pages/Drivers.tsx`

```typescript
import { ArrowLeft, Star, Tractor, MapPin, Phone, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import BottomNav from '@/components/BottomNav';
import { useEffect, useState } from 'react';

export default function Drivers() {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const itemsParam = searchParams.get('items');
  const selectedTypes = itemsParam ? itemsParam.split(',') : [];

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24">
      <div className="bg-white/80 backdrop-blur-xl px-4 py-4 sticky top-0 z-10 shadow-sm flex items-center gap-4 border-b border-white/20">
        <Link href="/">
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} className="text-gray-800" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {selectedTypes.length > 0 ? 'Matching Owners' : 'Nearby Owners'}
          </h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Within 15km radius</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {selectedTypes.length > 0 ? (
            selectedTypes.map(type => (
              <span key={type} className="bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border border-green-500 shadow-lg shadow-green-500/20 animate-in zoom-in duration-300">
                Seeking: {type}
              </span>
            ))
          ) : (
            <>
              <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm">Has Tractor</span>
              <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm">Has Trolley</span>
            </>
          )}
        </div>

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Available Now</h2>
        
        <DriverCard 
          id="d1"
          name="Ram Lal"
          village="Rampur Village"
          equipment={['Tractor', 'Trolley']}
          rating="4.9"
          distance="2.5 km"
          status="online"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
          itemsParam={itemsParam}
        />
        
        {(!itemsParam || itemsParam.includes('Tractor')) && (
           <DriverCard 
            id="d2"
            name="Balwinder Singh"
            village="Kishanpur"
            equipment={['Tractor', 'Harvester']}
            rating="4.7"
            distance="5.2 km"
            status="online"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
            itemsParam={itemsParam}
          />
        )}

        {(!itemsParam || itemsParam.includes('Seeder')) && (
           <DriverCard 
            id="d3"
            name="Mukesh Patel"
            village="Shyam Nagar"
            equipment={['Seeder', 'Rotavator']}
            rating="4.5"
            distance="8.0 km"
            status="online"
            image="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop"
            itemsParam={itemsParam}
          />
        )}

        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-8 mb-3 ml-1">Currently Busy / Offline</h2>
        
        <DriverCard 
          id="d4"
          name="Suresh Kumar"
          village="Rampur Village"
          equipment={['Tractor']}
          rating="4.2"
          status="offline"
          image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
          itemsParam={itemsParam}
        />
      </div>
      <BottomNav />
    </div>
  );
}

function DriverCard({ id, name, village, equipment, rating, distance, status, image, itemsParam }: any) {
  const isOnline = status === 'online';
  const link = isOnline ? `/driver/${id}${itemsParam ? `?items=${itemsParam}` : ''}` : "#";
  
  return (
    <Link href={link}>
      <div className={`relative overflow-hidden glass rounded-3xl p-1 border border-white/40 transition-all duration-300 ${isOnline ? 'active:scale-[0.98] hover:shadow-xl hover:border-green-200 cursor-pointer' : 'opacity-60 grayscale cursor-not-allowed'}`}>
        <div className="bg-white/50 rounded-[1.25rem] p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-4 border-white rounded-full flex items-center justify-center ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
                {isOnline && <div className="w-full h-full rounded-full animate-ping opacity-20 bg-green-500 absolute"></div>}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{name}</h3>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{village}</p>
                </div>
                {distance && (
                  <span className="text-[10px] font-bold text-primary bg-green-50/80 px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                    <MapPin size={10} /> {distance}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-xs font-bold text-gray-700 mt-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                <span>{rating} Rating</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-4 pt-3 border-t border-gray-100/50">
            {equipment.map((item: string, i: number) => (
              <span key={i} className="text-[10px] font-bold bg-gray-100/80 text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Tractor size={12} className="text-gray-400" /> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

---

## File: `client/src/pages/DriverProfile.tsx`

```typescript
import { ArrowLeft, Star, MapPin, Tractor, Plus, Check, ShieldCheck } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';

const driverData = {
  id: 'd1',
  name: 'Ram Lal',
  village: 'Rampur Village',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  rating: 4.9,
  trips: 124,
  joined: '2021',
  equipment: [
    { id: 'e1', name: 'Mahindra 575 DI Tractor', type: 'Tractor', price: 800, image: 'https://images.unsplash.com/photo-1592600584051-38a3c93d8065?w=100&h=100&fit=crop' },
    { id: 'e2', name: 'Hydraulic Trolley', type: 'Trolley', price: 300, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop' }, 
    { id: 'e3', name: '7ft Rotavator', type: 'Rotavator', price: 500, image: 'https://images.unsplash.com/photo-1530267981375-273474d11e61?w=100&h=100&fit=crop' }, 
    { id: 'e4', name: 'Seed Drill', type: 'Seeder', price: 400, image: 'https://images.unsplash.com/photo-1595842878568-388444927064?w=100&h=100&fit=crop' }, 
  ]
};

export default function DriverProfile() {
  const [, setLocation] = useLocation();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const itemsParam = searchParams.get('items');
    
    if (itemsParam) {
      const selectedTypes = itemsParam.split(',');
      const initialIds = driverData.equipment
        .filter(e => selectedTypes.includes(e.type))
        .map(e => e.id);
      
      setAddedItems(initialIds);
    }
  }, []);

  const toggleItem = (id: string) => {
    setAddedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <div className="relative h-64 bg-green-600 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => setLocation('/drivers')}
            className="w-12 h-12 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors border border-white/10"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80')] bg-cover bg-center opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-16 bg-gradient-to-t from-black/90 to-transparent">
           <h1 className="text-3xl font-bold text-white tracking-tight">{driverData.name}</h1>
           <div className="flex items-center gap-2 text-white/80 mt-1">
              <MapPin size={16} />
              <span className="text-sm font-medium tracking-wide uppercase">{driverData.village}</span>
            </div>
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-10">
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex justify-between items-center">
             <div className="flex flex-col items-center px-4 border-r border-gray-200/50">
               <span className="text-2xl font-bold text-gray-900">{driverData.rating}</span>
               <div className="flex text-yellow-400 text-xs">★★★★★</div>
               <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Rating</span>
             </div>
             <div className="flex flex-col items-center px-4 border-r border-gray-200/50">
               <span className="text-2xl font-bold text-gray-900">{driverData.trips}</span>
               <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Trips</span>
             </div>
             <div className="flex flex-col items-center px-4">
               <span className="text-2xl font-bold text-gray-900">3Y</span>
               <span className="text-[10px] text-gray-400 uppercase font-bold mt-1">Exp</span>
             </div>
          </div>
        </div>
      </div>

      <div className="p-4 mt-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Inventory</h2>
        <div className="space-y-4">
          {driverData.equipment.map(item => (
            <div key={item.id} className={`glass rounded-3xl p-1 transition-all duration-300 ${addedItems.includes(item.id) ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20' : ''}`}>
              <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-3 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">{item.type}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                       <span className="font-bold text-xl text-gray-900">₹{item.price}</span>
                       <span className="text-xs text-gray-400 font-medium">/hr</span>
                    </div>
                    
                    <button 
                      onClick={() => toggleItem(item.id)}
                      className={`h-10 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        addedItems.includes(item.id)
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-gray-200'
                      }`}
                    >
                      {addedItems.includes(item.id) ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {addedItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
           <div className="glass-dark rounded-3xl p-1 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
             <div className="bg-black/80 backdrop-blur-xl rounded-[1.25rem] p-4 flex items-center justify-between">
                <div className="flex flex-col pl-2">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{addedItems.length} items</span>
                  <span className="font-bold text-xl text-white">₹{addedItems.reduce((acc, id) => acc + (driverData.equipment.find(e => e.id === id)?.price || 0), 0)}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                </div>
                <button 
                  onClick={() => setLocation('/billing')}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold text-base py-3 px-8 rounded-xl shadow-lg shadow-green-500/40 transition-all active:scale-95 neon-glow"
                >
                  Book Now
                </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
```

---

## File: `client/src/pages/Billing.tsx`

```typescript
import { ArrowLeft, Trash2, CheckCircle2, Circle, User, CarOff, Plus, Minus } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

export default function Billing() {
  const [, setLocation] = useLocation();
  const [withDriver, setWithDriver] = useState(true);
  const [items, setItems] = useState([{ name: 'Tractor', price: 800 }, { name: 'Trolley', price: 300 }]);
  const [hours, setHours] = useState(4);

  const removeItem = (itemToRemove: string) => {
    setItems(prev => prev.filter(i => i.name !== itemToRemove));
  };

  const totalEquipment = items.reduce((acc, item) => acc + item.price, 0);
  const subtotal = totalEquipment * hours;
  const driverFee = withDriver ? 200 * hours : 0;
  const platformFee = 50;
  const total = subtotal + driverFee + platformFee;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm border-b border-white/20">
        <button onClick={() => setLocation('/drivers')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Confirm Rental</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Rental Duration</h3>
            <div className="flex items-center justify-between bg-gray-100/50 p-4 rounded-xl">
              <button onClick={() => setHours(Math.max(1, hours - 1))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center active:scale-90 transition-transform shadow-sm">
                <Minus size={18} />
              </button>
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-900">{hours}</span>
                <span className="text-gray-500 text-sm ml-2">hours</span>
              </div>
              <button onClick={() => setHours(hours + 1)} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center active:scale-90 transition-transform shadow-sm">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Service Type</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setWithDriver(true)}
                className={`flex-1 py-3 px-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all font-bold text-sm ${withDriver ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-white text-gray-500'}`}
              >
                <User size={20} />
                With Driver
              </button>
              <button 
                onClick={() => setWithDriver(false)}
                className={`flex-1 py-3 px-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all font-bold text-sm ${!withDriver ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-white text-gray-500'}`}
              >
                <CarOff size={20} />
                Self Drive
              </button>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Equipment</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-800">{item.name} × {hours}h</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">₹{item.price * hours}</span>
                    <button onClick={() => removeItem(item.name)} className="text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Pricing</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Equipment ({hours}h)</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              {withDriver && (
                 <div className="flex justify-between">
                  <span className="text-gray-600">Driver Fee ({hours}h)</span>
                  <span className="font-bold">₹{driverFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-bold">₹{platformFee}</span>
              </div>
              <div className="pt-3 border-t border-dashed border-gray-300 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-white via-white/90 to-transparent pt-10">
        <button 
          onClick={() => setLocation(`/tracking?driver=${withDriver}`)}
          className="w-full bg-black text-white font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-95 transition-transform flex justify-center items-center gap-2"
        >
          Confirm (₹{total})
        </button>
      </div>
    </div>
  );
}
```

---

## File: `client/src/pages/Tracking.tsx`

```typescript
import { ArrowLeft, Star, Phone, MessageCircle, ShieldCheck, Navigation } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import MapBackground from '@/components/MapBackground';

export default function Tracking() {
  const [, setLocation] = useLocation();
  const [eta, setEta] = useState(15);
  const searchParams = new URLSearchParams(window.location.search);
  const withDriver = searchParams.get('driver') === 'true';

  useEffect(() => {
    if (withDriver) {
      const interval = setInterval(() => {
        setEta(prev => (prev > 0 ? prev - 1 : 0));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [withDriver]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col">
      <div className="absolute inset-0 z-0">
        <MapBackground />
      </div>

      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={() => setLocation('/')}
          className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg flex items-center justify-center border border-white/20 hover:bg-white transition-all"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 glass rounded-t-3xl p-1 shadow-2xl">
        <div className="bg-white/80 backdrop-blur-md rounded-t-[1.75rem] p-6 pb-8">
        
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium mb-1">
                {withDriver ? 'Driver arriving in' : 'Distance to Pickup'}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                {withDriver ? `${eta} mins` : '2.5 km'}
              </h2>
            </div>
            
            {!withDriver && (
               <button className="bg-black text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
                 <Navigation size={18} /> Start Nav
               </button>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Owner" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Ram Lal</h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">4.9</span>
                <span>•</span>
                <span className="text-xs">Mahindra 575 DI</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                <Phone size={18} />
              </button>
               <button className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
                <MessageCircle size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {withDriver ? (
               <>
                <div className="flex items-start gap-3 relative">
                  <div className="w-4 h-4 mt-1 bg-green-500 rounded-full flex-shrink-0 ring-4 ring-green-100 animate-pulse"></div>
                  <div className="flex-1 border-b border-gray-200/50 pb-4">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Coming From</p>
                    <p className="font-bold text-gray-900">Ram Lal's Farm, Sector 4</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                   <div className="w-4 h-4 mt-1 bg-black rounded-sm flex-shrink-0 ring-4 ring-gray-200"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Destination</p>
                    <p className="font-bold text-gray-900">Your Farm Location</p>
                  </div>
                </div>
               </>
            ) : (
               <>
                <div className="flex items-start gap-3 relative">
                  <div className="w-4 h-4 mt-1 bg-green-500 rounded-full flex-shrink-0 ring-4 ring-green-100 animate-pulse"></div>
                  <div className="flex-1 border-b border-gray-200/50 pb-4">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Current Location</p>
                    <p className="font-bold text-gray-900">Your Farm Location</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                   <div className="w-4 h-4 mt-1 bg-black rounded-sm flex-shrink-0 ring-4 ring-gray-200"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Pickup Equipment At</p>
                    <p className="font-bold text-gray-900">Ram Lal's Farm, Sector 4</p>
                  </div>
                </div>
               </>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <ShieldCheck size={16} className="text-green-600" />
               <span className="text-sm font-medium text-gray-600">Equipment Insured</span>
            </div>
            <button className="text-red-500 font-bold text-sm hover:text-red-600 transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## File: `client/src/pages/Settings.tsx`

```typescript
import { User, Settings as SettingsIcon, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

export default function Settings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Farmer John',
    phone: '+91 98765 43210',
    email: 'farmer.john@aggo.com',
    village: 'Rampur Village',
    bankAccount: '****1234',
    walletBalance: 2450
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="glass rounded-b-3xl p-1 shadow-lg">
        <div className="bg-white/60 backdrop-blur-sm rounded-b-[1.25rem] p-6">
          <div className="flex items-start gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                 <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600 text-sm mt-1">{profile.phone}</p>
                <div className="mt-2 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-lg inline-block">
                  Gold Member
                </div>
              </div>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Edit2 size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="p-4 space-y-4 mt-4">
          <div className="glass rounded-3xl p-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full mt-2 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full mt-2 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Village</label>
                <input type="text" value={profile.village} onChange={(e) => setProfile({...profile, village: e.target.value})} className="w-full mt-2 p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <button onClick={() => setIsEditing(false)} className="w-full bg-green-500 text-white font-bold py-3 rounded-xl mt-4 active:scale-95 transition-transform">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4 mt-4">
        
        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Wallet Balance</p>
                  <p className="text-xs text-gray-500">₹{profile.walletBalance}</p>
                </div>
              </div>
              <button className="text-green-600 font-bold text-sm">Add Money</button>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] overflow-hidden">
            <MenuItem icon={<Bell size={20} />} label="Notifications" onClick={() => alert('Notifications: You have 3 new messages')} />
            <MenuItem icon={<SettingsIcon size={20} />} label="App Settings" onClick={() => alert('Settings: Dark Mode, Language, Units')} />
          </div>
        </div>

        <div className="glass rounded-3xl p-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] overflow-hidden">
            <MenuItem icon={<HelpCircle size={20} />} label="Help & Support" onClick={() => alert('Support: Call +91 1800-1234567 or visit aggo.com/support')} />
            <MenuItem icon={<User size={20} />} label="About AgGo" onClick={() => alert('AgGo v1.0.0 - Agriculture Equipment Rental Platform')} />
          </div>
        </div>

        <button className="glass rounded-3xl p-1 w-full active:scale-95 transition-transform">
          <div className="bg-white/60 backdrop-blur-sm rounded-[1.25rem] p-4 flex items-center gap-4 text-red-500 font-bold">
             <LogOut size={20} />
             <span>Log Out</span>
          </div>
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">AgGo Version 1.0.0 | © 2025</p>
      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 border-b border-gray-100/50 last:border-0 hover:bg-gray-50/50 transition-colors active:scale-95">
      <div className="flex items-center gap-4 text-gray-700">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-300" />
    </button>
  );
}
```

---

## File: `client/src/pages/Shops.tsx`

```typescript
import { ArrowLeft, Star, MapPin, Phone, Search, ShoppingCart, TrendingDown } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useState } from 'react';

const productCatalog = [
  {
    id: 'p1',
    name: 'Urea Fertilizer (45kg)',
    category: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop',
    prices: [
      { shopId: 's2', price: 266, inStock: true },
      { shopId: 's1', price: 270, inStock: true },
      { shopId: 's3', price: 285, inStock: false },
    ]
  },
  {
    id: 'p2',
    name: 'DAP Fertilizer (50kg)',
    category: 'Fertilizers',
    image: 'https://images.unsplash.com/photo-1563456022-c63b540133b3?w=100&h=100&fit=crop',
    prices: [
      { shopId: 's1', price: 1350, inStock: true },
      { shopId: 's3', price: 1380, inStock: true },
    ]
  },
  {
    id: 'p3',
    name: 'Tractor Engine Oil (5L)',
    category: 'Spare Parts',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=100&h=100&fit=crop',
    prices: [
      { shopId: 's2', price: 1800, inStock: true },
      { shopId: 's1', price: 1850, inStock: true },
    ]
  }
];

const shops = [
  {
    id: 's1',
    name: "Kisan Seva Kendra",
    type: "Seeds & Fertilizers",
    rating: "4.8",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop",
    isOpen: true
  },
  {
    id: 's2',
    name: "Agro Machinery Parts",
    type: "Spare Parts & Repair",
    rating: "4.5",
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=100&h=100&fit=crop",
    isOpen: true
  },
  {
    id: 's3',
    name: "Green Fields Supplies",
    type: "Pesticides",
    rating: "4.9",
    distance: "3.8 km",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=100&h=100&fit=crop",
    isOpen: false
  }
];

export default function Shops() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      const results = productCatalog.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm space-y-3">
        <h1 className="text-xl font-bold">Agri Shops Nearby</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Urea, DAP, Seeds..." 
            className="w-full bg-gray-100 text-gray-900 rounded-xl pl-10 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 transition-all"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {searchQuery.length > 1 ? (
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Found {searchResults.length} Products
            </h2>
            
            {searchResults.map(product => (
              <ProductComparisonCard key={product.id} product={product} />
            ))}

            {searchResults.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p>No products found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">All Shops</h2>
              <span className="text-xs text-green-600 font-bold">View Map</span>
            </div>

            {shops.map(shop => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function ProductComparisonCard({ product }: any) {
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-50 flex gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-bold">
            <TrendingDown size={12} />
            Best Price: ₹{bestPrice.price}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {sortedPrices.map((offer, index) => {
          const shop = shops.find(s => s.id === offer.shopId);
          const isCheapest = index === 0;

          return (
            <div key={offer.shopId} className={`p-3 flex items-center justify-between ${isCheapest ? 'bg-green-50/30' : ''}`}>
              <div className="flex items-center gap-3">
                 <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isCheapest ? 'text-gray-900' : 'text-gray-600'}`}>
                      {shop?.name}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <MapPin size={10} /> {shop?.distance}
                    </span>
                 </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900">₹{offer.price}</div>
                {offer.inStock ? (
                   <span className="text-[10px] text-green-600 font-medium">In Stock</span>
                ) : (
                   <span className="text-[10px] text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
              
              {offer.inStock && (
                 <button className="ml-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                   <ShoppingCart size={14} />
                 </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShopCard({ name, type, rating, distance, image, isOpen }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 shadow-sm hover:shadow-md transition-all">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900">{name}</h3>
          {isOpen ? (
             <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">OPEN</span>
          ) : (
             <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">CLOSED</span>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mb-1">{type}</p>
        
        <div className="flex items-center justify-between mt-2">
           <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span>{rating}</span>
            <span className="text-gray-300">•</span>
            <span>{distance}</span>
          </div>
          
          <button className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100">
            <Phone size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

# 4. COMPONENTS

## File: `client/src/components/VehicleSheet.tsx`

```typescript
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
      <Drawer.Content className="fixed bottom-16 left-0 right-0 z-30 flex flex-col bg-white/90 backdrop-blur-xl rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] h-[85vh] max-h-[96%] outline-none pb-16 border-t border-white/50">
        <div className="p-4 pb-0 flex justify-center flex-shrink-0">
          <div className="w-16 h-1.5 bg-gray-300/50 rounded-full mb-2 backdrop-blur-sm" />
        </div>

        <div className="px-6 pb-4 border-b border-gray-100/50 flex-shrink-0 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Rent Equipment</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Select Machines</p>
          </div>
          {selectedItems.length > 0 && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-green-500/30">
              {selectedItems.length} Selected
            </div>
          )}
        </div>

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

        {selectedItems.length > 0 && (
          <div className="p-4 border-t border-gray-100/50 bg-white/80 backdrop-blur-md z-50 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button 
              onClick={() => {
                const query = selectedItems.join(',');
                setLocation(`/drivers?items=${query}`);
              }}
              className="w-full bg-primary hover:bg-green-500 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-green-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 animate-in slide-in-from-bottom-4 duration-200 neon-glow"
            >
              Proceed ({selectedItems.length})
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
      className={`cursor-pointer relative flex items-center p-4 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
        selected 
          ? 'bg-green-50/80 border-green-500 shadow-lg shadow-green-500/10' 
          : 'bg-white/60 border-gray-100 hover:border-green-200 hover:bg-white/80'
      }`}
    >
      {tag && (
        <span className="absolute -top-2.5 right-4 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md">
          {tag}
        </span>
      )}
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border mr-4 flex-shrink-0 transition-colors duration-300 ${selected ? 'bg-white border-green-200' : 'bg-gray-50 border-gray-100'}`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-gray-900 text-lg tracking-tight">{name}</h4>
          <span className="font-bold text-primary text-lg">{price}</span>
        </div>
        
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{desc}</p>
        </div>
      </div>

      {selected && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-1.5 shadow-lg shadow-green-500/30 animate-in zoom-in duration-200">
          <Check size={14} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}
```

---

## File: `client/src/components/BottomNav.tsx`

```typescript
import { Link, useLocation } from 'wouter';
import { Home, Users, ShoppingBag, Settings } from 'lucide-react';

export default function BottomNav() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-2xl z-50 h-20 px-4 pb-4 rounded-t-3xl">
      <div className="grid grid-cols-4 h-full items-center">
        <NavItem 
          to="/" 
          icon={<Home size={24} />} 
          label="Home" 
          active={isActive('/')} 
        />
        <NavItem 
          to="/drivers" 
          icon={<Users size={24} />} 
          label="Drivers" 
          active={isActive('/drivers')} 
        />
        <NavItem 
          to="/shops" 
          icon={<ShoppingBag size={24} />} 
          label="Shops" 
          active={isActive('/shops')} 
        />
        <NavItem 
          to="/settings" 
          icon={<Settings size={24} />} 
          label="Settings" 
          active={isActive('/settings')} 
        />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, active }: any) {
  return (
    <Link href={to} className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className={`transition-all duration-300 p-2 rounded-xl ${active ? 'bg-green-100/50 -translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-wide transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 hidden'}`}>
        {label}
      </span>
      {active && (
        <div className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_currentColor]" />
      )}
    </Link>
  );
}
```

---

## File: `client/src/components/LocationCard.tsx`

```typescript
import { MapPin } from 'lucide-react';

export default function LocationCard() {
  return (
    <div className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-4 relative flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-green-50 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-100"></div>
          </div>
          
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Your Current Location</p>
            <p className="text-sm font-bold text-gray-900 truncate">HSR Layout, Sector 2</p>
          </div>

          <div className="text-gray-300">
             <MapPin size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## File: `client/src/components/MapBackground.tsx`

```typescript
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tractor, Truck, Sprout, Leaf } from 'lucide-react';
import mapImage from '@assets/generated_images/top-down_rural_farm_map_with_fields_and_dirt_roads.png';

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
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${mapImage})` }}
      />

      {vehicles.map((v) => (
        <VehicleMarker key={v.id} {...v} />
      ))}

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
```

---

# 5. DEPENDENCIES

## File: `package.json` (Key Dependencies)

```json
{
  "name": "aggo-app",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.4.2",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-drawer": "^0.0.14",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-slot": "^2.1.1",
    "@radix-ui/react-tooltip": "^1.1.6",
    "@tanstack/react-query": "^5.68.1",
    "@tailwindcss/vite": "^4.1.9",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "date-fns": "^3.3.1",
    "framer-motion": "^11.0.11",
    "lucide-react": "^0.407.0",
    "postcss": "^8.4.48",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "sonner": "^1.4.41",
    "tailwind-merge": "^2.4.0",
    "tailwindcss": "^4.1.9",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.1",
    "wouter": "^3.3.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@replit/vite-plugin-cartographer": "^3.0.1",
    "@replit/vite-plugin-dev-banner": "^3.0.1",
    "@replit/vite-plugin-runtime-error-modal": "^3.0.1",
    "@types/react": "^18.3.8",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.3",
    "typescript": "^5.6.2",
    "vite": "^5.4.10"
  }
}
```

---

## Installation Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build
```

---

## Setup Notes

1. **Font**: This project uses "Plus Jakarta Sans" from Google Fonts
2. **Icons**: Lucide React for all icons
3. **Routing**: Wouter for lightweight client-side routing
4. **Styling**: Tailwind CSS with custom utilities
5. **Animations**: Framer Motion for smooth animations
6. **Forms**: React Hook Form with Zod validation

---

## Features Implemented

✅ Equipment Selection Flow
✅ Driver Browsing & Filtering (15km radius)
✅ Equipment Inventory Management
✅ Interactive Billing with Real-time Calculations
✅ Live Rental Tracking with ETA Countdown
✅ Editable User Profile & Wallet
✅ Shop Price Comparison
✅ Futuristic Glassmorphism Design
✅ Neon Green Accent Colors
✅ Full State Management with Mock Data
✅ Responsive Mobile Design

---

## Color Scheme

- **Primary**: Neon Green (#22c55e) - Vibrant & Futuristic
- **Background**: Cool Greyish White
- **Glass**: White with 80% opacity + Backdrop Blur
- **Typography**: Plus Jakarta Sans font

---

## Design Philosophy

Elevated, futuristic design with:
- Glassmorphism UI effects
- Smooth animations & transitions
- Neon glow effects on interactive elements
- Active whitespace for clean layouts
- Micro-interactions for user feedback

---

End of Complete Codebase Document
Download this file and extract all code sections as needed.
