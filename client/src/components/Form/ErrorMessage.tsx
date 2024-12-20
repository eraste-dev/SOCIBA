import React, { FC } from "react";

interface ErrorMessageProps {
	errors: { [key: string]: string[] };
	error: string;
	customMessage?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors, error, customMessage }) => {
	return errors && errors[error] ? (
		<>
			{errors[error].map((e, index) => (
				<div key={index} className="text-red-500">
					{customMessage ? customMessage : e}
				</div>
			))}
		</>
	) : null;
};

export default ErrorMessage;
