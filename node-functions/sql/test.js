import mysql from 'mysql2/promise';

// 腾讯云 MySQL 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'your-tencent-mysql-host',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'your-username',
  password: process.env.DB_PASSWORD || 'your-password',
  database: process.env.DB_NAME || 'your-database-name',
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// 数据库连接池
let pool = null;

// 初始化数据库连接
const initDatabase = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    console.log('Database connection pool created');
  }
  return pool;
};

// 执行数据库查询
const executeQuery = async (sql, params = []) => {
  try {
    const connection = initDatabase();
    const [rows] = await connection.execute(sql, params);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
};

// 解析 body 的辅助函数
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // 尝试解析为 JSON
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        // 如果不是 JSON，返回原始字符串
        resolve(body);
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

export const onRequestGet = async (context) => {
  // 请求腾讯云 mysql 进行读操作
  const { req } = context;
  
  // 在这里添加数据库查询逻辑
  const result = await executeQuery('SELECT * FROM user LIMIT 100');
  
  return new Response(JSON.stringify({
    success: result.success,
    data: result.success ? result.data : null,
    error: result.success ? null : result.error,
    thisis: 'get'
  }), {
    status: result.success ? 200 : 500,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const onRequestPost = async (context) => {
  // 请求腾讯云 mysql 进行写操作
  const { request } = context;
  // console.log(request, request.body);
  
  // 在这里添加数据库插入逻辑
  const body = await parseBody(request);
  const { appid, uin } = body;
  
  const result = await executeQuery(
    'INSERT INTO user (appid, uin, created_on, modified_on) VALUES (?, ?, NOW(), NOW())',
    [appid, uin]
  );
  console.log('insert result', result);
  return new Response(JSON.stringify({
    success: result.success,
    thisis: 'post',
    insertId: result.success ? result.data.insertId : null,
    error: result.success ? null : result.error
  }), {
    status: result.success ? 201 : 500,
    headers: { 'Content-Type': 'application/json' }
  });
};
