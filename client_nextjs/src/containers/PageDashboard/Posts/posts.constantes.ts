import { PeriodicityType, ProductRequest } from "app/axios/api.type";
import { IProduct } from "app/reducer/products/product";

export const mapIProductToProductRequest = (iProduct: IProduct): ProductRequest => {
	return {
		id: iProduct.id,
		title: iProduct.title,
		category_id: iProduct.category.id,
		periodicity: iProduct.periodicity as PeriodicityType,
		excerpt: iProduct.excerpt,
		content: iProduct.content,
		type: iProduct.type,
		status: iProduct.status,
		location_id: String(iProduct.location.id),
		location_description: iProduct.location_description,
		price: iProduct.price,
		price_second: iProduct.price_second,
		deposit_price: iProduct.deposit_price,
		images: iProduct.images.map((image) => image.image),
		bathrooms: iProduct.bathrooms,
		bedrooms: iProduct.bedrooms,
		garages: iProduct.garages,
		kitchens: iProduct.kitchens,
		rooms: iProduct.rooms,
		area: iProduct.area,
		area_unit: iProduct.area_unit,
		count_advance: iProduct.count_advance,
		count_monthly: iProduct.count_monthly,
		jacuzzi: iProduct.jacuzzi ? 1 : 0,
		bath: iProduct.bath ? 1 : 0,
		WiFi: iProduct.WiFi ? 1 : 0,
		pool: iProduct.pool ? 1 : 0,
		air_conditioning: iProduct.air_conditioning ? 1 : 0,
		acd: iProduct.acd ? 1 : 0,
		site_approved: iProduct.site_approved ? 1 : 0,
		home_type: iProduct.home_type,
		home_type_more: iProduct.home_type_more,
		security: iProduct.security,
		purchase_power: iProduct.purchase_power,
		accessibility: iProduct.accessibility,
		area_count: iProduct.area_count,
	};
};

export type IProductType = "LOCATION" | "BIEN EN VENTE" | "RESERVATION"; // | "AUTRE"

export const TYPE_LOCATION_KEY: number = 0;
export const TYPE_RESERVATION_KEY: number = 1;
export const TYPE_BIEN_EN_VENTE_KEY: number = 2;
export const TYPE_AUTRE_KEY: number = 3;

export const PRODUCT_TYPE: IProductType[] = ["LOCATION", "RESERVATION", "BIEN EN VENTE"]; //"AUTRE"

export interface IPRODUCT_PERIODICITY {
	id: string;
	name: string;
}
export const PERIODICITY_LIST: IPRODUCT_PERIODICITY[] = [{ id: "MONTH", name: "M" }];

// { id: "WEEK", name: "Semaine" },
export const PERIODICITY_RESERVATION_LIST: { id: string; name: string }[] = [
	{ id: "DAY", name: "J" },
	{ id: "VISIT", name: "Séjour" },
];

export type IPRODUCT_AREA_UNIT_KEY = "M" | "LOT";

export interface IPRODUCT_AREA_UNIT {
	id: IPRODUCT_AREA_UNIT_KEY;
	name: string;
}

export const PRODUCT_AREA_UNIT: IPRODUCT_AREA_UNIT[] = [
	{ id: "M", name: "m²" },
	{ id: "LOT", name: "Lot" },
];

export interface ISubCategoryType {
	code: string;
	name: string;
}

export const SUB_MAISON_ONE_DETAIL: ISubCategoryType[] = [
	// {
	// 	code: "APPARTEMENT",
	// 	name: "Appartement",
	// },
	{
		code: "STUDIO",
		name: "Studio",
	},
	{ code: "TWO_PIECE", name: "2 pièces" },
	{ code: "THREE_PIECE", name: "3 pièces" },
	{ code: "FOUR_PIECE", name: "4 pièces" },
	{ code: "VILLA", name: "Villa" },
	{ code: "DUPLEX", name: "Duplex" },
	{ code: "TRIPLEX", name: "Triplex" },
];

export const SUB_MAISON_DETAIL: ISubCategoryType[] = [
	// {
	// 	code: "APPARTEMENT",
	// 	name: "Appartement",
	// },
	{
		code: "STUDIO",
		name: "Studio",
	},
	{ code: "TWO_PIECE", name: "2 pièces" },
	{ code: "THREE_PIECE", name: "3 pièces" },
	// { code: "FOUR_PIECE", name: "4 pièces" },
	{ code: "VILLA", name: "Villa" },
	// { code: "DUPLEX", name: "Duplex" },
	// { code: "TRIPLEX", name: "Triplex" },
];

export const SUB_HOTEL_DETAIL: ISubCategoryType[] = [
	{
		code: "CHAMBRE",
		name: "Chambre",
	},
	{ code: "SUITE", name: "Suite" },
];

export const SUB_APPARTEMENT_DETAIL: ISubCategoryType[] = [
	{ code: "TWO_PIECE", name: "2 pièces" },
	{ code: "THREE_PIECE", name: "3 pièces" },
	{ code: "FOUR_PIECE", name: "4 pièces" },
	{ code: "AUTRE", name: "Autre" },
];

export const convertPayloadToFormData = (
	data: ProductRequest,
	imageFiles?: File[],
	videoFiles?: File[]
): FormData => {
	const formData = new FormData(); // initialize form data
	for (const key in data) {
		if (
			data.hasOwnProperty(key) &&
			data[key as keyof ProductRequest] !== undefined &&
			data[key as keyof ProductRequest] !== null
		) {
			if (key === "images" && data.images) {
				if (imageFiles && Array.isArray(imageFiles)) {
					imageFiles.forEach((image) => {
						console.log("check images", image);
						formData.append("images[]", image);
					});
				}
			} else if (key === "videos" && data.videos) {
				if (videoFiles && Array.isArray(videoFiles)) {
					videoFiles.forEach((image) => {
						console.log("check videos", image);
						formData.append("videos[]", image);
					});
				}
			} else {
				formData.append(key, data[key as keyof ProductRequest] as any);
			}
		}
	}

	return formData;
};
