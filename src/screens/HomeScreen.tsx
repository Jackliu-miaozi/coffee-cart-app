import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { coffeeCarts } from '../data/mockData';
import { CoffeeCart } from '../types';

const { width, height } = Dimensions.get('window');

// iPhone 13 Pro Max 优化常量
const SAFE_AREA_PADDING = 20;
const BOTTOM_TAB_HEIGHT = 85; // 为 iPhone 13 Pro Max 优化的底部导航栏高度
const SEARCH_TOP_OFFSET = 60; // 搜索栏顶部偏移
const CONTENT_HORIZONTAL_MARGIN = 24; // 内容水平边距

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCart, setSelectedCart] = useState<CoffeeCart | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState({
    latitude: 31.2304,
    longitude: 121.4737,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.2304,
    longitude: 121.4737,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [lastLocationTime, setLastLocationTime] = useState<number>(0);
  const [isQuickResponse, setIsQuickResponse] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('权限被拒绝', '需要位置权限来显示附近的咖啡车');
        setHasLocationPermission(false);
        return;
      }
      
      setHasLocationPermission(true);
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation(location);
      setLastLocationTime(Date.now());
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      setMapRegion(newRegion);
      // 初始化时也使用动画移动地图
      setTimeout(() => {
        mapRef.current?.animateToRegion(newRegion, 1000);
      }, 100);
    })();
  }, []);

  const handleCartPress = (cart: CoffeeCart) => {
    // 点击咖啡车标记时收回键盘
    Keyboard.dismiss();
    setSelectedCart(cart);
  };

  const handleViewDetails = (cartId: string) => {
    navigation.navigate('CoffeeCartDetails', { id: cartId });
    setSelectedCart(null);
  };

  const handleMapPress = () => {
    // 点击地图时收回键盘
    Keyboard.dismiss();
  };

  const handleLocationPress = async () => {
    if (isLocating) return; // 防止重复点击
    
    // 点击定位按钮时也收回键盘
    Keyboard.dismiss();
    setIsLocating(true);
    try {
      // 检查权限缓存
      if (hasLocationPermission === false) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('权限被拒绝', '需要位置权限来显示附近的咖啡车');
          setHasLocationPermission(false);
          return;
        }
        setHasLocationPermission(true);
      }

      // 检查是否需要重新定位（5秒内的位置认为有效）
      const now = Date.now();
      if (userLocation && (now - lastLocationTime) < 5000) {
        // 使用缓存的位置，立即响应
        setIsQuickResponse(true);
        const newRegion = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setMapRegion(newRegion);
        // 使用 animateToRegion 强制地图移动
        mapRef.current?.animateToRegion(newRegion, 1000);
        setIsLocating(false);
        setTimeout(() => setIsQuickResponse(false), 500);
        return;
      }

      // 快速定位（低精度，快速响应）
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      
      setUserLocation(location);
      setLastLocationTime(Date.now());
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      setMapRegion(newRegion);
      // 使用 animateToRegion 强制地图移动
      mapRef.current?.animateToRegion(newRegion, 1000);

      // 后台获取高精度位置（可选）
      setTimeout(async () => {
        try {
          const highAccuracyLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setUserLocation(highAccuracyLocation);
          setLastLocationTime(Date.now());
        } catch (error) {
          console.log('高精度定位失败，使用低精度位置');
        }
      }, 1000);

    } catch (error) {
      console.error('获取位置失败:', error);
      Alert.alert('定位失败', '无法获取当前位置，请检查位置权限');
    } finally {
      setIsLocating(false);
    }
  };

  const filteredCarts = coffeeCarts.filter(cart =>
    cart.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索咖啡车或地址..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={false}
        rotateEnabled={false}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={false}
        onMapReady={() => setIsMapReady(true)}
        onPress={handleMapPress}
              >
          {isMapReady && filteredCarts.map((cart) => (
            <Marker
              key={cart.id}
              coordinate={{
                latitude: cart.location.lat,
                longitude: cart.location.lng,
              }}
              onPress={() => handleCartPress(cart)}
            >
              <View style={styles.markerContainer}>
                <View style={[
                  styles.marker,
                  { backgroundColor: cart.status === 'open' ? '#4CAF50' : '#9E9E9E' }
                ]}>
                  <Ionicons name="cafe" size={16} color="white" />
                </View>
              </View>
            </Marker>
          ))}
        </MapView>

      {/* Location Button */}
      <TouchableOpacity 
        style={[
          styles.locationButton, 
          isLocating && styles.locationButtonDisabled,
          isQuickResponse && styles.locationButtonSuccess
        ]} 
        onPress={handleLocationPress}
        disabled={isLocating}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={isQuickResponse ? "checkmark" : (isLocating ? "refresh" : "locate")} 
          size={24} 
          color={isQuickResponse ? "#4CAF50" : (isLocating ? "#999" : "#8B4513")} 
        />
      </TouchableOpacity>

      {/* Selected Cart Info Card */}
      {selectedCart && (
        <View style={styles.cartInfoCard}>
          <View style={styles.cartInfoHeader}>
            <Image source={{ uri: selectedCart.image }} style={styles.cartImage} />
            <View style={styles.cartInfo}>
              <Text style={styles.cartName}>{selectedCart.name}</Text>
              <View style={styles.cartDetails}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{selectedCart.rating}</Text>
                </View>
                <Text style={styles.distance}>{selectedCart.distance}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: selectedCart.status === 'open' ? '#E8F5E8' : '#F5F5F5' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: selectedCart.status === 'open' ? '#4CAF50' : '#9E9E9E' }
                ]}>
                  {selectedCart.status === 'open' ? '营业中' : '已关闭'}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => handleViewDetails(selectedCart.id)}
          >
            <Text style={styles.viewDetailsText}>查看详情</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    position: 'absolute',
    top: SEARCH_TOP_OFFSET,
    left: CONTENT_HORIZONTAL_MARGIN,
    right: CONTENT_HORIZONTAL_MARGIN,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#333',
    fontWeight: '500',
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: BOTTOM_TAB_HEIGHT + SAFE_AREA_PADDING + 20,
    right: CONTENT_HORIZONTAL_MARGIN,
    backgroundColor: 'white',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  locationButtonDisabled: {
    opacity: 0.6,
  },
  locationButtonSuccess: {
    backgroundColor: '#E8F5E8',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cartInfoCard: {
    position: 'absolute',
    bottom: BOTTOM_TAB_HEIGHT + SAFE_AREA_PADDING,
    left: CONTENT_HORIZONTAL_MARGIN,
    right: CONTENT_HORIZONTAL_MARGIN,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cartInfoHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },
  cartInfo: {
    flex: 1,
  },
  cartName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cartDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewDetailsButton: {
    backgroundColor: '#8B4513',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
}); 