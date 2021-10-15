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
			<InfoBlock message="Щоранку 11:00 до 15:00 готуємо круті сніданки з морепродуктами та ігристим." />
			<CustomBlock className={classNames(styles.filled, styles.blue)} />
			<InfoBlock message={'Твій аристократичний початок дня'} />
			{/* <CategoryBlock
				key={BlockNames.oysterBar}
				className={styles.backgroundOyster}
				{...getBlock(BlockNames.oysterBar)}
			/> */}
			<CategoryBlock
				key={BlockNames.breakfast}
				{...getBlock(BlockNames.breakfast)}
			/>
			<CategoryBlock
				key={BlockNames.seafoodPlato}
				className={classNames(styles.filled, styles.backgroundShrimp)}
				{...getBlock(BlockNames.seafoodPlato)}
			/>
			<CategoryBlock
				key={BlockNames.sweetBreakfast}
				{...getBlock(BlockNames.sweetBreakfast)}
			/>
		</section>
	);
}
