import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // 不再使用渐变
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { orders } from '../data/mockData';
import { Order } from '../types';

const { width, height } = Dimensions.get('window');

// iPhone 13 Pro Max 优化常量
const HEADER_HEIGHT = 160;
const CARD_MARGIN = 20;
const BORDER_RADIUS = 16;

type OrdersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Orders'>;

export default function OrdersScreen() {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'pending' && order.status !== 'pending') return false;
    if (activeTab === 'completed' && order.status !== 'completed') return false;
    if (searchQuery) {
      return order.cartName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF6B6B';
      case 'completed':
        return '#4ECDC4';
      case 'canceled':
        return '#95A5A6';
      default:
        return '#666';
    }
  };

  const getStatusSolidColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FF6B6B';
      case 'completed':
        return '#4ECDC4';
      case 'canceled':
        return '#95A5A6';
      default:
        return '#666';
    }
  };

  const getOrderIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'completed':
        return 'checkmark-circle-outline';
      case 'canceled':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { id: item.id })}
      activeOpacity={0.8}
    >
      <View style={styles.orderBackground}>
        <View style={styles.orderHeader}>
          <View style={styles.cartInfoSection}>
            <View style={styles.cartLogoContainer}>
              <Image source={{ uri: item.cartLogo }} style={styles.cartLogo} />
              <View
                style={[styles.statusIndicator, { backgroundColor: getStatusSolidColor(item.status) }]}
              >
                <Ionicons 
                  name={getOrderIcon(item.status) as any} 
                  size={12} 
                  color="white" 
                />
              </View>
            </View>
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{item.cartName}</Text>
              <View style={styles.orderMeta}>
                <Ionicons name="time-outline" size={14} color="#95A5A6" />
                <Text style={styles.orderTime}>{item.createdAt}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statusSection}>
            <View
              style={[styles.statusBadge, { backgroundColor: getStatusSolidColor(item.status) }]}
            >
              <Text style={styles.statusText}>{item.statusText}</Text>
            </View>
            <Text style={styles.orderAmount}>¥{item.finalAmount}</Text>
          </View>
        </View>

        <View style={styles.orderItemsSection}>
          <View style={styles.itemsContainer}>
            {item.items.slice(0, 2).map((orderItem, index) => (
              <View key={index} style={styles.orderItemRow}>
                <View style={styles.itemDot} />
                <Text style={styles.orderItemText}>
                  {orderItem.name} x{orderItem.quantity}
                </Text>
                {orderItem.options && (
                  <Text style={styles.orderItemOptions}>({orderItem.options})</Text>
                )}
              </View>
            ))}
            {item.items.length > 2 && (
              <View style={styles.moreItemsContainer}>
                <Text style={styles.moreItems}>+{item.items.length - 2} 更多商品</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.pickupInfo}>
            <Ionicons name="location-outline" size={16} color="#8B4513" />
            <Text style={styles.pickupTime}>取货时间: {item.pickupTime}</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>查看详情</Text>
            <Ionicons name="chevron-forward" size={16} color="#8B4513" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B4513" translucent={false} />
      
      {/* Header with Solid Background - extends to safe area */}
      <View style={styles.headerBackground}>
        <SafeAreaView style={styles.safeAreaHeader} edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            <View style={styles.titleSection}>
              <Text style={styles.headerTitle}>我的订单</Text>
              <View style={styles.orderSummary}>
                <Text style={styles.orderCount}>共 {orders.length} 个订单</Text>
                <View style={styles.statusDots}>
                  <View style={[styles.statusDot, { backgroundColor: '#FF6B6B' }]} />
                  <View style={[styles.statusDot, { backgroundColor: '#4ECDC4' }]} />
                  <View style={[styles.statusDot, { backgroundColor: '#95A5A6' }]} />
                </View>
              </View>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={18} color="#8B4513" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="搜索订单..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#95A5A6"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={18} color="#95A5A6" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <View
              style={[
                styles.tabBackground, 
                activeTab === 'all' && { backgroundColor: '#8B4513' },
                activeTab === 'all' && styles.activeTabBackground
              ]}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                全部
              </Text>
              {activeTab === 'all' && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{orders.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
            onPress={() => setActiveTab('pending')}
          >
            <View
              style={[
                styles.tabBackground, 
                activeTab === 'pending' && { backgroundColor: '#FF6B6B' },
                activeTab === 'pending' && styles.activeTabBackground
              ]}
            >
              <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
                待取货
              </Text>
              {activeTab === 'pending' && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>
                    {orders.filter(o => o.status === 'pending').length}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <View
              style={[
                styles.tabBackground, 
                activeTab === 'completed' && { backgroundColor: '#4ECDC4' },
                activeTab === 'completed' && styles.activeTabBackground
              ]}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
                已完成
              </Text>
              {activeTab === 'completed' && (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>
                    {orders.filter(o => o.status === 'completed').length}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          style={styles.ordersList}
          contentContainerStyle={styles.ordersListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyBackground}>
                <Ionicons name="receipt-outline" size={80} color="#BDC3C7" />
                <Text style={styles.emptyText}>暂无订单</Text>
                <Text style={styles.emptySubtext}>您还没有任何订单记录</Text>
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  // Header Styles
  headerBackground: {
    backgroundColor: '#8B4513',
    paddingBottom: 20,
  },
  safeAreaHeader: {
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    justifyContent: 'space-between',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  orderSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: 12,
  },
  statusDots: {
    flexDirection: 'row',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  // Search Bar Styles
  searchContainer: {
    marginTop: 'auto',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  // Content Container
  contentContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F8F9FB',
    paddingTop: 20,
  },
  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: CARD_MARGIN,
    borderRadius: 15,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
  },
  activeTab: {
    // This is handled by the gradient, no additional styles needed
  },
  tabBackground: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  activeTabBackground: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    color: '#95A5A6',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  tabBadgeText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
  },

  // Orders List Styles
  ordersList: {
    flex: 1,
  },
  ordersListContent: {
    padding: CARD_MARGIN,
    paddingBottom: 100,
  },

  // Order Card Styles
  orderCard: {
    marginBottom: 16,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  orderBackground: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cartInfoSection: {
    flexDirection: 'row',
    flex: 1,
  },
  cartLogoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  cartLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  cartDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTime: {
    fontSize: 13,
    color: '#95A5A6',
    marginLeft: 6,
    fontWeight: '500',
  },
  statusSection: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },

  // Order Items Section
  orderItemsSection: {
    marginBottom: 16,
  },
  itemsContainer: {
    backgroundColor: 'rgba(139, 69, 19, 0.05)',
    borderRadius: 12,
    padding: 12,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B4513',
    marginRight: 10,
  },
  orderItemText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
    flex: 1,
  },
  orderItemOptions: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  moreItemsContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  moreItems: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
    fontStyle: 'italic',
  },

  // Order Footer
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pickupTime: {
    fontSize: 13,
    color: '#8B4513',
    marginLeft: 6,
    fontWeight: '500',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
    marginRight: 4,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyBackground: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 60,
    borderRadius: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#7F8C8D',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 8,
    textAlign: 'center',
  },
}); 