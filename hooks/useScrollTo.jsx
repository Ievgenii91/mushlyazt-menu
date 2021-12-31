const scrollTo = (e, id) => {
	const element = document.getElementById(id);
	if (element) {
		e.preventDefault();
		const yOffset = -60;
		const y =
			element.getBoundingClientRect().top + window.pageYOffset + yOffset;

		window.scrollTo({ top: y, behavior: 'smooth' });
	} else {
		console.warn('no element', id);
	}
};

const useScrollTo = () => {
	return scrollTo;
};

export default useScrollTo;
