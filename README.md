# 风险评估计算器 - 新版

基于 Vue 3 + TypeScript + Vite + Element Plus 重构的医疗风险评估计算器。

## 🚀 技术栈

- **框架**: Vue 3 (Composition API)
- **类型检查**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus (最新版本)
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **国际化**: Vue I18n 9
- **HTTP 客户端**: Axios
- **样式预处理**: Sass/SCSS

## 📦 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
│   ├── common/      # 通用组件
│   │   └── LanguageSwitcher.vue
│   ├── calculators/ # 计算器组件
│   │   ├── PDACCalculator.vue
│   │   ├── DCCCalculator.vue
│   │   └── AACCalculator.vue
│   └── views/       # 视图组件
│       ├── PDACView.vue
│       ├── DCCView.vue
│       └── AACView.vue
├── locales/         # 国际化配置
│   ├── index.ts
│   ├── zh.ts
│   └── en.ts
├── router/          # 路由配置
│   └── index.ts
├── services/        # 业务服务
│   ├── api.ts      # API 接口
│   └── calculator.ts # 计算逻辑
├── stores/          # Pinia 存储
│   └── calculator.ts
├── types/           # TypeScript 类型定义
│   └── index.ts
├── utils/           # 工具函数
│   └── constants.ts
├── App.vue          # 根组件
└── main.ts          # 应用入口
```

## 🎯 功能特性

### 支持的计算器

1. **PDAC (胰腺癌) 风险评估**
   - FAR 值输入
   - CA19-9 指标
   - 肿瘤分化程度
   - N 分期评估

2. **DCC (胆管癌) 风险评估**
   - CA19-9 指标
   - 肿瘤直径
   - 肿瘤分化程度
   - 神经浸润状态

3. **AAC (壶腹癌) 风险评估**
   - 肿瘤直径
   - 神经浸润状态
   - N 分期评估
   - 肿瘤分化程度

### 核心特性

- ✅ 完整的 TypeScript 支持
- ✅ 现代化的 Vue 3 Composition API
- ✅ 响应式设计，支持桌面端和移动端
- ✅ 完整的国际化支持 (中文/英文)
- ✅ 表单验证和错误处理
- ✅ 计算结果可视化展示
- ✅ 状态管理和数据持久化
- ✅ 现代化的 UI 设计

## 🛠️ 开发环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 📥 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 🔧 配置说明

### Vite 配置

项目使用 Vite 作为构建工具，配置文件 `vite.config.ts` 包含：

- Element Plus 自动导入配置
- 路径别名设置 (`@/` 指向 `src/`)
- 开发服务器代理配置

### TypeScript 配置

- 严格的类型检查
- 路径映射支持
- Vue 3 组件类型支持

## 📝 待实现功能 (TODO)

### 计算逻辑实现

当前项目已完成重构，但核心计算逻辑需要根据后端计算公式进行实现：

```typescript
// services/calculator.ts 中的 TODO 项

// PDAC 计算器
// TODO: 在这里实现完整的 PDAC 计算公式

// DCC 计算器
// TODO: 在这里实现完整的 DCC 计算公式

// AAC 计算器
// TODO: 在这里实现完整的 AAC 计算公式
```

### 后续优化

- [ ] 单元测试覆盖
- [ ] E2E 测试
- [ ] 性能优化
- [ ] 无障碍访问支持
- [ ] PWA 支持
- [ ] 数据导出功能

## 🔄 从旧版本迁移

旧版本是基于 Vue 2 + JavaScript 的项目，新版本的主要改进：

1. **技术升级**: Vue 2 → Vue 3, JavaScript → TypeScript
2. **构建工具**: Webpack → Vite
3. **状态管理**: Vuex → Pinia
4. **组件库**: Element Plus (旧版本使用了 beta 版本)
5. **代码组织**: 更清晰的目录结构和模块划分
6. **类型安全**: 完整的 TypeScript 支持

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目仅用于学术研究目的。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目地址: [GitHub Repository]
- 邮箱: [Your Email]

---

**注意**: 本项目仅用于学术研究和医疗评估参考，不应作为临床决策的唯一依据。
