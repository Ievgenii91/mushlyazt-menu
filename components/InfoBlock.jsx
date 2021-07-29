import styles from '../styles/Home.module.css'

export default function InfoBlock({ message }) {
	return (
		<div className={[styles.infoBlock].join(' ')}>
			{message}
		</div>
	);
}
