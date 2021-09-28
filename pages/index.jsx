import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Breakfasts from '../components/Breakfasts';
import MainList from '../components/MainList';
import NavigationPanel from '../components/NavigationPanel';
import useSWR from 'swr';
import { BlockNames } from '../constants/blocks-names';
import styles from '../styles/Home.module.css';

const trackEndpoint = '/api/user?zone=';
const QR_SCAN_FREQUENCY_TIMEOUT = 60000; // 1 min
const MAX_BREAKFAST_HOUR = 14;

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

export default function Home({ blocks, categories }) {
	const data = useSWR(trackEndpoint, getData, {
		dedupingInterval: 60000,
	});

	const [navPanelVisible, setNavPanelVisible] = useState(false);

	const [breakfaskFirst, setBreakfaskFirst] = useState(false);

	const [fixedHeader, setFixedHeader] = useState(false);

	useEffect(() => {
		if (fixedHeader) {
			document.body.classList.add('fixedHeaderWrapper');
		} else {
			document.body.classList.remove('fixedHeaderWrapper');
		}
	}, [fixedHeader]);

	useEffect(() => {
		const hour = new Date().getHours();
		setBreakfaskFirst(hour <= 10 || hour <= MAX_BREAKFAST_HOUR);
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const toggleNavigationPanel = () => {
		setNavPanelVisible((v) => !v);
	};

	const navigateToCategory = () => {
		setNavPanelVisible((v) => !v);
	};

	const handleScroll = () => {
		if (window.scrollY > 100) {
			window.requestAnimationFrame(() => {
				setFixedHeader(true);
			});
		} else {
			window.requestAnimationFrame(() => {
				setFixedHeader(false);
			});
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Меню кафе Мушля у місті Житомир</title>
				<meta name="description" content="QR меню кафе Мушля у Житомирі" />
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

				{/* Global site tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
					`,
					}}
				/>
			</Head>

			<main className={styles.main}>
				<header className={fixedHeader ? styles.fixedHeader : ''}>
					<span className={styles.menuIcon} onClick={toggleNavigationPanel}>
						|||
					</span>
					<Image
						className={styles.logo}
						priority={true}
						src="/logo.svg"
						alt="Мушля"
						width={fixedHeader ? 140 : 280}
						height={fixedHeader ? 30 : 60}
					/>
					{!fixedHeader && (
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
					)}
				</header>

				<NavigationPanel
					navPanelVisible={navPanelVisible}
					categories={categories}
					navigateToCategory={navigateToCategory}
					close={toggleNavigationPanel}
				/>

				{breakfaskFirst && <Breakfasts blocks={blocks} />}
				<MainList blocks={blocks} showMainLabel={breakfaskFirst} />
				{!breakfaskFirst && <Breakfasts blocks={blocks} />}
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
	const availableProducts = products.filter((v) => v.available);

	categories.forEach((cat) => {
		blocks.push({
			id: cat._id,
			blockName: cat.name,
			description: cat.description,
			products: availableProducts
				.filter((v) => v.category === cat._id)
				.sort((a, b) => a.price - b.price),
			subCategories: cat.children,
		});
	});

	const filteredBlocks = blocks.filter((block) => block.products.length > 0);
	const filteredCategories = categories.filter(
		(cat) =>
			availableProducts.filter(({ category }) => category === cat._id).length >
			0
	);
	const registeredBlockNames = Object.values(BlockNames);

	return {
		props: {
			categories: filteredCategories.filter(({ name }) =>
				registeredBlockNames.includes(name)
			),
			products,
			blocks: filteredBlocks,
		}, // will be passed to the page component as props
	};
}
