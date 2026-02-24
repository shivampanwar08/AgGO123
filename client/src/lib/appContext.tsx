import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from './translations';

export type UserRole = 'user' | 'equipment-renter' | 'land-owner' | 'shopper';

export interface EquipmentRenterData {
  id: string;
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
  id: string;
  ownerName: string;
  village: string;
  phone: string;
  bankAccount: string;
  lands: Array<{ id: number; size: number; soilType: string; waterAccess: string; pricePerAcre: number; image?: string }>;
}

export interface ShopperData {
  id: string;
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

export interface MarketplaceItem {
  id: string;
  sellerName: string;
  village: string;
  phone?: string;
  cropName: string;
  quantity: string;
  price: number;
  image?: string;
  isUserListing?: boolean;
  comments?: Array<{
    id: string;
    userName: string;
    text: string;
    timestamp: string;
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
  marketplaceItems: MarketplaceItem[];
  addMarketplaceItem: (item: MarketplaceItem) => void;
  removeMarketplaceItem: (id: string) => void;
  profileName: string;
  setProfileName: (name: string) => void;
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
        id: "d1",
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
        id: "d2",
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
        id: "d3",
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

  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('aggo_marketplace_items');
    // Default mock data
    const defaults = [
      {
        id: 'f1-c1',
        sellerName: 'Rajesh Kumar',
        village: 'Rampur Village',
        cropName: 'Organic Wheat',
        quantity: '500kg',
        price: 28,
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop'
      },
      {
        id: 'f1-c2',
        sellerName: 'Rajesh Kumar',
        village: 'Rampur Village',
        cropName: 'Fresh Tomatoes',
        quantity: '200kg',
        price: 12,
        image: 'https://images.unsplash.com/photo-1592841494149-fd9025c6f9d8?w=100&h=100&fit=crop'
      },
      {
        id: 'f2-c3',
        sellerName: 'Priya Singh',
        village: 'Sector 5',
        cropName: 'Natural Pesticide (Neem)',
        quantity: '50L',
        price: 450,
        image: 'https://images.unsplash.com/photo-1585518419759-87a8d10a1c5e?w=100&h=100&fit=crop'
      }
    ];
    return saved ? JSON.parse(saved) : defaults;
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

  const addMarketplaceItem = (item: MarketplaceItem) => {
    const updated = [item, ...marketplaceItems];
    setMarketplaceItems(updated);
    localStorage.setItem('aggo_marketplace_items', JSON.stringify(updated));
  };

  const removeMarketplaceItem = (id: string) => {
    const updated = marketplaceItems.filter(i => i.id !== id);
    setMarketplaceItems(updated);
    localStorage.setItem('aggo_marketplace_items', JSON.stringify(updated));
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

  const [profileName, setProfileNameState] = useState(() => {
    return localStorage.getItem('aggo_profile_name') || 'Farmer John';
  });

  const setProfileName = (name: string) => {
    setProfileNameState(name);
    localStorage.setItem('aggo_profile_name', name);
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, 
      darkMode, setDarkMode, 
      userRole, setUserRole, 
      profileName, setProfileName,
      equipmentData, setEquipmentData, 
      landData, setLandData, 
      shopperData, setShopperData,
      allEquipmentRenters, addEquipmentRenter,
      allLandOwners, addLandOwner,
      allShoppers, addShopper,
      marketplaceItems, addMarketplaceItem, removeMarketplaceItem
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
