import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSliders, isAdmin } from "app/axios/actions/api.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedo } from "react-icons/fa";
import { useAppSelector } from "app/hooks";
import { sliderAction } from "app/reducer/sliders/sliders";
import Slider from "react-slick";
import EditSlider from "./EditSlider";
import SliderManagementTable from "./SliderManagementTable";

export type VIEW_ADMIN_SLDIERS = "LIST" | "EDIT";
const DashboardSliders = () => {
	const dispatch = useDispatch();
	// const auth = useSelector(AuthAction.data);
	const sliders = useAppSelector(sliderAction.data);
	const loading = useAppSelector(sliderAction.loading);
	const [view, setView] = useState<VIEW_ADMIN_SLDIERS>("LIST");
	const [selected, setSelected] = useState<Slider | null>(null);

	useEffect(() => {
		if (!loading && !sliders) {
			dispatch(fetchSliders());
		}
	}, [dispatch, fetchSliders, loading, sliders, isAdmin]);

	const handleChangeView = (view: VIEW_ADMIN_SLDIERS, item: Slider | null) => {
		setSelected(item);
		setView(view);
	};

	const handleRefresh = () => {
		return dispatch(fetchSliders());
	};

	return (
		<div className="flex flex-col space-y-8">
			{/* <EditSlider
				selected={selected}
				categories={sliders || []}
				handleChangeView={() => {
					handleChangeView("LIST", null);
				}}
			/> */}

			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<div className="flex justify-between">
						<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
							Bannières
						</h3>
						<div className="flex">
							{/* <ButtonPrimary onClick={handleAdd}>
								<FaPlus className="mr-2" />
								Ajouter
							</ButtonPrimary> */}

							<ButtonPrimary onClick={handleRefresh}>
								<FaRedo className="mr-2" />
								Actualiser
							</ButtonPrimary>
						</div>
					</div>

					<div className="my-2">
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{sliders && (
								<SliderManagementTable
									rows={sliders}
									// selected={selected}
									// setSelected={setSelected}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardSliders;
