import styles from '../styles/Home.module.css';

export default function InfoBlock({ data = [], message = '' }) {
	return (
		<div className={styles.infoBlock}>
			{data.map((v) => (
				<div className={styles.product} key={v}>
					{v}
				</div>
			))}
			<span className={styles.tip}>{message}</span>
		</div>
	);
}
