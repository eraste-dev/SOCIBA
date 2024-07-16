import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface IFreeInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const InputFilter: React.FC<IFreeInputProps> = ({ label, value, onChange }) => {
	const [valueInput, setValueInput] = React.useState<string>("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
        setValueInput(inputValue);
		onChange(inputValue);
	};

	return (
		<TextField
		fullWidth
			label={label}
			value={valueInput}
			onChange={handleChange}
			variant="outlined"
			margin="normal"
		/>
	);
};

export default InputFilter;
