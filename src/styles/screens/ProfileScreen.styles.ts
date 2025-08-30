import { StyleSheet } from 'react-native';
import { LAYOUT, COLORS, COMMON_STYLES, SHADOWS } from '../../utils';

export const profileScreenStyles = StyleSheet.create({
  container: COMMON_STYLES.container,
  
  // User Section Styles
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
    backgroundColor: COLORS.SUCCESS,
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

  // Stats Section
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

  // Scroll Content
  scrollContent: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: 30,
  },

  // Section Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
    marginHorizontal: LAYOUT.CARD_MARGIN,
  },

  // Quick Actions Styles
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.CARD_MARGIN,
  },

  // Wallet Section Styles
  walletSection: {
    marginBottom: 32,
  },
  walletCard: {
    marginHorizontal: LAYOUT.CARD_MARGIN,
    borderRadius: LAYOUT.BORDER_RADIUS,
    overflow: 'hidden',
    ...SHADOWS.LARGE,
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
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginHorizontal: LAYOUT.CARD_MARGIN,
    borderRadius: LAYOUT.BORDER_RADIUS,
    ...SHADOWS.SMALL,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
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
    color: COLORS.TEXT_PRIMARY,
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
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginHorizontal: LAYOUT.CARD_MARGIN,
    paddingVertical: 16,
    borderRadius: LAYOUT.BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.ERROR,
    ...SHADOWS.SMALL,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.ERROR,
    marginLeft: 8,
    fontWeight: '600',
  },

  // Login Button (for guests)
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    marginHorizontal: LAYOUT.CARD_MARGIN,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.CARD_BACKGROUND,
    marginLeft: 8,
    fontWeight: '600',
  },

  // Version Info Styles
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: LAYOUT.CARD_MARGIN,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.TEXT_LIGHT,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
  },

  // Bottom Padding for Tab Bar
  bottomPadding: {
    height: 100,
  },

  // Guest Header Styles
  guestHeaderSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  guestHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  guestHeaderSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});
