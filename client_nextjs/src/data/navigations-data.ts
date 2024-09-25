import { MegamenuItem, NavItemType } from "components/Navigation/NavigationItem";
import { route } from "routers/route";
import ncNanoId from "utils/ncNanoId";
import {
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "containers/PageDashboard/Posts/posts.constantes";
import LocationImg from "../images/menu/location_licence.jpg";
import ReservationImg from "../images/menu/reservation.png";
import SellImg from "../images/menu/vente_licence.jpg";

const createNavItem = (name: string, href: string) => {
	return {
		id: ncNanoId(),
		name,
		href,
	};
};

const href = (type: string | undefined = undefined, slug: string | undefined = undefined) => {
	if (type) {
		return (
			route("annonces") +
			"/?type=" +
			type +
			"&category_slug=" +
			slug +
			"&category_slug_selected=" +
			slug
		);
	}

	return route("annonces") + "/?category_slug=" + slug + "&category_slug_selected=" + slug;
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
	createNavItem(
		"Maison à louer",
		href(PRODUCT_TYPE[TYPE_LOCATION_KEY], "maison") // TODO : use constant for scalability
	),
	createNavItem(
		"Appartement",
		href(PRODUCT_TYPE[TYPE_LOCATION_KEY], "appartement") // TODO : use constant for scalability
	),
	createNavItem(
		"Espace à louer",
		href(PRODUCT_TYPE[TYPE_LOCATION_KEY], "espace") // TODO : use constant for scalability
	),
	createNavItem("Magasin à louer", href(PRODUCT_TYPE[TYPE_LOCATION_KEY], "magasin")),
	createNavItem(
		"Salle d'evenement",
		href(PRODUCT_TYPE[TYPE_LOCATION_KEY], "salle-d-evenement") // TODO : use constant for scalability),
	),
	createNavItem(
		"Bureau à louer",
		href(PRODUCT_TYPE[TYPE_LOCATION_KEY], "bureau") // TODO : use constant for scalability),
	),
	// createNavItem("Autres", href(CAT_KEY_ID.OTHER, "LOCATION")),
];

const NAV_COLUMN_TWO: NavItemType[] = [
	createNavItem("Résidence", href(PRODUCT_TYPE[TYPE_RESERVATION_KEY], "residence")),
	createNavItem("Hôtel", href(PRODUCT_TYPE[TYPE_RESERVATION_KEY], "hotel")),
];

const NAV_COLUMN_THREE: NavItemType[] = [
	createNavItem(
		"Maison",
		href(PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY], "maison") // TODO : use constant for scalability
	),
	createNavItem(
		"Terrain",
		href(PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY], "terrain") // TODO : use constant for scalability
	),
	createNavItem(
		"Autre bien immobilier",
		href(PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY], "autre-bien-immobilier") // TODO : use constant for scalability
	),
	// createNavItem("Magasin", href(ProductcategoryUUID.BIEN_EN_VENTE.children.MAGASIN)),
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
		image: LocationImg,
		title: "Location",
		items: NAV_COLUMN_ONE.map((i) => i),
	},
];

const MEGA_MENU2: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: ReservationImg,
		title: "Réservation",
		items: NAV_COLUMN_TWO.map((i) => i),
	},
];

const MEGA_MENU3: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image: SellImg,
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
