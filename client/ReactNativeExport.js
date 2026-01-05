import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  TextInput, 
  Dimensions, 
  StatusBar,
  Platform,
  ImageBackground
} from 'react-native';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Settings, 
  Leaf, 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  Search, 
  Plus, 
  TrendingUp,
  Navigation,
  Check
} from 'lucide-react-native';

// --- MOCK DATA ---
const farmersWithCrops = [
  {
    id: 'f1',
    name: 'Rajesh Kumar',
    village: 'Rampur Village',
    crops: [
      { id: 'c1', name: 'Organic Wheat', qty: '500kg', pricePerUnit: 28, buyersOffering: 5, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop' },
      { id: 'c2', name: 'Fresh Tomatoes', qty: '200kg', pricePerUnit: 12, buyersOffering: 3, image: 'https://images.unsplash.com/photo-1592841494149-fd9025c6f9d8?w=100&h=100&fit=crop' }
    ],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    distance: '3.2 km'
  },
  {
    id: 'f2',
    name: 'Priya Singh',
    village: 'Sector 5',
    crops: [
      { id: 'c3', name: 'Neem Pesticide', qty: '50L', pricePerUnit: 450, buyersOffering: 8, image: 'https://images.unsplash.com/photo-1585518419759-87a8d10a1c5e?w=100&h=100&fit=crop' },
    ],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    distance: '5.1 km'
  }
];

const buyersList = [
  {
    id: 'b1',
    name: 'Green Valley Traders',
    type: 'Organic Buyer',
    location: '2.5 km away',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    rating: 4.7
  },
  {
    id: 'b2',
    name: 'Urban Fresh Supplies',
    type: 'Retail Chain',
    location: '4.2 km away',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    rating: 4.5
  }
];

// --- APP COMPONENT ---
export default function App() {
  const [currentTab, setCurrentTab] = useState('marketplace'); // Default to marketplace for demo
  const [darkMode, setDarkMode] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'marketplace':
        return <MarketplaceScreen darkMode={darkMode} />;
      case 'drivers':
        return <PlaceholderScreen title="Drivers" />;
      case 'shops':
        return <PlaceholderScreen title="Shops" />;
      case 'settings':
        return <PlaceholderScreen title="Settings" />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} darkMode={darkMode} />
    </SafeAreaView>
  );
}

// --- SCREENS ---

function MarketplaceScreen({ darkMode }) {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'sell'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.borderColor, backgroundColor: theme.headerBg }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.cardBg }]}>
            <ArrowLeft size={20} color={theme.textColor} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textColor }]}>Crop Marketplace</Text>
        </View>

        {/* Tabs */}
        <View style={[styles.tabContainer, { backgroundColor: theme.bgSecondary }]}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'browse' && styles.activeTabButton, activeTab === 'browse' && { backgroundColor: theme.cardBg }]}
            onPress={() => setActiveTab('browse')}
          >
            <Text style={[styles.tabText, activeTab === 'browse' && styles.activeTabText, { color: activeTab === 'browse' ? '#16a34a' : theme.textMuted }]}>
              Browse Farmers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'sell' && styles.activeTabButton, activeTab === 'sell' && { backgroundColor: theme.cardBg }]}
            onPress={() => setActiveTab('sell')}
          >
            <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText, { color: activeTab === 'sell' ? '#16a34a' : theme.textMuted }]}>
              Sell My Crops
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'browse' ? (
          <>
            {/* Search */}
            <View style={styles.searchContainer}>
              <Search size={18} color={theme.textMuted} style={styles.searchIcon} />
              <TextInput 
                style={[styles.searchInput, { backgroundColor: theme.cardBg, color: theme.textColor, borderColor: theme.borderColor }]}
                placeholder="Search crops, pesticides..."
                placeholderTextColor={theme.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* List */}
            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>AVAILABLE CROPS</Text>
            
            {farmersWithCrops.map(farmer => (
              <View key={farmer.id} style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.borderColor }]}>
                {/* Farmer Header */}
                <View style={[styles.cardHeader, { borderBottomColor: theme.borderColor }]}>
                  <Image source={{ uri: farmer.image }} style={styles.avatar} />
                  <View style={styles.cardHeaderText}>
                    <Text style={[styles.cardTitle, { color: theme.textColor }]}>{farmer.name}</Text>
                    <View style={styles.locationRow}>
                      <MapPin size={12} color={theme.textMuted} />
                      <Text style={[styles.locationText, { color: theme.textMuted }]}>{farmer.village} • {farmer.distance}</Text>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <View style={styles.ratingRow}>
                      <Star size={14} color="#facc15" fill="#facc15" />
                      <Text style={styles.ratingText}>{farmer.rating}</Text>
                    </View>
                    <Text style={styles.contactText}>Contact</Text>
                  </View>
                </View>

                {/* Crops List */}
                {farmer.crops.map(crop => (
                  <TouchableOpacity 
                    key={crop.id} 
                    style={[styles.cropItem, { borderBottomColor: theme.borderColor }]}
                    onPress={() => setSelectedCrop(crop)}
                  >
                    <Image source={{ uri: crop.image }} style={styles.cropImage} />
                    <View style={styles.cropInfo}>
                      <View style={styles.cropHeader}>
                        <View>
                          <Text style={[styles.cropName, { color: theme.textColor }]}>{crop.name}</Text>
                          <Text style={[styles.cropQty, { color: theme.textMuted }]}>Qty: {crop.qty}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text style={styles.priceText}>₹{crop.pricePerUnit}</Text>
                          <Text style={[styles.unitText, { color: theme.textMuted }]}>per unit</Text>
                        </View>
                      </View>
                      <View style={styles.buyersRow}>
                        <TrendingUp size={12} color="#16a34a" />
                        <Text style={styles.buyersText}>{crop.buyersOffering} buyers interested</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </>
        ) : (
          <View style={[styles.card, { backgroundColor: theme.cardBg, padding: 20 }]}>
             <Text style={{color: theme.textColor, textAlign: 'center'}}>Sell Form would go here</Text>
          </View>
        )}
        <View style={{height: 100}} /> 
      </ScrollView>

      {/* Selected Crop Modal (Absolute Positioning) */}
      {selectedCrop && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: '#fff' }]}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedCrop(null)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.modalHeader}>
              <Image source={{ uri: selectedCrop.image }} style={styles.modalImage} />
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>{selectedCrop.name}</Text>
                <Text style={styles.modalSubtitle}>Available: {selectedCrop.qty}</Text>
                <Text style={styles.modalPrice}>₹{selectedCrop.pricePerUnit}</Text>
              </View>
            </View>

            <Text style={styles.modalSectionTitle}>Interested Buyers ({selectedCrop.buyersOffering})</Text>
            
            <View style={styles.buyerList}>
               {buyersList.map(buyer => (
                 <View key={buyer.id} style={styles.buyerItem}>
                   <Image source={{ uri: buyer.image }} style={styles.buyerAvatar} />
                   <View style={{flex: 1}}>
                     <Text style={styles.buyerName}>{buyer.name}</Text>
                     <Text style={styles.buyerLocation}>{buyer.location}</Text>
                   </View>
                   <View style={{alignItems: 'flex-end'}}>
                     <Text style={styles.offerPrice}>₹{selectedCrop.pricePerUnit + 2}</Text>
                     <Text style={styles.offerLabel}>offered</Text>
                   </View>
                 </View>
               ))}
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Contact All Buyers</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
       <ImageBackground 
         source={{uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80'}} 
         style={styles.mapBackground}
       >
          <View style={styles.locationCard}>
             <View style={styles.locationIcon}>
                <Navigation size={20} color="#16a34a" />
             </View>
             <View>
                <Text style={styles.locationLabel}>YOUR LOCATION</Text>
                <Text style={styles.locationValue}>Sector 2, HSR Layout</Text>
             </View>
          </View>
       </ImageBackground>
    </View>
  );
}

