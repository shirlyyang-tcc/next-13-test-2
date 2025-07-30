import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

// CSR - 客户端渲染，使用 useState 和 useEffect
export default function CSRPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [clientTime, setClientTime] = useState(null)

  useEffect(() => {
    // 模拟客户端数据获取
    const fetchData = async () => {
      setLoading(true)
      
      // 模拟 API 调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData = {
        randomNumber: Math.floor(Math.random() * 1000),
        fetchTime: new Date().toISOString(),
        message: "这是客户端获取的数据"
      }
      
      setData(mockData)
      setClientTime(new Date().toISOString())
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>CSR 测试页面</title>
        <meta name="description" content="客户端渲染测试页面" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CSR (Client Side Rendering) 测试页面
        </h1>

        <div className={styles.card}>
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 客户端渲染 (CSR)</p>
          <p><strong>客户端时间:</strong> {clientTime || '加载中...'}</p>
          {loading ? (
            <p><strong>状态:</strong> 正在加载数据...</p>
          ) : (
            <>
              <p><strong>数据获取时间:</strong> {data?.fetchTime}</p>
              <p><strong>随机数据:</strong> {data?.randomNumber}</p>
              <p><strong>说明:</strong> 此页面在客户端动态渲染</p>
            </>
          )}
        </div>

        <div className={styles.card}>
          <h2>CSR 特点</h2>
          <ul>
            <li>✅ 高度交互性</li>
            <li>✅ 实时数据更新</li>
            <li>✅ 减少服务器负载</li>
            <li>❌ 首屏加载较慢</li>
            <li>❌ SEO 不友好</li>
            <li>❌ 需要 JavaScript 才能显示内容</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2>交互测试</h2>
          <button 
            onClick={() => {
              setData({
                randomNumber: Math.floor(Math.random() * 1000),
                fetchTime: new Date().toISOString(),
                message: "这是重新获取的数据"
              })
            }}
            className={styles.button}
          >
            重新获取数据
          </button>
        </div>

        <Link href="/" className={styles.backLink}>
          ← 返回首页
        </Link>
      </main>
    </div>
  )
} 