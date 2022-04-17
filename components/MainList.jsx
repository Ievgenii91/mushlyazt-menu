import styles from '../styles/Home.module.css';
import { BlockNames, styleConfig } from '../constants/blocks-names';
import useGetBlock from '../hooks/useGetBlock';
import CategoryBlock from './CategoryBlock';
import OysterBlock from './OysterBlock';
import classNames from 'classnames';
// import InfoBlock from './InfoBlock';
// import CustomBlock from './CustomBlock';

const getClasses = (classes) => classes.split(' ').map((v) => styles[v]);

export default function MainList({ blocks, onInViewToggle }) {
	const getBlock = useGetBlock(blocks);

	if (!blocks.length) return null;

	const blockValues = Object.values(BlockNames);
	console.log(blockValues, getBlock(BlockNames.oysterBar));

	return (
		<section>
			<OysterBlock
				key={'custom-oysterBar'}
				className={classNames(
					styles.backgroundOyster,
					styles.cardBlockBordered
				)}
				{...getBlock(BlockNames.oysterBar)}
			/>
			{/* <CustomBlock className={styles.custom} /> */}
			{blocks
				.filter(
					({ type, blockName }) =>
						type === 'food' && blockName !== BlockNames.oysterBar
				)
				.sort((a, b) => (a.order > b.order ? 1 : -1))
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
				.filter(({ type, blockName }) => type !== 'food')
				.sort((a, b) => (a.order > b.order ? 1 : -1))
				.map((data) => {
					const classes = data.classes
						? getClasses(data.classes)
						: (styleConfig[data.blockName] || []).map((v) => styles[v]);
					return (
						<CategoryBlock
							className={classNames(...classes)}
							key={data.id}
							onInViewToggle={onInViewToggle}
							{...data}
						/>
					);
				})}
		</section>
	);
}
