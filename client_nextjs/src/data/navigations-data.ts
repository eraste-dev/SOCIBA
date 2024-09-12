import { MegamenuItem, NavItemType } from "components/Navigation/NavigationItem";
import { route } from "routers/route";
import ncNanoId from "utils/ncNanoId";
import { ProductcategoryUUID } from "./categories_uuid";

const createNavItem = (name: string, href: string) => {
	return {
		id: ncNanoId(),
		name,
		href,
	};
};

// const href = (id: string | number, type: IProductType | undefined = undefined) => {
const href = (uid: string) => {
	// if (type) {
	// 	return route("annonces") + "/?category=" + id + "&type=" + type;
	// }
	// return route("annonces") + "/?category=" + id;
	return route("annonces") + "/?category_uuid=" + uid;
};

export const CAT_KEY_ID = {
	MAISON: 1,
	BUREAU: 3,
	APPARTEMENT: 2,
	ESPACE: 13,
	MAGASIN: 11,
	ENTREPOT: 12,
	OTHER: 14,
	RESIDENCE: 16,
	HOTEL: 17,

	// VENTE
	VENTE_TERRAIN: 21,
	VENTE_MAGASIN: 23,
	VENTE_ENTREPOT: 22,
	VENTE_MAISON: 20,
};

const NAV_COLUMN_ONE: NavItemType[] = [
	createNavItem("Maison à louer", href(ProductcategoryUUID.MAISON.key)),
	createNavItem("Appartement", href(ProductcategoryUUID.MAISON.children.APPARTEMENT)),
	createNavItem("Espace à louer", href(ProductcategoryUUID.ENTREPOT.children.ESPACE_A_LOUER)),
	createNavItem("Magasin à louer", href(ProductcategoryUUID.MAGASIN.key)),
	createNavItem("Entrepôt à louer", href(ProductcategoryUUID.ENTREPOT.children.ESPACE_A_LOUER)),
	createNavItem("Bureau à louer", href(ProductcategoryUUID.MAISON.children.BUREAU)),
	// createNavItem("Autres", href(CAT_KEY_ID.OTHER, "LOCATION")),
];

const NAV_COLUMN_TWO: NavItemType[] = [
	createNavItem("Résidence", href(ProductcategoryUUID.RESERVATION.children.RESIDENCE)),
	createNavItem("Hôtel", href(ProductcategoryUUID.RESERVATION.children.HOTEL)),
];

const NAV_COLUMN_THREE: NavItemType[] = [
	createNavItem("Maison", href(ProductcategoryUUID.BIEN_EN_VENTE.children.MAISON)),
	createNavItem("Terrain", href(ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN)),
	createNavItem("Entrepôt", href(ProductcategoryUUID.BIEN_EN_VENTE.children.ENTREPOT)),
	createNavItem("Magasin", href(ProductcategoryUUID.BIEN_EN_VENTE.children.MAGASIN)),
];

const NAV_COLUMN_FOUR: NavItemType[] = [
	// createNavItem("Restaurant / maquis/ Point Chaud", href(1)),
	// createNavItem("Concert/ plein air", href(2)),
	createNavItem("A propos de nous", "/about"),
];

const NAV_COLUMN_FIVE: NavItemType[] = [createNavItem("A propos de nous", "/about")];

const MEGA_MENU1: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/categories/location.jpeg",
		title: "Location",
		items: NAV_COLUMN_ONE.map((i) => i),
	},
];

const MEGA_MENU2: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "Réservation",
		items: NAV_COLUMN_TWO.map((i) => i),
	},
];

const MEGA_MENU3: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: "../images/default/p-474x232.png",
		title: "En vente",
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

export {
	NAV_COLUMN_ONE,
	NAV_COLUMN_TWO,
	NAV_COLUMN_THREE,
	NAV_COLUMN_FOUR,
	NAV_COLUMN_FIVE,
	MEGA_MENU1,
	MEGA_MENU2,
	MEGA_MENU3,
	MEGA_MENU4,
	MEGA_MENU5,
};
