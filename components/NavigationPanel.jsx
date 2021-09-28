import styles from '../styles/Home.module.css';
import * as ga from '../lib/ga'

export default function NavigationPanel({
	categories,
	navigateToCategory,
	navPanelVisible,
	close,
}) {
	const scrollTo = (e, data) => {
		const element = document.getElementById(data._id);
		if (element) {
			e.preventDefault();
			const yOffset = -60;
			const y =
				element.getBoundingClientRect().top + window.pageYOffset + yOffset;

			window.scrollTo({ top: y, behavior: 'smooth' });
		} else {
			console.warn('no element', data._id);
		}

		ga.event({
      action: 'search',
      params : {
        category: data.name
      }
    })
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
