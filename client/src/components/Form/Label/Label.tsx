import React, { FC } from "react";

export interface LabelProps {
	className?: string;
}

const Label: FC<LabelProps> = ({ className = "", children }) => {
	return (
		<span
			// font-medium
			className={`nc-Label ${className} text-neutral-800 text-sm dark:text-neutral-300`}
			data-nc-id="Label"
		>
			{children}
		</span>
	);
};

export default Label;
