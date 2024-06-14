import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

export interface IListBoxSelectFilterWidget {
	name: string;
	value: string;
	selected?: boolean;
}

interface IListBoxSelectFilterProps {
	label: string;
	options: IListBoxSelectFilterWidget[];
	onChange: (item: IListBoxSelectFilterWidget) => void;
}

const ListBoxSelectFilter: React.FC<IListBoxSelectFilterProps> = ({ options, onChange, label = "" }) => {
	const handleChange = (event: SelectChangeEvent<string>) => {
		const selectedValue = event.target.value;
		const selectedItem = options.find((item) => item.value === selectedValue);
		if (selectedItem) {
			onChange(selectedItem);
		}
	};

	return (
		<FormControl className="w-52 mb-2" sx={{ mb: 1 }}>
			<InputLabel id="select-filter-label"> {label} </InputLabel>
			<Select labelId="select-filter-label" id="select-filter" onChange={handleChange}>
				{options.map((item) => (
					<MenuItem key={item.value} value={item.value} selected={item.selected && item.selected}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ListBoxSelectFilter;
