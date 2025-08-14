import express from 'express';
import path from 'path';
const app = express();

// 添加日志中间件
app.use((req, res, next) => {
  console.log('request url2222222222', req.url);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 添加根路由处理
app.get('/', (req, res) => {
  res.json({ message: 'Express2 root path' });
});

app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Test User2' });
});

app.get('/context', (req, res) => {
  console.log('context', req.context);
  res.json({message: 'context', context: req.context});
});

app.use("/static", express.static(path.join(__dirname, "public")));

// 导出处理函数
export default app;
// export const onRequest = createEdgeOneHandler(app); 
