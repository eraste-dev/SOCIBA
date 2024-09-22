import { useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Form/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Form/Label/Label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import { useAppSelector } from "app/hooks";
import { fetchCategories, initProductState, postProduct } from "app/axios/actions/api.action";
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
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "./posts.constantes";
import VideoUploader from "components/Dashboard/Products/Video/VideoUploader";

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
	const [tmpcatId, settmpcatId] = useState(0);

	const { register, handleSubmit, watch, setValue, getValues } = useForm<ProductRequest>();

	const onSubmit: SubmitHandler<ProductRequest> = (data) => {
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
		data.images = images;
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
		data.air_conditioning = data.air_conditioning ? 1 : 0;
		data.bathrooms = data.bathrooms ?? 0;
		data.kitchens = data.kitchens ?? 0;
		data.area = data.area ?? 0;
		data.area_unit = getAreaUnitValue(data);
		data.count_monthly = data.count_monthly ?? 0;
		// data.security = data.security;
		data.periodicity = getPeriodicityFinalValue(data);

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
			if (defaultValue) {
				data.location_id = defaultValue.location_id;
			} else if (locations && locations.length > 0) {
				data.location_id = locations[0].id.toString();
			}
		} else {
			data.location_id = undefined;
			data.unlisted_city = data.unlisted_city;
		}

		// Convert data to FormData
		formData = convertPayloadToFormData(data, imageFiles, videoFiles);

		if (product && productId) {
			formData.append("id", productId);
		}

		dispatch(postProduct(formData));
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

		if (data.type === PRODUCT_TYPE[TYPE_RESERVATION_KEY]) {
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

		// const _type = (getValues("type") as IProductType) ?? (PRODUCT_TYPE[0] as IProductType);
		const cat: IPropertyCategory | undefined =
			_findCat(_cat_id) && _findCat(_cat_id).length > 0 ? _findCat(_cat_id)[0] : undefined;

		try {
			// ? for locations
			// ? for reservation
			if (
				(cat && cat.name && currentType() === "LOCATION") ||
				currentType() === "RESERVATION"
			) {
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
		const condition: boolean =
			getValues("type") === PRODUCT_TYPE[0] || product?.type === "LOCATION";

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
			history.push(route("dashboard"));
		}
	}, [snackbar, success, loading, history]);

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
				Rédigez votre annonce
			</h3>
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
												Type d'offre <span className="text-red-500">*</span>
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
													console.log({
														category_id: getValues("category_id"),
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
													{/* {defaultValue?.category_id} */}
												</Label>

												<div className="block md:col-span-2 ">
													<Select
														name="category_id"
														onChange={(event) => {
															settmpcatId(
																parseInt(event.target.value)
															);

															event.target.value &&
																setValue(
																	"category_id",
																	parseInt(event.target.value)
																);

															set_hasOtherKey(event.target.value);

															console.log(
																"category_id",
																event.target.value,
																getValues("category_id"),
																tmpcatId
															);
														}}
													>
														<option>Choix du type de bien</option>

														{GET_CATEGORIES() &&
															GET_CATEGORIES().map((category) => (
																<option
																	key={category.id}
																	value={category.id}
																	selected={isCategorySelected(
																		category
																	)}
																>
																	{category.name}
																</option>
															))}
													</Select>
												</div>
											</div>
											<div>
												<ErrorMessage
													errors={errorArray}
													error="category_id"
													customMessage="Veuillez choisir un type de bien"
												/>
											</div>
										</label>

										{/* DETAIL CATEGORY */}
										{canShowDetailCategory() && (
											<label className="block col-span-4">
												<div className="grid grid-cols-1 gap-6">
													<div>
														<Label>
															{getTypeDeteailLabel()}
															{/* <span className="text-red-500">*</span> */}
														</Label>

														<div className="block md:col-span-2 ">
															{/* SELECT_HOME_TYPE */}
															{!canShowOtherInput() &&
																SUB_CATEGORIES() &&
																SUB_CATEGORIES().length > 0 && (
																	<Select
																		onChange={(event) => {
																			event.target.value &&
																				setValue(
																					"home_type",
																					event.target
																						.value
																				);

																			set_hasOtherKey(
																				event.target.value
																			);
																		}}
																	>
																		<option>Choix</option>
																		{SUB_CATEGORIES() &&
																			SUB_CATEGORIES().map(
																				(c) => (
																					<option
																						key={c.code}
																						value={
																							c.name
																						}
																						selected={
																							c.name ===
																							getValues(
																								"home_type"
																							)
																						}
																					>
																						{c.name}
																					</option>
																				)
																			)}
																	</Select>
																)}

															{/* INPUT_HOME_TYPE */}
															{}
															{canShowOtherInput() && (
																<>
																	<Input
																		autoComplete="on"
																		name="home_type"
																		maxLength={20}
																		onChange={(e) => {
																			setValue(
																				"home_type",
																				e.target.value
																			);
																			set_hasOtherKey(
																				e.target.value
																			);
																		}}
																	/>
																</>
															)}
														</div>
													</div>
												</div>
												<div>
													<ErrorMessage
														errors={errorArray}
														error="category_id"
														customMessage="Veuillez choisir un type de bien"
													/>
												</div>
											</label>
										)}

										{/* NOMBRE DE PIECE */}
										{showNumberOfRooms() && (
											<label className="block col-span-4">
												<div className="grid grid-cols-1 gap-6">
													<div>
														<Label>Nombre de pièces</Label>

														<div className="block md:col-span-2 ">
															<Input
																name="area_count"
																autoComplete="on"
																onChange={(event) => {
																	event.target.value &&
																		setValue(
																			"area_count",
																			parseInt(
																				event.target.value
																			)
																		);
																}}
															></Input>
														</div>
													</div>
												</div>
												<div>
													<ErrorMessage
														errors={errorArray}
														error="category_id"
														customMessage="Veuillez choisir un type de bien"
													/>
												</div>
											</label>
										)}

										{/* DETAIL CATEGORY */}
										{currentType() === "BIEN EN VENTE" &&
											!showNumberOfRooms() && (
												<>
													{!hasAutreImmo() ? (
														<label className="block col-span-4">
															<div className="grid grid-cols-1 gap-6">
																<div>
																	<Label>
																		{getVenteCountLabel()}
																		{/* <span className="text-red-500">
																	*
																</span> */}
																	</Label>

																	<div className="block md:col-span-2 ">
																		<Input
																			name="area_count"
																			autoComplete="on"
																			defaultValue={
																				defaultValue?.area_count ??
																				0
																			}
																			onChange={(event) => {
																				event.target
																					.value &&
																					setValue(
																						"area_count",
																						parseInt(
																							event
																								.target
																								.value
																						)
																					);
																			}}
																		></Input>
																	</div>
																</div>
															</div>
															<div>
																<ErrorMessage
																	errors={errorArray}
																	error="category_id"
																	customMessage="Veuillez choisir un type de bien"
																/>
															</div>
														</label>
													) : null}
												</>
											)}

										{hasAutreImmo() ? (
											<div className="col-span-3">
												<Label>Autre Aspect (Détails)</Label>
												<Input
													autoComplete="on"
													defaultValue={defaultValue?.home_type_more}
													name="home_type_more"
													onChange={(e) =>
														setValue("home_type_more", e.target.value)
													}
												/>
											</div>
										) : null}

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
															<span className="text-red-500">*</span>
														</Label>
														<Input
															type="text"
															className="mt-1"
															defaultValue={
																product &&
																product.location_description
															}
															{...register("location_description", {
																required: true,
															})}
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
															<span className="text-red-500">*</span>
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
																			setreshrehPrice(value);
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
															<span className="text-red-500">*</span>
															<div className="flex items-center relative mt-2">
																<CurrencyInput
																	id="input-currency"
																	className="w-full rounded-md "
																	placeholder="Entrer le montant"
																	defaultValue={
																		reshrehPriceSecond ??
																		(product &&
																			product.price_second) ??
																		getValues("price_second")
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
																		console.log({
																			value,
																			name,
																			values,
																		});

																		value &&
																			setreshrehPriceSecond(
																				value
																			);
																	}}
																	{...register("price_second", {
																		required:
																			currentType() ===
																			PRODUCT_TYPE[
																				TYPE_BIEN_EN_VENTE_KEY
																			],
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
																			Choisir une périodicité
																		</option>
																	)}
																	{GET_PERIODICITY().map((p) => (
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
																	))}
																</Select>
															</div>
														)}

														{getValues("type") ===
															PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] &&
															currentCategory() &&
															currentCategory()?.uuid ===
																ProductcategoryUUID.BIEN_EN_VENTE
																	.children.TERRAIN && (
																<div className="block md:col-span-2 ">
																	<Label className="">
																		Unité
																		<span>
																			{" (m² / LOT)".toUpperCase()}{" "}
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
																	{...register("count_monthly")}
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
																				.count_advance ?? 0
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
													maxImages={5}
													images={images}
													setImages={setImages}
													imageFiles={imageFiles}
													setImageFiles={setImageFiles}
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
														Donnez une description détaillée de votre
														article. N’indiquez pas vos coordonnées
														(e-mail, téléphones, …) dans la description.
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
	);
};

export default DashboardSubmitPost;
