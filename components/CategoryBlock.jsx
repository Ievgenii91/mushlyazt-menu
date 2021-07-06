export default function CategoryBlock({ blockName, products }) {
	return (
		<div>
			<h3>{blockName}</h3>
			<ul>
				{products.map((v) => {
					return <div key={v._id}>{v.name} {v.price} грн</div>;
				})}
			</ul>
		</div>
	);
}
