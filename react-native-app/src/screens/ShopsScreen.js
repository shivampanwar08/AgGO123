import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Search, MapPin, Star, ShoppingBag } from 'lucide-react-native';

const mockShops = [
  {
    id: 's1',
    name: 'AgriMart Store',
    category: 'Seeds & Fertilizers',
    rating: 4.7,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=150&fit=crop',
    products: 45,
  },
  {
    id: 's2',
    name: 'Farm Equipment Hub',
    category: 'Tools & Equipment',
    rating: 4.5,
    distance: '2.8 km',
    image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=200&h=150&fit=crop',
    products: 120,
  },
  {
    id: 's3',
    name: 'Green Valley Supplies',
    category: 'Pesticides & Organic',
    rating: 4.9,
    distance: '3.5 km',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=150&fit=crop',
    products: 78,
  },
];

export default function ShopsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = mockShops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shops</Text>
        <Text style={styles.headerSubtitle}>Find agricultural supplies nearby</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search shops..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {filteredShops.map((shop) => (
          <TouchableOpacity key={shop.id} style={styles.shopCard}>
            <Image source={{ uri: shop.image }} style={styles.shopImage} />
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.shopCategory}>{shop.category}</Text>
              <View style={styles.shopMeta}>
                <View style={styles.metaItem}>
                  <MapPin size={12} color="#6b7280" />
                  <Text style={styles.metaText}>{shop.distance}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Star size={12} color="#facc15" fill="#facc15" />
                  <Text style={styles.metaText}>{shop.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <ShoppingBag size={12} color="#6b7280" />
                  <Text style={styles.metaText}>{shop.products} items</Text>
                </View>
              </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#111827',
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  shopImage: {
    width: '100%',
    height: 120,
  },
  shopInfo: {
    padding: 16,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  shopCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  shopMeta: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
});
