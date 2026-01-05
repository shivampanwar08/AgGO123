import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MapPin, Star, Phone, Clock, Truck } from 'lucide-react-native';

const mockDrivers = [
  {
    id: 'd1',
    name: 'Amit Sharma',
    vehicle: 'Tractor - Mahindra 575',
    rating: 4.8,
    trips: 156,
    distance: '2.1 km',
    available: true,
    pricePerHour: 500,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 'd2',
    name: 'Suresh Patel',
    vehicle: 'Harvester - John Deere',
    rating: 4.6,
    trips: 89,
    distance: '4.5 km',
    available: true,
    pricePerHour: 1200,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  },
  {
    id: 'd3',
    name: 'Ravi Kumar',
    vehicle: 'Transport Truck - Tata 407',
    rating: 4.9,
    trips: 234,
    distance: '1.8 km',
    available: false,
    pricePerHour: 800,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

export default function DriversScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drivers</Text>
        <Text style={styles.headerSubtitle}>Find vehicle operators nearby</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {mockDrivers.map((driver) => (
          <TouchableOpacity key={driver.id} style={styles.driverCard}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: driver.image }} style={styles.avatar} />
              <View style={styles.driverInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <View style={[styles.statusBadge, !driver.available && styles.unavailableBadge]}>
                    <Text style={[styles.statusText, !driver.available && styles.unavailableText]}>
                      {driver.available ? 'Available' : 'Busy'}
                    </Text>
                  </View>
                </View>
                <View style={styles.vehicleRow}>
                  <Truck size={14} color="#6b7280" />
                  <Text style={styles.vehicleText}>{driver.vehicle}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Star size={14} color="#facc15" fill="#facc15" />
                <Text style={styles.statValue}>{driver.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.statValue}>{driver.trips}</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.statItem}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.statValue}>{driver.distance}</Text>
                <Text style={styles.statLabel}>Away</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.priceLabel}>Rate</Text>
                <Text style={styles.priceValue}>₹{driver.pricePerHour}/hr</Text>
              </View>
              <TouchableOpacity
                style={[styles.contactButton, !driver.available && styles.disabledButton]}
                disabled={!driver.available}
              >
                <Phone size={16} color="#fff" />
                <Text style={styles.contactButtonText}>Contact</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unavailableBadge: {
    backgroundColor: '#fef2f2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
  unavailableText: {
    color: '#ef4444',
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  vehicleText: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
