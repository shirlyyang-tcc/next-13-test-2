import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js 渲染模式测试</title>
        <meta name="description" content="测试 Next.js 的 SSG、CSR、SSR、ISR 渲染模式" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Next.js 渲染模式测试
        </h1>

        <p className={styles.description}>
          点击下面的链接测试不同的渲染模式
        </p>

        <div className={styles.grid}>
          <Link href="/ssg" className={styles.card}>
            <h2>SSG (Static Site Generation) &rarr;</h2>
            <p>静态站点生成 - 构建时预渲染页面</p>
          </Link>

          <Link href="/csr" className={styles.card}>
            <h2>CSR (Client Side Rendering) &rarr;</h2>
            <p>客户端渲染 - 在浏览器中动态渲染</p>
          </Link>

          <Link href="/ssr" className={styles.card}>
            <h2>SSR (Server Side Rendering) &rarr;</h2>
            <p>服务端渲染 - 每次请求时在服务器渲染</p>
          </Link>

          <Link href="/isr" className={styles.card}>
            <h2>ISR (Incremental Static Regeneration) &rarr;</h2>
            <p>增量静态再生 - 静态生成 + 定时更新</p>
          </Link>

          <Link href="/function-test" className={styles.card}>
            <h2>API 函数测试 &rarr;</h2>
            <p>测试 Next.js API 路由功能</p>
          </Link>
        </div>

        <div className={styles.info}>
          <h3>渲染模式说明：</h3>
          <ul>
            <li><strong>SSG</strong>: 构建时生成静态页面，访问速度最快</li>
            <li><strong>CSR</strong>: 客户端渲染，适合高度交互的应用</li>
            <li><strong>SSR</strong>: 服务端渲染，适合需要 SEO 的页面</li>
            <li><strong>ISR</strong>: 静态生成 + 定时更新，平衡性能和新鲜度</li>
            <li><strong>API 函数</strong>: 服务器端 API 路由，可以处理数据请求</li>
          </ul>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Next.js 渲染模式测试应用</p>
      </footer>
    </div>
  )
}
