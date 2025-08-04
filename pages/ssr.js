import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

// SSR - 使用 getServerSideProps 在每次请求时在服务器渲染
export default function SSRPage({ data, serverTime, requestTime }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSR 测试页面</title>
        <meta name="description" content="服务端渲染测试页面" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SSR (Server Side Rendering) 测试页面
        </h1>

        <div className={styles.card}>
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 服务端渲染 (SSR)</p>
          <p><strong>服务器时间:</strong> {serverTime}</p>
          <p><strong>请求时间:</strong> {requestTime}</p>
          <p><strong>数据获取时间:</strong> {data.fetchTime}</p>
          <p><strong>随机数据:</strong> {data.randomNumber}</p>
          <p><strong>说明:</strong> 此页面在每次请求时在服务器渲染</p>
        </div>

        <div className={styles.card}>
          <h2>SSR 特点</h2>
          <ul>
            <li>✅ SEO 友好</li>
            <li>✅ 首屏加载快</li>
            <li>✅ 每次请求都是最新数据</li>
            <li>✅ 不需要 JavaScript 就能显示内容</li>
            <li>❌ 服务器负载较高</li>
            <li>❌ 响应时间较慢</li>
            <li>❌ 不适合高并发场景</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2>测试说明</h2>
          <p>每次刷新页面，都会看到不同的随机数据和时间戳，因为页面在服务器端重新渲染。</p>
          <p>你可以尝试：</p>
          <ul>
            <li>刷新页面查看数据变化</li>
            <li>禁用 JavaScript 查看页面是否正常显示</li>
            <li>查看页面源码，确认内容已预渲染</li>
          </ul>
        </div>

        <Link href="/" className={styles.backLink}>
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}

// getServerSideProps - 在每次请求时执行
export async function getServerSideProps(context) {
  // 模拟服务器端数据获取
  const data = {
    randomNumber: Math.floor(Math.random() * 1000),
    fetchTime: new Date().toISOString(),
    message: "这是服务器端获取的数据"
  }

  const serverTime = new Date().toISOString()
  const requestTime = new Date().toISOString()

  // 模拟 API 调用延迟
  // await new Promise(resolve => setTimeout(resolve, 500))

  return {
    props: {
      data,
      serverTime,
      requestTime
    }
  }
} 