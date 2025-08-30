// Coffee cart data types
export interface CoffeeCart {
  id: string;
  name: string;
  image: string;
  images?: string[];
  rating: number;
  distance: string;
  status: 'open' | 'closed';
  businessHours?: string;
  phone?: string;
  location: {
    lat: number;
    lng: number;
  };
  menu?: MenuCategory[];
  reviews?: Review[];
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  options?: string[];
  quantity?: number;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

// Order types
export interface Order {
  id: string;
  cartId: string;
  cartName: string;
  cartLogo: string;
  status: 'pending' | 'processing' | 'completed' | 'canceled';
  statusText: string;
  createdAt: string;
  pickupTime: string;
  items: OrderItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: string;
  note?: string;
  qrCode: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: string;
}

// Shopping cart types
export interface ShoppingCart {
  cartId: string;
  items: CartItem[];
  coupons: Coupon[];
  totalAmount: number;
  selectedCoupon?: string;
  discount: number;
  finalAmount: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options?: string;
}

export interface Coupon {
  id: string;
  name: string;
  discount: number;
  minAmount: number;
  expireDate: string;
}

// User profile types
export interface UserProfile {
  name: string;
  avatar: string;
  phone: string;
  favorites: number;
  coupons: number;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

// Auth types
export interface User {
  id: string;
  phone: string;
  name: string;
  avatar: string;
  token: string;
}

// Auth store types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  skipAuth: () => void;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  CoffeeCartDetails: { id: string };
  ShoppingCart: undefined;
  Orders: undefined;
  OrderDetails: { id: string };
  Profile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};
