import styles from '../styles/Home.module.css';
import classNames from 'classnames';

export default function OysterBlock({
	id,
	blockName,
	products,
	description,
	className,
}) {
	let sorted = products.sort((a, b) => (b.name > a.name ? -1 : 1));
	sorted = sorted.reduce((prev, curr) => {
		const found = prev.find((v) => v.name === curr.name);
		if (found) {
			found.prices.push({
				name: curr.additionalText,
				price: curr.price,
			});
			return prev;
		}
		curr.prices = [
			{
				name: curr.additionalText,
				price: curr.price,
			},
		];
		return [...prev, curr];
	}, []);

	const product = (v) => {
		return (
			<div key={v._id}>
				<div className={styles.productGrouped}>{v.name}</div>

				<div className={styles.groupedPrices}>
					{v.prices.map((i, index) => (
						<span key={index}>
							{i.name}&nbsp; - &nbsp;<b>{i.price} ₴</b>
						</span>
					))}
				</div>
			</div>
		);
	};
	return (
		<div className={classNames(styles.cardBlock, className)}>
			<div
				id={id}
				className={styles.cardBlockHeader}
			>
				<h3>{blockName}</h3>
				<p className={styles.cardBlockHeaderDescription}>{description}</p>
			</div>
			<div>{sorted.map(product)}</div>
		</div>
	);
}
