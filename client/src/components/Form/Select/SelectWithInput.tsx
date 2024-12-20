import React, { ChangeEvent, FC, SelectHTMLAttributes, useState } from "react";

export interface SelectWithInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	sizeClass?: string;
}

const SelectWithInput: FC<SelectWithInputProps> = ({
	className = "",
	sizeClass = "h-11",
	children,
	...args
}) => {
	const [userInput, setUserInput] = useState("");
	const [selectedValue, setSelectedValue] = useState("");

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValue(value);
		if (value === "other") {
			setUserInput(event.target.value);
		} else {
			setUserInput("");
		}
	};

	return (
		<div className={`${sizeClass} ${className}`}>
			<select
				className={`nc-Select ${sizeClass} block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
				value={selectedValue}
				onChange={handleChange}
				{...args}
			>
				{children}
				<option value="other">Autre</option>
			</select>
			{selectedValue === "other" && (
				<input
					type="text"
					className={`block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 mt-1`}
					value={userInput}
					onChange={(event) => setUserInput(event.target.value)}
				/>
			)}
		</div>
	);
};

// const SelectWithInput: FC<SelectWithInputProps> = ({ className = "", sizeClass = "h-11", children, ...args }) => {
// 	return (
// 		<select
// 			className={`nc-Select ${sizeClass} ${className} block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
// 			{...args}
// 		>
// 			{children}
// 		</select>
// 	);
// };

export default SelectWithInput;
