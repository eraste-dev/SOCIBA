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
import {
	fetchCategories,
	fetchSingleProperties,
	initProductState,
	postProduct,
} from "app/axios/actions/api.action";
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
import ImageUploader from "components/Dashboard/Products/ImageUploader";
import DetailBien from "../FormPart/DetailBien";
import { ProductcategoryUUID } from "data/categories_uuid";
import DetailBienTwo from "../FormPart/DetailBienTwo";
import { LinearProgress } from "@mui/material";
import Loading from "components/UI/Loading";
import {
	CategorySubAction,
	IPropertySubCategory,
} from "app/reducer/products/sub-propertiy-category";
import {
	AUTRE_KEY,
	CATEGORIES_SUB,
	DUPLEX_KEY,
	MAISON_KEY,
	TERRAIN_KEY,
	TRIPLEX_KEY,
	VILLA_KEY,
} from "data/categories_sub";

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
export const PERIODICITY_LIST: IPRODUCT_PERIODICITY[] = [{ id: "MONTH", name: "Mois" }];

// { id: "WEEK", name: "Semaine" },
export const PERIODICITY_RESERVATION_LIST: { id: string; name: string }[] = [
	{ id: "DAY", name: "Jour" },
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
	const sub_categories: IPropertySubCategory[] = CATEGORIES_SUB; //useSelector(CategorySubAction.data);
	const categoriesLoading = useAppSelector(CategoryAction.loading);

	const locations = useSelector(LocationAction.data);
	const locationLoading = useAppSelector(CategoryAction.loading);

	const [initialize, setInitialize] = useState(false);
	const [categorySelected, setCategorySelected] = useState(null as IPropertyCategory | null);
	const [defaultValue, setDefaultValue] = useState(null as ProductRequest | null);
	// const [previewUrls, setPreviewUrls]: any = useState([]);
	// const [openLightbox, setOpenLightbox] = useBoolean(false);
	// const [currentImage, setCurrentImage] = useState<string | null>(null);
	const [images, setImages] = useState<string[]>([]);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [tmpcatId, settmpcatId] = useState(0);

	const { register, handleSubmit, watch, setValue, getValues } = useForm<ProductRequest>();

	const onSubmit: SubmitHandler<ProductRequest> = (data) => {
		console.log("SubmitHandler", data);
		console.log("SubmitHandler imageFiles", imageFiles);
		const formData = new FormData(); // initialize form data

		// ! FIX DEFAULT VALUE
		data.images = images;
		data.type = data.type ?? PRODUCT_TYPE[0];
		data.home_type = data.home_type ?? Object.values(SUB_CATEGORIES())[0];
		data.jacuzzi = data.jacuzzi ? 1 : 0;
		data.bath = data.bath ? 1 : 0;
		data.pool = data.pool ? 1 : 0;
		data.WiFi = data.WiFi ? 1 : 0;
		data.acd = data.acd ? 1 : 0;
		data.acd = data.air_conditioning ? 1 : 0;
		data.bathrooms = data.bathrooms ?? 0;
		data.kitchens = data.kitchens ?? 0;
		data.area = data.area ?? 0;

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

		if (!data.location_id) {
			if (defaultValue) {
				data.location_id = defaultValue.location_id;
			} else if (locations && locations.length > 0) {
				data.location_id = locations[0].id.toString();
			}
		}

		// Convert data to FormData
		for (const key in data) {
			if (data.hasOwnProperty(key) && data[key as keyof ProductRequest] !== undefined) {
				if (key === "images" && data.images) {
					if (Array.isArray(imageFiles)) {
						imageFiles.forEach((image) => {
							console.log("check images", image);
							formData.append("images[]", image);
						});
					}
				} else {
					formData.append(key, data[key as keyof ProductRequest] as any);
				}
			}
		}

		if (product && productId) {
			formData.append("id", productId);
		}

		console.log(formData);

		dispatch(postProduct(formData));
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

	const isLocationSelected = (location: ILocation) => {
		const checked = !!(defaultValue && location.id.toString() === defaultValue.location_id);
		return checked;
	};

	const GET_PERIODICITY = () => {
		switch (getValues("type")) {
			case PRODUCT_TYPE[0]:
				return PERIODICITY_LIST;

			case PRODUCT_TYPE[1]:
				return PERIODICITY_LIST;

			case PRODUCT_TYPE[2]:
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

				console.log(">> cats", data);
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
			getValues("category_id") ?? (categories && categories[0].id);

		const _type = (getValues("type") as IProductType) ?? (PRODUCT_TYPE[0] as IProductType);
		const _cat: IPropertyCategory | undefined =
			_findCat(_cat_id) && _findCat(_cat_id).length > 0 ? _findCat(_cat_id)[0] : undefined;

		try {
			CATEGORIES_SUB;
			if (_cat && _cat.name) {
				sub_categories.forEach((c) => {
					if (c.allow.includes(_cat?.name)) {
						data.push({
							code: c.uuid,
							name: c.name,
						});
					}
				});
			}
		} catch (error) {}

		return data;
	};

	const hasOtherKey = (): boolean => {
		const homeType = _hasOtherKey ?? getValues("home_type");
		console.log("hasOtherKey", homeType);
		return (
			[AUTRE_KEY, VILLA_KEY, DUPLEX_KEY, TRIPLEX_KEY, TERRAIN_KEY].includes(homeType) &&
			SUB_CATEGORIES().length > 0
		);
	};

	const canShowOtherInput = (): boolean => {
		const _type = getValues("type") ?? PRODUCT_TYPE[0]; // product?.type ??
		const cat: IPropertyCategory | null =
			GET_CATEGORIES()?.find((c) => c.id === getValues("category_id")) ?? null;
		console.log("canShowOtherInput", _type, cat?.name === MAISON_KEY);

		return (
			(_type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] && cat?.name === MAISON_KEY) ||
			(SUB_CATEGORIES() && SUB_CATEGORIES().length === 0)
		);
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

	const initForm = (value: ProductRequest) => {
		setValue("id", value.id);
		setValue("category_id", value.category_id);
		setValue("location_id", value.location_id);
		setValue("title", value.title);
		setValue("excerpt", value.excerpt);
		setValue("content", value.content);
		// setValue("type", value.type);
		setValue("type", product?.type ?? PRODUCT_TYPE[0]);
		setValue("location_description", value.location_description);
		setValue("price", value.price);
		setValue("deposit_price", value.deposit_price);
		setValue("periodicity", value.periodicity);
		setValue("home_type", value.home_type);
		setValue("jacuzzi", value.jacuzzi);
		setValue("bath", value.bath);
		setValue("air_conditioning", value.air_conditioning);
		setValue("kitchens", value.kitchens);
		setValue("pool", value.pool);
		setValue("WiFi", value.WiFi);
		setValue("bathrooms", value.bathrooms);
		setValue("area", value.area);
		// setValue("images", value.images);
		// setDefaultValue(value);
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
				location_description: product.location_description,
				price: product.price,
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
			};
			setDefaultValue(value);
			setImages(product.images.map((image) => image.image));
			setImageFiles([]);
			initForm(value);

			if (categories && categories.length > 0) {
				setCategorySelected(
					categories?.filter((_cat) => _cat.id === product.category?.id)[0] || null
				);
			}
			setInitialize(true);
		} else {
			setDefaultValue(PRODUCT_REQUEST_EMPTY);
			initForm(PRODUCT_REQUEST_EMPTY);
		}
	};

	useEffect(() => {
		if (!product && productId) {
			dispatch(fetchSingleProperties({ id: productId }));
		}
	}, [product, productId, fetchSingleProperties, dispatch]);

	// INIT
	// SET DEFAULT VALUES
	useEffect(() => {
		console.log(">>> useEffect initialize", {
			defaultValue,
			initialize,
		});

		if (product && productId && defaultValue == null && !initialize) {
			dispatch(initProductState());
			initializeForm(product);
			// console.log(">>> SET_DEFAULT", defaultValue);
		} else if (!product && !productId) {
			initializeForm(undefined);
			setInitialize(true);
		}

		// dispatch(initProductState());
	}, [
		setDefaultValue,
		initForm,
		dispatch,
		fetchSingleProperties,
		initProductState,
		initializeForm,
		product,
		productId,
		defaultValue,
		categories,
		loading,
		initialize,
	]);

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
			snackbar.enqueueSnackbar(errorMessage, { variant: "error", autoHideDuration: 3000 });
		}
	}, [errorMessage, snackbar]);

	// SUBMIT_SUCCESS
	useEffect(() => {
		if (success && !loading) {
			snackbar.enqueueSnackbar("Annonce publiee avec succes", {
				variant: "success",
				autoHideDuration: 3000,
			});
			history.push(route("dashboard"));
		}
	}, [snackbar, success, loading, history]);

	if ((initialize === false || defaultValue == null) && productId)
		return (
			<div className="flex justify-center justify-self-center" style={{ height: "100vh" }}>
				<Loading />
			</div>
		);

	return (
		<div className="md:p-6">
			<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-5">
				Rédigez votre annonce
			</h3>
			{/* grid md:grid-cols-2 gap-6 */}
			<form className="" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
				{/* SECTION 02 */}
				<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mb-5">
					<div className="grid md:grid-cols-2 gap-6 mb-5">
						{/* TYPE */}
						<label className="block">
							<Label>
								Type d'offre <span className="text-red-500">*</span>
							</Label>

							<SelectProductType
								options={PRODUCT_TYPE}
								onChangeOption={(value) => {
									setValue("type", value);
									if (GET_CATEGORIES()[0].id) {
										setValue("category_id", GET_CATEGORIES()[0].id);
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
						<label className="block md:col-span-2">
							<div className="grid grid-cols-1 gap-6">
								<div>
									<Label>
										Type de bien <span className="text-red-500">*</span>
										{/* {defaultValue?.category_id} */}
									</Label>

									<div className="block md:col-span-2 p-2">
										<Select
											name="category_id"
											onChange={(event) => {
												settmpcatId(parseInt(event.target.value));

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
														selected={isCategorySelected(category)}
													>
														{category.name}
													</option>
												))}
										</Select>
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

						{/* DETAIL CATEGORY */}
						{/* hasResidence() && */}
						{
							<label className="block md:col-span-2">
								<div className="grid grid-cols-1 gap-6">
									<div>
										<Label>
											{getTypeDeteailLabel()}

											{/* <span className="text-red-500">*</span> */}
										</Label>

										<div className="block md:col-span-2 p-2">
											{/* SELECT_HOME_TYPE */}
											{SUB_CATEGORIES() &&
												SUB_CATEGORIES().length > 0 &&
												!canShowOtherInput() && (
													<Select
														onChange={(event) => {
															event.target.value &&
																setValue(
																	"home_type",
																	event.target.value
																);

															set_hasOtherKey(event.target.value);
														}}
													>
														<option>Choix</option>
														{SUB_CATEGORIES() &&
															SUB_CATEGORIES().map((c) => (
																<option
																	key={c.code}
																	value={c.name}
																	selected={
																		c.name ===
																		getValues("home_type")
																	}
																>
																	{c.name}
																</option>
															))}
													</Select>
												)}

											{/* INPUT_HOME_TYPE */}
											{canShowOtherInput() && (
												<Input
													autoComplete="on"
													name="home_type"
													maxLength={20}
													onChange={(e) => {
														setValue("home_type", e.target.value);
														set_hasOtherKey(e.target.value);
													}}
												/>
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
						}

						{/* NOMBRE DE PIECE */}
						{hasOtherKey() && (
							<label className="block md:col-span-2">
								<div className="grid grid-cols-1 gap-6">
									<div>
										<Label>Nombre de pièces</Label>

										<div className="block md:col-span-2 p-2">
											<Input
												name="area_count"
												autoComplete="on"
												onChange={(event) => {
													event.target.value &&
														setValue(
															"area_count",
															parseInt(event.target.value)
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
						{getValues("type") === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] && (
							<label className="block md:col-span-2">
								<div className="grid grid-cols-1 gap-6">
									<div>
										<Label>
											Nombre de terrain{" "}
											<span className="text-red-500">*</span>
										</Label>

										<div className="block md:col-span-2 p-2">
											<Input
												name="area_count"
												autoComplete="on"
												onChange={(event) => {
													event.target.value &&
														setValue(
															"area_count",
															parseInt(event.target.value)
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

						{/* VILLE - COUNTRY - STATE */}
						<label className="block md:col-span-2">
							<div className="grid grid-cols-2 gap-6">
								<div>
									<Label>
										Commune <span className="text-red-500">*</span>
									</Label>

									<div className="block md:col-span-2 p-2">
										<Select
											name="location_id"
											required
											onChange={(event) =>
												setValue("location_id", event.target.value)
											}
										>
											{locations &&
												locations.map((location) => (
													<option
														key={location.id}
														value={location.id}
														selected={isLocationSelected(location)}
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

								<div>
									<label className="block md:col-span-2">
										<Label>
											Quartier <span className="text-red-500">*</span>
										</Label>
										<Input
											type="text"
											className="mt-1"
											defaultValue={product && product.location_description}
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

					<DetailBien
						errorArray={errorArray}
						register={register}
						product={product}
						setValue={setValue}
						getValues={getValues}
						typeDeBien={
							(getValues("type") as IProductType) ?? (PRODUCT_TYPE[0] as IProductType)
						}
					/>

					<DetailBienTwo
						errorArray={errorArray}
						register={register}
						product={product}
						setValue={setValue}
						getValues={getValues}
						typeDeBien={
							(getValues("type") as IProductType) ?? (PRODUCT_TYPE[0] as IProductType)
						}
					/>
				</div>

				{/* SECTION 01 */}
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

						{/* PRICE - DEPOSIT PRICE */}
						<label className="block md:col-span-2">
							<div className="grid grid-cols-4 gap-6">
								<div className="col-span-2">
									<Label>
										Prix <span className="text-red-500">*</span>
										<div className="flex items-center">
											<Input
												type="number"
												className="mt-1"
												defaultValue={product && product.price}
												{...register("price", { required: true })}
											/>

											{/* <span className="text-lg ml-2 text-neutral-300">
												{formatPrice(product && product.price)} {CURRENCY}
											</span> */}
											<span className="text-lg ml-2 text-neutral-300">
												{CURRENCY}{" "}
											</span>
										</div>
									</Label>
									<ErrorMessage
										errors={errorArray}
										error="price"
										customMessage="Veuillez saisir un prix"
									/>
								</div>

								<div>
									{getValues("type") !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] && (
										<div className="block md:col-span-2 p-2">
											<Select
												name="periodicity"
												className="mt-4"
												onChange={(event) =>
													setValue(
														"periodicity",
														event.target.value as
															| "DAY"
															| "WEEK"
															| "MONTH"
															| "YEAR"
													)
												}
											>
												{/* <option value="">Choisir une périodicité</option> */}
												{GET_PERIODICITY().map((p) => (
													<option
														key={p.id}
														value={p.id}
														// selected={isCategorySelected(category)}
														selected={
															product && product.periodicity === p.id
														}
													>
														{p.name}
													</option>
												))}
											</Select>
										</div>
									)}

									{getValues("type") === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] && (
										<div className="block md:col-span-2 p-2">
											<Select
												name="periodicity"
												className="mt-4"
												onChange={(event) =>
													setValue(
														"periodicity",
														event.target.value as
															| "DAY"
															| "WEEK"
															| "MONTH"
															| "YEAR"
													)
												}
											>
												{PRODUCT_AREA_UNIT.map((u) => (
													<option
														key={u.id}
														value={u.id}
														selected={
															product && product.area_unit === u.id
														}
														defaultValue={
															!getValues("area_unit") ? u.id : ""
														}
													>
														{u.name}
													</option>
												))}
											</Select>
										</div>
									)}

									{false && (
										<>
											<label className="block md:col-span-2">
												Caution <span className="text-red-500">*</span>
												<div className="flex items-center">
													<Input
														type="number"
														// defaultValue={
														// 	product && product.deposit_price
														// }
														className="mt-1"
														{...register("deposit_price", {
															required: true,
														})}
													/>
													<span className="text-lg ml-2 text-neutral-300">
														{" "}
														{CURRENCY}{" "}
													</span>
												</div>
											</label>
											<ErrorMessage
												errors={errorArray}
												error="deposit_price"
												customMessage="Veuillez saisir une caution"
											/>
										</>
									)}
								</div>
							</div>

							{(getValues("type") === PRODUCT_TYPE[0] ||
								product?.type === "LOCATION") && (
								<div className="grid grid-cols-4 gap-6 mt-3">
									<div className="col-span-4">
										<Label>
											Caution (Nombre de mois)
											<div className="flex items-center">
												<Input
													type="number"
													className="mt-1"
													min={0}
													defaultValue={product && product.count_monthly}
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
														defaultValue={product!.count_advance ?? 0}
														{...register("count_advance")}
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
						</label>
					</div>
				</div>

				{/* SECTION 03 */}
				{/* getValues("type") !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY]  */}
				{allowImage() && (
					<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mb-5">
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
										Donnez une description détaillée de votre article.
										N’indiquez pas vos coordonnées (e-mail, téléphones, …) dans
										la description.
									</p>
									{watch("excerpt") && (
										<span
											className={
												((watch("excerpt") && watch("excerpt")!.length) ??
													0) == 250
													? "text-red-500"
													: "text-neutral-500"
											}
										>
											{watch("excerpt") && watch("excerpt")!.length} / 250
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
								onEditorChange={(content: string) => setValue("content", content)}
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

				{/* VILLE - COUNTRY - STATE */}

				{/* SUBMIT */}
				{/* disabled={!isValid} */}
				<ButtonPrimary className="md:col-span-2" type="submit">
					Publier Maintenant
				</ButtonPrimary>
			</form>
		</div>
	);
};

export default DashboardSubmitPost;