import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { shoppingCart } from '../data/mockData';
import { shoppingCartScreenStyles as styles } from '../styles/screens';
import { RootStackParamList } from '../types';

type ShoppingCartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ShoppingCart'
>;

export default function ShoppingCartScreen() {
  const navigation = useNavigation<ShoppingCartScreenNavigationProp>();
  const [cart, setCart] = useState(shoppingCart);
  const [note, setNote] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart({
      ...cart,
      items: cart.items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    });
  };

  const removeItem = (itemId: string) => {
    setCart({
      ...cart,
      items: cart.items.filter(item => item.id !== itemId),
    });
  };

  const selectCoupon = (couponId: string) => {
    const selectedCoupon = cart.coupons.find(coupon => coupon.id === couponId);
    const totalAmount = calculateTotal();
    const discount = selectedCoupon ? selectedCoupon.discount : 0;
    setCart({
      ...cart,
      selectedCoupon: couponId,
      discount: discount,
      finalAmount: totalAmount - discount,
    });
  };

  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmitOrder = () => {
    if (cart.items.length === 0) {
      Alert.alert('提示', '购物车为空');
      return;
    }
    if (!pickupTime) {
      Alert.alert('提示', '请选择取货时间');
      return;
    }
    Alert.alert('成功', '订单已提交！');
    navigation.goBack();
  };

  if (cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.emptyHeaderTitle}>购物车</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContent}>
          <Ionicons name="cart-outline" size={80} color="#CCC" />
          <Text style={styles.emptyText}>购物车是空的</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.emptyButtonText}>去选购</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>购物车</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>已选商品</Text>
          </View>
          {cart.items.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="trash-outline" size={18} color="#999" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemOptions}>{item.options}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>¥{item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Ionicons name="remove" size={16} color="#666" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Ionicons name="add" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Coupon Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>优惠券</Text>
            <Text style={styles.couponInfo}>
              {cart.selectedCoupon
                ? cart.coupons.find(c => c.id === cart.selectedCoupon)?.name
                : '未选择'}
            </Text>
          </View>
          <View style={styles.couponsContainer}>
            {cart.coupons.map(coupon => (
              <TouchableOpacity
                key={coupon.id}
                style={[
                  styles.couponItem,
                  cart.selectedCoupon === coupon.id && styles.selectedCoupon,
                ]}
                onPress={() => selectCoupon(coupon.id)}
              >
                <View style={styles.couponInfo}>
                  <Text style={styles.couponName}>{coupon.name}</Text>
                  <Text style={styles.couponDetails}>
                    满{coupon.minAmount}减{coupon.discount} · 有效期至
                    {coupon.expireDate}
                  </Text>
                </View>
                <Text style={styles.couponDiscount}>-¥{coupon.discount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pickup Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>取货信息</Text>
          </View>
          <View style={styles.pickupContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>取货时间</Text>
              <View style={styles.pickupTimeContainer}>
                {['15min', '30min', '1hour'].map(time => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      pickupTime === time && styles.selectedTimeButton,
                    ]}
                    onPress={() => setPickupTime(time)}
                  >
                    <Text
                      style={[
                        styles.timeButtonText,
                        pickupTime === time && styles.selectedTimeButtonText,
                      ]}
                    >
                      {time === '15min'
                        ? '15分钟后'
                        : time === '30min'
                          ? '30分钟后'
                          : '1小时后'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>备注</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="请输入备注信息，如无糖、少冰等"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>商品金额</Text>
          <Text style={styles.summaryValue}>¥{calculateTotal()}</Text>
        </View>
        {cart.discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>优惠金额</Text>
            <Text style={styles.summaryDiscount}>-¥{cart.discount}</Text>
          </View>
        )}
        <View style={styles.summaryTotal}>
          <Text style={styles.totalLabel}>实付金额</Text>
          <Text style={styles.totalValue}>¥{cart.finalAmount}</Text>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitOrder}
        >
          <Text style={styles.submitButtonText}>提交订单</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
