import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CategoryBlock from '../components/CategoryBlock'
import Additionals from '../components/Additionals'
import {BlockNames} from "./constants/blocks-names";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Меню Мушля</title>
        <meta name="description" content="QR меню кафе Мушля Житомир" />
        <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:wght@300&display=swap" rel="stylesheet"/>
      </Head>

      <main className={styles.main}>
        <Image
            className={styles.logo}
            priority={true}
            src="/logo.svg"
            alt="Мушля"
            width={350}
            height={80}
        />

        <div>
            {
              <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.oysterBar)})}/>
            }
            {
              <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.cooledSeafood)})}/>
            }
            {/*{*/}
                {/*<CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.tartar), className: styles.cardBlock})}/>*/}
            {/*}*/}
            {
              <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.grilledSeafood), className: styles.cardBlockBordered})}/>
            }
            {
              <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.plato), className: styles.filled})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.mussels), className: ([styles.filled, styles.blue].join(' '))})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.sandwiches)})}/>
            }
            {
                <Additionals/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.bowls), className: styles.cardBlockBordered})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.salad)})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.steaks)})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.soups)})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.rolls), className: ([styles.filled, styles.blue].join(' '))})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.deserts), className: styles.filled})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.drinksGlass)})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.drinksBottle)})}/>
            }
            {
                <CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.softDrinks)})}/>
            }
            {
              console.log(props)
            }
        </div>
      </main>
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
