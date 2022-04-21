import styles from '../styles/Home.module.css';
import CategoryBlock from './CategoryBlock';
import OysterBlock from './OysterBlock';
import classNames from 'classnames';
import { useCallback, useMemo } from 'react';

const getClasses = (classes) => classes.split(' ').map((v) => styles[v]);

export default function MainList({ blocks = [], onInViewToggle }) {
	const mainBlockIndex = blocks.findIndex(
		(v) => v.order === 1 && v.classes.includes('top-product')
	);
	const mainBlock = mainBlockIndex !== -1 ? blocks[mainBlockIndex] : null;

	const categories = useMemo(() => [...blocks], [blocks]);
	if (mainBlockIndex >= 0) {
		categories.splice(1, mainBlockIndex);
	}

	const renderCategoriesByType = useCallback(
		(filterType) =>
			categories
				.filter(({ type }) => type === filterType)
				.sort((a, b) => (a.order > b.order ? 1 : -1))
				.map((data) => (
					<CategoryBlock
						onInViewToggle={onInViewToggle}
						className={classNames(...getClasses(data.classes))}
						key={data.id}
						{...data}
					/>
				)),
		[categories, onInViewToggle]
	);

	return (
		<section>
			{mainBlock && (
				<OysterBlock
					key={'custom-oysterBar'}
					className={classNames(
						styles.backgroundOyster,
						styles.cardBlockBordered
					)}
					{...mainBlock}
				/>
			)}
			{renderCategoriesByType('food')}
			{renderCategoriesByType('bar')}
		</section>
	);
}
