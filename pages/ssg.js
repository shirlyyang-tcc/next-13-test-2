import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

// SSG - 使用 getStaticProps 在构建时生成静态页面
export default function SSGPage({ data, buildTime }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SSG 测试页面</title>
        <meta name="description" content="静态站点生成测试页面" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SSG (Static Site Generation) 测试页面
        </h1>

        <div className={styles.card}>
          <h2>页面信息</h2>
          <p><strong>渲染模式:</strong> 静态站点生成 (SSG)</p>
          <p><strong>构建时间:</strong> {buildTime}</p>
          <p><strong>数据获取时间:</strong> {data.fetchTime}</p>
          <p><strong>随机数据:</strong> {data.randomNumber}</p>
          <p><strong>说明:</strong> 此页面在构建时预渲染，访问速度最快</p>
        </div>

        <div className={styles.card}>
          <h2>SSG 特点</h2>
          <ul>
            <li>✅ 构建时预渲染，访问速度最快</li>
            <li>✅ 可以部署到 CDN</li>
            <li>✅ SEO 友好</li>
            <li>❌ 数据在构建时固定</li>
            <li>❌ 不适合频繁变化的内容</li>
          </ul>
        </div>

        <Link href="/" className={styles.backLink}>
          ← 返回首页
        </Link>
      </main>
    </div>
  )
}

// getStaticProps - 在构建时执行，生成静态页面
export async function getStaticProps() {
  // 模拟数据获取
  const data = {
    randomNumber: Math.floor(Math.random() * 1000),
    fetchTime: new Date().toISOString(),
    message: "这是构建时获取的数据"
  }

  const buildTime = new Date().toISOString()

  return {
    props: {
      data,
      buildTime
    }
    // 不设置 revalidate，表示纯静态生成，不重新验证
  }
} 