import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useAuthStore } from '../stores/authStore';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import CoffeeCartDetailsScreen from '../screens/CoffeeCartDetailsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          // 已认证用户看到的界面
          <>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="CoffeeCartDetails" component={CoffeeCartDetailsScreen} />
            <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
            <Stack.Screen name="Orders" component={TabNavigator} />
            <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
            <Stack.Screen name="Profile" component={TabNavigator} />
          </>
        ) : (
          // 未认证用户看到的界面
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 