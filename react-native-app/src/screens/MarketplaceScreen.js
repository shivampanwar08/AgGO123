import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { ArrowLeft, Search, MapPin, Star, TrendingUp, X, Phone } from 'lucide-react-native';
import { api } from '../services/api';

const mockFarmers = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    village: 'Rampur Village',
    crops: [
      { id: 'c1', name: 'Organic Wheat', quantity: '500kg', pricePerUnit: 28, buyersInterested: 5, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop' },
      { id: 'c2', name: 'Fresh Tomatoes', quantity: '200kg', pricePerUnit: 12, buyersInterested: 3, image: 'https://images.unsplash.com/photo-1592841494149-fd9025c6f9d8?w=100&h=100&fit=crop' },
    ],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    distance: '3.2 km',
  },
  {
    id: 'f2',
    name: 'Priya Singh',
    village: 'Sector 5',
    crops: [
      { id: 'c3', name: 'Neem Pesticide', quantity: '50L', pricePerUnit: 450, buyersInterested: 8, image: 'https://images.unsplash.com/photo-1585518419759-87a8d10a1c5e?w=100&h=100&fit=crop' },
    ],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    distance: '5.1 km',
  },
];

export default function MarketplaceScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [farmers, setFarmers] = useState(mockFarmers);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMarketplace();
  }, []);

  const loadMarketplace = async () => {
    setIsLoading(true);
    try {
      const data = await api.getMarketplace();
      if (data && data.length > 0) {
        const groupedByUser = data.reduce((acc, item) => {
          if (!acc[item.userId]) {
            acc[item.userId] = {
              id: item.userId,
              name: 'Farmer',
              village: 'Local Area',
              crops: [],
              rating: 4.5,
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
              distance: '2 km',
            };
          }
          acc[item.userId].crops.push({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            pricePerUnit: parseFloat(item.pricePerUnit),
            buyersInterested: item.buyersInterested || 0,
            image: item.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop',
          });
          return acc;
        }, {});
        setFarmers(Object.values(groupedByUser));
      }
    } catch (error) {
      console.log('Using mock data');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.crops.some((crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crop Marketplace</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'browse' && styles.activeTab]}
            onPress={() => setActiveTab('browse')}
          >
            <Text style={[styles.tabText, activeTab === 'browse' && styles.activeTabText]}>
              Browse Farmers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
            onPress={() => setActiveTab('sell')}
          >
            <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>
              Sell My Crops
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#16a34a" />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {activeTab === 'browse' ? (
            <>
              <View style={styles.searchContainer}>
                <Search size={18} color="#9ca3af" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search crops, pesticides..."
                  placeholderTextColor="#9ca3af"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <Text style={styles.sectionTitle}>AVAILABLE CROPS</Text>

              {filteredFarmers.map((farmer) => (
                <View key={farmer.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Image source={{ uri: farmer.image }} style={styles.avatar} />
                    <View style={styles.cardHeaderText}>
                      <Text style={styles.cardTitle}>{farmer.name}</Text>
                      <View style={styles.locationRow}>
                        <MapPin size={12} color="#6b7280" />
                        <Text style={styles.locationText}>
                          {farmer.village} • {farmer.distance}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.ratingContainer}>
                      <View style={styles.ratingRow}>
                        <Star size={14} color="#facc15" fill="#facc15" />
                        <Text style={styles.ratingText}>{farmer.rating}</Text>
                      </View>
                      <TouchableOpacity>
                        <Text style={styles.contactText}>Contact</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {farmer.crops.map((crop) => (
                    <TouchableOpacity
                      key={crop.id}
                      style={styles.cropItem}
                      onPress={() => setSelectedCrop(crop)}
                    >
                      <Image source={{ uri: crop.image }} style={styles.cropImage} />
                      <View style={styles.cropInfo}>
                        <View style={styles.cropHeader}>
                          <View>
                            <Text style={styles.cropName}>{crop.name}</Text>
                            <Text style={styles.cropQty}>Qty: {crop.quantity}</Text>
                          </View>
                          <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>₹{crop.pricePerUnit}</Text>
                            <Text style={styles.unitText}>per unit</Text>
                          </View>
                        </View>
                        <View style={styles.buyersRow}>
                          <TrendingUp size={12} color="#16a34a" />
                          <Text style={styles.buyersText}>
                            {crop.buyersInterested} buyers interested
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </>
          ) : (
            <View style={styles.sellContainer}>
              <Text style={styles.sellTitle}>List Your Crops</Text>
              <Text style={styles.sellSubtitle}>
                Add your crops to reach buyers across the region
              </Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add New Crop</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      <Modal visible={!!selectedCrop} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedCrop(null)}
            >
              <X size={24} color="#6b7280" />
            </TouchableOpacity>

            {selectedCrop && (
              <>
                <View style={styles.modalHeader}>
                  <Image source={{ uri: selectedCrop.image }} style={styles.modalImage} />
                  <View style={styles.modalInfo}>
                    <Text style={styles.modalTitle}>{selectedCrop.name}</Text>
                    <Text style={styles.modalSubtitle}>Available: {selectedCrop.quantity}</Text>
                    <Text style={styles.modalPrice}>₹{selectedCrop.pricePerUnit}</Text>
                  </View>
                </View>

                <Text style={styles.modalSectionTitle}>
                  Interested Buyers ({selectedCrop.buyersInterested})
                </Text>

                <TouchableOpacity style={styles.actionButton}>
                  <Phone size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Contact Seller</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#16a34a',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#6b7280',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#111827',
  },
  contactText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cropItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cropImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  cropInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  cropQty: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  unitText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
  },
  buyersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  buyersText: {
    fontSize: 12,
    color: '#16a34a',
    fontWeight: '600',
    marginLeft: 6,
  },
  sellContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  sellTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  sellSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 16,
  },
  modalImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginRight: 16,
  },
  modalInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    marginTop: 8,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#16a34a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
