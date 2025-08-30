import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { orders } from '../data/mockData';
import { Order } from '../types';
import { useAuthStore } from '../stores/authStore';
import { AppHeader, SearchBar, EmptyState, TabBar, OrderCard } from '../components';
import { LAYOUT, COLORS, COMMON_STYLES } from '../utils';



type OrdersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Orders'>;

export default function OrdersScreen() {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { isAuthenticated, isGuest } = useAuthStore();
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



  const renderOrderItem = ({ item }: { item: Order }) => (
    <OrderCard 
      order={item} 
      onPress={() => navigation.navigate('OrderDetails', { id: item.id })} 
    />
  );

  // 未登录状态的空状态界面
  if (isGuest) {
    return (
      <View style={styles.container}>
        <AppHeader 
          title="我的订单" 
          subtitle="登录后查看您的订单记录"
        />
        
        <ScrollView
          style={styles.emptyScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <EmptyState
            icon="receipt-outline"
            title="暂无订单记录"
            subtitle="登录后开始您的咖啡之旅，查看订单历史"
            features={[
              { icon: 'time-outline', title: '实时订单状态' },
              { icon: 'repeat-outline', title: '历史订单记录' },
              { icon: 'qr-code-outline', title: '取货二维码' },
              { icon: 'heart-outline', title: '重新下单' },
            ]}
          />
        </ScrollView>
      </View>
    );
  }

  const tabItems = [
    { id: 'all', label: '全部', count: orders.length, color: COLORS.PRIMARY },
    { id: 'pending', label: '待取货', count: orders.filter(o => o.status === 'pending').length, color: '#FF6B6B' },
    { id: 'completed', label: '已完成', count: orders.filter(o => o.status === 'completed').length, color: '#4ECDC4' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader 
        title="我的订单" 
        subtitle={`共 ${orders.length} 个订单`}
      >
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="搜索订单..."
          />
        </View>
      </AppHeader>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        <TabBar
          items={tabItems}
          activeTab={activeTab}
          onTabPress={(tabId) => setActiveTab(tabId as 'all' | 'pending' | 'completed')}
        />

        {/* Orders List */}
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          style={styles.ordersList}
          contentContainerStyle={styles.ordersListContent}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ListEmptyComponent={
            <EmptyState
              icon="receipt-outline"
              title="暂无订单"
              subtitle="您还没有任何订单记录"
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: COMMON_STYLES.container,
  searchContainer: {
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: 20,
  },

  ordersList: {
    flex: 1,
  },
  ordersListContent: {
    padding: LAYOUT.CARD_MARGIN,
    paddingBottom: 100,
  },
  emptyScroll: {
    flex: 1,
  },
}); 