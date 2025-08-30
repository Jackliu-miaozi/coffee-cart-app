import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { userProfile } from '../data/mockData';
import { useAuthStore } from '../stores/authStore';
import { AppHeader, ActionCard } from '../components';
import { profileScreenStyles as styles } from '../styles/screens';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { isAuthenticated, isGuest, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // 退出登录后，zustand 会更新认证状态，AppNavigator 会自动跳转到登录页面
  };

  const quickActions =
    isAuthenticated && !isGuest
      ? [
          {
            icon: 'receipt',
            title: '我的订单',
            subtitle: '查看订单状态',
            color: '#667eea',
            onPress: () => {
              // 使用 TabNavigator 的方式导航，这需要不同的处理方式
              // 暂时先留空，后续优化
            },
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
        ]
      : [
          {
            icon: 'log-in',
            title: '立即登录',
            subtitle: '享受完整功能',
            color: '#8B4513',
            onPress: () => navigation.navigate('Auth'),
          },
          {
            icon: 'cafe',
            title: '咖啡车',
            subtitle: '发现附近美食',
            color: '#667eea',
            onPress: () => {
              // 导航到首页标签
            },
          },
          {
            icon: 'information-circle',
            title: '关于我们',
            subtitle: '了解咖啡车',
            color: '#4ECDC4',
            onPress: () => {},
          },
          {
            icon: 'help-circle',
            title: '帮助中心',
            subtitle: '常见问题解答',
            color: '#a8edea',
            onPress: () => {},
          },
        ];

  const settingsItems = isAuthenticated
    ? [
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
      ]
    : [
        {
          icon: 'help-circle-outline',
          title: '帮助中心',
          color: '#8B4513',
          onPress: () => {},
        },
        {
          icon: 'information-circle-outline',
          title: '关于我们',
          color: '#8B4513',
          onPress: () => {},
        },
        {
          icon: 'call-outline',
          title: '联系我们',
          color: '#8B4513',
          onPress: () => {},
        },
      ];

  return (
    <View style={styles.container}>
      <AppHeader
        title={isAuthenticated && !isGuest ? userProfile.name : '个人中心'}
        subtitle={
          isAuthenticated && !isGuest ? '黄金会员' : '登录后享受完整功能'
        }
      >
        {isAuthenticated && !isGuest && (
          <>
            <View style={styles.userSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: userProfile.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.userInfo}>
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
          </>
        )}
      </AppHeader>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>快捷操作</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <ActionCard
                key={index}
                icon={action.icon}
                title={action.title}
                subtitle={action.subtitle}
                color={action.color}
                badge={action.badge}
                onPress={action.onPress}
              />
            ))}
          </View>
        </View>

        {/* Wallet Section - Only show for authenticated users */}
        {isAuthenticated && !isGuest && (
          <View style={styles.walletSection}>
            <Text style={styles.sectionTitle}>我的钱包</Text>
            <View style={styles.walletCard}>
              <View style={styles.walletBackground}>
                <View style={styles.walletHeader}>
                  <View>
                    <Text style={styles.walletBalance}>¥ 168.00</Text>
                    <Text style={styles.walletLabel}>账户余额</Text>
                  </View>
                  <Ionicons
                    name="wallet"
                    size={32}
                    color="rgba(255,255,255,0.8)"
                  />
                </View>
                <View style={styles.walletActions}>
                  <TouchableOpacity style={styles.walletAction}>
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color="white"
                    />
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
        )}

        {/* Settings Menu */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>设置</Text>
          <View style={styles.settingsContainer}>
            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.settingItem,
                  index === settingsItems.length - 1 && styles.lastSettingItem,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.settingLeft}>
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                  <Text style={styles.settingTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Login/Logout Section */}
        <View style={styles.logoutSection}>
          {isAuthenticated && !isGuest ? (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
              <Text style={styles.logoutText}>退出登录</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Auth')}
            >
              <Ionicons name="log-in" size={20} color="white" />
              <Text style={styles.loginText}>立即登录</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>移动咖啡车 v1.0.0</Text>
          <Text style={styles.copyrightText}>
            © 2024 Coffee Cart. All rights reserved.
          </Text>
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}
