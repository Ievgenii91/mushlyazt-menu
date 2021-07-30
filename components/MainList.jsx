import styles from '../styles/Home.module.css';
import { BlockNames } from '../constants/blocks-names';
import useGetBlock from '../hooks/useGetBlock';
import CategoryBlock from './CategoryBlock';
import classNames from 'classnames';
import Additionals from './Additionals';

export default function MainList({ blocks, hour }) {

  const getBlock = useGetBlock(blocks);

  return (
		<section key={'breakfast-2'}>
				{hour <= 8 || hour <= 12 ? (
					<h1 className={styles.heading}>Основне меню</h1>
				) : null}
				<CategoryBlock
					key={BlockNames.oysterBar}
					className={styles.backgroundOyster}
					{...getBlock(BlockNames.oysterBar)}
				/>
				<CategoryBlock
					key={BlockNames.cooledSeafood}
					{...getBlock(BlockNames.cooledSeafood)}
				/>
				<CategoryBlock
					key={BlockNames.tartar}
					className={styles.cardBlock}
					{...getBlock(BlockNames.tartar)}
				/>
				<CategoryBlock
					key={BlockNames.grilledSeafood}
					className={styles.cardBlockBordered}
					{...getBlock(BlockNames.grilledSeafood)}
				/>
				<CategoryBlock
					key={BlockNames.plato}
					className={classNames(styles.filled, styles.backgroundShrimp)}
					{...getBlock(BlockNames.plato)}
				/>
				<CategoryBlock
					key={BlockNames.mussels}
					className={classNames(
						styles.filled,
						styles.blue,
						styles.backgroundMussels
					)}
					{...getBlock(BlockNames.mussels)}
				/>
				<CategoryBlock
					key={BlockNames.sandwiches}
					className={styles.backgroundFish}
					{...getBlock(BlockNames.sandwiches)}
				/>
				<Additionals />
				<CategoryBlock
					key={BlockNames.bowls}
					className={styles.cardBlockBordered}
					{...getBlock(BlockNames.bowls)}
				/>
				<CategoryBlock
					key={BlockNames.salad}
					{...getBlock(BlockNames.salad)}
				/>
				<CategoryBlock
					key={BlockNames.steaks}
					{...getBlock(BlockNames.steaks)}
				/>
				<CategoryBlock
					key={BlockNames.soups}
					{...getBlock(BlockNames.soups)}
				/>
				<CategoryBlock
					key={BlockNames.rolls}
					className={classNames(
						styles.filled,
						styles.blue,
						styles.backgroundFish
					)}
					{...getBlock(BlockNames.rolls)}
				/>
				<CategoryBlock
					key={BlockNames.deserts}
					className={styles.filled}
					{...getBlock(BlockNames.deserts)}
				/>
				<CategoryBlock
					key={BlockNames.drinksGlass}
					className={styles.backgroundBulot}
					{...getBlock(BlockNames.drinksGlass)}
				/>
				<CategoryBlock
					key={BlockNames.beer}
					className={styles.filled}
					{...getBlock(BlockNames.beer)}
				/>
				<CategoryBlock
					key={BlockNames.drinksBottle}
					{...getBlock(BlockNames.drinksBottle)}
				/>
				<CategoryBlock
					key={BlockNames.softDrinks}
					{...getBlock(BlockNames.softDrinks)}
				/>
			</section>
	);
}