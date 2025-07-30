# Next.js 渲染模式测试应用

这是一个基于 Next.js 13 的测试应用，用于演示和测试不同的渲染模式：SSG、CSR、SSR、ISR 和 API 函数。

## 项目结构

```
pages/
├── index.js          # 首页 - 测试页面入口集合
├── ssg.js           # SSG 测试页面
├── csr.js           # CSR 测试页面
├── ssr.js           # SSR 测试页面
├── isr.js           # ISR 测试页面
├── function-test.js # API 函数测试页面
└── api/             # API 路由
    ├── hello.js     # /api/hello 路由
    └── hello/
        └── node.js  # /api/hello/node 路由
```

## 渲染模式说明

### 1. SSG (Static Site Generation) - 静态站点生成
- **文件**: `pages/ssg.js`
- **特点**: 构建时预渲染页面
- **优点**: 访问速度最快，可以部署到 CDN，SEO 友好
- **缺点**: 数据在构建时固定，不适合频繁变化的内容
- **适用场景**: 博客、文档网站、营销页面

### 2. CSR (Client Side Rendering) - 客户端渲染
- **文件**: `pages/csr.js`
- **特点**: 在浏览器中动态渲染
- **优点**: 高度交互性，实时数据更新，减少服务器负载
- **缺点**: 首屏加载较慢，SEO 不友好，需要 JavaScript
- **适用场景**: 单页应用、管理后台、高度交互的应用

### 3. SSR (Server Side Rendering) - 服务端渲染
- **文件**: `pages/ssr.js`
- **特点**: 每次请求时在服务器渲染
- **优点**: SEO 友好，首屏加载快，每次请求都是最新数据
- **缺点**: 服务器负载较高，响应时间较慢
- **适用场景**: 电商网站、新闻网站、需要 SEO 的页面

### 4. ISR (Incremental Static Regeneration) - 增量静态再生
- **文件**: `pages/isr.js`
- **特点**: 静态生成 + 定时更新
- **优点**: 平衡了性能和新鲜度，可以部署到 CDN
- **缺点**: 更新有延迟
- **适用场景**: 电商产品页面、新闻文章、需要平衡性能和新鲜度的页面

### 5. API 函数测试
- **文件**: `pages/function-test.js`
- **API 路由**: 
  - `/api/hello` - 返回基本问候消息
  - `/api/hello/node` - 返回 Node.js 相关信息
- **特点**: 服务器端 API 路由，可以处理数据请求
- **优点**: 可以访问 Node.js 环境，支持数据库操作、外部 API 调用
- **适用场景**: 数据处理、用户认证、第三方服务集成

## 运行项目

### 开发环境
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 测试方法

1. **SSG 测试**: 访问 `/ssg` 页面，观察构建时间和数据是否固定
2. **CSR 测试**: 访问 `/csr` 页面，观察客户端渲染和交互功能
3. **SSR 测试**: 访问 `/ssr` 页面，每次刷新查看数据变化
4. **ISR 测试**: 访问 `/isr` 页面，等待 10 秒后刷新查看数据更新
5. **API 函数测试**: 访问 `/function-test` 页面，测试 API 路由调用

## 技术栈

- **框架**: Next.js 13
- **语言**: JavaScript
- **样式**: CSS Modules
- **路由**: Pages Router

## 注意事项

- 本项目使用 Next.js 13 的 Pages Router
- 所有页面都包含详细的特点说明和测试方法
- 每个页面都有返回首页的链接
- 样式支持响应式设计和暗色模式
- API 路由支持各种 HTTP 方法
