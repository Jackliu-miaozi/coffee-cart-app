import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import TabNavigator from './TabNavigator';
import CoffeeCartDetailsScreen from '../screens/CoffeeCartDetailsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="CoffeeCartDetails" component={CoffeeCartDetailsScreen} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
        <Stack.Screen name="Orders" component={TabNavigator} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="Profile" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 