import styles from '../styles/Home.module.css'

export default function CustomBlock({ blockName, products, description, className, subCategories }) {
	return (
		<div className={[styles.cardBlock, styles.breakfast, className].join(' ')}>
			<div className={styles.cardBlockHeader}>
				<h3>ВЕЛИКИЙ SEAFOOD СНІДАНОК</h3>
				<p className={styles.breakfastDescription}>Ранок має починатися з ігристого ;)</p>
				<p className={styles.price}>159₴</p>
			</div>
			<div className={styles.list}>
				<ol>
					<li>
						Напій на твій вибір:
						<span>обирай філіжанку кави, чаю або келих ігристого</span>
					</li>
                    <li>
						Асорті намазок з теплим хлібом
					</li>
                    <li>
						Основна страва на вибір:
                        <p>- авокадо тост зі слабосоленим лососем та яйцем пашот</p>
                        <p>- яйця пашот зі слабосоленим лососем, броколі та соусом блю чіз</p>
                        <p>- скрембл з тигровими креветками, кав&apos;яром тобіко та міксом салатів</p>
                        <p>- великий омлет з тунцем, авокадо та ніжним сиром</p>
                        <p>- вівсянка з пармезаном</p>
					</li>
				</ol>
			</div>
		</div>
	);
}
