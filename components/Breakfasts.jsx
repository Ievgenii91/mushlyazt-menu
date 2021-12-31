import styles from '../styles/Home.module.css';
import classNames from 'classnames';
import { BlockNames } from '../constants/blocks-names';
import useGetBlock from '../hooks/useGetBlock';
import CategoryBlock from './CategoryBlock';
import InfoBlock from './InfoBlock';
import CustomBlock from './CustomBlock';

export default function Breakfasts({ blocks }) {

  const getBlock = useGetBlock(blocks);

  return (
		<section className={styles.breakfastSection}>
			<h1 className={classNames(styles.heading, styles.breakFastHeader)}>Сніданки</h1>
			<CustomBlock className={classNames(styles.filled, styles.blue)} />
			<InfoBlock message={'Твій смачний початок дня'} />
	
			<CategoryBlock
				key={BlockNames.breakfast}
				{...getBlock(BlockNames.breakfast)}
			/>

			<CategoryBlock
				key={BlockNames.sweetBreakfast}
				className={styles.filled}
				{...getBlock(BlockNames.sweetBreakfast)}
			/>
		</section>
	);
}
