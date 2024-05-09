import React, { FC } from "react";

interface ErrorMessageProps {
	errors: any;
	error: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors, error }) => {
	return errors && errors[error] ? (
		<>
			{Object.values(errors[error]).map((e, index) => (
				<div key={index} className="text-red-500">
					{e}
				</div>
			))}
		</>
	) : null;
};

export default ErrorMessage;
