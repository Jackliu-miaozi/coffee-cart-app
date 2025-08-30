import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { orders } from '../data/mockData';
import { Order } from '../types';

type OrderDetailsRouteProp = RouteProp<RootStackParamList, 'OrderDetails'>;
type OrderDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'OrderDetails'>;

export default function OrderDetailsScreen() {
  const route = useRoute<OrderDetailsRouteProp>();
  const navigation = useNavigation<OrderDetailsNavigationProp>();
  const { id } = route.params;

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>订单不存在</Text>
      </View>
    );
  }

  const getStatusStep = () => {
    switch (order.status) {
      case 'pending':
        return 1;
      case 'processing':
        return 2;
      case 'completed':
        return 3;
      case 'canceled':
        return -1;
      default:
        return 0;
    }
  };

  const statusStep = getStatusStep();

  const handleCall = () => {
    Linking.openURL(`tel:13800138000`);
  };

  const handleNavigate = () => {
    // In a real app, this would open the map app with navigation
    Linking.openURL(`https://maps.apple.com/?q=上海市浦东新区张江高科技园区`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>订单详情</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>{order.statusText}</Text>
          <Text style={styles.orderNumber}>订单号: {order.id}</Text>
          
          {/* Status Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLine} />
            <View style={styles.progressSteps}>
              <View style={styles.progressStep}>
                <View style={[
                  styles.stepCircle,
                  statusStep >= 1 && styles.activeStepCircle
                ]}>
                  <Text style={[
                    styles.stepNumber,
                    statusStep >= 1 && styles.activeStepNumber
                  ]}>1</Text>
                </View>
                <Text style={[
                  styles.stepLabel,
                  statusStep >= 1 && styles.activeStepLabel
                ]}>已下单</Text>
              </View>
              <View style={styles.progressStep}>
                <View style={[
                  styles.stepCircle,
                  statusStep >= 2 && styles.activeStepCircle
                ]}>
                  <Text style={[
                    styles.stepNumber,
                    statusStep >= 2 && styles.activeStepNumber
                  ]}>2</Text>
                </View>
                <Text style={[
                  styles.stepLabel,
                  statusStep >= 2 && styles.activeStepLabel
                ]}>制作中</Text>
              </View>
              <View style={styles.progressStep}>
                <View style={[
                  styles.stepCircle,
                  statusStep >= 3 && styles.activeStepCircle
                ]}>
                  <Text style={[
                    styles.stepNumber,
                    statusStep >= 3 && styles.activeStepNumber
                  ]}>3</Text>
                </View>
                <Text style={[
                  styles.stepLabel,
                  statusStep >= 3 && styles.activeStepLabel
                ]}>已完成</Text>
              </View>
            </View>
          </View>
        </View>

        {/* QR Code for Pickup */}
        {order.status === 'pending' && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>取货二维码</Text>
            <Image source={{ uri: order.qrCode }} style={styles.qrCode} />
            <Text style={styles.qrHint}>请向店员出示此二维码</Text>
          </View>
        )}

        {/* Coffee Cart Info */}
        <View style={styles.cartInfoContainer}>
          <Text style={styles.sectionTitle}>咖啡车信息</Text>
          <View style={styles.cartInfo}>
            <Image source={{ uri: order.cartLogo }} style={styles.cartLogo} />
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{order.cartName}</Text>
              <Text style={styles.cartAddress}>地址: 上海市浦东新区张江高科技园区</Text>
            </View>
          </View>
          <View style={styles.cartActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={16} color="#8B4513" />
              <Text style={styles.actionButtonText}>联系商家</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigateButton} onPress={handleNavigate}>
              <Ionicons name="location-outline" size={16} color="white" />
              <Text style={styles.navigateButtonText}>导航前往</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>订单详情</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.options && (
                  <Text style={styles.itemOptions}>{item.options}</Text>
                )}
              </View>
              <View style={styles.itemPrice}>
                <Text style={styles.itemPriceText}>
                  ¥{item.price} x {item.quantity}
                </Text>
                <Text style={styles.itemTotal}>
                  ¥{item.price * item.quantity}
                </Text>
              </View>
            </View>
          ))}
          
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>商品金额</Text>
              <Text style={styles.priceValue}>¥{order.totalAmount}</Text>
            </View>
            {order.discount > 0 && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>优惠金额</Text>
                <Text style={styles.discountValue}>-¥{order.discount}</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>实付金额</Text>
              <Text style={styles.totalValue}>¥{order.finalAmount}</Text>
            </View>
          </View>
        </View>

        {/* Pickup Info */}
        <View style={styles.pickupContainer}>
          <Text style={styles.sectionTitle}>取货信息</Text>
          <View style={styles.pickupInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>取货时间</Text>
              <Text style={styles.infoValue}>{order.pickupTime}</Text>
            </View>
            {order.note && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>备注</Text>
                <Text style={styles.infoValue}>{order.note}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>支付方式</Text>
              <Text style={styles.infoValue}>{order.paymentMethod}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>下单时间</Text>
              <Text style={styles.infoValue}>{order.createdAt}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>订单号</Text>
              <View style={styles.orderNumberContainer}>
                <Text style={styles.infoValue}>{order.id}</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Ionicons name="copy-outline" size={14} color="#8B4513" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Order Actions */}
      <View style={styles.actionsContainer}>
        {order.status === 'pending' && (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>取消订单</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.reorderButtonText}>再次购买</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#8B4513',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  statusContainer: {
    backgroundColor: '#8B4513',
    padding: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  progressContainer: {
    position: 'relative',
    marginTop: 20,
  },
  progressLine: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeStepCircle: {
    backgroundColor: 'white',
  },
  stepNumber: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
  },
  activeStepNumber: {
    color: '#8B4513',
  },
  stepLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeStepLabel: {
    color: 'white',
  },
  qrContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  qrCode: {
    width: 160,
    height: 160,
    marginBottom: 12,
  },
  qrHint: {
    fontSize: 14,
    color: '#666',
  },
  cartInfoContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cartDetails: {
    flex: 1,
  },
  cartName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartAddress: {
    fontSize: 14,
    color: '#666',
  },
  cartActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#8B4513',
    marginLeft: 4,
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#8B4513',
    borderRadius: 8,
  },
  navigateButtonText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 4,
  },
  itemsContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  itemOptions: {
    fontSize: 12,
    color: '#999',
  },
  itemPrice: {
    alignItems: 'flex-end',
  },
  itemPriceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B4513',
  },
  priceBreakdown: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  discountValue: {
    fontSize: 14,
    color: '#8B4513',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  pickupContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  pickupInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  orderNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  reorderButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
}); 