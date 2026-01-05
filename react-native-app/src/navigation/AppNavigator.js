import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Users, Leaf, ShoppingBag, Settings } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import DriversScreen from '../screens/DriversScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import ShopsScreen from '../screens/ShopsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          switch (route.name) {
            case 'Home':
              IconComponent = Home;
              break;
            case 'Drivers':
              IconComponent = Users;
              break;
            case 'Marketplace':
              IconComponent = Leaf;
              break;
            case 'Shops':
              IconComponent = ShoppingBag;
              break;
            case 'Settings':
              IconComponent = Settings;
              break;
            default:
              IconComponent = Home;
          }
          return <IconComponent size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Drivers" component={DriversScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} options={{ tabBarLabel: 'Market' }} />
      <Tab.Screen name="Shops" component={ShopsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoading } = useApp();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
