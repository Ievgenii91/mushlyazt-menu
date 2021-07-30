import Head from 'next/head';
import Image from 'next/image';
import Breakfasts from '../components/Breakfasts';
import MainList from '../components/MainList';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';

const trackEndpoint = '/api/user?zone=';
const QR_SCAN_FREQUENCY_TIMEOUT = 60000; // 1 min
const MAX_BREAKFAST_HOUR = 13;

const getData = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const storage = window.localStorage;
	const zone = urlParams.get('zone');

	const fetchData = async () => {
		storage.setItem('lastUpdated', new Date().toISOString());
		const response = await fetch(trackEndpoint + zone);
		return await response.json();
	};

	let lastUpdated = storage.getItem('lastUpdated');
	if (lastUpdated) {
		let currentTime = new Date(new Date().toISOString()).getTime();
		if (
			currentTime - new Date(lastUpdated).getTime() >
			QR_SCAN_FREQUENCY_TIMEOUT
		) {
			return await fetchData();
		} else {
			return new Promise.resolve(false);
		}
	} else {
		return await fetchData();
	}
};

export default function Home({ blocks }) {
	useSWR(trackEndpoint, getData, {
		dedupingInterval: 60000,
	});

	const hour = new Date().getHours();
	const breakfaskFirst = hour <= 8 || hour <= MAX_BREAKFAST_HOUR

	return (
		<div className={styles.container}>
			<Head>
				<title>Меню Мушля</title>
				<meta name="description" content="QR меню кафе Мушля Житомир" />
				<meta name="robots" content="noindex,nofollow" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans:wght@300&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<main className={styles.main}>
				<header>
					<Image
						className={styles.logo}
						priority={true}
						src="/logo.svg"
						alt="Мушля"
						width={350}
						height={80}
					/>
					<a
						href={'https://www.instagram.com/mushlya.zt/'}
						target={'_blank'}
						rel="noreferrer"
						className={styles.instagram}
					>
						<Image
							priority={true}
							src="/instagram.svg"
							alt="Мушля"
							width={16}
							height={16}
						/>
						<span>mushlya.zt</span>
					</a>
				</header>
				
				{ breakfaskFirst && <Breakfasts blocks={blocks} /> }
				<MainList blocks={blocks} hour={hour} />
				{ !breakfaskFirst && <Breakfasts blocks={blocks} /> }
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const clientId = process.env.CLIENT_ID;
	const host = process.env.HOST;
	const res = await fetch(
		`https://${host}/api/v1/categories?clientId=${clientId}`
	);
	const productsRes = await fetch(
		`https://${host}/api/v1/products?clientId=${clientId}`
	);
	const { data: categories } = await res.json();
	const { data: products } = await productsRes.json();

	if (!categories || !products) {
		return {
			notFound: true,
		};
	}

	const blocks = [];

	categories.forEach((cat) => {
		blocks.push({
			id: cat._id,
			blockName: cat.name,
			description: cat.description,
			products: products
				.filter((v) => v.available && v.category === cat._id)
				.sort((a, b) => a.price - b.price),
			subCategories: cat.children,
		});
	});

	return {
		props: { categories, products, blocks }, // will be passed to the page component as props
	};
}
