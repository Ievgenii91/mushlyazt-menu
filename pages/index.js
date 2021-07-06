import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CategoryBlock from '../components/CategoryBlock'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Меню Мушля</title>
        <meta name="description" content="QR меню кафе Мушля Житомир" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Мушля</h3>
        <div>
          {props.blocks.map(v => {
            return (
              <CategoryBlock key={v.id} {...v}/>
            )
          })}
        </div>        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const clientId = process.env.CLIENT_ID;
  const host = process.env.HOST;
  const res = await fetch(`https://${host}/api/category?clientId=${clientId}`)
  const productsRes = await fetch(`https://${host}/api/product/all?clientId=${clientId}`)
  const { data: categories } = await res.json()
  const { data: products } = await productsRes.json()

  if (!categories || !products) {
    return {
      notFound: true,
    }
  }

  const blocks = [];

  categories.forEach(cat => {
    blocks.push({
      id: cat._id,
      blockName: cat.name,
      products: products.filter(v => v.category === cat._id)
    })
  })

  return {
    props: { categories, products, blocks }, // will be passed to the page component as props
  }
}
