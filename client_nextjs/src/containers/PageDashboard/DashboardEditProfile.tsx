import { AuthAction } from "app/reducer/auth/auth";
import { updateUser } from "app/axios/actions/api.action";
import { UpdateUserRequest } from "app/axios/api.type";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ErrorMessage from "components/Form/ErrorMessage";
import Input from "components/Form/Input/Input";
import Label from "components/Form/Label/Label";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AvatarUpload from "./Users/updateUser/AvatarUpload";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { MetaAction } from "app/reducer/meta/meta";
import { fetchMetaFunction } from "app/axios/actions/api.meta.action";
import Select from "components/Form/Select/Select";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import UpdatePassword from "./Users/form/UpdatePassword";
import EditUserTab from "./Users/form/EditUserTab";

const DashboardEditProfile = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const snackbar = useSnackbar();

	const user = useSelector(AuthAction.data)?.user;
	const expire = useSelector(AuthAction.data)?.expire;
	const error = useSelector(AuthAction.error);
	const errorArray = useSelector(AuthAction.errors);
	const success = useSelector(AuthAction.success);
	const loading = useSelector(AuthAction.loading);

	// const [initialize, setInitialize] = useState(false);
	const [avatar, setAvatar] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const functions = useSelector(MetaAction.data)?.functions;
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting, isLoading, isSubmitted },
	} = useForm<UpdateUserRequest>();

	const onSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
		console.log(">>> payload", user);

		if (!user) return;
		const payload: UpdateUserRequest = { ...data, id: user.id };
		const formData = new FormData();

		user && user.id && formData.append("id", String(user?.id));
		data.name && formData.append("name", data.name);
		data.last_name && formData.append("last_name", data.last_name);
		data.phone && formData.append("phone", data.phone);
		data.phone_whatsapp && formData.append("phone_whatsapp", data.phone_whatsapp);
		data.fonction && formData.append("fonction", data.fonction);
		// data.influence_zone_id && formData.append("influence_zone_id", data.influence_zone_id);

		if (avatarFile) formData.append("avatar", avatarFile);
		if (avatarFile) payload.avatar = avatarFile;
		console.log(">>> payload", payload);
		dispatch(updateUser(payload));
	};

	useEffect(() => {
		if (!functions?.loading && !functions?.data && !functions?.error) {
			dispatch(fetchMetaFunction());
		}

		if (functions && functions.error) {
			snackbar.enqueueSnackbar(functions.error, {
				variant: "error",
				autoHideDuration: 2000,
			});
		}
	}, [dispatch, functions, fetchMetaFunction]);

	useEffect(() => {
		if (!loading && success && isSubmitted) {
			snackbar.enqueueSnackbar("Votre profile a bien éte mis à jour", {
				variant: "success",
				autoHideDuration: 2000,
			});
		}
	}, [loading, success, snackbar, isSubmitted]);

	useEffect(() => {
		if (!loading && error && isSubmitted) {
			snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 2000 });
		}
	}, [loading, error, snackbar]);

	return (
		<div className="flex justify-center">
			<EditUserTab />
		</div>
	);
};

export default DashboardEditProfile;
