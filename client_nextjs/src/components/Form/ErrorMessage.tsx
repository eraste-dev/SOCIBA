import React, { FC } from "react";

interface ErrorMessageProps {
	errors: { [key: string]: string[] };
	error: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors, error }) => {
	return errors && errors[error] ? (
		<>
			{errors[error].map((e, index) => (
				<div key={index} className="text-red-500">
					{e}
				</div>
			))}
		</>
	) : null;
};

export default ErrorMessage;
