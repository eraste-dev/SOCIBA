import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories, isAdmin } from "app/axios/actions/api.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedo } from "react-icons/fa";
import { useAppSelector } from "app/hooks";
import { userRequestAction } from "app/reducer/userRequest/userRequest";
import { ISettings, SettingsAction } from "app/reducer/settings/settings.";
import { fetchDefaultSettings } from "app/axios/actions/api.settings.action";
import SettingsTabs from "./SettingsTabs";

const DashboardSettings = () => {
	// const auth = useSelector(AuthAction.data);
	const dispatch = useDispatch();
	const defaultSettings = useAppSelector(SettingsAction.data)?.default;
	const loading = useAppSelector(userRequestAction.loading);
	const [selected, setSelected] = useState<ISettings | null>(null);

	useEffect(() => {
		if (!loading && !defaultSettings) {
			dispatch(fetchDefaultSettings()); // fetch default settings only once on mount
		}
	}, [dispatch, fetchCategories, loading, defaultSettings]);

	const handleRefresh = () => {
		return dispatch(fetchDefaultSettings());
	};

	const handleAdd = () => {};

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<div className="flex justify-between">
						<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
							Paramètres
						</h3>

						<div className="flex">
							<ButtonPrimary onClick={handleRefresh}>
								<FaRedo className="mr-2" />
								Actualiser
							</ButtonPrimary>
						</div>
					</div>

					<div className="my-2">
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{defaultSettings && defaultSettings.get && (
								<SettingsTabs settings={defaultSettings.get} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardSettings;
