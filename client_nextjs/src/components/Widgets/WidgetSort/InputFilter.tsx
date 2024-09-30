import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import Input from "components/Form/Input/Input";

interface IFreeInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const InputFilter: React.FC<IFreeInputProps> = ({ label, value, onChange }) => {
	const [valueInput, setValueInput] = React.useState<string>("");
	const [updated, setUpdated] = React.useState<boolean>(false);

	const urlSearchParams = new URLSearchParams(window.location.search);
	const searchText = urlSearchParams.get("searchText");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		setValueInput(inputValue);
		onChange(inputValue);
	};

	React.useEffect(() => {
		if (searchText && searchText != valueInput && !updated) {
			setValueInput(searchText ?? "");
		}
	}, [searchText, valueInput, updated, setValueInput]);

	return (
		<>
			{/* <TextField
				fullWidth
				label={label}
				value={valueInput}
				onChange={handleChange}
				variant="outlined"
				margin="normal"
			/> */}

			<label>{label}</label>
			{/* {searchText} */}
			<Input
				value={valueInput}
				onChange={handleChange}
				onKeyUp={() => setUpdated(true)}
				className="rounded-sm"
				defaultValue={searchText ?? ""}
			/>
		</>
	);
};

export default InputFilter;
