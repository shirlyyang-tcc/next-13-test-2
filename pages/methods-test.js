import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

// HTTP 方法测试页面 - 测试所有 HTTP 方法
export default function MethodsTestPage() {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState({})
  const [errors, setErrors] = useState({})

  // 支持的 HTTP 方法
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']

  // 调用指定 HTTP 方法的函数
  const fetchWithMethod = async (method) => {
    const methodKey = method.toLowerCase()
    
    setLoading(prev => ({ ...prev, [methodKey]: true }))
    setErrors(prev => ({ ...prev, [methodKey]: null }))
    
    try {
      const fetchOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-Test-Header': `Testing ${method} method`
        }
      }

      // 对于 POST、PUT、PATCH 请求，添加请求体
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        fetchOptions.body = JSON.stringify({
          testData: `Test data for ${method} request`,
          timestamp: new Date().toISOString(),
          requestId: Math.random().toString(36).substr(2, 9)
        })
      }

      const response = await fetch('/hello/methods', fetchOptions)
      
      // 对于 HEAD 请求，只处理响应头
      if (method === 'HEAD') {
        const headersObj = {}
        response.headers.forEach((value, key) => {
          headersObj[key] = value
        })
        
        setResults(prev => ({ 
          ...prev, 
          [methodKey]: {
            status: response.status,
            statusText: response.statusText,
            headers: headersObj,
            method: method
          }
        }))
      } else {
        // 对于其他请求，尝试解析 JSON 响应
        let data
        try {
          const text = await response.text()
          data = text ? JSON.parse(text) : { message: 'Empty response' }
        } catch (parseError) {
          data = { message: 'Response is not valid JSON', rawResponse: await response.text() }
        }
        
        setResults(prev => ({ 
          ...prev, 
          [methodKey]: {
            status: response.status,
            statusText: response.statusText,
            data: data,
            method: method
          }
        }))
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, [methodKey]: err.message }))
    } finally {
      setLoading(prev => ({ ...prev, [methodKey]: false }))
    }
  }

  // 测试所有方法
  const testAllMethods = async () => {
    for (const method of methods) {
      await fetchWithMethod(method)
      // 添加小延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }

  // 页面加载时自动测试 GET 方法
  useEffect(() => {
    fetchWithMethod('GET')
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>HTTP 方法测试页面</title>
        <meta name="description" content="测试 /hello/methods 的所有 HTTP 方法" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HTTP 方法测试页面
        </h1>

        <p className={styles.description}>
          测试 <code>/hello/methods</code> 路径的所有 HTTP 方法
        </p>

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <button 
            onClick={testAllMethods}
            className={styles.button}
            style={{ 
              backgroundColor: '#0070f3', 
              color: 'white', 
              padding: '0.75rem 1.5rem',
              fontSize: '1.1rem',
              marginRight: '1rem'
            }}
          >
            测试所有方法
          </button>
        </div>

        <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {methods.map(method => {
            const methodKey = method.toLowerCase()
            const result = results[methodKey]
            const isLoading = loading[methodKey]
            const error = errors[methodKey]

            return (
              <div key={method} className={styles.card}>
                <h2>{method} 方法</h2>
                <p><strong>路径:</strong> /hello/methods</p>
                
                {isLoading ? (
                  <p><strong>状态:</strong> 正在测试...</p>
                ) : error ? (
                  <div>
                    <p><strong>错误:</strong> <span style={{ color: 'red' }}>{error}</span></p>
                  </div>
                ) : result ? (
                  <div>
                    <p><strong>状态码:</strong> 
                      <span style={{ 
                        color: result.status >= 200 && result.status < 300 ? 'green' : 'red',
                        fontWeight: 'bold' 
                      }}>
                        {result.status} {result.statusText}
                      </span>
                    </p>
                    
                    {method === 'HEAD' ? (
                      <div>
                        <p><strong>响应头:</strong></p>
                        <pre style={{ 
                          backgroundColor: '#f5f5f5', 
                          padding: '0.5rem', 
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          overflow: 'auto'
                        }}>
                          {JSON.stringify(result.headers, null, 2)}
                        </pre>
                      </div>
                    ) : result.data ? (
                      <div>
                        <p><strong>响应数据:</strong></p>
                        <pre style={{ 
                          backgroundColor: '#f5f5f5', 
                          padding: '0.5rem', 
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          overflow: 'auto',
                          maxHeight: '200px'
                        }}>
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <p>无响应数据</p>
                    )}
                  </div>
                ) : (
                  <p>暂未测试</p>
                )}
                
                <button 
                  onClick={() => fetchWithMethod(method)}
                  className={styles.button}
                  disabled={isLoading}
                  style={{ marginTop: '1rem' }}
                >
                  {isLoading ? '测试中...' : `测试 ${method}`}
                </button>
              </div>
            )
          })}
        </div>

        <div className={styles.info}>
          <h3>HTTP 方法说明：</h3>
          <ul>
            <li><strong>GET</strong>: 获取资源，展示请求头和 URL 信息</li>
            <li><strong>POST</strong>: 创建资源，展示客户端 IP 和地理位置信息</li>
            <li><strong>PUT</strong>: 更新资源，展示环境变量信息</li>
            <li><strong>PATCH</strong>: 部分更新资源，展示服务器信息</li>
            <li><strong>DELETE</strong>: 删除资源，展示唯一标识符</li>
            <li><strong>HEAD</strong>: 获取响应头信息，不返回响应体</li>
            <li><strong>OPTIONS</strong>: 获取允许的方法和 CORS 信息</li>
          </ul>
        </div>

        <div className={styles.info}>
          <h3>测试功能：</h3>
          <ul>
            <li>页面加载时自动测试 GET 方法</li>
            <li>可以单独测试每个 HTTP 方法</li>
            <li>可以一键测试所有方法</li>
            <li>显示详细的响应信息和状态码</li>
            <li>错误处理和加载状态显示</li>
            <li>响应数据格式化显示</li>
          </ul>
        </div>

        <Link href="/" className={styles.backLink}>
          ← 返回首页
        </Link>
      </main>
    </div>
  )
} 