import styles from '../styles/Home.module.css';
import * as ga from '../lib/ga';
import useScrollTo from '../hooks/useScrollTo';

export default function NavigationPanel({
	categories,
	navigateToCategory,
	navPanelVisible,
	close,
}) {
	const runScrollTo = useScrollTo();

	const scrollTo = (e, data) => {
		runScrollTo(e, data._id);

		ga.event({
			action: 'search',
			params: {
				category: data.name,
			},
		});
	};

	return (
		<nav
			className={styles.navPanel}
			style={{ left: !navPanelVisible ? '-85%' : 0 }}
		>
			<div className={styles.close} onClick={(e) => close(e)}>
				+
			</div>
			<ul>
				{categories.map((v) => {
					return (
						<li key={v._id} onClick={navigateToCategory}>
							<a href={'#' + v._id} onClick={(e) => scrollTo(e, v)}>
								{v.name}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
