import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSliders, isAdmin } from "app/axios/actions/api.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaPlus, FaRedo } from "react-icons/fa";
import { useAppSelector } from "app/hooks";
import SliderManagementTable from "./SliderManagementTable";
import SliderEditDialog from "./SliderEditDialog";
import { Slider, sliderAction } from "app/reducer/sliders/sliders";
import SliderTabs from "./tabs/SliderTabs";

export type VIEW_ADMIN_SLDIERS = "LIST" | "EDIT";
const DashboardSliders = () => {
	const dispatch = useDispatch();
	// const auth = useSelector(AuthAction.data);
	const sliders = useAppSelector(sliderAction.data);
	const loading = useAppSelector(sliderAction.loading);
	const [selected, setSelected] = useState<Slider | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!loading && !sliders) {
			dispatch(fetchSliders());
		}
	}, [dispatch, fetchSliders, loading, sliders, isAdmin]);

	const handleRefresh = () => {
		return dispatch(fetchSliders());
	};

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<div className="flex justify-between">
						<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
							Bannières
						</h3>
						<div className="flex">
							<ButtonPrimary onClick={() => setOpen(true)}>
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
							{/* {sliders && <SliderManagementTable rows={sliders} />} */}
							<SliderTabs data={sliders || []} />
						</div>
					</div>

					<SliderEditDialog
						handleClose={() => setOpen(false)}
						open={open}
						row={selected}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardSliders;
