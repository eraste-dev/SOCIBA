import React, { useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Form/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Form/Label/Label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction, IUser } from "app/reducer/auth/auth";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import { useAppSelector } from "app/hooks";
import { fetchCategories, fetchSingleProperties, initProductState, postProduct } from "app/axios/actions/api.action";
import SelectProductType from "components/Products/add/SelectProductTypes";
import EditorText from "components/Form/EditorText";
import { ProductRequest } from "app/axios/api.type";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { useSnackbar } from "notistack";
import { PropertyAction } from "app/reducer/products/product";
import ErrorMessage from "components/Form/ErrorMessage";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import { useBoolean } from "react-use";
import ImageUploader from "components/Dashboard/Products/ImageUploader";

const DashboardSubmitPost = () => {
	const CURRENCY: string = "FCFA";

	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const history = useHistory();
	const queryParams = new URLSearchParams(location.search);

	const user: IUser | undefined = useSelector(AuthAction.data)?.user;
	const product = useSelector(PropertyAction.data)?.single;
	const productId = queryParams.get("id");
	const errorMessage = useSelector(PropertyAction.error);
	const errorArray = useSelector(PropertyAction.errors);
	const success = useSelector(PropertyAction.success);
	const loading = useSelector(PropertyAction.loading);

	const categories = useSelector(CategoryAction.data);
	const categoriesLoading = useAppSelector(CategoryAction.loading);

	const locations = useSelector(LocationAction.data);
	const locationLoading = useAppSelector(CategoryAction.loading);

	const [initialize, setInitialize] = useState(false);
	const [categoryParent, setCategoryParent] = useState(null as IPropertyCategory | null);
	const [categorySelected, setCategorySelected] = useState(null as IPropertyCategory | null);
	const [defaultValue, setDefaultValue] = useState(null as ProductRequest | null);
	const [previewUrls, setPreviewUrls]: any = useState([]);
	const [openLightbox, setOpenLightbox] = useBoolean(false);
	const [currentImage, setCurrentImage] = useState<string | null>(null);
	const [images, setImages] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		reset,
		setValue,
		resetField,
	} = useForm<ProductRequest>();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const urls = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				const url = URL.createObjectURL(files[i]);
				urls.push(url);
			}
		}
		setValue("images", files);
		setPreviewUrls(urls);
	};

	const handleSelectedCategory = (cat: IPropertyCategory | null) => {
		setCategorySelected(cat);
		cat && setValue("category_id", cat?.id);
	};

	/* const onSubmit: SubmitHandler<ProductRequest> = (data) => {
		// console.log(data);
		if (product && productId) {
			data.id = parseInt(productId);
		}
		dispatch(postProduct(data));
	};*/

	const onSubmit: SubmitHandler<ProductRequest> = (data) => {
		const formData = new FormData();

		// Convert data to FormData
		for (const key in data) {
			if (data.hasOwnProperty(key) && data[key as keyof ProductRequest] !== undefined) {
				if (key === 'images' && data.images) {
					if (data.images instanceof FileList) {
						for (let i = 0; i < data.images.length; i++) {
							formData.append('images[]', data.images[i]);
						}
					} else if (Array.isArray(data.images)) {
						data.images.forEach(image => formData.append('images[]', image));
					}
				} else {
					formData.append(key, (data[key as keyof ProductRequest] as any));
				}
			}
		}

		if (product && productId) {
			formData.append('id', productId);
		}

		dispatch(postProduct(formData));
	};



	const getCategoryByID = (id: number) => {
		return categories?.filter((_cat) => _cat.id === id)[0] || null;
	};

	const isCategoryParentSelected = (category: IPropertyCategory) => {
		return !!(defaultValue && categoryParent && category.id === categoryParent.id);
	};

	const isCategorySelected = (category: IPropertyCategory) => {
		const checked = !!(defaultValue && category.id === defaultValue.category_id);
		return checked;
	};

	const isLocationSelected = (location: ILocation) => {
		const checked = !!(defaultValue && location.id.toString() === defaultValue.location_id);
		return checked;
	};

	const handleOpenLightbox = (url: string) => {
		setCurrentImage(url);
		setOpenLightbox(true);
	};

	const handleCloseLightbox = () => {
		setCurrentImage(null);
		setOpenLightbox(false);
	};

	const handleOnDeleteLightbox = (index: number) => {
		setCurrentImage(null);
		setPreviewUrls(previewUrls.filter((item: any, i: number) => i !== index));
	};

	const initForm = (value: ProductRequest) => {
		setValue("id", value.id);
		setValue("category_id", value.category_id);
		setValue("location_id", value.location_id);
		setValue("title", value.title);
		setValue("excerpt", value.excerpt);
		setValue("content", value.content);
		setValue("type", value.type);
		setValue("location_description", value.location_description);
		setValue("price", value.price);
		setValue("deposit_price", value.deposit_price);
		setValue("images", value.images);
		// setDefaultValue(value);
		// setPreviewUrls(value.images ? value.images.map((item: any) => URL.createObjectURL(item)) : []);
	};

	// INIT
	useEffect(() => {
		if (!initialize) {
			dispatch(initProductState());
			setInitialize(true);
		}
	}, [dispatch, initProductState, setInitialize, initialize]);

	// SET DEFAULT VALUES
	useEffect(() => {
		if (product && productId && !defaultValue && categories && categories.length > 0) {
			const value: ProductRequest = {
				id: product.id,
				title: product.title,
				category_id: product.category.id,
				excerpt: product.excerpt,
				content: product.content,
				type: product.type,
				location_id: product.location.id.toString(),
				location_description: product.location_description,
				price: product.price,
				deposit_price: product.deposit_price,
				images: null,
			};
			setDefaultValue(value);
			setImages(product.images.map((image) => image.image));
			initForm(value);

			if (categories && categories.length > 0) {
				if (product.category && product.category && product.category.parent && product.category.parent.id) {
					setCategoryParent(categories?.filter((_cat) => _cat.id === product.category?.parent?.id)[0] || null);
				}

				setCategorySelected(categories?.filter((_cat) => _cat.id === product.category?.id)[0] || null);
			}
		}
	}, [product, productId, defaultValue, setDefaultValue, categories, initForm]);

	// FETCH_SINGLE
	useEffect(() => {
		if (!product && productId && !loading) {
			dispatch(fetchSingleProperties({ id: parseInt(productId) }));
		}
	}, [product, productId, dispatch, fetchSingleProperties, loading]);

	// ! fix this
	// useEffect(() => {
	// 	if (product && productId && !watch("category_id") && product.parent && product.parent?.id && categories) {
	// 		setCategoryParent(categories.find((cat) => cat.id === product.parent?.id));
	// 	}
	// }, []);

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
			snackbar.enqueueSnackbar("Annonce publiee avec succes", { variant: "success", autoHideDuration: 3000 });
			history.push(route("dashboard"));
		}
	}, [snackbar, success, loading, history]);

	// GET_CATEGORIES_BY_PARENT
	useEffect(() => {
		if (!categoryParent && categories && categories.filter((cat) => cat.parent_id === null).length > 0 && initialize && !productId) {
			setCategoryParent(categories.filter((cat) => cat.parent_id === null)[0]);
		}
	}, [categories, categoryParent, initialize, productId, setCategoryParent]);

	return (
		<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
			<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200 mb-5">Rédigez votre annonce</h3>
			<form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
				{/* TYPE */}
				<label className="block">
					<Label>
						Type d'offre <span className="text-red-500">*</span>
					</Label>

					<SelectProductType
						options={["VENTE", "LOCATION", "ACHAT", "AUTRE"]}
						onChangeOption={(value) => setValue("type", value)}
						selected={watch("type") ?? ""}
					/>
					<ErrorMessage errors={errorArray} error="type" customMessage="Veuillez choisir un type d'offre" />
				</label>

				{/* TITLE */}
				<label className="block md:col-span-2">
					<Label>
						Titre <span className="text-red-500">*</span>
					</Label>
					<Input type="text" className="mt-1" {...register("title", { required: true })} defaultValue={(defaultValue && defaultValue.title) ?? ""} />
					<ErrorMessage errors={errorArray} error="title" customMessage="Veuillez choisir un titre" />
				</label>

				{/* CATEGORY */}
				<label className="block md:col-span-2">
					<div className="grid grid-cols-2 gap-6">
						<div>
							<Label>
								Type de bien <span className="text-red-500">*</span>
								{defaultValue?.category_id}
							</Label>

							<div className="block md:col-span-2 p-2">
								<Select
									name="category_id"
									onChange={(event) => {
										setCategoryParent(categories?.filter((_cat) => _cat.id.toString() === event.target.value)[0] || null);
										setCategorySelected(null);
									}}
								>
									{categories &&
										categories
											.filter((category) => category.parent_id === null && category.children.length != 0)
											.map((category) => (
												<option key={category.id} value={category.id} selected={isCategoryParentSelected(category)}>
													{category.name}
												</option>
											))}
								</Select>
							</div>
						</div>

						<div>
							<div className="block md:col-span-2 p-2">
								<Label>
									{/* Type de bien  */}
									<span className="text-red-500">*</span>
								</Label>

								<Select
									name="category_id"
									onChange={(event) => {
										handleSelectedCategory(
											((categoryParent && categoryParent?.children) || []).find((c) => c.id.toString() === event.target.value) || null
										);
									}}
								>
									<option value="">Choisir une sous catégorie</option>
									{((categoryParent && categories && categoryParent.children) || []).map((category) => (
										<option key={category.id} value={category.id} selected={isCategorySelected(category)}>
											{category.name}
										</option>
									))}
								</Select>
							</div>
						</div>
					</div>
					<div>
						<ErrorMessage errors={errorArray} error="category_id" customMessage="Veuillez choisir un type de bien" />
					</div>
				</label>

				{/* VILLE - COUNTRY - STATE */}
				<label className="block md:col-span-2">
					<div className="grid grid-cols-2 gap-6">
						<div>
							<Label>
								Commune <span className="text-red-500">*</span>
							</Label>

							<div className="block md:col-span-2 p-2">
								<Select name="location_id" required onChange={(event) => setValue("location_id", event.target.value)}>
									{locations &&
										locations.map((location) => (
											<option key={location.id} value={location.id} selected={isLocationSelected(location)}>
												{location.name}
											</option>
										))}
								</Select>
								<ErrorMessage errors={errorArray} error="location_id" customMessage="Veuillez choisir une ville" />
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
									{...register("location_description", { required: true })}
								/>
								<ErrorMessage errors={errorArray} error="location_description" customMessage="Veuillez saisir un quartier" />
							</label>
						</div>
					</div>
				</label>

				{/* PRICE - DEPOSIT PRICE */}

				{/* VILLE - COUNTRY - STATE */}
				<label className="block md:col-span-2">
					<div className="grid grid-cols-2 gap-6">
						<div>
							<Label>
								Prix <span className="text-red-500">*</span>
								<div className="flex items-center">
									<Input type="number" className="mt-1" defaultValue={product && product.price} {...register("price", { required: true })} />
									<span className="text-lg ml-2 text-neutral-300"> {CURRENCY} </span>
								</div>
							</Label>
							<ErrorMessage errors={errorArray} error="price" customMessage="Veuillez saisir un prix" />
						</div>

						<div>
							<label className="block md:col-span-2">
								Caution <span className="text-red-500">*</span>
								<div className="flex items-center">
									<Input
										type="number"
										defaultValue={product && product.deposit_price}
										className="mt-1"
										{...register("deposit_price", { required: true })}
									/>
									<span className="text-lg ml-2 text-neutral-300"> {CURRENCY} </span>
								</div>
							</label>
							<ErrorMessage errors={errorArray} error="deposit_price" customMessage="Veuillez saisir une caution" />
						</div>
					</div>
				</label>

				{/* IMAGE */}
				<div className="block md:col-span-2">
					<ImageUploader initialImages={images} maxImages={5} images={images} setImages={setImages} />
				</div>

				{/* EXCERPT */}
				<label className="block md:col-span-2">
					<Label>Description</Label>
					<Textarea className="mt-1" rows={4} maxLength={250} defaultValue={product && product.excerpt} {...register("excerpt")} />
					<p className="mt-1 text-sm text-neutral-500">
						Donnez une description détaillée de votre article. N’indiquez pas vos coordonnées (e-mail, téléphones, …) dans la description.
					</p>
					{watch("excerpt") && (
						<span className={((watch("excerpt") && watch("excerpt")!.length) ?? 0) == 250 ? "text-red-500" : "text-neutral-500"}>
							{watch("excerpt") && watch("excerpt")!.length} / 250
						</span>
					)}
					<ErrorMessage errors={errorArray} error="excerpt" customMessage="Veuillez ajouter une description" />
				</label>

				{/* CONTENT */}
				<label className="block md:col-span-2">
					<Label> Post Content</Label>
					<EditorText onEditorChange={(content: string) => setValue("content", content)} initialValue={product && product.content} />
					<ErrorMessage errors={errorArray} error="content" customMessage="Veuillez ajouter du contenu" />
				</label>

				{/* SUBMIT */}
				<ButtonPrimary className="md:col-span-2" type="submit" disabled={!isValid}>
					Publier Maintenant
				</ButtonPrimary>
			</form>
		</div>
	);
};

export default DashboardSubmitPost;