function PlaceholderScreen({ title }) {
  return (
    <View style={[styles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
}

// --- NAVIGATION ---

function BottomNav({ currentTab, setCurrentTab, darkMode }) {
  const theme = darkMode ? darkTheme : lightTheme;
  
  const NavItem = ({ tab, icon: Icon, label }) => {
    const isActive = currentTab === tab;
    return (
      <TouchableOpacity onPress={() => setCurrentTab(tab)} style={styles.navItem}>
        <Icon size={22} color={isActive ? '#16a34a' : theme.textMuted} />
        <Text style={[
          styles.navLabel, 
          { color: isActive ? '#16a34a' : theme.textMuted, opacity: isActive ? 1 : 0.7 }
        ]}>
          {label}
        </Text>
        {isActive && <View style={styles.activeDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.bottomNav, { backgroundColor: theme.navBg, borderTopColor: theme.borderColor }]}>
      <NavItem tab="home" icon={Home} label="Home" />
      <NavItem tab="drivers" icon={Users} label="Drivers" />
      <NavItem tab="marketplace" icon={Leaf} label="Market" />
      <NavItem tab="shops" icon={ShoppingBag} label="Shops" />
      <NavItem tab="settings" icon={Settings} label="Settings" />
    </View>
  );
}

// --- STYLES & THEMES ---

const lightTheme = {
  bg: '#f9fafb',
  bgSecondary: '#f3f4f6',
  cardBg: '#ffffff',
  textColor: '#111827',
  textMuted: '#6b7280',
  borderColor: '#e5e7eb',
  headerBg: 'rgba(255,255,255,0.95)',
  navBg: 'rgba(255,255,255,0.95)',
};

const darkTheme = {
  bg: '#111827',
  bgSecondary: '#1f2937',
  cardBg: '#1f2937',
  textColor: '#f9fafb',
  textMuted: '#9ca3af',
  borderColor: '#374151',
  headerBg: 'rgba(17,24,39,0.95)',
  navBg: 'rgba(17,24,39,0.95)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  screenContainer: {
    flex: 1,
    height: '100%',
  },
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  locationCard: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
  
  // Header
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#16a34a',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 16,
    borderWidth: 1,
  },

  // Marketplace List
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
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
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
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
  },
  cropQty: {
    fontSize: 12,
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

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#9ca3af',
  },
  modalHeader: {
    flexDirection: 'row',
    marginBottom: 24,
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
    color: '#4b5563',
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
    marginBottom: 12,
  },
  buyerList: {
    marginBottom: 24,
  },
  buyerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 8,
  },
  buyerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  buyerName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  buyerLocation: {
    fontSize: 10,
    color: '#6b7280',
  },
  offerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  offerLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  actionButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Bottom Nav
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: '100%',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  }
});
