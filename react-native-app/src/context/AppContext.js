import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('hire');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('aggo_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('aggo_user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('aggo_user');
  };

  const updateUserRole = async (role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      await AsyncStorage.setItem('aggo_user', JSON.stringify(updatedUser));
    }
  };

  const toggleMode = () => {
    setMode(mode === 'hire' ? 'sell' : 'hire');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        mode,
        language,
        login,
        logout,
        updateUserRole,
        toggleMode,
        toggleLanguage,
        setMode,
        setLanguage,
      }}
    >
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
