import express from "express";
import path from "path";
const app = express();

// 添加日志中间件
app.use((req, res, next) => {
  const params = req.context.params;
  params.dynamic
  params.express = "/users/1/22"
  console.log("request [单级动态匹配测试]", req.url);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 添加根路由处理
app.get("/", (req, res) => {
  res.json({ message: "Express [单级动态匹配测试] root path" });
});

app.get("/users/:id/:sdasdadad", (req, res) => {
  const params = req.params.id;
  res.json({ id: req.params.id, name: "Test User[单级动态匹配测试]" });
});

// 导出处理函数
export default app;
