import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories, isAdmin } from "app/axios/actions/api.action";
import { initializeUserProduct } from "app/axios/actions/api.products.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaPlus, FaRedo } from "react-icons/fa";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import { useAppSelector } from "app/hooks";
import PostCategoriesManagementTable from "components/Dashboard/Products/Categories/PostCategoriesManagementTable";
import EditCategory from "components/Dashboard/Products/Categories/EditCategory";

export type VIEW_ADMIN_POST_CATEGORY = "LIST" | "EDIT";
const DashboardPostCategories = () => {
	const dispatch = useDispatch();
	// const auth = useSelector(AuthAction.data);
	const categories = useAppSelector(CategoryAction.data);
	const loading = useAppSelector(CategoryAction.loading);
	const [view, setView] = useState<VIEW_ADMIN_POST_CATEGORY>("LIST");
	const [selected, setSelected] = useState<IPropertyCategory | null>(null);

	useEffect(() => {
		if (!loading && !categories) {
			dispatch(fetchCategories());
		}
	}, [dispatch, fetchCategories, loading, categories, isAdmin]);

	const handleChangeView = (view: VIEW_ADMIN_POST_CATEGORY, item: IPropertyCategory | null) => {
		dispatch(initializeUserProduct()); //TODO : check if needed
		setSelected(item);
		setView(view);
	};

	const handleRefresh = () => {
		return dispatch(fetchCategories());
	};

	const handleAdd = () => {
		// return dispatch(fetchCategories());
		handleChangeView("EDIT", null);
	};

	return (
		<div className="flex flex-col space-y-8">
			{/* {view === "EDIT" && (
				<EditCategory
					selected={selected}
					categories={categories || []}
					handleChangeView={() => {
						handleChangeView("LIST", null);
					}}
				/>
			)} */}

			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<div className="flex justify-between">
						<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
							Type de biens
						</h3>
						<div className="flex">
							<ButtonPrimary onClick={handleAdd}>
								<FaPlus className="mr-2" />
								Ajouter
							</ButtonPrimary>

							<ButtonPrimary onClick={handleRefresh}>
								<FaRedo className="mr-2" />
								Actualiser
							</ButtonPrimary>
						</div>
					</div>

					<div className="my-2">
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{categories && (
								<PostCategoriesManagementTable
									rows={categories}
									handleChangeView={handleChangeView}
								/>
							)}
						</div>
					</div>
				</div>

				{/* {view === "EDIT" && selected && (
					<div className="mx-3 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8 bg-gray-100 dark:bg-neutral-900 rounded-tl-lg rounded-tr-lg ">
						<UserProductList user={selected} handleChangeView={handleChangeView} />
					</div>
				)} */}
			</div>
		</div>
	);
};

export default DashboardPostCategories;
