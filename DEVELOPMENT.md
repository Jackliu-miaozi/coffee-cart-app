# 开发指南

## 代码格式化和质量

本项目已配置自动代码格式化和质量检查工具，以确保代码风格的一致性。

### 🛠️ 工具配置

#### Prettier (代码格式化)
- **配置文件**: `.prettierrc`
- **忽略文件**: `.prettierignore`
- **自动执行**: 保存时自动格式化 (VS Code)

#### Git Hooks
- **Pre-commit Hook**: 提交前自动格式化修改的文件
- **工具**: Husky + lint-staged

#### VS Code 设置
- **自动格式化**: 保存时自动格式化
- **Import 整理**: 保存时自动整理导入
- **推荐插件**: 自动推荐必要的 VS Code 插件

### 📝 可用脚本

```bash
# 检查代码格式
npm run format:check

# 格式化所有代码
npm run format

# 运行 ESLint 检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# TypeScript 类型检查
npm run type-check
```

### 🔧 开发工作流

#### 1. 日常开发
- 在 VS Code 中编写代码时，保存文件会自动格式化
- 无需手动运行格式化命令

#### 2. Git 提交
```bash
# 添加文件到暂存区
git add .

# 提交时会自动触发代码格式化
git commit -m "feat: your commit message"
```

#### 3. 提交消息规范
使用约定式提交规范：
```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型 (type):**
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整 (不影响功能)
- `refactor`: 重构代码
- `test`: 测试相关
- `chore`: 构建工具、依赖更新等

**示例:**
```bash
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(cart): resolve item quantity update issue"
git commit -m "docs: update development guide"
```

### 🎯 代码风格

#### TypeScript/JavaScript
- 使用单引号
- 语句末尾添加分号
- 行宽限制 80 字符
- 使用 2 空格缩进
- 函数参数无需括号 (单参数箭头函数)

#### 组件规范
```tsx
// ✅ 推荐
const LoginButton: React.FC<Props> = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

// ❌ 避免
const LoginButton = (props: any) => {
    return <TouchableOpacity onPress={props.onPress}><Text>{props.children}</Text></TouchableOpacity>
}
```

### 🔍 配置文件说明

#### `.prettierrc`
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

#### `.vscode/settings.json`
- 启用保存时格式化
- 配置默认格式化程序为 Prettier
- 保存时自动修复 ESLint 问题
- 自动整理 import 语句

#### `package.json` (lint-staged)
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

### 🚀 团队协作

#### 新成员入门
1. 克隆项目后运行 `npm install`
2. 安装推荐的 VS Code 插件
3. VS Code 会自动应用项目设置
4. 开始开发，所有格式化都是自动的！

#### 持续集成
- 所有提交都会自动格式化
- 代码风格保持一致
- 减少代码审查中的格式争议

### ❓ 常见问题

#### Q: 为什么我的代码没有自动格式化？
A: 确保已安装 Prettier VS Code 插件，并且 VS Code 设置已生效。

#### Q: 如何临时跳过 pre-commit hook？
A: 使用 `git commit --no-verify` (不推荐)

#### Q: 如何自定义格式化规则？
A: 修改 `.prettierrc` 文件，然后重新格式化代码。

### 📚 相关文档

- [Prettier 配置文档](https://prettier.io/docs/en/configuration.html)
- [Husky Git Hooks](https://typicode.github.io/husky/)
- [约定式提交规范](https://www.conventionalcommits.org/)

---

通过这些配置，我们确保了代码质量的一致性和团队协作的高效性。所有的格式化工作都是自动进行的，开发者只需专注于业务逻辑的实现。
