import { AuthAction } from "app/auth/auth";
import { initAuth, updateUser } from "app/axios/api.action";
import { RegisterRequest, UpdateUserRequest } from "app/axios/api.type";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ProductPreviewImageItem from "components/Dashboard/ProductPreviewImageItem";
import ErrorMessage from "components/Form/ErrorMessage";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AvatarUpload from "./updateUser/AvatarUpload";

const DashboardEditProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const snackbar = useSnackbar();

	const user = useSelector(AuthAction.data)?.user;
	const error = useSelector(AuthAction.error);
	const errorArray = useSelector(AuthAction.errors);
	const success = useSelector(AuthAction.success);
	const loading = useSelector(AuthAction.loading);

	const [initialize, setInitialize] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);
	const [avatar, setAvatar] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting, isLoading, isSubmitted },
	} = useForm<UpdateUserRequest>();

	const onSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
		if (data && !loading && user) {
			const payload: UpdateUserRequest = { ...data, id: user.id };
			const formData = new FormData();
			formData.append("id", String(user.id));
			data.name && formData.append("name", data.name);
			data.last_name && formData.append("last_name", data.last_name);
			data.phone && formData.append("phone", data.phone);
			data.phone_whatsapp && formData.append("phone_whatsapp", data.phone_whatsapp);
			if (avatarFile) formData.append("avatar", avatarFile);

			dispatch(updateUser(formData));
			setIsSubmited(true);
		}
	};

	useEffect(() => {
		if (!loading && success && isSubmitted) {
			snackbar.enqueueSnackbar("Votre profile a bien éte mis à jour", { variant: "success", transitionDuration: 300 });
		}
	}, [loading, success, snackbar, isSubmitted]);

	useEffect(() => {
		if (!loading && error && isSubmitted) {
			snackbar.enqueueSnackbar(error, { variant: "error", transitionDuration: 300 });
		}
	}, [loading, error, snackbar]);

	return (
		<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
			<form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
				<AvatarUpload defaultUrl={user?.avatar ?? ""} avatar={avatar ?? ""} setAvatar={setAvatar} setAvatarFile={setAvatarFile} />

				<label className="block">
					<Label>Prénoms</Label>
					<Input placeholder="Votre prénoms" type="text" className="mt-1" {...register("name")} defaultValue={user?.name} />
					<ErrorMessage errors={errorArray} error="name" />
				</label>

				<label className="block">
					<Label>Nom</Label>
					<Input placeholder="Votre nom" type="text" className="mt-1" {...register("last_name")} defaultValue={user?.last_name ?? ""} />
					<ErrorMessage errors={errorArray} error="name" />
				</label>

				<label className="block md:col-span-2">
					<Label> Email</Label>
					<Input type="email" className="mt-1 cursor-not-allowed" defaultValue={user?.email} disabled />
					<ErrorMessage errors={errorArray} error="email" />
				</label>

				<label className="block">
					<Label> Téléphone</Label>
					<Input type="text" className="mt-1 " {...register("phone")} defaultValue={user?.phone} />
					<ErrorMessage errors={errorArray} error="phone" />
				</label>

				<label className="block">
					<Label> Numéro WhatsApp</Label>
					<Input type="text" className="mt-1 " {...register("phone_whatsapp")} defaultValue={user?.phone_whatsapp} />
					<ErrorMessage errors={errorArray} error="phone_whatsapp" />
				</label>

				{/* <label className="block">
					<Label>Current password</Label>
					<Input placeholder="***" type="password" className="mt-1" />
					<ErrorMessage errors={errorArray} error="name" />
				</label>

				<label className="block">
					<Label>New password</Label>
					<Input type="password" className="mt-1" />
					<ErrorMessage errors={errorArray} error="name" />
				</label>  */}

				<ButtonPrimary className="md:col-span-2" type="submit">
					Mise à jour du profil
				</ButtonPrimary>
			</form>
		</div>
	);
};

export default DashboardEditProfile;
