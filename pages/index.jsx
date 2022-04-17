import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import MainList from '../components/MainList';
import NavigationPanel from '../components/NavigationPanel';
import { BlockNames } from '../constants/blocks-names';
import useScrollTo from '../hooks/useScrollTo';
import classNames from 'classnames';
import styles from '../styles/Home.module.css';

const MAX_BREAKFAST_HOUR = 14;

export default function Home({ blocks, categories }) {
	const [navPanelVisible, setNavPanelVisible] = useState(false);
	const [breakfaskFirst, setBreakfaskFirst] = useState(false);
	const [fixedHeader, setFixedHeader] = useState(false);
	const [isFoodViewed, setFoodViewed] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(
			blocks.map((block) => {
				if (breakfaskFirst) {
					if (block.blockName.toLowerCase().includes('страви на сніданок')) {
						block.order = -12;
					}
					if (block.blockName.toLowerCase().includes('солоденького')) {
						block.order = -11;
					}
				}
				return block;
			})
		);
	}, [blocks, breakfaskFirst]);

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

	const runScrollTo = useScrollTo();

	const onInViewToggle = useCallback((inView, block, type) => {
		if (inView) {
			setFoodViewed(type === 'food');
		}
	}, []);

	const navigateToType = useCallback(
		(type) => {
			if (categories.length) {
				const cats = categories.sort((a, b) => (a.order > b.order ? 1 : -1));
				const id =
					type === 'food'
						? cats.find((v) => v.type === 'food')._id
						: cats.find((v) => v.type !== 'food')._id;
				runScrollTo({ preventDefault: () => {} }, id);
				setFoodViewed(type === 'food');
			}
		},
		[categories, runScrollTo]
	);

	return (
		<div className={styles.container}>
			<Head>
				<title>Меню кафе Мушля у місті Житомир</title>
				<meta name="description" content="QR меню кафе Мушля у Житомирі" />
				<meta
					name="facebook-domain-verification"
					content={`${process.env.NEXT_PUBLIC_FB_DOMAIN_TOKEN}`}
				/>
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
					let userId = localStorage.getItem('muser_id');
					if(!userId) {
					 userId = new Date().getTime();
					 localStorage.setItem('muser_id', userId);
					}
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { 'user_id': userId });
					gtag('set', 'user_properties', { 'crm_id' : userId });
					`,
					}}
				/>

				<script
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_PIXEL}');
      fbq('track', 'PageView');`,
					}}
				/>
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_PIXEL}&ev=PageView&noscript=1" />`,
					}}
				/>
			</Head>

			<main className={styles.main}>
				<header>
					<span className={styles.menuIcon} onClick={toggleNavigationPanel}>
						|||
					</span>
					<Image
						className={styles.logo}
						priority={true}
						src="/logo.svg"
						alt="Мушля"
						width={280}
						height={60}
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

				<div
					className={classNames(
						{ [styles.fixedHeader]: fixedHeader },
						styles.sticky
					)}
				>
					<span className={styles.menuIcon} onClick={toggleNavigationPanel}>
						|||
					</span>

					<div className={styles.toggler}>
						<span
							className={classNames({
								[styles.active]: isFoodViewed,
							})}
							onClick={() => navigateToType('food')}
						>
							Страви
						</span>
						<span
							className={classNames({
								[styles.active]: !isFoodViewed,
							})}
							onClick={() => navigateToType('bar')}
						>
							Напої
						</span>
					</div>
				</div>

				<NavigationPanel
					navPanelVisible={navPanelVisible}
					categories={categories}
					navigateToCategory={navigateToCategory}
					close={toggleNavigationPanel}
				/>

				<MainList blocks={data} onInViewToggle={onInViewToggle} />
			</main>
		</div>
	);
}

export async function getServerSideProps() {
	const clientId = process.env.CLIENT_ID;
	const host = process.env.HOST;
	const res = await fetch(
		`https://${host}/api/v1/categories?clientId=${clientId}`
	);
	const productsRes = await fetch(
		`https://${host}/api/v1/products?clientId=${clientId}`
	);
	const { data: categoriesFromServer } = await res.json();
	const { data: products } = await productsRes.json();

	if (!categoriesFromServer || !products) {
		return {
			notFound: true,
		};
	}

	const blocks = [];
	const availableProducts = products.filter((v) => v.available);

	const categories = categoriesFromServer.map((cat) => {
		const products = availableProducts
			.filter((v) => v.category === cat._id)
			.sort((a, b) => a.price - b.price);
		if (products.length) {
			const type = products[0].type;
			blocks.push({
				id: cat._id,
				blockName: cat.name,
				classes: cat.classes || '',
				description: cat.description,
				products,
				type,
				subCategories: cat.children,
				order: cat.order || 1,
			});
			return {
				...cat,
				type,
			};
		}
		return cat;
	});
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
			blocks,
		}, // will be passed to the page component as props
	};
}
