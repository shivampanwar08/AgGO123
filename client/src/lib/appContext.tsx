import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from './translations';

export type UserRole = 'user' | 'equipment-renter' | 'land-owner' | 'shopper';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  userRole: UserRole | null;
  setUserRole: (role: UserRole) => void;
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

  useEffect(() => {
    document.documentElement.lang = language;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AppContext.Provider value={{ language, setLanguage, darkMode, setDarkMode, userRole, setUserRole }}>
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
