import { SelectChangeEvent } from "@mui/material";
import Label from "components/Form/Label/Label";
import Select from "components/Form/Select/Select";
import { useState } from "react";

export interface IListBoxSelectFilterWidget {
	name: string;
	value: string;
	uuid?: string[];
	selected?: boolean;
}

interface IListBoxSelectFilterProps {
	label: string;
	labelID: string;
	options: IListBoxSelectFilterWidget[];
	onChange: (item: IListBoxSelectFilterWidget) => void;
}

const ListBoxSelectFilter: React.FC<IListBoxSelectFilterProps> = ({
	options,
	onChange,
	label = "",
	labelID = "select-filter",
}) => {
	const [currentValue, setcurrentValue]: any = useState({ current: null, key: labelID });

	const handleChange = (event: SelectChangeEvent<string>) => {
		const selectedValue = event.target.value;
		const selectedItem = options.find((item) => item.value === selectedValue);

		if (selectedItem && selectedItem.value) {
			onChange(selectedItem);
		}
	};

	return (
		<>
			<div className="mb-4" style={{ minWidth: "100%", maxWidth: "100%" }}>
				<Label> {label} </Label>
				<Select
					onChange={(e) => {
						console.log("LixBox :: ### ", e.target.value);
						handleChange(e as any);
					}}
					style={{ cursor: "pointer", width: "100%", minWidth: "100%" }}
				>
					{options.map((item) => (
						<option
							key={`menu-item-${label}-${item.value}`}
							value={item.value}
							selected={item.selected}
							onClick={() => setcurrentValue({ ...currentValue, current: item })}
						>
							{item.name}
						</option>
					))}
				</Select>
			</div>
		</>
	);
};

export default ListBoxSelectFilter;
