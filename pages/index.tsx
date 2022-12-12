import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hear attack prediction</title>
        <meta name="description" content="Heart attack application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Heart attack prediction</h1>
      </main>

    
    </div>
  )
}
