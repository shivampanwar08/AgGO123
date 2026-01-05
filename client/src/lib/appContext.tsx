import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from './translations';

export type UserRole = 'user' | 'equipment-renter' | 'land-owner' | 'shopper';

export interface EquipmentRenterData {
  ownerName: string;
  village: string;
  phone: string;
  bankAccount: string;
  isDriver: boolean;
  drivingLicense?: string;
  equipment: Array<{ 
    id: number; 
    name: string; 
    pricePerDay: number; 
    quantity: number;
    image?: string;
  }>;
}

export interface LandOwnerData {
  ownerName: string;
  village: string;
  phone: string;
  bankAccount: string;
  lands: Array<{ id: number; size: number; soilType: string; waterAccess: string; pricePerAcre: number; image?: string }>;
}

export interface ShopperData {
  shopName: string;
  shopOwner: string;
  village: string;
  phone: string;
  shopAddress: string;
  bankAccount: string;
  products: Array<{ 
    id: number; 
    name: string; 
    category: string; 
    price: number; 
    quantity: number;
    image?: string;
  }>;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  userRole: UserRole | null;
  setUserRole: (role: UserRole) => void;
  equipmentData: EquipmentRenterData | null;
  setEquipmentData: (data: EquipmentRenterData) => void;
  landData: LandOwnerData | null;
  setLandData: (data: LandOwnerData) => void;
  shopperData: ShopperData | null;
  setShopperData: (data: ShopperData) => void;
  allEquipmentRenters: EquipmentRenterData[];
  addEquipmentRenter: (data: EquipmentRenterData) => void;
  allLandOwners: LandOwnerData[];
  addLandOwner: (data: LandOwnerData) => void;
  allShoppers: ShopperData[];
  addShopper: (data: ShopperData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('aggo_language') as Language) || 'en';
  });

  const [darkMode, setDarkModeState] = useState(() => {
    return localStorage.getItem('aggo_darkmode') === 'true';
  });

  const [userRole, setUserRoleState] = useState<UserRole | null>(() => {
    return (localStorage.getItem('aggo_user_role') as UserRole) || null;
  });

  const [equipmentData, setEquipmentDataState] = useState<EquipmentRenterData | null>(() => {
    const saved = localStorage.getItem('aggo_equipment_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [landData, setLandDataState] = useState<LandOwnerData | null>(() => {
    const saved = localStorage.getItem('aggo_land_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [shopperData, setShopperDataState] = useState<ShopperData | null>(() => {
    const saved = localStorage.getItem('aggo_shopper_data');
    return saved ? JSON.parse(saved) : null;
  });

  const [allEquipmentRenters, setAllEquipmentRenters] = useState<EquipmentRenterData[]>(() => {
    const saved = localStorage.getItem('aggo_all_equipment');
    return saved ? JSON.parse(saved) : [
      {
        ownerName: "Ram Lal",
        village: "Rampur Village",
        phone: "+91 98765 43210",
        bankAccount: "1234567890",
        isDriver: true,
        equipment: [
          { id: 1, name: "Tractor", pricePerDay: 1500, quantity: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
          { id: 2, name: "Trolley", pricePerDay: 500, quantity: 2 }
        ]
      },
      {
        ownerName: "Balwinder Singh",
        village: "Kishanpur",
        phone: "+91 98765 43211",
        bankAccount: "0987654321",
        isDriver: true,
        equipment: [
          { id: 1, name: "Tractor", pricePerDay: 1800, quantity: 1, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
          { id: 2, name: "Harvester", pricePerDay: 5000, quantity: 1 }
        ]
      },
      {
        ownerName: "Mukesh Patel",
        village: "Shyam Nagar",
        phone: "+91 98765 43212",
        bankAccount: "1122334455",
        isDriver: true,
        equipment: [
          { id: 1, name: "Seeder", pricePerDay: 1200, quantity: 1, image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop" },
          { id: 2, name: "Rotavator", pricePerDay: 1000, quantity: 1 }
        ]
      }
    ];
  });

  const [allLandOwners, setAllLandOwners] = useState<LandOwnerData[]>(() => {
    const saved = localStorage.getItem('aggo_all_lands');
    return saved ? JSON.parse(saved) : [];
  });

  const [allShoppers, setAllShoppers] = useState<ShopperData[]>(() => {
    const saved = localStorage.getItem('aggo_all_shoppers');
    return saved ? JSON.parse(saved) : [];
  });

  const addEquipmentRenter = (data: EquipmentRenterData) => {
    const updated = [...allEquipmentRenters, data];
    setAllEquipmentRenters(updated);
    localStorage.setItem('aggo_all_equipment', JSON.stringify(updated));
  };

  const addLandOwner = (data: LandOwnerData) => {
    const updated = [...allLandOwners, data];
    setAllLandOwners(updated);
    localStorage.setItem('aggo_all_lands', JSON.stringify(updated));
  };

  const addShopper = (data: ShopperData) => {
    const updated = [...allShoppers, data];
    setAllShoppers(updated);
    localStorage.setItem('aggo_all_shoppers', JSON.stringify(updated));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aggo_language', lang);
    document.documentElement.lang = lang;
  };

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
    localStorage.setItem('aggo_darkmode', dark ? 'true' : 'false');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem('aggo_user_role', role);
  };

  const setEquipmentData = (data: EquipmentRenterData) => {
    setEquipmentDataState(data);
    localStorage.setItem('aggo_equipment_data', JSON.stringify(data));
  };

  const setLandData = (data: LandOwnerData) => {
    setLandDataState(data);
    localStorage.setItem('aggo_land_data', JSON.stringify(data));
  };

  const setShopperData = (data: ShopperData) => {
    setShopperDataState(data);
    localStorage.setItem('aggo_shopper_data', JSON.stringify(data));
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      darkMode, setDarkMode, 
      userRole, setUserRole, 
      equipmentData, setEquipmentData, 
      landData, setLandData, 
      shopperData, setShopperData,
      allEquipmentRenters, addEquipmentRenter,
      allLandOwners, addLandOwner,
      allShoppers, addShopper
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
