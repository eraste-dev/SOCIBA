import { useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Form/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Form/Label/Label";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import CategorySelector from "components/Form/CategorySelector";
import { useAppSelector } from "app/hooks";
import { fetchCategories, initProductState, postProduct, postProductWithProgress, deleteProductImage } from "app/axios/actions/api.action";
import SelectProductType from "components/Products/add/SelectProductTypes";
import EditorText from "components/Form/EditorText";
import { PeriodicityType, PRODUCT_REQUEST_EMPTY, ProductRequest } from "app/axios/api.type";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { useSnackbar } from "notistack";
import { IProduct, PropertyAction } from "app/reducer/products/product";
import ErrorMessage from "components/Form/ErrorMessage";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import ImageUploader from "components/Dashboard/Products/Image/ImageUploader";
import { ProductcategoryUUID } from "data/categories_uuid";
import Loading from "components/UI/Loading";
import { IPropertySubCategory } from "app/reducer/products/sub-propertiy-category";
import {
	AUTRE_KEY,
	BUREAU_KEY,
	CATEGORIES_SUB,
	DUPLEX_KEY,
	TERRAIN_KEY,
	TRIPLEX_KEY,
	VILLA_KEY,
} from "data/categories_sub";
import DetailBien from "./components/Forms/DetailBien";
import DetailBienTwo from "./components/Forms/DetailBienTwo";
import CurrencyInput from "react-currency-input-field";
import { buildLocationItem } from "utils/utils";
import {
	convertPayloadToFormData,
	IPRODUCT_AREA_UNIT_KEY,
	IProductType,
	ISubCategoryType,
	PERIODICITY_LIST,
	PERIODICITY_RESERVATION_LIST,
	PRODUCT_AREA_UNIT,
	PRODUCT_TYPE,
	SUB_BUREAU_DETAIL,
	SUB_ESPACE_DETAIL,
	SUB_HOTEL_DETAIL,
	SUB_MAGASIN_DETAIL,
	SUB_RESIDENCE_DETAIL,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "./posts.constantes";
import VideoUploader from "components/Dashboard/Products/Video/VideoUploader";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";

const DashboardSubmitPost = () => {
	const CURRENCY: string = "FCFA";

	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const history = useHistory();
	const queryParams = new URLSearchParams(location.search);

	const product = useSelector(PropertyAction.data)?.single;
	const productId = queryParams.get("id");
	const errorMessage = useSelector(PropertyAction.error);
	const errorArray = useSelector(PropertyAction.errors);
	const success = useSelector(PropertyAction.success);
	const loading = useSelector(PropertyAction.loading);

	const categories = useSelector(CategoryAction.data);
	const [_hasOtherKey, set_hasOtherKey] = useState("");
	const [resfreshLocaionSelected, setresfreshLocaionSelected] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [reshrehPrice, setreshrehPrice] = useState("");
	const [reshrehPriceSecond, setreshrehPriceSecond] = useState("");
	const sub_categories: IPropertySubCategory[] = CATEGORIES_SUB; //useSelector(CategorySubAction.data);
	const categoriesLoading = useAppSelector(CategoryAction.loading);

	const locations = useSelector(LocationAction.data);
	const locationLoading = useAppSelector(CategoryAction.loading);

	const [initialize, setInitialize] = useState(false);
	const [categorySelected, setCategorySelected] = useState(null as IPropertyCategory | null);
	const [defaultValue, setDefaultValue] = useState(null as ProductRequest | null);
	const [images, setImages] = useState<string[]>([]);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [videos, setVideos] = useState<string[]>([]);
	const [videoFiles, setVideoFiles] = useState<File[]>([]);
	const [tmpcatId, settmpcatId] = useState<number>(0);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);

	// États pour gérer le type d'annonce, les sous-types et le nombre de pièces
	const [typeAnnonce, setTypeAnnonce] = useState<'location' | 'vente' | ''>('');
	const [roomCount, setRoomCount] = useState<number>(1);
	const [selectedCategory, setSelectedCategory] = useState<{id: string, name: string} | null>(null);
	const [selectedChildProperty, setSelectedChildProperty] = useState('');
	const [isBureauPriveSelected, setIsBureauPriveSelected] = useState(false);
	const [isOpenSpaceSelected, setIsOpenSpaceSelected] = useState(false);
	const [isCoworkingSelected, setIsCoworkingSelected] = useState(false);
	const [isBureauMixteSelected, setIsBureauMixteSelected] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<ProductRequest>();

	// Synchroniser les valeurs du formulaire avec les états typeAnnonce et selectedChildProperty
	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'category_id') {
				// Réinitialiser les sélections lorsque la catégorie change
				setTypeAnnonce('');
				setSelectedChildProperty('');
				setValue('home_type', '');
				setValue('home_type_more', '');
			} else if (name === 'home_type') {
				setTypeAnnonce(value.home_type as 'location' | 'vente' | '');
			} else if (name === 'home_type_more') {
				setSelectedChildProperty(value.home_type_more || '');
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	const onSubmit: SubmitHandler<ProductRequest> = (data) => {
		console.log("=== DÉBUT ONSUBMIT ===");
		console.log("Product ID:", productId);
		console.log("Images state:", images);
		console.log("ImageFiles state:", imageFiles);
		
		setSubmitting(true);
		setIsUploading(true);
		setUploadProgress(0);
		console.log("SubmitHandler imageFiles", imageFiles);
		let formData = new FormData(); // initialize form data
		const defaultType: string =
			data.home_type ??
			(SUB_CATEGORIES().length > 0 ? Object.values(SUB_CATEGORIES())[0].code : "");

		const priceString: string = data?.price ? data?.price.toString().replace(/\s/g, "") : "0";
		const priceSecondString: string | null = data.price_second
			? data.price_second.toString().replace(/\s/g, "")
			: null;

		// ! FIX DEFAULT VALUE
		// Inclure les images existantes dans data.images pour la mise à jour
		if (productId && images.length > 0) {
			// Filtrer les images existantes (exclure les blob URLs)
			const existingImages = images.filter(img => 
				typeof img === 'string' && 
				!img.startsWith('blob:') && // Exclure les blob URLs
				(
					img.startsWith('/') || 
					img.includes('assets/') || 
					img.includes('http') ||
					img.includes('public/assets/') ||
					img.includes('core/public/assets/')
				)
			).map(img => {
				// Corriger le chemin si nécessaire
				if (typeof img === 'string' && img.includes('api.bajorah.com/assets/') && !img.includes('/public/')) {
					// Remplacer /assets/ par /core/public/assets/ dans l'URL
					return img.replace('/assets/', '/core/public/assets/');
				}
				return img;
			});
			
			data.images = existingImages;
			console.log("Images existantes à conserver:", existingImages);
			console.log("Nombre d'images existantes:", existingImages.length);
		} else {
			data.images = images;
			console.log("Pas d'images existantes ou pas de productId");
		}
		data.videos = videos;
		data.price = parseInt(priceString);
		data.price_second = priceSecondString ? parseInt(priceSecondString) : null;
		data.type = data.type ?? PRODUCT_TYPE[0];
		data.home_type = defaultType;
		data.home_type_more = data.home_type_more;
		data.jacuzzi = data.jacuzzi ? 1 : 0;
		data.bath = data.bath ? 1 : 0;
		data.pool = data.pool ? 1 : 0;
		data.WiFi = data.WiFi ? 1 : 0;
		data.acd = data.acd ? 1 : 0;
		data.site_approved = data.site_approved ? 1 : 0;
		data.air_conditioning = data.air_conditioning ? 1 : 0;
		data.bathrooms = data.bathrooms ?? 0;
		data.kitchens = data.kitchens ?? 0;
		data.area = data.area ?? 0;
		data.area_unit = getAreaUnitValue(data);
		data.count_monthly = data.count_monthly ?? 0;
		// data.security = data.security;
		data.periodicity = getPeriodicityFinalValue(data);

		// Si c'est une annonce de type Maison, on ajoute les champs spécifiques
		if (getValues("category_id") === 1) {
			data.home_type = typeAnnonce;
			data.home_type_more = selectedChildProperty;
		}

		// set category_id
		if (!data.category_id) {
			if (tmpcatId) {
				data.category_id = tmpcatId;
			} else if (
				GET_CATEGORIES() &&
				GET_CATEGORIES().length > 1 &&
				GET_CATEGORIES()[0].children.length > 0
			) {
				data.category_id = GET_CATEGORIES()[1].children[0].id;
			}
		}

		// set location value
		if (!hasUnlistedLocation()) {
			data.location_id = getValues("location_id");
			if (defaultValue) {
			} else if (locations && locations.length > 0) {
				// data.location_id = locations[0].id.toString();
			}
		} else {
			data.location_id = undefined;
			data.unlisted_city = data.unlisted_city;
		}

		console.log("Data avant convertPayloadToFormData:", data);
		console.log("ImageFiles avant convertPayloadToFormData:", imageFiles);

		// Convert data to FormData
		formData = convertPayloadToFormData(data, imageFiles, videoFiles);

		console.log("FormData après convertPayloadToFormData:");
		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}

		if (product && productId) {
			formData.append("id", productId);
			console.log("ID ajouté au FormData:", productId);
		}

		// Callback pour gérer la progression de l'upload
		const handleUploadProgress = (progressEvent: any) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			setUploadProgress(percentCompleted);
		};

		console.log("=== FIN ONSUBMIT - DISPATCH ===");
		dispatch(postProductWithProgress(formData, handleUploadProgress));
		// setSubmitting(false);
	};

	const getAreaUnitValue = (data: ProductRequest): IPRODUCT_AREA_UNIT_KEY => {
		let areaUnit: IPRODUCT_AREA_UNIT_KEY = data.area_unit ?? "M";

		if (areaUnit && areaUnit.toString() == "null") {
			areaUnit = PRODUCT_AREA_UNIT[0].id;
		}

		return areaUnit;
	};

	const getPeriodicityFinalValue = (data: ProductRequest): PeriodicityType | undefined => {
		let p: PeriodicityType | undefined = "MONTH";

		if (data.type === PRODUCT_TYPE[TYPE_LOCATION_KEY]) {
			p = getValues("periodicity") ?? (GET_PERIODICITY()[0].id as PeriodicityType);
		} else if (data.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY]) {
			p = undefined;
		}

		return p;
	};

	const isCategorySelected = (category: IPropertyCategory) => {
		const checked = !!(defaultValue && category.id === defaultValue.category_id);
		return checked;
	};

	  // Fonction pour vérifier si le type sélectionné nécessite un nombre de pièces
  const needsRoomCount = (type: string): boolean => {
    return ['appartement', 'villa', 'duplex', 'triplex'].includes(type);
  };

  // Fonction pour obtenir le nom de la catégorie à partir de son ID
  const getCategoryName = (categoryId: number | undefined): string => {
    if (!categoryId) return 'bien';
    
    // Parcourir toutes les catégories et sous-catégories
    for (const category of categories || []) {
      // Vérifier la catégorie principale
      if (category.id === categoryId) {
        return category.name.toLowerCase();
      }
      
      // Vérifier les sous-catégories
      if (category.children) {
        const subCategory = category.children.find(sub => sub.id === categoryId);
        if (subCategory) {
          return subCategory.name.toLowerCase();
        }
      }
    }
    
    return 'bien'; // Valeur par défaut
  };

  const getTypeDeteailLabel = (): string => {
		let label: string = "";
		const currentId = getValues("category_id");
		const cat: IPropertyCategory = GET_CATEGORIES()?.find(
			(c) => c.id === currentId
		) as IPropertyCategory;

		if (cat) {
			const currentName = cat.name;
			// Vérifier si le nom commence par une voyelle
			const startsWithVowel = /^[aeiou]/i.test(currentName);

			// Adapter le label en fonction de la première lettre du nom
			if (startsWithVowel) {
				label = `Type d'${currentName.toLowerCase()}`;
			} else {
				label = `Type de ${currentName.toLowerCase()}`;
			}
		}
		return label;
	};

	const hasVenteTerrain = () => {
		const type = currentType();
		const cat = currentCategory();
		return (
			type === "BIEN EN VENTE" &&
			cat?.uuid === ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN
		);
	};

	const isLocationSelected = (location: ILocation) => {
		const checked = !!(defaultValue && location.id.toString() === defaultValue.location_id);
		return checked;
	};

	const GET_PERIODICITY = () => {
		const type = getValues("type") ?? PRODUCT_TYPE[0];
		switch (type) {
			case PRODUCT_TYPE[TYPE_LOCATION_KEY]:
				return PERIODICITY_LIST;

			case PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY]:
				return PERIODICITY_LIST;

			case PRODUCT_TYPE[TYPE_RESERVATION_KEY]:
				return PERIODICITY_RESERVATION_LIST;

			default:
				return PERIODICITY_LIST;
		}
	};

	const GET_CATEGORIES = () => {
		const data: IPropertyCategory[] = [];
		const type = (getValues("type") as IProductType) ?? (PRODUCT_TYPE[0] as IProductType);

		try {
			if (categories && categories.length > 0) {
				categories.forEach((c) => {
					if (c.type.includes(type)) {
						data.push(c);
					}
				});

				// setreshrehPrice(reshrehPrice)
			}
		} catch (error) {
			console.error(error);
		}

		return data;
	};

	const _findCat = (id?: number) => {
		return GET_CATEGORIES().filter((c) => c.id === id);
	};

	const SUB_CATEGORIES = (): ISubCategoryType[] => {
		let data: ISubCategoryType[] = [];

		const _cat_id: number | undefined =
			getValues("category_id") ?? (categories && categories[0] && categories[0].id);

		const cat: IPropertyCategory | undefined =
			_findCat(_cat_id) && _findCat(_cat_id).length > 0 ? _findCat(_cat_id)[0] : undefined;

		try {
			// Gestion spéciale pour la catégorie Résidence
			if (cat?.uuid === ProductcategoryUUID.RESERVATION.children.RESIDENCE) {
				return SUB_RESIDENCE_DETAIL;
			}

			// Gestion spéciale pour la catégorie Hôtel
			if (cat?.uuid === ProductcategoryUUID.RESERVATION.children.HOTEL) {
				return SUB_HOTEL_DETAIL;
			}

			// Gestion spéciale pour la catégorie Magasin
			if (cat?.uuid === ProductcategoryUUID.MAGASIN.key) {
				return SUB_MAGASIN_DETAIL;
			}

			// Si c'est une location, on filtre les types de biens
			if (currentType() === "LOCATION") {
				const locationTypes = ["MAISON", "MAGASIN", "BUREAU", "ESPACE"];
				sub_categories.forEach((c) => {
					if (c.allow.includes(cat?.name ?? "") && locationTypes.includes(c.name.toUpperCase())) {
						data.push({
							code: c.uuid,
							name: c.name,
						});
					}
				});
				// Si aucune catégorie n'est encore sélectionnée, on affiche tous les types de location
				if (!cat?.name) {
					data = [];
					sub_categories.forEach((c) => {
						if (locationTypes.includes(c.name.toUpperCase())) {
							data.push({
								code: c.uuid,
								name: c.name,
							});
						}
					});
				}
			} 
			// Logique existante pour les autres catégories
			else if (currentType() === "RESERVATION") {
				sub_categories.forEach((c) => {
					if (c.allow.includes(cat?.name ?? "")) {
						data.push({
							code: c.uuid,
							name: c.name,
						});
					}
				});
			}

			// ? for bien en location
			if (cat && cat.name && currentType() === "BIEN EN VENTE") {
				sub_categories.forEach((c) => {
					if (c.allow.includes(cat?.name) && c.allow_type !== "LOCATION") {
						data.push({
							code: c.uuid,
							name: c.name,
						});
					}
				});
			}
		} catch (error) {
			console.error(">>> error in SUB_CATEGORIES", error);
		}

		return data;
	};

	const showNumberOfRooms = (): boolean => {
		const homeType = _hasOtherKey ?? getValues("home_type");
		const otherType = _hasOtherKey ?? getValues("category_id");
		const cat = GET_CATEGORIES()?.find((c) => c.id === parseInt(otherType));
		const conditionOne: boolean = [
			AUTRE_KEY,
			VILLA_KEY,
			DUPLEX_KEY,
			TRIPLEX_KEY,
			TERRAIN_KEY,
			BUREAU_KEY,
		].includes(homeType);

		const conditionTwo: boolean =
			(cat && cat.uuid == ProductcategoryUUID.MAISON.children.BUREAU) ?? false;

		const conditionThree =
			getVenteCountLabel() != "Nombre de pièces" &&
			homeType === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY];

		console.log("hasOtherKey", conditionOne, conditionTwo);

		return (conditionOne && SUB_CATEGORIES().length > 0) || conditionTwo; // && !conditionThree
	};

	const canShowOtherInput = (): boolean => {
		const cat: IPropertyCategory | null =
			GET_CATEGORIES()?.find((c) => c.id === getValues("category_id")) ?? null;
		console.log("canShowOtherInput", SUB_CATEGORIES());
		const typeCondition: boolean = currentType() === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY];

		// currentType() !== "RESERVATION"
		return SUB_CATEGORIES() && SUB_CATEGORIES().length === 0;
	};

	const currentType = (): IProductType => {
		const _type = getValues("type") ?? PRODUCT_TYPE[0];
		return _type as IProductType;
	};

	const currentLocation = (): ILocation | undefined => {
		const location_id: string = getValues("location_id") ?? resfreshLocaionSelected;
		console.log("location_id :::: ", location_id);

		let location: ILocation | undefined;
		if (location_id && location_id != "") {
			location = get_location().find((l) => l.id.toString() === location_id);
		}
		return location;
	};

	const currentCategory = (): IPropertyCategory | null => {
		const _cat_id =
			getValues("category_id") ?? (categories && categories[0] && categories[0].id);
		return _findCat(_cat_id) && _findCat(_cat_id).length > 0 ? _findCat(_cat_id)[0] : null;
	};

	const getVenteCountLabel = () => {
		let label: "Nombre de terrain" | "Nombre de pièces" = "Nombre de terrain";

		const cat: IPropertyCategory | null =
			categories?.find((c) => c.id === getValues("category_id")) ?? null;
		if (cat && cat.uuid === ProductcategoryUUID.MAISON.key) {
			label = "Nombre de pièces";
		}

		return label;
	};

	const hasAutreImmo = (): boolean => {
		let output: boolean = false;

		if (
			currentType() === "BIEN EN VENTE" &&
			currentCategory()?.uuid === ProductcategoryUUID.BIEN_EN_VENTE.children.AUTRES
		) {
			output = true;
		}

		return output;
	};

	const hasResidence = (): boolean => {
		let output: boolean = false;

		GET_CATEGORIES().forEach((c) => {
			c.children.forEach((child) => {
				if (
					child.id === getValues("category_id") &&
					child.uuid === ProductcategoryUUID.RESERVATION.children.RESIDENCE
				) {
					output = true;
				}
			});
		});

		return output;
	};

	const allowImage = (): boolean => {
		let output: boolean = false;

		GET_CATEGORIES().forEach((c) => {
			c.children.forEach((child) => {
				if (child.id === getValues("category_id") && child.can_upload_image) {
					// output = true;
				}
			});
		});

		return true; // output
	};

	const useFormSetDefault = (value: ProductRequest) => {
		setValue("id", value.id);
		setValue("type", product?.type ?? PRODUCT_TYPE[0]);
		setValue("category_id", value.category_id);
		setValue("home_type", value.home_type);
		setValue("home_type_more", value.home_type_more);

		setValue("location_id", value.location_id);
		setValue("unlisted_city", value.unlisted_city);
		setValue("location_description", value.location_description);

		setValue("title", value.title);
		setValue("excerpt", value.excerpt);
		setValue("content", value.content);

		setValue("price", value.price);
		setValue("price_second", value.price_second);
		setValue("deposit_price", value.deposit_price);
		setValue("periodicity", value.periodicity);

		setValue("jacuzzi", value.jacuzzi);
		setValue("acd", value.acd);
		setValue("site_approved", value.site_approved);
		setValue("bath", value.bath);
		setValue("air_conditioning", value.air_conditioning);
		setValue("kitchens", value.kitchens);
		setValue("pool", value.pool);
		setValue("WiFi", value.WiFi);
		setValue("bathrooms", value.bathrooms);

		setValue("area", value.area);
		setValue("area_unit", value.area_unit);
		setValue("count_monthly", value.count_monthly);

		setValue("security", value.security);
		setValue("accessibility", value.accessibility);
		setValue("purchase_power", value.purchase_power);
		// setValue("images", value.images);
		// setPreviewUrls(value.images ? value.images.map((item: any) => URL.createObjectURL(item)) : []);
	};

	const initializeForm = (product: IProduct | undefined) => {
		if (productId && product) {
			const value: ProductRequest = {
				id: product.id,
				title: product.title,
				category_id: product.category.id,
				excerpt: product.excerpt,
				content: product.content,
				type: product.type ?? PRODUCT_TYPE[0],
				location_id: product.location.id.toString(),
				unlisted_city: product && product.unlisted_city ? product.unlisted_city.name : "",
				location_description: product.location_description,
				price: product.price,
				price_second: product.price_second,
				deposit_price: product.deposit_price,
				area: product.area,
				area_unit: product.area_unit,
				bathrooms: product.bathrooms,
				bedrooms: product.bedrooms,
				garages: product.garages,
				kitchens: product.kitchens,
				rooms: product.rooms,
				periodicity: product.periodicity as PeriodicityType,
				count_advance: product.count_advance,
				count_monthly: product.count_monthly,
				bath: product.bath ? 1 : 0,
				jacuzzi: product.jacuzzi ? 1 : 0,
				pool: product.pool ? 1 : 0,
				WiFi: product.WiFi ? 1 : 0,
				air_conditioning: product.air_conditioning ? 1 : 0,
				acd: product.acd ? 1 : 0,
				site_approved: product.site_approved ? 1 : 0,
				home_type: product.home_type,
				accessibility: product.accessibility,
				purchase_power: product.purchase_power,
				security: product.security,
				area_count: product.area_count,
				home_type_more: product.home_type_more,
			};
			if (value.price) {
				setreshrehPrice(value.price?.toString());
			}
			if (value.price_second) {
				setreshrehPrice(value.price_second?.toString());
			}
			setDefaultValue(value);
			console.log("product.price_second", product.price_second);
			product && product.price_second && setreshrehPriceSecond(String(product.price_second) ?? "");
			setImages(product.images.map((image) => image.image));
			setImageFiles([]);
			setVideos(product.videos.map((video) => video.src));
			setVideoFiles([]);
			useFormSetDefault(value);

			if (categories && categories.length > 0) {
				setCategorySelected(
					categories?.filter((_cat) => _cat.id === product.category?.id)[0] || null
				);
			}
		} else {
			setDefaultValue(PRODUCT_REQUEST_EMPTY);
			useFormSetDefault(PRODUCT_REQUEST_EMPTY);
		}
	};

	const showCaution = (): boolean => {
		let condition: boolean =
			getValues("type") === PRODUCT_TYPE[0] || product?.type === "LOCATION";
		if (!getValues("type")) {
			condition = true;
		}

		return condition;
	};

	const getTypeValue = (): IProductType => {
		const type = getValues("type") ?? PRODUCT_TYPE[0];
		return type as IProductType;
	};

	const getPriceLabel = (): string => {
		const type: IProductType = getTypeValue();

		switch (type) {
			case "RESERVATION":
				return "Prix de réservation";

			case "BIEN EN VENTE":
				return "Prix de vente";

			default:
				return "Prix de location";
		}
	};

	const canShowDetailCategory = (): boolean => {
		const condition = getValues("category_id") != undefined && !hasVenteTerrain();
		return condition;
	};

	const get_location = (): ILocation[] => {
		let data: ILocation[] = [];
		if (locations && locations.length > 0) {
			for (const l of locations) {
				data.push(l);
			}
			data.push(buildLocationItem("Autres", true));
		}
		return data;
	};

	const hasUnlistedLocation = (): boolean => {
		let output: boolean = false;
		console.table(currentLocation());

		if (currentLocation() && currentLocation()?.unlisted) {
			output = true;
		}

		return output;
	};

	// Fonction pour uploader les images immédiatement après sélection
	const handleImmediateImageUpload = async (files: File[], onProgress: (progress: number) => void) => {
		try {
			// Créer les URLs locales pour l'aperçu immédiat
			const fileArray = files.map((file) => URL.createObjectURL(file));
			const newImages = [...images, ...fileArray].slice(0, 15);
			
			// Mettre à jour les états locaux
			setImageFiles([...imageFiles, ...files]);
			setImages(newImages);
			
			// Simuler un upload réaliste avec progression fluide
			let progress = 0;
			const totalFiles = files.length;
			const progressIncrement = 100 / totalFiles;
			
			for (let i = 0; i < totalFiles; i++) {
				const file = files[i];
				const fileSize = file.size;
				const chunkSize = Math.max(fileSize / 20, 1024); // Simuler des chunks
				
				// Simuler l'upload du fichier par chunks
				for (let uploaded = 0; uploaded < fileSize; uploaded += chunkSize) {
					const fileProgress = Math.min((uploaded / fileSize) * progressIncrement, progressIncrement);
					const totalProgress = Math.min(progress + fileProgress, 100);
					onProgress(totalProgress);
					
					// Délai réaliste basé sur la taille du chunk
					const delay = Math.min(chunkSize / 10000, 100); // 100ms max par chunk
					await new Promise(resolve => setTimeout(resolve, delay));
				}
				
				progress += progressIncrement;
				onProgress(Math.min(progress, 100));
			}
			
			// Finaliser à 100%
			onProgress(100);
			await new Promise(resolve => setTimeout(resolve, 200)); // Petit délai final
			
			// Notification de succès
			const fileCount = files.length;
			const message = fileCount === 1 ? 
				"Image ajoutée avec succès !" : 
				`${fileCount} images ajoutées avec succès !`;
			snackbar.enqueueSnackbar(message, { 
				variant: "success", 
				autoHideDuration: 2000 
			});
			
		} catch (error) {
			console.error("Erreur lors de l'upload immédiat:", error);
			snackbar.enqueueSnackbar("Erreur lors de l'ajout des images", { 
				variant: "error", 
				autoHideDuration: 3000 
			});
			throw error;
		}
	};

	// Fonction pour supprimer définitivement une image
	const handleImageDelete = async (index: number, imageUrl: string): Promise<boolean> => {
		console.log("=== HANDLE IMAGE DELETE DÉBUT ===");
		console.log("Index:", index);
		console.log("Image URL:", imageUrl);
		console.log("Product:", product);
		console.log("Product ID:", productId);
		
		try {
			// Vérifier si l'image existe déjà sur le serveur (par exemple si elle provient d'un produit existant)
			const isServerImage = imageUrl.startsWith('/') || imageUrl.includes('assets/');
			console.log("Is server image:", isServerImage);
			
			if (isServerImage && productId) {
				// Si c'est une image du serveur, faire un appel API pour la supprimer
				console.log("Suppression d'image serveur:", imageUrl);
				console.log("Property ID:", productId);
				console.log("Image URL:", imageUrl);
				
				try {
					console.log("Avant dispatch deleteProductImage");
					console.log("Paramètres:", { property_id: parseInt(productId), image_url: imageUrl });
					
					const result = await dispatch(deleteProductImage({
						property_id: parseInt(productId),
						image_url: imageUrl
					}));
					
					console.log("Après dispatch deleteProductImage");
					console.log("Résultat de la suppression:", result);
					
					snackbar.enqueueSnackbar("Image supprimée du serveur", { 
						variant: "success", 
						autoHideDuration: 2000 
					});
				} catch (apiError: any) {
					console.error("Erreur API lors de la suppression:", apiError);
					console.error("Type d'erreur:", typeof apiError);
					console.error("Message d'erreur:", apiError?.message || "Erreur inconnue");
					snackbar.enqueueSnackbar("Erreur lors de la suppression de l'image du serveur", { 
						variant: "error", 
						autoHideDuration: 3000 
					});
					return false;
				}
			} else {
				// Si c'est une image locale (blob URL), juste la supprimer localement
				console.log("Suppression d'image locale:", imageUrl);
				snackbar.enqueueSnackbar("Image supprimée", { 
					variant: "success", 
					autoHideDuration: 2000 
				});
			}
			
			return true; // Succès
			
		} catch (error: any) {
			console.error("Erreur lors de la suppression définitive:", error);
			console.error("Type d'erreur:", typeof error);
			console.error("Message d'erreur:", error?.message || "Erreur inconnue");
			snackbar.enqueueSnackbar("Erreur lors de la suppression de l'image", { 
				variant: "error", 
				autoHideDuration: 3000 
			});
			return false; // Échec
		}
		
		console.log("=== HANDLE IMAGE DELETE FIN ===");
	};

	// Fonction pour supprimer définitivement une vidéo
	const handleVideoDelete = async (index: number, videoUrl: string): Promise<boolean> => {
		try {
			// Vérifier si la vidéo existe déjà sur le serveur
			const isServerVideo = videoUrl.startsWith('/') || videoUrl.includes('assets/');
			
			if (isServerVideo && product && productId) {
				// Si c'est une vidéo du serveur, faire un appel API pour la supprimer
				// TODO: Créer une API endpoint pour supprimer une vidéo spécifique
				console.log("Suppression de vidéo serveur:", videoUrl);
				
				// Pour l'instant, on simule la suppression serveur
				// En production, vous devriez avoir un endpoint comme :
				// dispatch(deleteProductVideo({productId, videoUrl}));
				
				snackbar.enqueueSnackbar("Vidéo supprimée du serveur", { 
					variant: "success", 
					autoHideDuration: 2000 
				});
			} else {
				// Si c'est une vidéo locale (blob URL), juste la supprimer localement
				console.log("Suppression de vidéo locale:", videoUrl);
				snackbar.enqueueSnackbar("Vidéo supprimée", { 
					variant: "success", 
					autoHideDuration: 2000 
				});
			}
			
			return true; // Succès
			
		} catch (error) {
			console.error("Erreur lors de la suppression définitive de vidéo:", error);
			snackbar.enqueueSnackbar("Erreur lors de la suppression de la vidéo", { 
				variant: "error", 
				autoHideDuration: 3000 
			});
			return false; // Échec
		}
	};

	// FETCH_CATEGORIES
	useEffect(() => {
		if (!categories && !categoriesLoading) {
			dispatch(fetchCategories());
		}
	}, [dispatch, fetchCategories, categories, categoriesLoading]);

	// FETCH_LOCATIONS
	useEffect(() => {
		if (!locations && !locationLoading) {
			dispatch(fetchLocation());
		}
	}, [dispatch, fetchLocation, locations, locationLoading]);

	// SUBMIT_ERROR
	useEffect(() => {
		if (errorMessage) {
			snackbar.enqueueSnackbar(errorMessage, { variant: "error", autoHideDuration: 1000 });
		}
	}, [errorMessage, snackbar]);

	// fetch product if not exist and productId is not null
	useEffect(() => {
		if (!loading && !categoriesLoading && !locationLoading && categories && locations) {
			if (productId != null && product == undefined) {
				console.warn(">>> FETCH_PRODUCT", productId);
				// dispatch(fetchSingleProperties({ id: productId }));
			}
		}
	}, [
		// dispatch,
		loading,
		categoriesLoading,
		locationLoading,
		categories,
		locations,
		productId,
		product,
	]);

	useEffect(() => {
		dispatch(initProductState());
		if (product && productId != null && defaultValue == null && !initialize) {
			initializeForm(product);
		} else if (!product && !productId) {
			// initializeForm(undefined);
		}
		setInitialize(true);

		console.log(">>> SET_DEFAULT", initialize);
		// dispatch(initProductState());
	}, [
		dispatch,
		initProductState,
		initializeForm,
		setInitialize,
		product,
		productId,
		defaultValue,
		initialize,
	]);

	// SUBMIT_SUCCESS
	useEffect(() => {
		if (success && !loading) {
			snackbar.enqueueSnackbar("Annonce publiee avec succes", {
				variant: "success",
				autoHideDuration: 1000,
			});
			setSubmitting(false);
			setIsUploading(false);
			setUploadProgress(0);
			history.push(route("dashboard"));
		}
	}, [snackbar, success, loading, history]);

	// UPLOAD_ERROR - réinitialiser l'état d'upload en cas d'erreur
	useEffect(() => {
		if (errorMessage && isUploading) {
			setIsUploading(false);
			setUploadProgress(0);
		}
	}, [errorMessage, isUploading]);

	if ((initialize === false || defaultValue == null) && productId) {
		// return history.push(route("posts"));
		// return (
		// 	<div className="flex justify-center justify-self-center" style={{ height: "100vh" }}>
		// 		<Loading />
		// 	</div>
		// );
	}

	if (loading || categoriesLoading || locationLoading) {
		return (
			<div className="flex justify-center justify-self-center" style={{ height: "100vh" }}>
				<Loading />
			</div>
		);
	}

	return (
		<div className="md:p-6">
			<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-5">
				{isSubmitting ? "En cours..." : "Rédigez votre annonce"}
			</h3>

			{submitting && (
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="flex justify-center items-center h-[100vh] w-[80vw] bg-gray-100 dark:bg-neutral-500">
						<LoadingSpinner />
					</div>
				</div>
			)}

			<div className={submitting ? `opacity-20 cursor-none` : ``}>
				<form className="" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
					<div
						className="relative overflow-auto p-2"
						style={{ height: "calc(100vh - 230px)" }}
					>
						{/* GRID CONTAINER */}
						<div className="grid md:grid-cols-5 gap-6">
							{/* #1 */}
							<div className="col-span-6 lg:col-span-3">
								{/* SECTION 01 */}
								<div className="bg-white dark:bg-neutral-900">
									<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mb-5">
										<div className="grid md:grid-cols-2 gap-6 mb-5">
											{/* TYPE */}
											<label className="block col-span-4">
												<Label>
													Type d'offre{" "}
													<span className="text-red-500">*</span>
												</Label>

												<SelectProductType
													options={PRODUCT_TYPE}
													onChangeOption={(value) => {
														setValue("type", value);
														if (GET_CATEGORIES()[0].id) {
															setValue(
																"category_id",
																GET_CATEGORIES()[0].id
															);
															settmpcatId(GET_CATEGORIES()[0].id);
														}
														false &&
															console.log({
																category_id:
																	getValues("category_id"),
																type: getValues("type"),
																hasResidence: hasResidence(),
															});
													}}
													selected={watch("type") ?? PRODUCT_TYPE[0]}
												/>
												<ErrorMessage
													errors={errorArray}
													error="type"
													customMessage="Veuillez choisir un type d'offre"
												/>
											</label>

											{/* CATEGORY */}
											<label className="block col-span-4">
												<div>
													<Label>
														Type de bien{" "}
														<span className="text-red-500">*</span>
													</Label>
													<CategorySelector 
														offerType={currentType()}
														onCategoryChange={(category: { id: string; name: string; slug?: string }) => {
															settmpcatId(parseInt(category.id));
															setValue("category_id", parseInt(category.id));
															set_hasOtherKey(category.id);
															setSelectedCategory({ id: category.id, name: category.name });
															setTypeAnnonce(''); // Réinitialiser le type d'annonce
															setSelectedChildProperty(''); // Réinitialiser la sélection de type
															console.log("Catégorie sélectionnée:", category);
														}}
														selectedCategoryId={getValues("category_id")?.toString()}
														className="mt-2"
													/>
													<ErrorMessage
														errors={errorArray}
														error="category_id"
														customMessage="Veuillez choisir un type de bien"
													/>
												</div>
											</label>

											{/* Type d'annonce uniquement pour Maison */}
											{selectedCategory?.name.toLowerCase() === 'maison' && (
												<div className="block col-span-4">
													<Label>Type d'annonce</Label>
													<div className="mt-2 grid grid-cols-2 gap-4">
														{currentType() === 'LOCATION' ? (
															<div className="flex items-center p-3 border rounded-lg bg-gray-50 dark:bg-neutral-800">
																<input
																	type="radio"
																	className="form-radio text-primary-600"
																	name="annonceType"
																	value="location"
																	checked={true}
																	disabled
																/>
																<span className="ml-2 font-medium">À louer</span>
															</div>
														) : (
															<>
																<label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
																	<input
																		type="radio"
																		className="form-radio text-primary-600"
																		name="annonceType"
																		value="location"
																		checked={typeAnnonce === 'location'}
																		onChange={() => {
																			setTypeAnnonce('location');
																			setValue('home_type', 'location');
																			setSelectedChildProperty('');
																		}}
																	/>
																	<span className="ml-2 font-medium">À louer</span>
																</label>
																<label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
																	<input
																		type="radio"
																		className="form-radio text-primary-600"
																		name="annonceType"
																		value="vente"
																		checked={typeAnnonce === 'vente'}
																		onChange={() => {
																			setTypeAnnonce('vente');
																			setValue('home_type', 'vente');
																			setSelectedChildProperty('');
																		}}
																	/>
																	<span className="ml-2 font-medium">À vendre</span>
																</label>
															</>
														)}
													</div>
												</div>
											)}

                                            {/* Section pour le type de bien - Résidence (sans sélection préalable de location/vente) */}
                                            {selectedCategory?.name.toLowerCase() === 'résidence' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type de résidence ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {SUB_RESIDENCE_DETAIL.map((item) => {
                                                            const typeName = item.name;
                                                            const typeValue = item.code.toLowerCase();
                                                            return (
                                                                <label 
                                                                    key={`residence-${typeValue}`} 
                                                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-primary-600"
                                                                        name="propertyType"
                                                                        value={typeValue}
                                                                        checked={selectedChildProperty === typeValue}
                                                                        onChange={() => {
                                                                            setSelectedChildProperty(typeValue);
                                                                            setValue('home_type_more', typeValue);
                                                                            // Réinitialiser le nombre de pièces si on change de type
                                                                            if (typeValue !== 'villa') {
                                                                                setRoomCount(1);
                                                                                setValue('rooms', 1);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="ml-2 font-medium">{typeName}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    {/* Boutons Nombre de pièces pour Villa */}
                                                    {selectedChildProperty === 'villa' && (
                                                        <div className="mt-4">
                                                            <Label>Nombre de pièces</Label>
                                                            <div className="mt-2 grid grid-cols-4 gap-2">
                                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                                    <button
                                                                        key={`room-${num}`}
                                                                        type="button"
                                                                        className={`px-3 py-2 border rounded-lg text-center transition-colors ${
                                                                            num === roomCount
                                                                                ? 'bg-primary-500 text-white border-primary-500'
                                                                                : 'bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 border-gray-300 dark:border-neutral-700'
                                                                        }`}
                                                                        onClick={() => {
                                                                            setRoomCount(num);
                                                                            setValue('rooms', num);
                                                                        }}
                                                                    >
                                                                        {num}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Section pour le type de bien - Hôtel (sans sélection préalable de location/vente) */}
                                            {selectedCategory?.name.toLowerCase() === 'hôtel' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type d'hôtel ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {SUB_HOTEL_DETAIL.map((item) => {
                                                            const typeName = item.name;
                                                            const typeValue = item.code.toLowerCase();
                                                            return (
                                                                <label 
                                                                    key={`hotel-${typeValue}`} 
                                                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-primary-600"
                                                                        name="propertyType"
                                                                        value={typeValue}
                                                                        checked={selectedChildProperty === typeValue}
                                                                        onChange={() => {
                                                                            setSelectedChildProperty(typeValue);
                                                                            setValue('home_type_more', typeValue);
                                                                            // Réinitialiser le nombre de pièces si on change de type
                                                                            if (typeValue !== 'villa') {
                                                                                setRoomCount(1);
                                                                                setValue('rooms', 1);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="ml-2 font-medium">{typeName}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Section pour le type de bien - Magasin (sans sélection préalable de location/vente) */}
                                            {selectedCategory?.name.toLowerCase() === 'magasin' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type de magasin ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {SUB_MAGASIN_DETAIL.map((item) => {
                                                            const typeName = item.name;
                                                            const typeValue = item.code.toLowerCase();
                                                            return (
                                                                <label 
                                                                    key={`magasin-${typeValue}`} 
                                                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-primary-600"
                                                                        name="propertyType"
                                                                        value={typeValue}
                                                                        checked={selectedChildProperty === typeValue}
                                                                        onChange={() => {
                                                                            setSelectedChildProperty(typeValue);
                                                                            setValue('home_type_more', typeValue);
                                                                            // Réinitialiser le nombre de pièces si on change de type
                                                                            if (typeValue !== 'villa') {
                                                                                setRoomCount(1);
                                                                                setValue('rooms', 1);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="ml-2 font-medium">{typeName}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Section pour le type de bien - Espace (sans sélection préalable de location/vente) */}
                                            {selectedCategory?.name.toLowerCase() === 'espace' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type d'espace ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {SUB_ESPACE_DETAIL.map((item) => {
                                                            const typeName = item.name;
                                                            const typeValue = item.code.toLowerCase();
                                                            return (
                                                                <label 
                                                                    key={`espace-${typeValue}`} 
                                                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-primary-600"
                                                                        name="propertyType"
                                                                        value={typeValue}
                                                                        checked={selectedChildProperty === typeValue}
                                                                        onChange={() => {
                                                                            setSelectedChildProperty(typeValue);
                                                                            setValue('home_type_more', typeValue);
                                                                            // Réinitialiser le nombre de pièces si on change de type
                                                                            if (typeValue !== 'villa') {
                                                                                setRoomCount(1);
                                                                                setValue('rooms', 1);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span className="ml-2 font-medium">{typeName}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Section pour le type de bien - Bureau (sans sélection préalable de location/vente) */}
                                            {selectedCategory?.name.toLowerCase() === 'bureau' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type de bureau ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {SUB_BUREAU_DETAIL.map((item) => {
                                                            const typeName = item.name;
                                                            const typeValue = item.code.toLowerCase();
                                                            return (
                                                                <label 
                                                                    key={`bureau-${typeValue}`} 
                                                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        className="form-radio text-primary-600"
                                                                        name="propertyType"
                                                                        value={typeValue}
                                                                        checked={selectedChildProperty === typeValue}
                                                                        onChange={() => {
                                                                            setSelectedChildProperty(typeValue);
                                                                            setValue('home_type_more', typeValue);
                                                                            // Réinitialiser le nombre de pièces si on change de type
                                                                            if (typeValue !== 'villa') {
                                                                                setRoomCount(1);
                                                                                setValue('rooms', 1);
                                                                            }
                                                                            setIsBureauPriveSelected(typeValue === 'bureau_prive');
                                                                            setIsOpenSpaceSelected(typeValue === 'open_space');
                                                                            setIsCoworkingSelected(typeValue === 'coworking');
                                                                            setIsBureauMixteSelected(typeValue === 'bureau_mixte');
                                                                        }}
                                                                    />
                                                                    <span className="ml-2 font-medium">{typeName}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    
                                                    {/* Section pour les caractéristiques du bureau privé */}
                                                    {isBureauPriveSelected && (
                                                        <div className="mt-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                                                            <div className="space-y-3">
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('bureau_prive_intimite')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Intimité</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('bureau_prive_personnalisation')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Personnalisation</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('bureau_prive_confidentialite')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Confidentialité</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Section pour les caractéristiques de l'Open Space */}
                                                    {isOpenSpaceSelected && (
                                                        <div className="mt-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                                                            <div className="space-y-3">
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('open_space_collaboration')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Collaboration</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('open_space_flexibilite')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Flexibilité</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('open_space_economie')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Économie</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Section pour les caractéristiques de l'Espace co-working */}
                                                    {isCoworkingSelected && (
                                                        <div className="mt-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                                                            <div className="space-y-3">
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('coworking_flexibilite')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Flexibilité</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('coworking_reseaux')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Réseaux</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('coworking_cout_partage')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Coût partagé</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Section pour les caractéristiques du Bureau mixte */}
                                                    {isBureauMixteSelected && (
                                                        <div className="mt-6 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                                                            <div className="space-y-3">
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('bureau_mixte_equilibre')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Équilibre</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('bureau_mixte_adaptabilite')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Adaptabilité</span>
                                                                </label>
                                                                <label className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox text-primary-600 rounded"
                                                                        {...register('bureau_mixte_bien_etre')}
                                                                    />
                                                                    <span className="ml-2 text-gray-700 dark:text-gray-300">Bien-être</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Section dynamique pour le type de bien - Location (uniquement pour Maison) */}
                                            {typeAnnonce === 'location' && selectedCategory?.name.toLowerCase() === 'maison' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type de {selectedCategory.name.toLowerCase()} ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {['Studio', '2 pièces', '3 pièces', 'Appartement', 'Villa', 'Duplex', 'Triplex'].map((type) => (
                                                            <label key={`location-${type}`} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-primary-600"
                                                                    name="propertyType"
                                                                    value={type.toLowerCase()}
                                                                    checked={selectedChildProperty === type.toLowerCase()}
                                                                    onChange={() => {
                                                                        setSelectedChildProperty(type.toLowerCase());
                                                                        setValue('home_type_more', type.toLowerCase());
                                                                    }}
                                                                />
                                                                <span className="ml-2 font-medium">{type}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Section dynamique pour le type de bien - Vente (uniquement pour Maison) */}
                                            {typeAnnonce === 'vente' && selectedCategory?.name.toLowerCase() === 'maison' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Quel type de {selectedCategory.name.toLowerCase()} ?</Label>
                                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                                        {['Appartement', 'Villa', 'Duplex', 'Triplex', 'Immeuble'].map((type) => (
                                                            <label key={`vente-${type}`} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-primary-600"
                                                                    name="propertyType"
                                                                    value={type.toLowerCase()}
                                                                    checked={selectedChildProperty === type.toLowerCase()}
                                                                    onChange={() => {
                                                                        setSelectedChildProperty(type.toLowerCase());
                                                                        setValue('home_type_more', type.toLowerCase());
                                                                    }}
                                                                />
                                                                <span className="ml-2 font-medium">{type}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Section Nombre de pièces - Afficher uniquement pour la vente et certains types de biens */}
                                            {typeAnnonce === 'vente' && selectedChildProperty && ['appartement', 'villa', 'duplex', 'triplex'].includes(selectedChildProperty) && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Nombre de pièces</Label>
                                                    <div className="mt-2 grid grid-cols-4 gap-4">
                                                        {['2', '3', '4', '5', '6', '7', '8+'].map((pieces) => (
                                                            <label key={`pieces-${pieces}`} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-primary-600"
                                                                    name="piecesCount"
                                                                    value={pieces}
                                                                    onChange={() => {
                                                                        setValue('room_count', parseInt(pieces, 10));
                                                                    }}
                                                                />
                                                                <span className="ml-2 font-medium">{pieces} {pieces === '8+' ? '' : 'pièces'}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Section Nombre d'étages - Afficher uniquement pour 'Immeuble' */}
                                            {typeAnnonce === 'vente' && selectedChildProperty === 'immeuble' && (
                                                <div className="mt-4 block col-span-4">
                                                    <Label>Nombre d'étages</Label>
                                                    <div className="mt-2">
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            className="w-full"
                                                            placeholder="Entrez le nombre d'étages"
                                                            {...register('floor_count', {
                                                                valueAsNumber: true,
                                                                min: {
                                                                    value: 1,
                                                                    message: 'Le nombre d\'étages doit être d\'au moins 1',
                                                                },
                                                            })}
                                                        />
                                                        {errors?.floor_count && (
                                                            <p className="mt-1 text-sm text-red-600">
                                                                {errors.floor_count.message as string}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Section Superficie - Supprimée pour la catégorie Terrain */}

											{/* VILLE - COUNTRY - STATE */}
											<label className="block col-span-4">
												<div className="grid grid-cols-2 gap-6">
													<div
														className={
															hasUnlistedLocation()
																? "col-span-2"
																: "col-span-1"
														}
													>
														<Label>
															Commune{" "}
															<span className="text-red-500">*</span>
														</Label>

														<div className="block ">
															<Select
																name="location_id"
																required
																onChange={(event) => {
																	setValue(
																		"location_id",
																		event.target.value
																	);
																	setresfreshLocaionSelected(
																		event.target.value
																	);
																}}
															>
																{get_location().map((location) => (
																	<option
																		key={location.id}
																		value={location.id}
																		selected={isLocationSelected(
																			location
																		)}
																	>
																		{location.name}
																	</option>
																))}
															</Select>
															<ErrorMessage
																errors={errorArray}
																error="location_id"
																customMessage="Veuillez choisir une ville"
															/>
														</div>
													</div>

													{hasUnlistedLocation() ? (
														<div className="col-span-1">
															<label className="block ">
																<Label>Nom de la ville </Label>
																{/* {product?.location.id} */}
																<Input
																	type="text"
																	className="mt-1"
																	defaultValue={``}
																	{...register("unlisted_city")}
																/>
																<ErrorMessage
																	errors={errorArray}
																	error="location_description"
																	customMessage="Veuillez saisir un quartier"
																/>
															</label>
														</div>
													) : null}

													<div className="col-span-1">
														<label className="block ">
															<Label>
																Quartier{" "}
																<span className="text-red-500">
																	*
																</span>
															</Label>
															<Input
																type="text"
																className="mt-1"
																defaultValue={
																	product &&
																	product.location_description
																}
																{...register(
																	"location_description",
																	{
																		required: true,
																	}
																)}
															/>
															<ErrorMessage
																errors={errorArray}
																error="location_description"
																customMessage="Veuillez saisir un quartier"
															/>
														</label>
													</div>
												</div>
											</label>
										</div>

										{!hasAutreImmo() && (
											<DetailBien
												errorArray={errorArray}
												register={register}
												product={product}
												setValue={setValue}
												getValues={getValues}
												typeDeBien={
													(getValues("type") as IProductType) ??
													(PRODUCT_TYPE[0] as IProductType)
												}
											/>
										)}

										<DetailBienTwo
											errorArray={errorArray}
											register={register}
											product={product}
											setValue={setValue}
											getValues={getValues}
											typeDeBien={
												(getValues("type") as IProductType) ??
												(PRODUCT_TYPE[0] as IProductType)
											}
										/>
									</div>
								</div>
							</div>

							{/* 2 */}
							<div className="col-span-6 lg:col-span-2">
								<div className="bg-white dark:bg-neutral-900">
									{/* SECTION 02  */}
									<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6  mb-5">
										<div className="grid md:grid-cols-2 gap-6">
											{/* TITLE */}
											{false && (
												<label className="block md:col-span-2">
													<Label>Titre</Label>
													<Input
														type="text"
														className="mt-1"
														// { required: true }
														{...register("title")}
														// defaultValue={(defaultValue && defaultValue.title) ?? ""}
													/>
													<ErrorMessage
														errors={errorArray}
														error="title"
														customMessage="Veuillez choisir un titre"
													/>
												</label>
											)}

											{/* PRICE - PRICE_SECOND  */}
											<div className="block md:col-span-2">
												<div className="grid grid-cols-3 gap-6">
													{/* PRICE */}
													{true ? (
														<div
															className={
																currentType() === "BIEN EN VENTE" &&
																currentCategory() &&
																currentCategory()?.uuid !==
																	ProductcategoryUUID.MAISON.key
																	? "col-span-3"
																	: "col-span-2"
															}
														>
															<Label>
																{getPriceLabel()}
																<span className="text-red-500">
																	*
																</span>
																<div className="flex items-center relative mt-2">
																	<CurrencyInput
																		id="input-currency"
																		className="w-full rounded-md "
																		placeholder="Entrer le montant"
																		defaultValue={
																			product && product.price
																		}
																		min={0}
																		decimalsLimit={2}
																		groupSeparator=" "
																		value={reshrehPrice}
																		onValueChange={(
																			value,
																			name,
																			values
																		) => {
																			// setValue("price", value)
																			// console.log({
																			// 	value,
																			// 	name,
																			// 	values,
																			// });
																			value &&
																				setreshrehPrice(
																					value
																				);
																		}}
																		{...register("price", {
																			required: true,
																		})}
																	/>
																	<span className="absolute right-0 mx-2 cursor-not-allowed text-lg ml-2 text-gray-600 dark:text-neutral-800">
																		FCFA
																	</span>
																</div>
															</Label>
															<ErrorMessage
																errors={errorArray}
																error="price"
																customMessage="Veuillez saisir un prix"
															/>
														</div>
													) : null}

													{/* PRICE BY UNIT */}
													{currentType() === "BIEN EN VENTE" &&
													currentCategory() &&
													currentCategory()?.uuid !==
														ProductcategoryUUID.MAISON.key &&
													!hasAutreImmo() ? (
														<div className="col-span-2">
															<Label>
																Prix par unité
																{false && (
																	<span className="text-red-500">
																		*
																	</span>
																)}
																<div className="flex items-center relative mt-2">
																	<CurrencyInput
																		id="input-currency"
																		className="w-full rounded-md "
																		placeholder="Entrer le montant"
																		defaultValue={
																			(product &&
																				product.price_second) ??
																			0
																		}
																		min={0}
																		value={reshrehPriceSecond}
																		decimalsLimit={0}
																		groupSeparator=" "
																		onValueChange={(
																			value,
																			name,
																			values
																		) => {
																			value &&
																				setreshrehPriceSecond(
																					value
																				);
																		}}
																		{...register(
																			"price_second"
																		)}
																	/>
																	{/* {required:currentType() ===PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY],} */}
																	<span className="absolute right-0 mx-2 cursor-not-allowed text-lg ml-2 text-gray-600 dark:text-neutral-800">
																		FCFA
																	</span>
																</div>
															</Label>
															<ErrorMessage
																errors={errorArray}
																error="price"
																customMessage="Veuillez saisir un prix"
															/>
														</div>
													) : null}

													{/* PERIODICITY OR  UNIT */}
													{true ? (
														<div className="col-span-1">
															{getValues("type") !==
																PRODUCT_TYPE[
																	TYPE_BIEN_EN_VENTE_KEY
																] && (
																<div className="block ">
																	<Label className="my-0">
																		Périodicité
																	</Label>
																	<Select
																		name="periodicity"
																		className="w-full"
																		onChange={(event) =>
																			setValue(
																				"periodicity",
																				event.target
																					.value as PeriodicityType
																			)
																		}
																	>
																		{false && (
																			<option value="">
																				Choisir une
																				périodicité
																			</option>
																		)}
																		{GET_PERIODICITY().map(
																			(p) => (
																				<option
																					key={p.id}
																					value={p.id}
																					selected={
																						defaultValue?.periodicity ===
																						p.id
																					}
																				>
																					{p.name}
																				</option>
																			)
																		)}
																	</Select>
																</div>
															)}

															{getValues("type") ===
																PRODUCT_TYPE[
																	TYPE_BIEN_EN_VENTE_KEY
																] &&
																currentCategory() &&
																currentCategory()?.uuid ===
																	ProductcategoryUUID
																		.BIEN_EN_VENTE.children
																		.TERRAIN && (
																	<div className="block md:col-span-2 ">
																		<Label className="">
																			Unité
																			<span>
																				{" (m²/LOT)".toUpperCase()}{" "}
																			</span>
																		</Label>
																		<Select
																			name="periodicity"
																			className="mt-2"
																			onChange={(event) =>
																				setValue(
																					"periodicity",
																					event.target
																						.value as PeriodicityType
																				)
																			}
																		>
																			{PRODUCT_AREA_UNIT.map(
																				(u) => (
																					<option
																						key={u.id}
																						value={u.id}
																						selected={
																							product &&
																							product.area_unit ===
																								u.id
																						}
																						defaultValue={
																							!getValues(
																								"area_unit"
																							)
																								? u.id
																								: ""
																						}
																					>
																						{u.name}
																					</option>
																				)
																			)}
																		</Select>
																	</div>
																)}
														</div>
													) : null}
												</div>

												{showCaution() && (
													<div className="grid grid-cols-4 gap-6 mt-3">
														<div className="col-span-4 mt-3">
															<Label>
																Caution (Nombre de mois)
																<div className="flex items-center">
																	<Input
																		type="number"
																		className="mt-1"
																		min={0}
																		defaultValue={
																			product &&
																			product.count_monthly
																		}
																		{...register(
																			"count_monthly"
																		)}
																	/>
																</div>
															</Label>
															<ErrorMessage
																errors={errorArray}
																error="price"
																customMessage="Veuillez saisir un prix"
															/>
														</div>

														{false && (
															<div className="col-span-6">
																<Label>
																	Mois d'avance
																	<div className="flex items-center">
																		<Input
																			type="number"
																			className="mt-1"
																			min={0}
																			defaultValue={
																				product!
																					.count_advance ??
																				0
																			}
																			{...register(
																				"count_advance"
																			)}
																		/>
																	</div>
																</Label>
																<ErrorMessage
																	errors={errorArray}
																	error="price"
																	customMessage="Veuillez saisir un prix"
																/>
															</div>
														)}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* 3 */}
						<div className="grid md:grid-cols-5 gap-6">
							<div className="col-span-6 lg:col-span-3">
								<div className="bg-white dark:bg-neutral-900">
									{/* SECTION 03 */}
									{/* getValues("type") !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY]  */}
									{allowImage() && (
										<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 mb-5">
											<div className="grid md:grid-cols-2 gap-6 ">
												{/* IMAGE */}
												<div className="block md:col-span-2">
													<ImageUploader
														initialImages={images}
														maxImages={15}
														images={images}
														setImages={setImages}
														imageFiles={imageFiles}
														setImageFiles={setImageFiles}
														textOne="Ajoutez plusieurs photos pour augmenter vos chances d'être contacté"
														isUploading={isUploading}
														uploadProgress={uploadProgress}
														onImageUpload={handleImmediateImageUpload}
														onImageDelete={handleImageDelete}
													/>
												</div>
											</div>
										</div>
									)}

									{allowImage() && (
										<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 mb-5">
											<div className="grid md:grid-cols-2 gap-6 ">
												{/* VIDEO */}
												<div className="block md:col-span-2">
													<VideoUploader
														maxVideo={1}
														videoDefault={videos}
														videos={videos}
														setVideos={setVideos}
														videoFiles={videoFiles}
														setVideoFiles={setVideoFiles}
														onVideoDelete={handleVideoDelete}
													/>
												</div>
											</div>
										</div>
									)}

									{/* SECTION 04 */}
									<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mb-5">
										<div className="grid md:grid-cols-2 gap-6 ">
											{/* ! NOT USED */}
											{false && (
												<>
													{/* EXCERPT */}
													<label className="block md:col-span-2">
														<Label>Description</Label>
														<Textarea
															className="mt-1"
															rows={4}
															maxLength={250}
															// defaultValue={product && product.excerpt}
															{...register("excerpt")}
														/>
														<p className="mt-1 text-sm text-neutral-500">
															Donnez une description détaillée de
															votre article. N'indiquez pas vos
															coordonnées (e-mail, téléphones, …) dans
															la description.
														</p>
														{watch("excerpt") && (
															<span
																className={
																	((watch("excerpt") &&
																		watch("excerpt")!.length) ??
																		0) == 250
																		? "text-red-500"
																		: "text-neutral-500"
																}
															>
																{watch("excerpt") &&
																	watch("excerpt")!.length}{" "}
																/ 250
															</span>
														)}
														<ErrorMessage
															errors={errorArray}
															error="excerpt"
															customMessage="Veuillez ajouter une description"
														/>
													</label>
												</>
											)}

											{/* CONTENT */}
											<label className="block md:col-span-2">
												<Label> Detail de l'annonce</Label>
												<EditorText
													onEditorChange={(content: string) =>
														setValue("content", content)
													}
													initialValue={defaultValue?.content}
												/>
												<ErrorMessage
													errors={errorArray}
													error="content"
													customMessage="Veuillez ajouter du contenu"
												/>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* SUBMIT */}
					{/* disabled={!isValid} */}
					<div className="flex justify-center">
						<div className="w-2/3 mb-5">
							<ButtonPrimary
								className="w-full bg-blue-500 text-white py-2 px-4 fixed bottom-0 left-0 z-10"
								type="submit"
							>
								{productId ? "Mettre à jour" : "Publier Maintenant"}
							</ButtonPrimary>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DashboardSubmitPost;
