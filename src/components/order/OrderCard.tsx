import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '../../types';
import { LAYOUT, COLORS, SHADOWS } from '../../utils';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
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

  return (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.orderBackground}>
        <View style={styles.orderHeader}>
          <View style={styles.cartInfoSection}>
            <View style={styles.cartLogoContainer}>
              <Image source={{ uri: order.cartLogo }} style={styles.cartLogo} />
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(order.status) },
                ]}
              >
                <Ionicons
                  name={getOrderIcon(order.status) as any}
                  size={12}
                  color="white"
                />
              </View>
            </View>
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{order.cartName}</Text>
              <View style={styles.orderMeta}>
                <Ionicons name="time-outline" size={14} color="#95A5A6" />
                <Text style={styles.orderTime}>{order.createdAt}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statusSection}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) },
              ]}
            >
              <Text style={styles.statusText}>{order.statusText}</Text>
            </View>
            <Text style={styles.orderAmount}>¥{order.finalAmount}</Text>
          </View>
        </View>

        <View style={styles.orderItemsSection}>
          <View style={styles.itemsContainer}>
            {order.items.slice(0, 2).map((orderItem, index) => (
              <View key={index} style={styles.orderItemRow}>
                <View style={styles.itemDot} />
                <Text style={styles.orderItemText}>
                  {orderItem.name} x{orderItem.quantity}
                </Text>
                {orderItem.options && (
                  <Text style={styles.orderItemOptions}>
                    ({orderItem.options})
                  </Text>
                )}
              </View>
            ))}
            {order.items.length > 2 && (
              <View style={styles.moreItemsContainer}>
                <Text style={styles.moreItems}>
                  +{order.items.length - 2} 更多商品
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.orderFooter}>
          <View style={styles.pickupInfo}>
            <Ionicons name="location-outline" size={16} color="#8B4513" />
            <Text style={styles.pickupTime}>取货时间: {order.pickupTime}</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>查看详情</Text>
            <Ionicons name="chevron-forward" size={16} color="#8B4513" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    marginBottom: 16,
    borderRadius: LAYOUT.BORDER_RADIUS,
    overflow: 'hidden',
    ...SHADOWS.MEDIUM,
  },
  orderBackground: {
    backgroundColor: COLORS.CARD_BACKGROUND,
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
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTime: {
    fontSize: 13,
    color: COLORS.TEXT_LIGHT,
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
    color: COLORS.PRIMARY,
  },
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
    backgroundColor: COLORS.PRIMARY,
    marginRight: 10,
  },
  orderItemText: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
    flex: 1,
  },
  orderItemOptions: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 8,
  },
  moreItemsContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  moreItems: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontWeight: '600',
    fontStyle: 'italic',
  },
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
    color: COLORS.PRIMARY,
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
    color: COLORS.PRIMARY,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default OrderCard;
