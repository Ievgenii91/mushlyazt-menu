import styles from '../styles/Home.module.css';
import classNames from 'classnames';

export default function CategoryBlock({
	blockName,
	products,
	description,
	className,
	subCategories,
}) {
	const hasSubCategories = !!subCategories && !!subCategories.length;
	const product = (v) => (
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
				{v.price} ₴
			</div>
		</div>
	);
	return (
		<div className={classNames(styles.cardBlock, className)}>
			<div className={styles.cardBlockHeader}>
				<h3>{blockName}</h3>
				<p className={styles.cardBlockHeaderDescription}>{description}</p>
			</div>
			<div>
				{hasSubCategories &&
					subCategories.map((v) => {
						return (
							<div key={v}>
								<h4>{v}</h4>
								{products
									.filter((p) => p.subCategory === v)
									.map(product)}
							</div>
						);
					})}
				{!hasSubCategories &&
					products.map(product)}
			</div>
		</div>
	);
}
