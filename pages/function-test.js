import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

// 函数测试页面 - 展示 API 路由调用
export default function FunctionTestPage() {
  const [helloData, setHelloData] = useState(null)
  const [nodeData, setNodeData] = useState(null)
  const [loading, setLoading] = useState({ hello: false, node: false })
  const [error, setError] = useState({ hello: null, node: null })

  // 调用 /hello
  const fetchHello = async () => {
    setLoading(prev => ({ ...prev, hello: true }))
    setError(prev => ({ ...prev, hello: null }))
    
    try {
      const response = await fetch('/hello')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.text()
      setHelloData(data)
    } catch (err) {
      setError(prev => ({ ...prev, hello: err.message }))
    } finally {
      setLoading(prev => ({ ...prev, hello: false }))
    }
  }

  // 调用 /hello/node
  const fetchNode = async () => {
    setLoading(prev => ({ ...prev, node: true }))
    setError(prev => ({ ...prev, node: null }))
    
    try {
      const response = await fetch('/hello/node')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.text()
      setNodeData(data)
    } catch (err) {
      setError(prev => ({ ...prev, node: err.message }))
    } finally {
      setLoading(prev => ({ ...prev, node: false }))
    }
  }

  // 页面加载时自动调用两个 API
  useEffect(() => {
    fetchHello()
    fetchNode()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>函数测试页面</title>
        <meta name="description" content="API 路由测试页面" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          API 函数测试页面
        </h1>

        <p className={styles.description}>
          测试 Next.js API 路由功能
        </p>

        <div className={styles.grid}>
          {/* /hello 测试 */}
          <div className={styles.card}>
            <h2>/hello 测试</h2>
            <p><strong>API 路径:</strong> /hello</p>
            
            {loading.hello ? (
              <p><strong>状态:</strong> 正在加载...</p>
            ) : error.hello ? (
              <p><strong>错误:</strong> {error.hello}</p>
            ) : helloData ? (
              <div>
                <p><strong>返回消息:</strong> {helloData}</p>
              </div>
            ) : (
              <p>暂无数据</p>
            )}
            
            <button 
              onClick={fetchHello}
              className={styles.button}
              disabled={loading.hello}
            >
              {loading.hello ? '加载中...' : '重新调用'}
            </button>
          </div>

          {/* /hello/node 测试 */}
          <div className={styles.card}>
            <h2>/hello/node 测试</h2>
            <p><strong>API 路径:</strong> /hello/node</p>
            
            {loading.node ? (
              <p><strong>状态:</strong> 正在加载...</p>
            ) : error.node ? (
              <p><strong>错误:</strong> {error.node}</p>
            ) : nodeData ? (
              <div>
                <p><strong>返回消息:</strong> {nodeData}</p>

              </div>
            ) : (
              <p>暂无数据</p>
            )}
            
            <button 
              onClick={fetchNode}
              className={styles.button}
              disabled={loading.node}
            >
              {loading.node ? '加载中...' : '重新调用'}
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <h3>API 路由说明：</h3>
          <ul>
            <li><strong>/hello</strong>: 返回基本的问候消息和请求信息</li>
            <li><strong>/hello/node</strong>: 返回 Node.js 相关的信息和版本</li>
            <li>这些 API 路由在服务器端运行，可以访问 Node.js 环境</li>
            <li>支持 GET、POST 等各种 HTTP 方法</li>
            <li>可以连接数据库、调用外部 API 等</li>
          </ul>
        </div>

        <div className={styles.info}>
          <h3>测试功能：</h3>
          <ul>
            <li>页面加载时自动调用两个 API</li>
            <li>点击按钮可以重新调用 API</li>
            <li>显示加载状态和错误信息</li>
            <li>展示 API 返回的完整数据</li>
          </ul>
        </div>

        <Link href="/" className={styles.backLink}>
          ← 返回首页
        </Link>
      </main>
    </div>
  )
} 