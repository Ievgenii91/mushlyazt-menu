import styles from '../styles/Home.module.css';

export default function NavigationPanel({ categories, navigateToCategory }) {
	return (
		<div className={styles.navPanel}>
			<ul>
				{categories.map((v) => {
					return (
						<li key={v._id} onClick={navigateToCategory}>
							<a href={'#' + v._id}>{v.name}</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
