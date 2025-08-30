import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  Keyboard,
  ScrollView,
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
import { useAuthStore } from '../stores/authStore';
import { homeScreenStyles as styles } from '../styles/screens';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isAuthenticated, isGuest } = useAuthStore();
  const mapRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCart, setSelectedCart] = useState<CoffeeCart | null>(null);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
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
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);
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
      if (userLocation && now - lastLocationTime < 5000) {
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

  // 未登录（游客）状态的空状态界面
  if (isGuest) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            style={styles.emptyScroll}
            // contentContainerStyle={styles.emptyScrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.emptyHeader}>
              <View style={styles.emptyLogoContainer}>
                <Ionicons name="cafe" size={60} color="#8B4513" />
              </View>
              <Text style={styles.emptyTitle}>欢迎来到咖啡车</Text>
              <Text style={styles.emptySubtitle}>
                登录后查看附近的咖啡车和更多功能
              </Text>
            </View>

            {/* Empty State Content */}
            <View style={styles.emptyContent}>
              <View style={styles.emptyMapPlaceholder}>
                <Ionicons name="map-outline" size={80} color="#CCC" />
                <Text style={styles.placeholderText}>
                  地图功能需要登录后使用
                </Text>
              </View>

              <View style={styles.emptyFeatures}>
                <View style={styles.featureItem}>
                  <Ionicons name="location" size={24} color="#8B4513" />
                  <Text style={styles.featureText}>查看附近咖啡车</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="search" size={24} color="#8B4513" />
                  <Text style={styles.featureText}>搜索咖啡车</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="receipt" size={24} color="#8B4513" />
                  <Text style={styles.featureText}>在线下单</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="heart" size={24} color="#8B4513" />
                  <Text style={styles.featureText}>收藏咖啡车</Text>
                </View>
              </View>
            </View>

            {/* Login Button */}
            <View style={styles.loginSection}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Auth')}
              >
                <Ionicons name="log-in" size={20} color="white" />
                <Text style={styles.loginButtonText}>立即登录</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => {
                  Alert.alert(
                    '提示',
                    '您已经在首页了，可以开始探索附近的咖啡车！'
                  );
                }}
              ></TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
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
          {isMapReady &&
            filteredCarts.map(cart => (
              <Marker
                key={cart.id}
                coordinate={{
                  latitude: cart.location.lat,
                  longitude: cart.location.lng,
                }}
                onPress={() => handleCartPress(cart)}
              >
                <View style={styles.markerContainer}>
                  <View
                    style={[
                      styles.marker,
                      {
                        backgroundColor:
                          cart.status === 'open' ? '#4CAF50' : '#9E9E9E',
                      },
                    ]}
                  >
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
            isQuickResponse && styles.locationButtonSuccess,
          ]}
          onPress={handleLocationPress}
          disabled={isLocating}
          activeOpacity={0.7}
        >
          <Ionicons
            name={
              isQuickResponse ? 'checkmark' : isLocating ? 'refresh' : 'locate'
            }
            size={24}
            color={
              isQuickResponse ? '#4CAF50' : isLocating ? '#999' : '#8B4513'
            }
          />
        </TouchableOpacity>

        {/* Selected Cart Info Card */}
        {selectedCart && (
          <View style={styles.cartInfoCard}>
            <View style={styles.cartInfoHeader}>
              <Image
                source={{ uri: selectedCart.image }}
                style={styles.cartImage}
              />
              <View style={styles.cartInfo}>
                <Text style={styles.cartName}>{selectedCart.name}</Text>
                <View style={styles.cartDetails}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.rating}>{selectedCart.rating}</Text>
                  </View>
                  <Text style={styles.distance}>{selectedCart.distance}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        selectedCart.status === 'open' ? '#E8F5E8' : '#F5F5F5',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          selectedCart.status === 'open'
                            ? '#4CAF50'
                            : '#9E9E9E',
                      },
                    ]}
                  >
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
