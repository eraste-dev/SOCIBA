import LayoutPage from "components/LayoutPage/UserLayout";
import { FC, useEffect, useState } from "react";
import Input from "components/Form/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { initAuth, login } from "app/axios/actions/api.action";
import { AuthAction } from "app/reducer/auth/auth";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import { useSnackbar } from "notistack";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import { PropertyAction } from "app/reducer/products/product";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { VIEW_ADMIN_POST_CATEGORY } from "containers/PageDashboard/DashboardPostCategories";
import Button from "components/Button/Button";

export interface PageLoginProps {
	className?: string;
	selected?: IPropertyCategory;
	categories: IPropertyCategory[];
	handleChangeView: (value: VIEW_ADMIN_POST_CATEGORY, item: IPropertyCategory | null) => void;
}

const loginSocials: { name: string; href: string; icon: string }[] = [];

export type InputsEditCategory = {
	name: string;
	parent_id: number | null;
};

const EditCategory: FC<PageLoginProps> = ({
	className = "",
	selected,
	categories,
	handleChangeView,
}) => {
	const dispatch = useDispatch();

	const history = useHistory();
	const snackbar = useSnackbar();

	const error = useSelector(CategoryAction.error);
	const success = useSelector(CategoryAction.success);
	const loading = useSelector(CategoryAction.loading);
	const [initialize, setInitialize] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<InputsEditCategory>();

	const onSubmit: SubmitHandler<InputsEditCategory> = (data) => {
		console.log(data);
		if (data && data.name && !loading) {
			// dispatch(login(data));
		}
	};

	useEffect(() => {
		if (error && !loading) {
			snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 3000 });
		}
	}, [error, snackbar, loading]);

	// useEffect(() => {
	// 	if (user && success && !loading) {
	// 		snackbar.enqueueSnackbar("Connexion reussie", {
	// 			variant: "success",
	// 			autoHideDuration: 3000,
	// 		});
	// 		history.push(route("dashboard"));
	// 	}
	// }, [user, success, snackbar, history, route, loading]);

	return (
		<div className={`nc-EditCategory ${className}`} data-nc-id="EditCategory">
			<Helmet>
				<title>Se connecter</title>
			</Helmet>
			<LayoutPage
				subHeading="En deux clics, c'est gratuit!"
				headingEmoji="🔑"
				heading="Se connecter"
			>
				<div className="max-w-md mx-auto space-y-6">
					{loginSocials && loginSocials.length > 0 && (
						<>
							{/* OR */}
							<div className="relative text-center">
								<span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
									OR
								</span>
								<div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
							</div>
						</>
					)}
					{/* FORM */}
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Email</span>
							<Input
								className="mt-1"
								defaultValue={selected?.name}
								{...register("name", { required: true })}
							/>
						</label>

						<label className="block">
							<span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
								Parent
							</span>
							<Input
								className="mt-1"
								{...register("parent_id", { required: true })}
							/>
						</label>

						{!loading ? (
							<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
								<ButtonPrimary type="submit">Ajouter</ButtonPrimary>
								<Button type="reset" onClick={() => handleChangeView("LIST", null)}>
									Annuler
								</Button>
							</div>
						) : (
							<LoadingSpinner />
						)}
					</form>

					<div>
						{error && !loading && <p className="text-red-500 text-center">{error}</p>}
					</div>
				</div>
			</LayoutPage>
		</div>
	);
};

export default EditCategory;
