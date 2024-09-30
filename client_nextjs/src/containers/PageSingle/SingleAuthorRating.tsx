import { IUser } from "app/reducer/auth/auth";
import Avatar from "components/Avatar/Avatar";
import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";

export interface SingleAuthorRatingProps {
	defaultValue: number;
	onChange: (value: number) => void;
}

const SingleAuthorRating: FC<SingleAuthorRatingProps> = ({ defaultValue, onChange }) => {
	const [rating, setRating] = useState(defaultValue);

	const handleClick = (value: number) => {
		setRating(value);
		onChange(value);
	};

	return (
		<div className="flex items-center">
			{[1, 2, 3, 4, 5].map((value) => (
				<FaStar
					key={value}
					className={`h-3 w-3 cursor-pointer ${
						value <= rating ? "text-orange-800 drk:text-yellow-400" : "text-gray-300"
					}`}
					onClick={() => handleClick(value)}
				/>
			))}
		</div>
	);
};

export default SingleAuthorRating;
