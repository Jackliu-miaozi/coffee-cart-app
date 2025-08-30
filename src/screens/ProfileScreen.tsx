import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient'; // 不再使用渐变
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { userProfile } from '../data/mockData';
import { useAuthStore } from '../stores/authStore';

const { width, height } = Dimensions.get('window');

// iPhone 13 Pro Max 优化常量
const HEADER_HEIGHT = 220;
const CARD_MARGIN = 20;
const BORDER_RADIUS = 20;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // 退出登录后，zustand 会更新认证状态，AppNavigator 会自动跳转到登录页面
  };

  const quickActions = [
    {
      icon: 'receipt',
      title: '我的订单',
      subtitle: '查看订单状态',
      color: '#667eea',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      icon: 'heart',
      title: '我的收藏',
      subtitle: `${userProfile.favorites} 个咖啡车`,
      color: '#f093fb',
      onPress: () => {},
    },
    {
      icon: 'ticket',
      title: '优惠券',
      subtitle: `${userProfile.coupons} 张可用`,
      color: '#ffecd2',
      badge: userProfile.coupons,
      onPress: () => {},
    },
    {
      icon: 'location',
      title: '地址管理',
      subtitle: '管理收货地址',
      color: '#a8edea',
      onPress: () => {},
    },
  ];

  const settingsItems = [
    {
      icon: 'settings-outline',
      title: '设置',
      color: '#8B4513',
      onPress: () => {},
    },
    {
      icon: 'help-circle-outline',
      title: '客服中心',
      color: '#8B4513',
      onPress: () => {},
    },
    {
      icon: 'information-circle-outline',
      title: '关于我们',
      color: '#8B4513',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B4513" translucent={false} />
      
      {/* Header with Solid Background - extends to safe area */}
      <View style={styles.headerBackground}>
        <SafeAreaView style={styles.safeAreaHeader} edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            <View style={styles.userSection}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userProfile.name}</Text>
                <View style={styles.userMetaRow}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.levelText}>黄金会员</Text>
                  <View style={styles.separator} />
                  <Text style={styles.userPhone}>{userProfile.phone}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <TouchableOpacity style={styles.statCard}>
                <Text style={styles.statNumber}>¥168</Text>
                <Text style={styles.statLabel}>余额</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statCard}>
                <Text style={styles.statNumber}>{userProfile.favorites}</Text>
                <Text style={styles.statLabel}>收藏</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statCard}>
                <Text style={styles.statNumber}>{userProfile.coupons}</Text>
                <Text style={styles.statLabel}>优惠券</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>快捷操作</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={action.onPress}
              >
                <View
                  style={[styles.quickActionIcon, { backgroundColor: action.color }]}
                >
                  <Ionicons name={action.icon as any} size={28} color="white" />
                  {action.badge && (
                    <View style={styles.actionBadge}>
                      <Text style={styles.actionBadgeText}>{action.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Wallet Section */}
        <View style={styles.walletSection}>
          <Text style={styles.sectionTitle}>我的钱包</Text>
          <View style={styles.walletCard}>
            <View style={styles.walletBackground}>
              <View style={styles.walletHeader}>
                <View>
                  <Text style={styles.walletBalance}>¥ 168.00</Text>
                  <Text style={styles.walletLabel}>账户余额</Text>
                </View>
                <Ionicons name="wallet" size={32} color="rgba(255,255,255,0.8)" />
              </View>
              <View style={styles.walletActions}>
                <TouchableOpacity style={styles.walletAction}>
                  <Ionicons name="add-circle-outline" size={20} color="white" />
                  <Text style={styles.walletActionText}>充值</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletAction}>
                  <Ionicons name="card-outline" size={20} color="white" />
                  <Text style={styles.walletActionText}>提现</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.walletAction}>
                  <Ionicons name="receipt-outline" size={20} color="white" />
                  <Text style={styles.walletActionText}>明细</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>设置</Text>
          <View style={styles.settingsContainer}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.settingItem, index === settingsItems.length - 1 && styles.lastSettingItem]}
                onPress={item.onPress}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name={item.icon as any} size={22} color={item.color} />
                  <Text style={styles.settingTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
            <Text style={styles.logoutText}>退出登录</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>移动咖啡车 v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Coffee Cart. All rights reserved.</Text>
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerBackground: {
    backgroundColor: '#8B4513',
    paddingBottom: 30,
  },
  safeAreaHeader: {
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    justifyContent: 'space-between',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
    marginLeft: 4,
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  userPhone: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  scrollContent: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F8F9FB',
    paddingTop: 30,
  },
  // Section Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    marginHorizontal: CARD_MARGIN,
  },

  // Quick Actions Styles
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: CARD_MARGIN,
  },
  quickActionCard: {
    width: (width - CARD_MARGIN * 2 - 10) / 2,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  actionBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  actionBadgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  // Wallet Section Styles
  walletSection: {
    marginBottom: 32,
  },
  walletCard: {
    marginHorizontal: CARD_MARGIN,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  walletBackground: {
    backgroundColor: '#667eea',
    padding: 24,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  walletLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  walletActionText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },

  // Settings Section Styles
  settingsSection: {
    marginBottom: 24,
  },
  settingsContainer: {
    backgroundColor: 'white',
    marginHorizontal: CARD_MARGIN,
    borderRadius: BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 12,
    fontWeight: '500',
  },

  // Logout Section Styles
  logoutSection: {
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: CARD_MARGIN,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: '#E74C3C',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#E74C3C',
    marginLeft: 8,
    fontWeight: '600',
  },

  // Version Info Styles
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: CARD_MARGIN,
  },
  versionText: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#BDC3C7',
    textAlign: 'center',
  },

  // Bottom Padding for Tab Bar
  bottomPadding: {
    height: 100,
  },
}); 