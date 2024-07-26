import { FC, useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/UserLayout";
import Input from "components/Form/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "app/reducer/auth/auth";
import { RegisterRequest } from "app/axios/api.type";
import { initAuth, registerUser } from "app/axios/actions/api.action";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorMessage from "components/Form/ErrorMessage";
import SignUpSuccess from "./SignUpSuccess";
import { Tooltip } from "@mui/material";
import Select from "components/Form/Select/Select";
import { MetaAction } from "app/reducer/meta/meta";
import { fetchMetaFunction } from "app/axios/actions/api.meta.action";
import { useSnackbar } from "notistack";
import { LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import SelectWithInput from "components/Form/Select/SelectWithInput";

export interface PageSignUpProps {
	className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();

	const [initialize, setInitialize] = useState(false);
	const [samePhone, setSamePhone] = useState(false);
	const [CGI, setCGI] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const user = useSelector(AuthAction.data)?.user;
	const error = useSelector(AuthAction.error);
	const succuss = useSelector(AuthAction.data)?.registrationSuccess;
	const errorArray = useSelector(AuthAction.errors);
	const loading = useSelector(AuthAction.loading);

	const functions = useSelector(MetaAction.data)?.functions;

	const locations = useSelector(LocationAction.data);
	const locationLoading = useSelector(LocationAction.loading);
	const locationError = useSelector(LocationAction.error);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterRequest>();

	const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
		if (samePhone) {
			data.phone_whatsapp = data.phone;
		}
		if (!loading && CGI) {
			dispatch(registerUser(data));
		}
	};

	useEffect(() => {
		console.log(functions);

		if (!functions?.loading && !functions?.data) {
			dispatch(fetchMetaFunction());
		}

		if (functions && functions.error) {
			snackbar.enqueueSnackbar(functions.error, { variant: "error", autoHideDuration: 3000 });
		}
	}, [dispatch, functions, functions?.data, functions?.loading, initialize, user]);

	useEffect(() => {
		if (locationLoading) return;

		if (locations === undefined) {
			dispatch(fetchLocation());
		}

		if (locations && locationError) {
			snackbar.enqueueSnackbar(locationError, { variant: "error", autoHideDuration: 3000 });
		}
	}, [dispatch, locations, locationLoading, locationError]);

	useEffect(() => {
		if (!initialize && !user) {
			setInitialize(true);
			dispatch(initAuth());
		}
	}, [initialize, dispatch, initAuth, user]);

	if (succuss) {
		return <SignUpSuccess />;
	}

	return (
		<div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
			<Helmet>
				<title>Inscription</title>
			</Helmet>
			<LayoutPage
				subHeading="Bienvenue dans sur notre plateforme."
				headingEmoji="🎉"
				heading="Sign up"
			>
				<div className="max-w-md mx-auto space-y-6">
					{/* FORM */}
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
						{/* ? NAME */}
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Nom <span className="text-red-500">*</span>{" "}
							</span>
							<Input
								type="text"
								placeholder="Nom"
								className="mt-1"
								{...register("name", { required: true })}
							/>
							<ErrorMessage errors={errorArray} error="name" />
						</label>

						{/* ? LAST_NAME */}
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Prénoms</span>
							<Input
								type="text"
								placeholder="Prénoms"
								className="mt-1"
								{...register("last_name")}
							/>
							<ErrorMessage errors={errorArray} error="last_name" />
						</label>

						{/* ? EMAIL */}
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Email <span className="text-red-500">*</span>{" "}
							</span>
							<Input
								type="email"
								placeholder="example@example.com"
								className="mt-1"
								{...register("email", { required: true })}
							/>
							<ErrorMessage errors={errorArray} error="email" />
						</label>

						{/* USER_FONCTION */}
						{!functions?.data ||
							(functions?.data?.length === 0 && (
								<div className="p-2 mt-2 bg-red-500 text-white dark:bg-red-900 rounded-lg">
									<p className="text-sm">Aucune fonction n'est disponible.</p>
								</div>
							))}

						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Vous êtres ? <span className="text-red-500">*</span>{" "}
							</span>
							{/* <Input type="text" placeholder="Fonction" className="mt-1" {...register("function")} /> */}
							<Select
								className="mt-1"
								{...register("function")}
								disabled={!functions?.data || functions?.data?.length === 0}
							>
								<option value="" selected>
									Aucun
								</option>
								{functions &&
									functions.data &&
									functions.data?.length > 0 &&
									functions.data.map((func) => (
										<option key={func.id} value={func.value}>
											{func.value}
										</option>
									))}
							</Select>
							<ErrorMessage errors={errorArray} error="function" />
						</label>

						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Zone D'influence <span className="text-red-500">*</span>{" "}
							</span>
							<SelectWithInput
								className="mt-1"
								{...register("influence_zone_id")}
								disabled={!locations || locations.length === 0}
							>
								{locations &&
									locations &&
									locations.length > 0 &&
									locations.map((location) => (
										<option key={location.id} value={location.id}>
											{location.name}
										</option>
									))}
							</SelectWithInput>
							<ErrorMessage errors={errorArray} error="function" />
						</label>

						{/* ? PASSWORD */}
						<label className="block">
							<Tooltip title="Afficher le mot de passe pour être sûr que vous écrivez cette valeur">
								<span className="flex items-center text-neutral-800 dark:text-neutral-200">
									Password <span className="text-red-500">*</span>{" "}
									{showPassword ? (
										<FaEye
											className="cursor-pointer ml-2 text-gray-400 "
											onClick={() => setShowPassword(!showPassword)}
										/>
									) : (
										<FaEyeSlash
											className="cursor-pointer ml-2 text-gray-400 "
											onClick={() => setShowPassword(!showPassword)}
										/>
									)}
								</span>
							</Tooltip>
							<div className="position-relative">
								<Input
									type={showPassword ? "text" : "password"}
									className="mt-1 position-relative"
									{...register("password", { required: true })}
								/>
							</div>
							<ErrorMessage errors={errorArray} error="password" />
						</label>

						{/* ? PHONE */}
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Téléphone
							</span>
							<Input
								type="text"
								placeholder="Téléphone"
								className="mt-1"
								{...register("phone", { required: true })}
							/>
							<ErrorMessage errors={errorArray} error="phone" />
						</label>

						{/* ? SAME PHONE */}
						<label className="flex items-center">
							<input
								type="checkbox"
								className="mt-1 mr-2 border-slate-200 "
								checked={samePhone}
								onChange={() => setSamePhone(!samePhone)}
							/>
							<span className="text-neutral-800 dark:text-neutral-200">
								Même numéro pour Whatsapp
							</span>
						</label>

						{/* ? WHATSAPP PHONE */}
						{!samePhone && (
							<label className="block">
								<span className="text-neutral-800 dark:text-neutral-200">
									Numéro Whatsapp
								</span>
								<Input
									type="text"
									placeholder="Whatsapp"
									className="mt-1"
									{...register("phone_whatsapp", { required: true })}
								/>
								<ErrorMessage errors={errorArray} error="phone_whatsapp" />
							</label>
						)}

						<div className="flex mt-3 cursor-pointer">
							{/* LEGAL CHECKBOX */}
							<input
								type="checkbox"
								name="CGI"
								className="mt-1 mr-2 border-slate-200 "
								checked={CGI}
								onChange={() => setCGI(!CGI)}
							/>
							<label
								htmlFor="CGI"
								className="text-neutral-800 dark:text-neutral-200"
								onClick={() => setCGI(!CGI)}
							>
								J'accepte{" "}
								<span className="underline">les conditions d'utilisation</span> et{" "}
								<span className="underline">la politique d'utilisation</span>{" "}
							</label>
						</div>

						{!loading ? (
							<ButtonPrimary type="submit" disabled={!CGI}>
								S'inscrire
							</ButtonPrimary>
						) : (
							<LoadingSpinner />
						)}
					</form>

					<div>
						{error && !loading && <p className="text-red-500 text-center">{error}</p>}
					</div>

					{/* ==== */}
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						Vous avez deja un compte? {` `}
						<NcLink to="/login">Sign in</NcLink>
					</span>
				</div>
			</LayoutPage>
		</div>
	);
};

export default PageSignUp;
