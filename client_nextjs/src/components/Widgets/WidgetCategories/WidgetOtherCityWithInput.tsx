import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC } from "react";
import { IPropertyFilter } from "app/reducer/products/product";
import InputFilter from "../WidgetSort/InputFilter";

export interface WidgetOtherCityWithInputProps {
	className?: string;
	handleChange: (event: string) => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter?: any;
	groupFilter?: boolean;
}

const WidgetOtherCityWithInput: FC<WidgetOtherCityWithInputProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleChange,
	groupFilter,
}) => {
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
					className="flex flex-col divide-neutral-200 dark:divide-neutral-700 px-1 w-full my-2"
					style={{ position: "relative", top: "-12px" }}
				>
					<InputFilter onChange={(event) => handleChange(event)} label="Ville" value="" />
				</div>
			</div>
		</div>
	);
};

export default WidgetOtherCityWithInput;
