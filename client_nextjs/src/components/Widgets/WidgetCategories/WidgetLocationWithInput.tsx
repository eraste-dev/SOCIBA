import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch } from "app/hooks";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC } from "react";
import { IPropertyFilter } from "app/reducer/products/product";
import { updateParamsUrl } from "utils/utils";
import InputFilter from "../WidgetSort/InputFilter";

export interface WidgetLocationWithSelectProps {
	className?: string;
	handleFetch?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter?: any;
	groupFilter?: boolean;
}

const WidgetLocationWithInput: FC<WidgetLocationWithSelectProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleFetch,
	useStateFilter,
	setUseStateFilter,
	groupFilter,
}) => {
	const dispatch = useAppDispatch();

	const handleChange = (value: string) => {
		updateParamsUrl("neighborhood", value);
		dispatch(setFilters({ neighborhood: value }));
		setUseStateFilter && setUseStateFilter({ ...useStateFilter, neighborhood: value });
		if (value && value.length > 3) {
			setTimeout(() => {
				handleFetch && handleFetch();
			}, 100);
		}
	};

	return (
		<div className={!groupFilter ? `${className}` : ""}>
			<div
				className={
					!groupFilter
						? `nc-WidgetLocations rounded-3xl overflow-hidden ${className}`
						: "flex flex-wrap"
				}
				data-nc-id="WidgetLocations"
			>
				{!groupFilter && <WidgetHeading1 title="Communes" />}
				<div
					className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 px-1"
					style={{ position: "relative", top: "-12px" }}
				>
					<InputFilter onChange={handleChange} label="Quartier" value="" />
				</div>
			</div>
		</div>
	);
};

export default WidgetLocationWithInput;
