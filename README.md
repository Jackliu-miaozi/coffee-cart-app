# 移动咖啡车 APP

一个基于 React Native 和 Expo 开发的移动咖啡车应用，帮助用户寻找附近的移动咖啡车并进行在线下单。

## 功能特性

### 用户端功能
- 🗺️ **地图定位**: 显示用户当前位置和附近的咖啡车
- 🔍 **搜索功能**: 支持按咖啡车名称或地址搜索
- 📱 **远程下单**: 浏览菜单，添加商品到购物车
- 🛒 **购物车管理**: 商品数量调整、优惠券选择
- 📋 **订单管理**: 查看订单状态、订单详情
- 🎫 **取货验证**: 二维码取货验证
- 👤 **个人中心**: 用户信息、收藏、优惠券等

### 技术特性
- 📱 React Native + Expo
- 🗺️ React Native Maps 地图集成
- 📍 Expo Location 位置服务
- 🎨 现代化 UI 设计
- 📱 响应式布局
- 🔄 状态管理

## 项目结构

```
src/
├── components/          # 可复用组件
├── data/               # 模拟数据
│   └── mockData.ts     # 咖啡车、订单、用户数据
├── navigation/         # 导航配置
│   ├── AppNavigator.tsx    # 主导航器
│   └── TabNavigator.tsx    # 底部标签导航
├── screens/            # 页面组件
│   ├── HomeScreen.tsx              # 首页（地图）
│   ├── CoffeeCartDetailsScreen.tsx # 咖啡车详情
│   ├── ShoppingCartScreen.tsx      # 购物车
│   ├── OrdersScreen.tsx            # 订单列表
│   ├── OrderDetailsScreen.tsx      # 订单详情
│   └── ProfileScreen.tsx           # 个人中心
├── types/              # TypeScript 类型定义
│   └── index.ts        # 接口和类型
└── utils/              # 工具函数
```

## 安装和运行

### 环境要求
- Node.js 16+
- npm 或 yarn
- Expo CLI
- iOS Simulator 或 Android Emulator（可选）

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd coffee-cart-app
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm start
```

4. **运行应用**

- **iOS**: 按 `i` 键或扫描二维码
- **Android**: 按 `a` 键或扫描二维码
- **Web**: 按 `w` 键

### 开发命令

```bash
# 启动开发服务器
npm start

# 运行 iOS 模拟器
npm run ios

# 运行 Android 模拟器
npm run android

# 运行 Web 版本
npm run web

# 构建生产版本
expo build:ios
expo build:android
```

## 主要页面说明

### 1. 首页（地图页面）
- 显示用户当前位置
- 地图上标记附近的咖啡车
- 搜索功能
- 咖啡车信息卡片

### 2. 咖啡车详情页
- 咖啡车基本信息
- 菜单浏览
- 用户评价
- 加入购物车

### 3. 购物车页面
- 商品列表管理
- 数量调整
- 优惠券选择
- 取货信息填写
- 订单提交

### 4. 订单页面
- 订单列表
- 状态筛选
- 搜索功能

### 5. 订单详情页
- 订单状态进度
- 取货二维码
- 咖啡车信息
- 订单详情
- 操作按钮

### 6. 个人中心
- 用户信息
- 钱包功能
- 功能菜单
- 设置选项

## 技术栈

- **框架**: React Native + Expo
- **导航**: React Navigation
- **地图**: React Native Maps
- **位置**: Expo Location
- **图标**: Expo Vector Icons
- **语言**: TypeScript
- **样式**: React Native StyleSheet

## 权限说明

应用需要以下权限：
- **位置权限**: 用于显示用户当前位置和附近的咖啡车
- **相机权限**: 用于扫描二维码（可选）

## 开发注意事项

1. **地图服务**: 当前使用 OpenStreetMap，生产环境建议使用 Google Maps 或高德地图
2. **位置服务**: 需要真机测试位置功能
3. **数据**: 当前使用模拟数据，需要连接真实后端 API
4. **支付**: 需要集成真实的支付 SDK

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或联系开发团队。 