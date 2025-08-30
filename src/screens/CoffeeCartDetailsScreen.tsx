import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { coffeeCarts } from '../data/mockData';
import { CoffeeCart, MenuItem } from '../types';

const { width } = Dimensions.get('window');

type CoffeeCartDetailsRouteProp = RouteProp<RootStackParamList, 'CoffeeCartDetails'>;
type CoffeeCartDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'CoffeeCartDetails'>;

export default function CoffeeCartDetailsScreen() {
  const route = useRoute<CoffeeCartDetailsRouteProp>();
  const navigation = useNavigation<CoffeeCartDetailsNavigationProp>();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const { id } = route.params;
  const coffeeCart = coffeeCarts.find(cart => cart.id === id);

  if (!coffeeCart) {
    return (
      <View style={styles.container}>
        <Text>咖啡车不存在</Text>
      </View>
    );
  }

  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    Alert.alert('成功', '已添加到购物车');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('提示', '购物车为空');
      return;
    }
    navigation.navigate('ShoppingCart');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: coffeeCart.images?.[0] || coffeeCart.image }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
        </View>

        {/* Coffee Cart Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.cartName}>{coffeeCart.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{coffeeCart.rating}</Text>
            <Text style={styles.distance}>{coffeeCart.distance}</Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>
                营业时间: {coffeeCart.businessHours || '08:00 - 20:00'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="call-outline" size={16} color="#666" />
              <Text style={styles.detailText}>
                联系电话: {coffeeCart.phone || '未提供'}
              </Text>
            </View>
            <TouchableOpacity style={styles.detailItem}>
              <Ionicons name="location-outline" size={16} color="#8B4513" />
              <Text style={styles.navigationText}>导航到这里</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
            onPress={() => setActiveTab('menu')}
          >
            <Text style={[styles.tabText, activeTab === 'menu' && styles.activeTabText]}>
              菜单
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              评价
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Content */}
        {activeTab === 'menu' && coffeeCart.menu && (
          <View style={styles.menuContainer}>
            {coffeeCart.menu.map((category, index) => (
              <View key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{category.category}</Text>
                {category.items.map((item) => (
                  <View key={item.id} style={styles.menuItem}>
                    <Image source={{ uri: item.image }} style={styles.menuItemImage} />
                    <View style={styles.menuItemInfo}>
                      <Text style={styles.menuItemName}>{item.name}</Text>
                      <Text style={styles.menuItemDescription}>{item.description}</Text>
                      <View style={styles.menuItemFooter}>
                        <Text style={styles.menuItemPrice}>¥{item.price}</Text>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => addToCart(item)}
                        >
                          <Ionicons name="add" size={20} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Reviews Content */}
        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.reviewsTitle}>用户评价</Text>
              <Text style={styles.reviewsCount}>
                全部 {coffeeCart.reviews?.length || 0}
              </Text>
            </View>
            {coffeeCart.reviews && coffeeCart.reviews.length > 0 ? (
              coffeeCart.reviews.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <Ionicons
                            key={i}
                            name={i < review.rating ? 'star' : 'star-outline'}
                            size={14}
                            color="#FFD700"
                          />
                        ))}
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.reviewContent}>{review.content}</Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyReviews}>
                <Text style={styles.emptyReviewsText}>暂无评价</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Cart Preview */}
      {cartItems.length > 0 && (
        <View style={styles.cartPreview}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartCount}>
              共 {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} 件商品
            </Text>
            <Text style={styles.cartTotal}>¥{calculateTotal()}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>去结算</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  cartName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
    marginRight: 12,
  },
  distance: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  navigationText: {
    fontSize: 14,
    color: '#8B4513',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B4513',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#8B4513',
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: 'white',
  },
  categoryContainer: {
    padding: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewsContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  reviewsCount: {
    fontSize: 14,
    color: '#8B4513',
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  reviewContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyReviews: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyReviewsText: {
    fontSize: 16,
    color: '#999',
  },
  cartPreview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  cartInfo: {
    flex: 1,
  },
  cartCount: {
    fontSize: 14,
    color: '#666',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B4513',
  },
  checkoutButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 