import styles from '../styles/Home.module.css';
import CategoryBlock from './CategoryBlock';
import OysterBlock from './OysterBlock';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';

const getClasses = (classes) => classes.split(' ').map((v) => styles[v]);

export default function MainList({ blocks = [], onInViewToggle }) {
	const [mainBlock, setMainBlock] = useState(null);
	const categories = useMemo(() => {
		const mainBlockIndex = blocks.findIndex(
			(v) => v.order === 1 && v.classes.includes('top-product')
		);
		const mainBlock = mainBlockIndex !== -1 ? blocks[mainBlockIndex] : null;
		const categories = [...blocks];
		
		setMainBlock(mainBlock);

		if (mainBlockIndex >= 0) {
			categories.splice(mainBlockIndex, 1);
		}
		return categories;
	}, [blocks]);

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
