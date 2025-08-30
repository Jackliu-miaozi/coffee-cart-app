import { CoffeeCart, Order, UserProfile, ShoppingCart } from '../types';

// Coffee cart data
export const coffeeCarts: CoffeeCart[] = [
  {
    id: '1',
    name: '咖啡星球',
    image:
      'https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    images: [
      'https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1478&q=80',
    ],
    rating: 4.8,
    distance: '0.5km',
    status: 'open',
    businessHours: '08:00 - 20:00',
    phone: '13800138000',
    location: {
      lat: 31.2304,
      lng: 121.4737,
    },
    menu: [
      {
        category: '咖啡',
        items: [
          {
            id: 'c1',
            name: '美式咖啡',
            price: 18,
            image:
              'https://images.unsplash.com/photo-1520031607503-2d59cfa3d390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: '浓郁的咖啡香气，清爽的口感',
          },
          {
            id: 'c2',
            name: '拿铁',
            price: 22,
            image:
              'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1637&q=80',
            description: '丝滑奶泡与醇厚咖啡的完美结合',
          },
        ],
      },
      {
        category: '茶饮',
        items: [
          {
            id: 't1',
            name: '抹茶拿铁',
            price: 24,
            image:
              'https://images.unsplash.com/photo-1546039907-8d3112854ef9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            description: '日式抹茶与牛奶的融合',
          },
        ],
      },
    ],
    reviews: [
      {
        id: 'r1',
        user: '李小明',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        content: '咖啡很香，服务很好，环境也很棒！',
        date: '2023-06-15',
      },
      {
        id: 'r2',
        user: '王小红',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4,
        content: '拿铁很好喝，就是价格稍贵。',
        date: '2023-06-10',
      },
    ],
  },
  {
    id: '2',
    name: '漫步咖啡',
    image:
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    rating: 4.5,
    distance: '0.8km',
    status: 'open',
    location: {
      lat: 31.233,
      lng: 121.475,
    },
  },
  {
    id: '3',
    name: '悠然咖啡屋',
    image:
      'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80',
    rating: 4.3,
    distance: '1.2km',
    status: 'closed',
    location: {
      lat: 31.228,
      lng: 121.472,
    },
  },
];

// Orders data
export const orders: Order[] = [
  {
    id: 'o1',
    cartId: '1',
    cartName: '咖啡星球',
    cartLogo:
      'https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'pending',
    statusText: '待取货',
    createdAt: '2023-06-20 14:30',
    pickupTime: '2023-06-20 15:00',
    items: [
      {
        id: 'c1',
        name: '美式咖啡',
        price: 18,
        quantity: 1,
        options: '中杯, 少糖',
      },
      {
        id: 'c2',
        name: '拿铁',
        price: 22,
        quantity: 2,
        options: '大杯, 标准糖',
      },
    ],
    totalAmount: 62,
    discount: 5,
    finalAmount: 57,
    paymentMethod: '微信支付',
    note: '请多加一包糖',
    qrCode:
      'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=order-o1',
  },
  {
    id: 'o2',
    cartId: '2',
    cartName: '漫步咖啡',
    cartLogo:
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    status: 'completed',
    statusText: '已完成',
    createdAt: '2023-06-18 10:15',
    pickupTime: '2023-06-18 10:45',
    items: [
      {
        id: 'c3',
        name: '卡布奇诺',
        price: 25,
        quantity: 1,
        options: '中杯, 标准糖',
      },
    ],
    totalAmount: 25,
    discount: 0,
    finalAmount: 25,
    paymentMethod: '支付宝',
    qrCode:
      'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=order-o2',
  },
];

// User profile data
export const userProfile: UserProfile = {
  name: '张小明',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  phone: '138****8888',
  favorites: 5,
  coupons: 3,
  addresses: [
    {
      id: 'a1',
      name: '公司',
      address: '上海市浦东新区张江高科技园区博云路2号',
      isDefault: true,
    },
    {
      id: 'a2',
      name: '家',
      address: '上海市静安区南京西路1266号',
      isDefault: false,
    },
  ],
};

// Shopping cart data
export const shoppingCart: ShoppingCart = {
  cartId: '1',
  items: [
    {
      id: 'c1',
      name: '美式咖啡',
      price: 18,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1520031607503-2d59cfa3d390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      options: '中杯, 少糖',
    },
    {
      id: 'c2',
      name: '拿铁',
      price: 22,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1637&q=80',
      options: '大杯, 标准糖',
    },
  ],
  coupons: [
    {
      id: 'cp1',
      name: '新用户优惠券',
      discount: 5,
      minAmount: 20,
      expireDate: '2023-07-31',
    },
    {
      id: 'cp2',
      name: '满50减10',
      discount: 10,
      minAmount: 50,
      expireDate: '2023-06-30',
    },
  ],
  totalAmount: 62,
  selectedCoupon: 'cp1',
  discount: 5,
  finalAmount: 57,
};
