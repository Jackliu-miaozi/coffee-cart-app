import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LAYOUT, SHADOWS } from '../../utils';

interface TabItem {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface TabBarProps {
  items: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  style?: any;
}

const TabBar: React.FC<TabBarProps> = ({
  items,
  activeTab,
  onTabPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.tab}
          onPress={() => onTabPress(item.id)}
        >
          <View
            style={[
              styles.tabBackground,
              activeTab === item.id && {
                backgroundColor: item.color || '#8B4513',
                ...styles.activeTabBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === item.id && styles.activeTabText,
              ]}
            >
              {item.label}
            </Text>
            {activeTab === item.id && item.count !== undefined && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>{item.count}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: LAYOUT.CARD_MARGIN,
    borderRadius: 15,
    padding: 4,
    marginBottom: 20,
    ...SHADOWS.SMALL,
  },
  tab: {
    flex: 1,
  },
  tabBackground: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  activeTabBackground: {
    ...SHADOWS.SMALL,
  },
  tabText: {
    fontSize: 14,
    color: '#95A5A6',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  tabBadgeText: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TabBar;
