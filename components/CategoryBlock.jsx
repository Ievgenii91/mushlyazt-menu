import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import styles from '../styles/Home.module.css';

export default function CategoryBlock({
	id,
	blockName,
	products,
	description,
	className,
	subCategories,
	onInViewToggle,
	type,
}) {
	const [ref, inView] = useInView({
		threshold: 1,
	});
	const [start, setStart] = useState(null);

	useEffect(() => {
		try {
			if (inView) {
				setStart(new Date().getTime());
				// globalThis.fbq('trackCustom', 'Viewed', { name: blockName });
				// globalThis.gtag('event', 'CategoryViewed', {
				// 	event_category: 'CategoryInView',
				// 	event_label: 'CategoryName',
				// 	value: blockName,
				// });
			} else if (start) {
				const diff = start - new Date().getTime();
				if (diff < -600) {
					globalThis.gtag('event', 'CategoryTime', {
						event_category: blockName,
						event_label: 'TimeSpentInCategory',
						value: Math.abs(diff),
					});
				}
				setStart(null);
			}
		} catch (e) {
			console.error(e);
		}
		if (typeof onInViewToggle === 'function') {
			onInViewToggle(inView, blockName, type);
		}
	}, [inView, start, setStart, blockName, type, onInViewToggle]);

	const hasSubCategories = !!subCategories && !!subCategories.length;

	const product = (v) => {
		const showCalcs = v.capacity || v.weight;
		return (
			<div className={styles.product} key={v._id}>
				<div className={styles.productName}>
					{v.name}
					<div className={styles.productDescription}>{v.description}</div>
				</div>
				<div className={styles.price}>
					{v.additionalText ? (
						<span>
							{v.additionalText} <span className={styles.dot}>•</span>
						</span>
					) : null}
					{showCalcs && (
						<span className={styles.capacity}>
							{v.type === 'bar' ? `${v.capacity} мл` : `${v.weight} гр`}
						</span>
					)}
					{v.price} ₴
				</div>
			</div>
		);
	};
	return (
		<div className={classNames(styles.cardBlock, className)} ref={ref}>
			<div id={id} className={styles.cardBlockHeader}>
				<h3>{blockName}</h3>
				<p className={styles.cardBlockHeaderDescription}>{description}</p>
			</div>
			<div>
				{hasSubCategories &&
					subCategories.map((v) => {
						return (
							<div key={v}>
								<h4>{v}</h4>
								{products.filter((p) => p.subCategory === v).map(product)}
							</div>
						);
					})}
				{!hasSubCategories && products.map(product)}
			</div>
		</div>
	);
}
