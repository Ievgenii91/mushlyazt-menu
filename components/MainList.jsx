import styles from '../styles/Home.module.css';
import { BlockNames, styleConfig } from '../constants/blocks-names';
import useGetBlock from '../hooks/useGetBlock';
import CategoryBlock from './CategoryBlock';
import OysterBlock from './OysterBlock';
import classNames from 'classnames';

const getClasses = (classes) => classes.split(' ').map((v) => styles[v]);

export default function MainList({ blocks, showMainLabel, onInViewToggle }) {
	const getBlock = useGetBlock(blocks);

	return (
		<section>
			{showMainLabel && <h1 className={styles.heading}>Основне меню</h1>}
			<OysterBlock
				key={'custom-oysterBar'}
				className={classNames(
					styles.backgroundOyster,
					styles.cardBlockBordered
				)}
				{...getBlock(BlockNames.oysterBar)}
			/>
			{blocks
				.filter(
					({ type, blockName }) =>
						type === 'food' && blockName !== BlockNames.oysterBar
				)
				.map((data) => {
					const classes = data.classes
						? getClasses(data.classes)
						: (styleConfig[data.blockName] || []).map((v) => styles[v]);
					return (
						<CategoryBlock
							onInViewToggle={onInViewToggle}
							className={classNames(...classes)}
							key={data.id}
							{...data}
						/>
					);
				})}
			{blocks
				.filter(({ type }) => type !== 'food')
				.reduce((acc, data) => {
					const classes = data.classes
						? getClasses(data.classes)
						: (styleConfig[data.blockName] || []).map((v) => styles[v]);
					const component = (
						<CategoryBlock
							className={classNames(...classes)}
							key={data.id}
							onInViewToggle={onInViewToggle}
							{...data}
						/>
					);
					// TODO: add array of wrapped items
					if (data.blockName === BlockNames['cocktails']) {
						return [...acc];
					}
					if (data.blockName === BlockNames['shots']) {
						const newData = blocks.find(
							(v) => v.blockName === BlockNames['cocktails']
						);
						let classes = getClasses(newData.classes);
						const comp = (
							<div
								className={classNames(
									styles.backgroundBulot,
									styles.cardBlockBordered,
									styles.alkoBlock
								)}
							>
								{component}
								<CategoryBlock
									className={classNames(...classes)}
									key={newData.id}
									onInViewToggle={onInViewToggle}
									{...newData}
								/>
							</div>
						);
						return [...acc, comp];
					}
					return [...acc, component];
				}, [])}
		</section>
	);
}
