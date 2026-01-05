import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Navigation, MapPin, Tractor, Warehouse, Leaf, ShoppingBag } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

const quickActions = [
  { id: 'equipment', icon: Tractor, label: 'Equipment', color: '#3b82f6' },
  { id: 'land', icon: Warehouse, label: 'Land Rental', color: '#8b5cf6' },
  { id: 'crops', icon: Leaf, label: 'Crops', color: '#16a34a' },
  { id: 'shop', icon: ShoppingBag, label: 'Shop', color: '#f59e0b' },
];

export default function HomeScreen({ navigation }) {
  const { user, mode, toggleMode } = useApp();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80' }}
        style={styles.mapBackground}
      >
        <View style={styles.overlay} />
        
        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Navigation size={20} color="#16a34a" />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>YOUR LOCATION</Text>
            <Text style={styles.locationValue}>
              {user?.village || 'Set your location'}
            </Text>
          </View>
        </View>

        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'hire' && styles.activeModeButton]}
            onPress={() => toggleMode()}
          >
            <Text style={[styles.modeText, mode === 'hire' && styles.activeModeText]}>
              Hire / Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'sell' && styles.activeModeButton]}
            onPress={() => toggleMode()}
          >
            <Text style={[styles.modeText, mode === 'sell' && styles.activeModeText]}>
              Sell / Rent
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}!</Text>
        <Text style={styles.subtitle}>
          {mode === 'hire' ? 'Find equipment, land & crops' : 'List your resources'}
        </Text>

        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={() => {
                if (action.id === 'crops') navigation.navigate('Marketplace');
                else if (action.id === 'shop') navigation.navigate('Shops');
              }}
            >
              <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  mapBackground: {
    height: 280,
    justifyContent: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  locationCard: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  locationIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#dcfce7',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b7280',
    letterSpacing: 1,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  modeToggle: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeModeButton: {
    backgroundColor: '#16a34a',
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeModeText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});
