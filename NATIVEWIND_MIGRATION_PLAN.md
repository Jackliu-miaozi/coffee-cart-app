# NativeWind 迁移计划

## 为什么选择 NativeWind？

当前我们有 5 个独立的样式文件（OrdersScreen.styles.ts, ProfileScreen.styles.ts 等），总共 1000+ 行样式代码。使用 NativeWind 可以：

1. **减少 80% 的样式代码**
2. **提高开发效率**：直接在 JSX 中写样式
3. **更好的维护性**：样式和组件在同一位置
4. **统一设计系统**：使用 Tailwind 的设计 tokens
5. **响应式设计**：内置支持暗色模式、设备适配

## 第一阶段：环境设置

### 1. 安装依赖
```bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

### 2. 创建配置文件

**tailwind.config.js**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E', 
        success: '#4CAF50',
        error: '#E74C3C',
        warning: '#FFA726',
        info: '#42A5F5',
        background: '#F8F9FB',
        card: '#FFFFFF',
        border: '#E1E5E9',
        text: {
          primary: '#2C3E50',
          secondary: '#546E7A',
          light: '#95A5A6'
        }
      },
      fontFamily: {
        sans: ['System'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
```

**babel.config.js** (更新)
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### 3. 类型定义
创建 `global.d.ts`:
```ts
/// <reference types="nativewind/types" />
```

## 第二阶段：逐步迁移

### 迁移优先级
1. **LoginScreen** (最简单，样式较少)
2. **OrdersScreen** (中等复杂度)
3. **ProfileScreen** (复杂，但重复样式多)
4. **HomeScreen** (最复杂，需要仔细处理)
5. **ShoppingCartScreen** (最后迁移)

### 迁移示例：LoginScreen

**迁移前：**
```tsx
<View style={styles.container}>
  <View style={styles.logoContainer}>
    <Ionicons name="cafe" size={50} color="#8B4513" />
  </View>
  <Text style={styles.title}>咖啡车</Text>
</View>

// styles.ts 中有 50+ 行样式定义
```

**迁移后：**
```tsx
<View className="flex-1 bg-background">
  <View className="w-25 h-25 rounded-full bg-white justify-center items-center mb-5 shadow-lg">
    <Ionicons name="cafe" size={50} color="#8B4513" />
  </View>
  <Text className="text-3xl font-bold text-primary mb-2">咖啡车</Text>
</View>

// 删除整个 LoginScreen.styles.ts 文件
```

## 第三阶段：组件重构

### 创建可复用的样式组件
```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress: () => void;
}

export function Button({ variant = 'primary', size = 'md', children, onPress }: ButtonProps) {
  const baseClasses = "rounded-lg items-center justify-center";
  const variantClasses = {
    primary: "bg-primary shadow-lg shadow-primary/30",
    secondary: "bg-gray-200",
    outline: "border border-primary bg-transparent"
  };
  const sizeClasses = {
    sm: "py-2 px-4",
    md: "py-3 px-6", 
    lg: "py-4 px-8"
  };
  
  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
```

## 第四阶段：清理和优化

### 删除旧文件
```bash
# 删除整个 styles 文件夹
rm -rf src/styles/

# 更新所有 import 语句
# 从: import { loginScreenStyles as styles } from '../styles/screens';
# 到: // 不再需要 import 样式
```

### 常用样式类名映射

| 当前样式 | NativeWind 类名 |
|---------|----------------|
| `backgroundColor: COLORS.PRIMARY` | `bg-primary` |
| `color: COLORS.TEXT_PRIMARY` | `text-text-primary` |
| `fontSize: 16, fontWeight: '600'` | `text-base font-semibold` |
| `paddingHorizontal: 20, paddingVertical: 16` | `px-5 py-4` |
| `borderRadius: 12` | `rounded-xl` |
| `shadowOpacity: 0.3, shadowRadius: 8` | `shadow-lg` |
| `justifyContent: 'center', alignItems: 'center'` | `justify-center items-center` |

## 预期效果

### 代码行数减少
- **LoginScreen**: 180 行 → 约 120 行 (-33%)
- **ProfileScreen**: 272 行 → 约 180 行 (-34%)
- **HomeScreen**: 363 行 → 约 250 行 (-31%)
- **总体减少**: 删除所有样式文件，减少约 1200+ 行代码

### 维护性提升
- 样式和组件逻辑在同一文件
- 更直观的样式名称
- 更容易实现响应式设计
- 统一的设计 tokens

### 性能优化
- 编译时处理样式，运行时开销更小
- 自动 tree-shaking，只包含使用的样式
- 更小的 bundle 大小

## 风险评估

### 潜在问题
1. **学习成本**：团队需要熟悉 Tailwind 类名
2. **迁移工作量**：需要逐个文件迁移
3. **某些复杂样式**：可能需要自定义 CSS

### 缓解措施
1. **分阶段迁移**：一个屏幕一个屏幕地进行
2. **保留备份**：迁移前保留当前样式文件
3. **团队培训**：提供 Tailwind 使用指南

## 实施时间线

- **第 1 周**：环境配置和工具设置
- **第 2-3 周**：迁移 LoginScreen 和 OrdersScreen
- **第 4-5 周**：迁移 ProfileScreen 和 HomeScreen  
- **第 6 周**：迁移 ShoppingCartScreen 和清理

## 结论

使用 NativeWind 可以显著提高代码质量和开发效率，建议采用这个方案来替代当前的样式文件系统。
