import { IPropertySubCategory } from "app/reducer/products/sub-propertiy-category";

export const MAISON_KEY = "Maison";
const APPARTEMENT_KEY = "Appartement";
const ESPACE_KEY = "Espace";
const MAGASIN_KEY = "Magasin";
const SALLE_EVENEMENT_KEY = "Salle d'événement";
export const BUREAU_KEY = "Bureau";
const RESIDENCE_KEY = "Résidence";
const HOTEL_KEY = "Hôtel";
export const TERRAIN_KEY = "Terrain";
const ENTREPOT_KEY = "Entrepôt";
export const AUTRE_KEY = "Autre";
export const VILLA_KEY = "Villa";
export const TRIPLEX_KEY = "Triplex";
export const DUPLEX_KEY = "Duplex";
export const CAN_WRITE_KEY = "CAN_WRITE_KEY";

export const CATEGORIES_SUB: IPropertySubCategory[] = [
	{
		id: 1,
		name: "Studio",
		allow: [MAISON_KEY, RESIDENCE_KEY],
		allow_type: "LOCATION",
		uuid: "STUDIO",
	},
	{
		id: 2,
		name: "2 pièces",
		allow: [MAISON_KEY, APPARTEMENT_KEY, RESIDENCE_KEY],
		allow_type: "LOCATION",
		uuid: "TWO_PIECE",
	},
	{
		id: 3,
		name: "3 pièces",
		allow: [MAISON_KEY, APPARTEMENT_KEY, RESIDENCE_KEY],
		allow_type: "LOCATION",
		uuid: "THREE_PIECE",
	},
	{
		id: 4,
		name: "Appartement",
		allow: [MAISON_KEY, APPARTEMENT_KEY],
		allow_type: "LOCATION",
		uuid: "FOUR_PIECE",
	},
	{
		id: 5,
		name: "Villa",
		allow: [MAISON_KEY, RESIDENCE_KEY],
		allow_type: "*",
		uuid: "VILLA",
	},

	{
		id: 6,
		name: "Duplex",
		allow: [MAISON_KEY],
		allow_type: "*",
		uuid: "DUPLEX",
	},
	{
		id: 7,
		name: "Triplex",
		allow: [MAISON_KEY],
		allow_type: "*",
		uuid: "TRIPLEX",
	},
	{ id: 8, name: "Chambre", allow: [HOTEL_KEY], uuid: "CHAMBRE", allow_type: "*" },
	{ id: 9, name: "Suite", allow: [HOTEL_KEY], uuid: "SUITE", allow_type: "*" },
	{ id: 999, name: "Autre", allow: [APPARTEMENT_KEY], uuid: "AUTRE", allow_type: "*" },
];
