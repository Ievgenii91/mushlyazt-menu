export const BlockNames = {
	oysterBar: 'Устричний Бар',
	cooledSeafood: 'Охолоджені морепродукти',
	tartar: 'Тартар',
	grilledSeafood: 'Морепродукти GRILL',
	bowls: 'Боули та салати',
	plato: 'Плато',
	seafoodPlato: 'Seafood плато',
	mussels: 'Мідії',
	sandwiches: 'Бургери та сендвічі',
	steaks: 'Стейки із риби',
	soups: 'Супи',
	rolls: 'Роли',
	deserts: 'Десерти',
	drinksGlass: 'Напої келихами',
	beer: 'Пиво',
	drinksBottle: 'Напої пляшками',
	softDrinks: 'Безалкогольні напої',
	breakfast: 'Страви на сніданок',
	sweetBreakfast: 'Солоденького?',
	shots: 'Пий чарками',
	cocktails: 'Коктейлі',
	pasta: 'Паста',
	// додатки
};

export const styleConfig = {
	[BlockNames.tartar]: ['cardBlock'],
	[BlockNames.cooledSeafood]: [
		'backgroundBulot',
		'transparentBackgroundHeader',
	],
	[BlockNames.grilledSeafood]: ['cardBlockBordered'],
	[BlockNames.plato]: ['filled', 'backgroundShrimp'],
	[BlockNames.seafoodPlato]: ['filled', 'backgroundShrimp'],
	[BlockNames.mussels]: ['filled', 'blue', 'backgroundMussels'],
	[BlockNames.sandwiches]: ['backgroundFish'],
	[BlockNames.bowls]: ['cardBlockBordered'],
	[BlockNames.steaks]: [''],
	[BlockNames.soups]: [''],
	[BlockNames.rolls]: ['filled', 'blue', 'backgroundFish'],
	[BlockNames.pasta]: ['cardBlockBordered'],
	[BlockNames.deserts]: ['filled'],
	[BlockNames.drinksGlass]: ['backgroundBulot'],
	[BlockNames.groupedAlko]: [
		'backgroundBulot',
		'cardBlockBordered',
		'alkoBlock',
	],
	[BlockNames.shots]: ['cardBlockBordered'],
	[BlockNames.cocktails]: ['cardBlockBordered'],
	[BlockNames.beer]: ['filled'],
	[BlockNames.drinksBottle]: ['cardBlockBordered'],
	[BlockNames.softDrinks]: [''],
	[BlockNames.breakfast]: ['cardBlockBordered'],
};
