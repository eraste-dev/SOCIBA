type ProductCategory<T> = {
	key: string;
	children: T;
};

type ProductCategoryType = {
	key: string;
};

type ProductCategoryUUIDType = {
	MAISON: ProductCategory<{
		APPARTEMENT: string;
		BUREAU: string;
		STUDIO: string;
		TWO_PIÈCES: string;
		THREE_PIÈCES: string;
		FOUR_PIÈCES: string;
		VILLA: string;
		DUPLEX: string;
		TRIPLEX: string;
	}>;
	MAGASIN: ProductCategory<{}>;
	ENTREPOT: ProductCategory<{
		ESPACE_A_LOUER: string;
	}>;
	RESERVATION: ProductCategory<{
		RESIDENCE: string;
		HOTEL: string;
	}>;
	BIEN_EN_VENTE: ProductCategory<{
		MAISON: string;
		TERRAIN: string;
		ENTREPOT: string;
		MAGASIN: string;
	}>;
};

export const ProductcategoryUUID: ProductCategoryUUIDType = {
	MAISON: {
		key: "LOCATION__MAISON",
		children: {
			APPARTEMENT: "LOCATION__APPARTEMENT",
			BUREAU: "LOCATION__BUREAU",
			STUDIO: "LOCATION__STUDIO",
			TWO_PIÈCES: "LOCATION__2_PIèCES",
			THREE_PIÈCES: "LOCATION__3_PIèCES",
			FOUR_PIÈCES: "LOCATION__4_PIèCES",
			VILLA: "LOCATION__VILLA",
			DUPLEX: "LOCATION__DUPLEX",
			TRIPLEX: "LOCATION__TRIPLEX",
		},
	},
	MAGASIN: {
		key: "LOCATION__MAGASIN",
		children: {},
	},
	ENTREPOT: {
		key: "LOCATION__ENTREPOT",
		children: {
			ESPACE_A_LOUER: "LOCATION__ESPACE_à_LOUER",
		},
	},
	RESERVATION: {
		key: "RESERVATION__RESERVATION",
		children: {
			RESIDENCE: "RESERVATION__RéSIDENCE_",
			HOTEL: "RESERVATION__HôTEL",
		},
	},
	BIEN_EN_VENTE: {
		key: "BIEN_EN_VENTE__BIENS_EN_VENTE",
		children: {
			MAISON: "BIEN_EN_VENTE__MAISON_",
			TERRAIN: "BIEN_EN_VENTE__TERRAIN",
			ENTREPOT: "BIEN_EN_VENTE__ENTREPÔT",
			MAGASIN: "BIEN_EN_VENTE__MAGASIN",
		},
	},
};
