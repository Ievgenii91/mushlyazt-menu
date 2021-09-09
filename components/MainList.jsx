import styles from '../styles/Home.module.css';
import { BlockNames } from '../constants/blocks-names';
import useGetBlock from '../hooks/useGetBlock';
import CategoryBlock from './CategoryBlock';
import classNames from 'classnames';
import Additionals from './Additionals';

export default function MainList({ blocks, showMainLabel }) {
	const getBlock = useGetBlock(blocks);

	return (
		<section>
			{showMainLabel && <h1 className={styles.heading}>Основне меню</h1>}
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
			<CategoryBlock key={BlockNames.salad} {...getBlock(BlockNames.salad)} />
			<CategoryBlock
				key={BlockNames.avokadoSalad}
				{...getBlock(BlockNames.avokadoSalad)}
			/>
			<CategoryBlock key={BlockNames.steaks} {...getBlock(BlockNames.steaks)} />
			<CategoryBlock key={BlockNames.soups} {...getBlock(BlockNames.soups)} />
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
			<div className={classNames(styles.backgroundBulot, styles.cardBlockBordered, styles.alkoBlock)}>
				<CategoryBlock
					key={BlockNames.shots}
					{...getBlock(BlockNames.shots)}
				/>
				<CategoryBlock
					key={BlockNames.cocktails}
					{...getBlock(BlockNames.cocktails)}
				/>
			</div>
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
