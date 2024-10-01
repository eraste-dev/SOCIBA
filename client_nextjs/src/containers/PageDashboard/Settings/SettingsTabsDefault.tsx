import { updateSetting } from "app/axios/actions/api.settings.action";
import { useAppSelector } from "app/hooks";
import { ISettings, SettingsAction } from "app/reducer/settings/settings.";
import ButtonPrimary from "components/Button/ButtonPrimary";
import EditorText from "components/Form/EditorText";
import ErrorMessage from "components/Form/ErrorMessage";
import Label from "components/Form/Label/Label";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export interface SettingsTabsDefaultProps {}

const SettingsTabsDefault: FC<SettingsTabsDefaultProps> = ({}) => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();

	const defaultSettings = useAppSelector(SettingsAction.data)?.default;
	const loading = useAppSelector(SettingsAction.data)?.default?.loading;
	const errorArray = useAppSelector(SettingsAction.data)?.default?.errors;
	const error = useAppSelector(SettingsAction.data)?.default?.error;

	const { register, handleSubmit, watch, setValue, getValues } = useForm<ISettings>();

	const onSubmit = (data: ISettings) => {
		if (!defaultSettings?.get) {
			snackbar.enqueueSnackbar("Données non valides", {
				variant: "error",
				autoHideDuration: 1000,
			});
			return;
		}
		console.log("SubmitHandler", data);
		const payload: ISettings = defaultSettings?.get;
		dispatch(
			updateSetting({
				...payload,
				about_us: data.about_us,
			})
		);
	};

	return (
		<div>
			<form className="" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
				<label className="block">
					<Label> Detail de l'annonce</Label>
					<EditorText
						onEditorChange={(content: string) => setValue("about_us", content)}
						initialValue={defaultSettings?.get?.about_us}
                        minHeight={800}
					/>
					<ErrorMessage
						errors={errorArray}
						error="content"
						customMessage="Veuillez ajouter du contenu"
					/>
				</label>

				<ButtonPrimary className="mt-12 w-full" type="submit">
					Mettre à jour
				</ButtonPrimary>
			</form>
		</div>
	);
};

export default SettingsTabsDefault;
