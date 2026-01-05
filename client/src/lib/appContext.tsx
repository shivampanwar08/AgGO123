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
    <AppContext.Provider value={{ language, setLanguage, darkMode, setDarkMode, userRole, setUserRole, equipmentData, setEquipmentData, landData, setLandData, shopperData, setShopperData }}>
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
