import styles from '../styles/Home.module.css'

export default function Additionals({ blockName, products, description, className }) {
	return (
		<div className={[styles.additionals, className].join(' ')}>
			<div className={styles.additionalsHeader}>Додай:</div>
			<div className={styles.additionalsCategory}>
				<div>
					<h3>Картопляні діпи</h3>
					<span className={styles.price}>49₴</span>
				</div>
                <div>
                    <h3>Теплий хліб</h3>
                    <span className={styles.price}>19₴</span>
				</div>
                <div>
                    <h3>Соус</h3>
                    <span className={styles.price}>9₴</span>
				</div>
			</div>
		</div>
	);
}
