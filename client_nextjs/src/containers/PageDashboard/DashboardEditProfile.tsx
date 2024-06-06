import { AuthAction } from "app/auth/auth";
import { initAuth, updateUser } from "app/axios/api.action";
import { RegisterRequest } from "app/axios/api.type";
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
	const [previewUrls, setPreviewUrls]: any = useState([]);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<RegisterRequest>();

	const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
		if (data && !loading) {
			dispatch(updateUser(data));
			setIsSubmited(true);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const urls = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				const url = URL.createObjectURL(files[i]);
				urls.push(url);
			}
		}
		setValue("avatar", files);
		setPreviewUrls(urls);
	};

	return (
		<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
			<form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
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
				</div>

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
					<Input type="email" className="mt-1 " {...register("phone")} defaultValue={user?.phone} />
					<ErrorMessage errors={errorArray} error="phone" />
				</label>

				<label className="block">
					<Label> Numéro WhatsApp</Label>
					<Input type="email" className="mt-1 " {...register("phone_whatsapp")} defaultValue={user?.phone_whatsapp} />
					<ErrorMessage errors={errorArray} error="phone_whatsapp" />
				</label>

				<label className="block">
					<Label>Current password</Label>
					<Input placeholder="***" type="password" className="mt-1" />
					<ErrorMessage errors={errorArray} error="name" />
				</label>

				<label className="block">
					<Label>New password</Label>
					<Input type="password" className="mt-1" />
					<ErrorMessage errors={errorArray} error="name" />
				</label>

				<ButtonPrimary className="md:col-span-2" type="submit">
					Mise à jour du profil
				</ButtonPrimary>
			</form>
		</div>
	);
};

export default DashboardEditProfile;
