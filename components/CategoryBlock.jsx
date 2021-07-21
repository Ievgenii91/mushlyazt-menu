import styles from '../styles/Home.module.css'

export default function CategoryBlock({ blockName, products, description, className }) {
	return (
		<div className={[styles.cardBlock, className].join(' ')}>
			<div className={styles.cardBlockHeader}>
				<h3>{blockName}</h3>
				<p className={styles.cardBlockHeaderDescription}>{description}</p>
			</div>
			<div>
				{products.map((v) => {
					return <div className={styles.product} key={v._id}>
								<div className={styles.productName}>
									{v.name}
									<div className={styles.productDescription}>{v.description}</div>
								</div>
								<div className={styles.price}>
									{v.price} ₴
								</div>
							</div>;
				})}
			</div>
		</div>
	);
}
