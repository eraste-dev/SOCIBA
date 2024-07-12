import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

export interface IListBoxSelectFilterWidget {
	name: string;
	value: string;
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
	const handleChange = (event: SelectChangeEvent<string>) => {
		const selectedValue = event.target.value;
		const selectedItem = options.find((item) => item.value === selectedValue);
		if (selectedItem) {
			onChange(selectedItem);
		}
	};

	return (
		<FormControl className="mb-2" sx={{ mb: 1, minWidth: "100%", maxWidth: "100%" }}>
			<InputLabel id="select-filter-label"> {label} </InputLabel>
			<Select
				fullWidth
				labelId="select-filter-label"
				id="select-filter"
				onChange={handleChange}
			>
				{options.map((item) => (
					<MenuItem
						key={`menu-item-${label}-${item.value}`}
						value={item.value}
						selected={item.selected && item.selected}
					>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ListBoxSelectFilter;
