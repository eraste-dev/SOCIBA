import { MegamenuItem, NavItemType } from "components/Navigation/NavigationItem";
import { route } from "routers/route";
import ncNanoId from "utils/ncNanoId";

const createNavItem = (name: string, href: string) => {
	return {
		id: ncNanoId(),
		name,
		href,
	};
};

const href = (id: string | number) => {
	return route("annonces") + "/?category=" + id;
};

const NAV_COLUMN_ONE: NavItemType[] = [
	createNavItem("Maison à louer", href(1)),
	createNavItem("Espace à louer", href(1)),
	createNavItem("Magasin à louer", href(1)),
	createNavItem("Entrepôt à louer etc…", href(1)),
];

const NAV_COLUMN_TWO: NavItemType[] = [createNavItem("Résidence disponible", href(1)), createNavItem("Hôtel disponible etc…", href(2))];

const NAV_COLUMN_THREE: NavItemType[] = [
	createNavItem("Maison", href(1)),
	createNavItem("Terrain", href(2)),
	createNavItem("Entrepôt, de meubles etc", href(3)),
];

const NAV_COLUMN_FOUR: NavItemType[] = [createNavItem("Restaurant / maquis/ Point Chaud", href(1)), createNavItem("Concert/ plein air", href(2))];

const NAV_COLUMN_FIVE: NavItemType[] = [createNavItem("A propos de nous", "/about")];

const MEGA_MENU1: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "location",
		items: NAV_COLUMN_ONE.map((i) => i),
	},
];

const MEGA_MENU2: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "réservation",
		items: NAV_COLUMN_TWO.map((i) => i),
	},
];

const MEGA_MENU3: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "vente",
		items: NAV_COLUMN_THREE.map((i) => i),
	},
];

const MEGA_MENU4: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "Annonce évènementiels",
		items: NAV_COLUMN_FOUR.map((i) => i),
	},
];

const MEGA_MENU5: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "Autres",
		items: NAV_COLUMN_FIVE.map((i) => i),
	},
];

export { NAV_COLUMN_ONE, NAV_COLUMN_TWO, NAV_COLUMN_THREE, NAV_COLUMN_FOUR, NAV_COLUMN_FIVE, MEGA_MENU1, MEGA_MENU2, MEGA_MENU3, MEGA_MENU4, MEGA_MENU5 };
