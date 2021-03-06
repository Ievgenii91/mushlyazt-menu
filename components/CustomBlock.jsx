import styles from '../styles/Home.module.css';
import classNames from 'classnames';

export default function CustomBlock({ className }) {
	return (
		<div className={classNames(styles.cardBlock, styles.breakfast, className)}>
			<div className={styles.cardBlockHeader}>
				<h3 className={styles.bigSeafoodHeader}>ВЕЛИКИЙ SEAFOOD СНІДАНОК</h3>
				<p className={styles.price}>159₴</p>
			</div>
			<div className={styles.list}>
				<ol>
					<li>
						Напій на твій вибір:
						<span>обирай філіжанку кави, чаю або келих ігристого</span>
					</li>
					<li>Асорті намазок з теплим хлібом</li>
					<li>
						Основна страва на вибір:
						<p>- авокадо тост зі слабосоленим лососем та яйцем пашот</p>
						<p>
							- яйця пашот зі слабосоленим лососем, бобами адамаме та соусом блю чіз
						</p>
						<p>
							- скрембл з тигровими креветками та міксом
							салатів
						</p>
						<p>- великий омлет з тунцем, авокадо та ніжним сиром</p>
					</li>
				</ol>
			</div>
		</div>
	);
}
