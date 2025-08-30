import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  children?: React.ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  backgroundColor = '#8B4513',
  showBackButton = false,
  onBackPress,
  rightComponent,
  children,
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent={false} />
      <View style={[styles.headerBackground, { backgroundColor }]}>
        <SafeAreaView style={styles.safeAreaHeader} edges={['top', 'left', 'right']}>
          <View style={styles.headerContent}>
            {showBackButton && (
              <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.titleSection}>
              <Text style={styles.headerTitle}>{title}</Text>
              {subtitle && (
                <Text style={styles.headerSubtitle}>{subtitle}</Text>
              )}
            </View>

            {rightComponent && (
              <View style={styles.rightComponent}>
                {rightComponent}
              </View>
            )}

            {children}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    paddingBottom: 20,
  },
  safeAreaHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 50, // Give space for back button and right component
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  rightComponent: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default AppHeader;
