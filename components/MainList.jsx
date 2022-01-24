import styles from '../styles/Home.module.css';
import { BlockNames, styleConfig } from '../constants/blocks-names';
import useGetBlock from '../hooks/useGetBlock';
import CategoryBlock from './CategoryBlock';
import OysterBlock from './OysterBlock';
import classNames from 'classnames';
import InfoBlock from './InfoBlock';
import CustomBlock from './CustomBlock';

const getClasses = (classes) => classes.split(' ').map((v) => styles[v]);

export default function MainList({ blocks, onInViewToggle }) {
	const getBlock = useGetBlock(blocks);

	if (!blocks.length) return null;

	const sigs = [
		'Сигарети Sobranie BlackS',
		'Сигарети Sobranie Blue',
		'Сигарети Sobranie Gold',
		'Сигарети Winston Blue',
		'Сигарети Winston EXPAND DUO',
		'Сигарети Winston XS Caster',
		'Сигарети Winston XS Impulse',
		'Сигарети Winston XSpression Fresh',
		'Сигарети Winston XSpression Purple',
		'Сигарети Winston XStyle Blue',
		'Сигарети Winston XStyle DUO Green',
		'Сигарети Winston XStyle Silver',
	];

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
			<CustomBlock className={styles.custom}/>
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
				.filter(({ type }) => type !== 'food')
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

			<InfoBlock
				data={sigs}
				message={`*Інформація про ціни на тютюнові вироби доступна в місці торгівлі
						Відповідно до закону України №71-VIII від 28.12.2014, продаж об'єктами господарювання роздрібної торгівлі підакцизних товарів, на які встановлюються максимально роздрібні ціни, не може здійснюватись за цінами, вищими за максимально роздрібні ціни, збільшені на суму акцизного податку з роздрібної торгівлі підакцизних товарів.`}
			/>
		</section>
	);
}
