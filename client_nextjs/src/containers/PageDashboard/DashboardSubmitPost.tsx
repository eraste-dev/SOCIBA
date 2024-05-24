import React, { useEffect, useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction, IUser } from "app/auth/auth";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import SelectProductCategories from "components/Products/add/SelectProductCategories";
import { useAppSelector } from "app/hooks";
import { fetchCategories, fetchSingleProperties, initProductState, postProduct } from "app/axios/api.action";
import SelectProductType from "components/Products/add/SelectProductTypes";
import EditorText from "components/Form/EditorText";
import { getCities } from "data/cities";
import { ProductRequest } from "app/axios/api.type";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { useSnackbar } from "notistack";
import { PropertyAction } from "app/reducer/products/propertiy";
import ErrorMessage from "components/Form/ErrorMessage";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import { useBoolean } from "react-use";
import { Box, IconButton } from "@mui/material";
import { Close as CloseIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ProductPreviewImageItem from "components/Dashboard/ProductPreviewImageItem";
import ShowImageDialog from "components/Dialog/ShowImageDialog";

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

	const onSubmit: SubmitHandler<ProductRequest> = (data) => {
		// console.log(data);
		if (product && productId) {
			data.id = parseInt(productId);
		}
		dispatch(postProduct(data));
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
			<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200">Rédigez votre annonce</h3>
			<form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
				<label className="block">
					<span className="cursor-pointer" onClick={() => console.log(watch(), isValid)}>
						test
					</span>
				</label>

				{/* TYPE */}
				<label className="block">
					<Label>
						Type d'offre <span className="text-red-500">*</span>
					</Label>

					<SelectProductType
						options={["VENTE", "LOCATION", "ACHAT", "AUTRE"]}
						onChangeOption={(value) => setValue("type", value)}
						selected={watch("type")}
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

								{/* <SelectProductCategories
								options={(categoryParent && categories && categoryParent.children) || []}
								onChangeOption={handleSelectedCategory}
								selected={(categorySelected && categorySelected.id) ?? null}
							/> */}
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
					<Label>Ajoutez des photos*</Label>
					<p className="text-xs text-neutral-500">Ajoutez plusieurs photos pour augmenter vos chances d'être contacté</p>

					<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
						<div className="space-y-1 text-center">
							<svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
							<div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
								<label
									htmlFor="files"
									className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
								>
									<span>Upload a file</span>
									<input
										id="files"
										type="file"
										className="sr-only"
										name="files"
										multiple
										// ref={register}
										onChange={handleFileChange}
									/>
								</label>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
						</div>
						<ErrorMessage errors={errorArray} error="files" customMessage="Veuillez ajouter au moins une image" />
					</div>

					{/* IMAGE PREVIEW */}
					<div className="flex flex-wrap mt-4">
						{previewUrls.map((url: string, index: number) => (
							<ProductPreviewImageItem
								key={index}
								index={index}
								url={url}
								handleDelete={() => handleOnDeleteLightbox(index)}
								handleOpen={() => handleOpenLightbox(url)}
							/>
						))}
						<ShowImageDialog open={openLightbox} handleClose={handleCloseLightbox} currentImage={currentImage ?? ""} />
					</div>
				</div>

				{/* EXCERPT */}
				<label className="block md:col-span-2">
					<Label>Description</Label>
					<Textarea className="mt-1" rows={4} maxLength={250} defaultValue={product && product.excerpt} {...register("excerpt")} />
					<p className="mt-1 text-sm text-neutral-500">
						Donnez une description détaillée de votre article. N’indiquez pas vos coordonnées (e-mail, téléphones, …) dans la description.
					</p>
					{watch("excerpt") && (
						<span className={watch("excerpt").length == 250 ? "text-red-500" : "text-neutral-500"}>{watch("excerpt").length} / 250</span>
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
