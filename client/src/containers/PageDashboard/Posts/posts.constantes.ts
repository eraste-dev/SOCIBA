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
		location_id:
			iProduct.location && iProduct.location.id ? String(iProduct.location.id) : undefined,
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
		code: "CHAMBRE_STANDARD",
		name: "Chambre Standard",
	},
	{
		code: "CHAMBRE_VIP",
		name: "Chambre VIP",
	},
	{ 
		code: "SUITE", 
		name: "Suite" 
	},
];

export const SUB_RESIDENCE_DETAIL: ISubCategoryType[] = [
	{
		code: "STUDIO",
		name: "Studio",
	},
	{ code: "TWO_PIECES", name: "2 pièces" },
	{ code: "THREE_PIECES", name: "3 pièces" },
	{ code: "VILLA", name: "Villa" },
];

export const SUB_APPARTEMENT_DETAIL: ISubCategoryType[] = [
	{ code: "TWO_PIECE", name: "2 pièces" },
	{ code: "THREE_PIECE", name: "3 pièces" },
	{ code: "FOUR_PIECE", name: "4 pièces" },
	{ code: "AUTRE", name: "Autre" },
];

export const SUB_MAGASIN_DETAIL: ISubCategoryType[] = [
  { code: "MAGASIN_STANDARD", name: "Magasin Standard" },
  { code: "GRAND_MAGASIN_ESPACE", name: "Grand Magasin espacé" },
  { code: "MAGASIN_MEZZANINE", name: "Magasin en mezzanine" },
  { code: "ENTREPOT", name: "Entrepôt" }
];

export const SUB_BUREAU_DETAIL: ISubCategoryType[] = [
  { code: "BUREAU_PRIVE", name: "Bureau privé" },
  { code: "OPEN_SPACE", name: "Open-space" },
  { code: "COWORKING", name: "Espace co-working" },
  { code: "BUREAU_MIXTE", name: "Bureau mixte" }
];

export const SUB_ESPACE_DETAIL: ISubCategoryType[] = [
  { code: "SALLE_REUNION", name: "Salle de réunion" },
  { code: "ESPACE_EVENEMENTIEL", name: "Espace évènementiel" }
];

export const convertPayloadToFormData = (
	data: ProductRequest,
	imageFiles?: File[],
	videoFiles?: File[]
): FormData => {
	console.log("=== DÉBUT CONVERT PAYLOAD TO FORMDATA ===");
	console.log("Data reçu:", data);
	console.log("ImageFiles reçu:", imageFiles);
	console.log("VideoFiles reçu:", videoFiles);
	
	const formData = new FormData(); // initialize form data
	for (const key in data) {
		if (
			data.hasOwnProperty(key) &&
			data[key as keyof ProductRequest] !== undefined &&
			data[key as keyof ProductRequest] !== null
		) {
			if (key === "images" && data.images) {
				console.log("Traitement des images...");
				console.log("Images dans data:", data.images);
				console.log("ImageFiles disponibles:", imageFiles);
				
				// Ajouter les nouvelles images (fichiers)
				if (imageFiles && Array.isArray(imageFiles)) {
					console.log("Ajout des nouvelles images (fichiers):", imageFiles.length);
					imageFiles.forEach((image) => {
						console.log("check images", image);
						formData.append("images[]", image);
					});
				} else {
					console.log("Pas de nouvelles images (fichiers)");
				}
				
				// Ajouter les images existantes (URLs) pour la mise à jour
				if (data.images && Array.isArray(data.images)) {
					console.log("Traitement des images existantes:", data.images);
					data.images.forEach((imageUrl) => {
						// Vérifier si c'est une URL existante (pas un blob URL)
						if (typeof imageUrl === 'string' && 
							!imageUrl.startsWith('blob:') && // Exclure les blob URLs
							(
								imageUrl.startsWith('/') || 
								imageUrl.includes('assets/') || 
								imageUrl.includes('http') ||
								imageUrl.includes('public/assets/') ||
								imageUrl.includes('core/public/assets/')
							)
						) {
							// Corriger le chemin si nécessaire
							let correctedUrl = imageUrl;
							if (imageUrl.includes('api.bajorah.com/assets/') && !imageUrl.includes('/public/')) {
								correctedUrl = imageUrl.replace('/assets/', '/core/public/assets/');
								console.log("URL corrigée:", correctedUrl);
							}
							
							console.log("check existing images", correctedUrl);
							formData.append("existing_images[]", correctedUrl);
						} else {
							console.log("Image ignorée (blob URL):", imageUrl);
						}
					});
				} else {
					console.log("Pas d'images existantes dans data.images");
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

	console.log("FormData final:");
	for (let [key, value] of formData.entries()) {
		console.log(key, value);
	}
	console.log("=== FIN CONVERT PAYLOAD TO FORMDATA ===");

	return formData;
};
