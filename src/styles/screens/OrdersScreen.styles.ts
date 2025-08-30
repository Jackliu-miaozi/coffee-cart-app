import { StyleSheet } from 'react-native';
import { LAYOUT, COLORS, COMMON_STYLES } from '../../utils';

export const ordersScreenStyles = StyleSheet.create({
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
    paddingTop: 30,
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
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: 0,
  },
});
