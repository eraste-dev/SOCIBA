import { FC, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editSliders, initEditSliders } from "app/axios/actions/api.action";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { VIEW_ADMIN_POST_CATEGORY } from "containers/PageDashboard/DashboardPostCategories";
import { Slider, sliderAction } from "app/reducer/sliders/sliders";
import ImageUploader from "components/Dashboard/Products/Image/ImageUploader";

export interface EditSliderProps {
	className?: string;
	selected: Slider | null;
	categories: Slider[];
	handleChangeView: (value: VIEW_ADMIN_POST_CATEGORY, item: Slider | null) => void;
}

const loginSocials: { name: string; href: string; icon: string }[] = [];

export type InputsEditSlider = {
	id: number | null;
	image: string;
};

const EditSlider: FC<EditSliderProps> = ({
	className = "",
	selected,
	categories,
	handleChangeView,
}) => {
	const dispatch = useDispatch();

	const history = useHistory();
	const snackbar = useSnackbar();

	const error = useSelector(sliderAction.error);
	const success = useSelector(sliderAction.success);
	const loading = useSelector(sliderAction.loading);
	// const [initialize, setInitialize] = useState(false);
	const [images, setImages] = useState<string[]>([]);
	const [imageFiles, setImageFiles] = useState<File[]>([]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<InputsEditSlider>();

	const onSubmit: SubmitHandler<InputsEditSlider> = (data) => {
		if (imageFiles && imageFiles.length > 0 && !loading) {
			const fd: FormData = new FormData();
			selected?.id && fd.append("id", selected?.id.toString());
			selected?.description && fd.append("description", selected?.description);
			selected?.title && fd.append("title", selected?.title);
			fd.append("image", imageFiles[0]);
			dispatch(editSliders(fd));
		} else {
			snackbar.enqueueSnackbar("Veuillez choisir une image", {
				variant: "error",
				autoHideDuration: 2000,
			});
		}
	};

	useEffect(() => {
		if (error && !loading) {
			snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 3000 });
		}
	}, [error, snackbar, loading]);

	useEffect(() => {
		if (success && !loading) {
			snackbar.enqueueSnackbar("Connexion reussie", {
				variant: "success",
				autoHideDuration: 1000,
			});
			setImageFiles([]);
			setImages([]);
			dispatch(initEditSliders());
		}
	}, [success, snackbar, loading, setImages, setImageFiles]);

	return (
		<div className={`nc-EditSlider shadow-md ${className}`} data-nc-id="EditSlider">
			<div className="max-w-md mx-auto space-y-6">
				{/* FORM */}
				<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
					<label className="block">
						<span className="text-neutral-800 dark:text-neutral-200">Email</span>
						{/* <Input
							className="mt-1"
							defaultValue={selected?.name}
							{...register("name", { required: true })}
						/> */}
						<ImageUploader
							initialImages={images}
							maxImages={1}
							images={images}
							setImages={setImages}
							imageFiles={imageFiles}
							setImageFiles={setImageFiles}
						/>
					</label>

					{!loading ? (
						<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
							<ButtonPrimary type="submit">Ajouter</ButtonPrimary>
							{/* <Button type="reset" onClick={() => handleChangeView("LIST", null)}>
								Annuler
							</Button> */}
						</div>
					) : (
						<LoadingSpinner />
					)}
				</form>

				<div>
					{error && !loading && <p className="text-red-500 text-center">{error}</p>}
				</div>
			</div>
		</div>
	);
};

export default EditSlider;
