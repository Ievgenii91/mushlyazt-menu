import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CategoryBlock from '../components/CategoryBlock'
import Additionals from '../components/Additionals'
import { BlockNames } from '../constants/blocks-names';

export default function Home(props) {
  return (
		<div className={styles.container}>
			<Head>
				<title>Меню Мушля</title>
				<meta name="description" content="QR меню кафе Мушля Житомир" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:wght@300&display=swap"
					rel="stylesheet"
				/>
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
					<CategoryBlock
						key={BlockNames.oysterBar}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.oysterBar
							),
							className: styles.backgroundOyster,
						}}
					/>
					<CategoryBlock
						key={BlockNames.cooledSeafood}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.cooledSeafood
							),
						}}
					/>
					{/*<CategoryBlock {...({...props.blocks.find(block => block.blockName === BlockNames.tartar), className: styles.cardBlock})}/>*/}
					{/*}*/}
					<CategoryBlock
						key={BlockNames.grilledSeafood}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.grilledSeafood
							),
							className: styles.cardBlockBordered,
						}}
					/>
					<CategoryBlock
						key={BlockNames.plato}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.plato
							),
							className: [styles.filled, styles.backgroundShrimp].join(' '),
						}}
					/>
					<CategoryBlock
						key={BlockNames.mussels}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.mussels
							),
							className: [
								styles.filled,
								styles.blue,
								styles.backgroundMussels,
							].join(' '),
						}}
					/>
					<CategoryBlock
						key={BlockNames.sandwiches}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.sandwiches
							),
							className: [styles.backgroundFish].join(' '),
						}}
					/>
					<Additionals />
					<CategoryBlock
						key={BlockNames.bowls}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.bowls
							),
							className: styles.cardBlockBordered,
						}}
					/>
					<CategoryBlock
						key={BlockNames.salad}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.salad
							),
						}}
					/>
					<CategoryBlock
						key={BlockNames.steaks}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.steaks
							),
						}}
					/>
					<CategoryBlock
						key={BlockNames.soups}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.soups
							),
						}}
					/>
					<CategoryBlock
						key={BlockNames.rolls}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.rolls
							),
							className: [styles.filled, styles.blue].join(' '),
						}}
					/>
					<CategoryBlock
						key={BlockNames.deserts}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.deserts
							),
							className: styles.filled,
						}}
					/>
					<CategoryBlock
						key={BlockNames.drinksGlass}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.drinksGlass
							),
							className: styles.backgroundBulot,
						}}
					/>
					<CategoryBlock
						key={BlockNames.drinksBottle}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.drinksBottle
							),
						}}
					/>
					<CategoryBlock
						key={BlockNames.softDrinks}
						{...{
							...props.blocks.find(
								(block) => block.blockName === BlockNames.softDrinks
							),
						}}
					/>
				</div>
			</main>
		</div>
	);
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
