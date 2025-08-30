import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SHADOWS } from '../../utils';

const { width } = Dimensions.get('window');

// iPhone 13 Pro Max 优化常量
const SAFE_AREA_PADDING = 20;
const BOTTOM_TAB_HEIGHT = 85; // 为 iPhone 13 Pro Max 优化的底部导航栏高度
const SEARCH_TOP_OFFSET = 60; // 搜索栏顶部偏移
const CONTENT_HORIZONTAL_MARGIN = 24; // 内容水平边距

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // Search Section
  searchContainer: {
    position: 'absolute',
    top: SEARCH_TOP_OFFSET,
    left: CONTENT_HORIZONTAL_MARGIN,
    right: CONTENT_HORIZONTAL_MARGIN,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    ...SHADOWS.MEDIUM,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },

  // Map Section
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: BOTTOM_TAB_HEIGHT + SAFE_AREA_PADDING + 20,
    right: CONTENT_HORIZONTAL_MARGIN,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  locationButtonDisabled: {
    opacity: 0.6,
  },
  locationButtonSuccess: {
    backgroundColor: '#E8F5E8',
    borderWidth: 2,
    borderColor: COLORS.SUCCESS,
  },

  // Markers
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.CARD_BACKGROUND,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  // Cart Info Card
  cartInfoCard: {
    position: 'absolute',
    bottom: BOTTOM_TAB_HEIGHT + SAFE_AREA_PADDING,
    left: CONTENT_HORIZONTAL_MARGIN,
    right: CONTENT_HORIZONTAL_MARGIN,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cartInfoHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },
  cartInfo: {
    flex: 1,
  },
  cartName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 6,
  },
  cartDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    marginLeft: 4,
  },
  distance: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewDetailsButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  viewDetailsText: {
    color: COLORS.CARD_BACKGROUND,
    fontSize: 17,
    fontWeight: '700',
  },

  // Empty State Styles (Guest Mode)
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  emptyHeader: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  emptyLogoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.CARD_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginTop: 0,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyContent: {
    flex: 1,
    paddingHorizontal: 30,
  },
  emptyMapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 20,
    padding: 40,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 16,
    textAlign: 'center',
  },
  emptyFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: (width - 60 - 20) / 2,
    alignItems: 'center',
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  loginSection: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: COLORS.CARD_BACKGROUND,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  // ScrollView Styles for Guest Mode
  emptyScroll: {
    flex: 1,
  },
});
