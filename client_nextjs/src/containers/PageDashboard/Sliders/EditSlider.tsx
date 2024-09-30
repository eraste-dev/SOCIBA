import { FC, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editSliders, initEditSliders } from "app/axios/actions/api.action";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Slider, sliderAction } from "app/reducer/sliders/sliders";
import ImageUploader from "components/Dashboard/Products/Image/ImageUploader";
import Select from "components/Form/Select/Select";

export const sliderTypeOption: { id: string; label: string }[] = [
	{ id: "HOME", label: "Page d'accueil" },
	{ id: "PRODUCT", label: "Liste produits" },
	{ id: "MOVING", label: "Page déménagement" },
];

export type InputsEditSlider = {
	id: number | null;
	image: string;
};

export interface EditSliderProps {
	className?: string;
	item: Slider | null;
}

const EditSlider: FC<EditSliderProps> = ({ className = "", item }) => {
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
			item?.id && fd.append("id", item?.id.toString());
			item?.description && fd.append("description", item?.description);
			item?.title && fd.append("title", item?.title);
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
				<form className="grid grid-cols-1 gap-" onSubmit={handleSubmit(onSubmit)}>
					<label className="block">
						{/* <span className="text-neutral-800 dark:text-neutral-200">Email</span> */}
						<Select>
							{sliderTypeOption.map((option) => (
								<option key={option.id} value={option.id}>
									{option.label}
								</option>
							))}
						</Select>
					</label>

					<label className="block">
						{/* <span className="text-neutral-800 dark:text-neutral-200">Email</span> */}
						<ImageUploader
							initialImages={images}
							maxImages={1}
							images={images}
							setImages={setImages}
							imageFiles={imageFiles}
							setImageFiles={setImageFiles}
							textOne={""}
						/>
					</label>

					{!loading ? (
						<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
							<ButtonPrimary type="submit">Ajouter</ButtonPrimary>
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
