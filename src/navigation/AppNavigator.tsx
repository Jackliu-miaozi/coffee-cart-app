import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CoffeeCartDetailsScreen from '../screens/CoffeeCartDetailsScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import { useAuthStore } from '../stores/authStore';
import { RootStackParamList } from '../types';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, isGuest } = useAuthStore();

  console.log('AppNavigator render:', { isAuthenticated, isGuest });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          // 已认证用户（包括游客）看到的界面
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
              name="CoffeeCartDetails"
              component={CoffeeCartDetailsScreen}
            />
            <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        ) : (
          // 未认证用户看到的界面
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
