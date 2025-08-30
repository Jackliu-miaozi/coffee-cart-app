import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Layout Constants
export const LAYOUT = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  HEADER_HEIGHT: 160,
  SAFE_AREA_PADDING: 20,
  BOTTOM_TAB_HEIGHT: 85,
  SEARCH_TOP_OFFSET: 60,
  CONTENT_HORIZONTAL_MARGIN: 24,
  CARD_MARGIN: 20,
  BORDER_RADIUS: 16,
};

// Colors
export const COLORS = {
  PRIMARY: '#8B4513',
  SECONDARY: '#D2691E',
  SUCCESS: '#4CAF50',
  ERROR: '#E74C3C',
  WARNING: '#FF6B6B',
  INFO: '#4ECDC4',
  BACKGROUND: '#F8F9FB',
  CARD_BACKGROUND: '#FFFFFF',
  TEXT_PRIMARY: '#2C3E50',
  TEXT_SECONDARY: '#7F8C8D',
  TEXT_LIGHT: '#95A5A6',
  BORDER: '#E5E5E5',
  SHADOW: '#000',
};

// Status Colors
export const STATUS_COLORS = {
  pending: '#FF6B6B',
  processing: '#FFD700',
  completed: '#4ECDC4',
  canceled: '#95A5A6',
  open: '#4CAF50',
  closed: '#9E9E9E',
};

// Font Sizes
export const FONT_SIZES = {
  EXTRA_SMALL: 11,
  SMALL: 12,
  MEDIUM: 14,
  REGULAR: 16,
  LARGE: 18,
  EXTRA_LARGE: 20,
  HEADER: 24,
  TITLE: 28,
  LARGE_TITLE: 32,
};

// Shadow Styles
export const SHADOWS = {
  SMALL: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  MEDIUM: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  LARGE: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
};

// Common Style Patterns
export const COMMON_STYLES = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: LAYOUT.BORDER_RADIUS,
    padding: LAYOUT.CARD_MARGIN,
    ...SHADOWS.MEDIUM,
  },
  section: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
};
