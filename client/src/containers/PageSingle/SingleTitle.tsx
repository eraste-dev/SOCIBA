import React, { FC } from "react";
import { _f, _suffix } from "utils/money-format";

export interface SingleTitleProps {
	title: string;
	price?: { price: number; deposit_price: number };
	className?: string;
	mainClass?: string;
}

const SingleTitle: FC<SingleTitleProps> = ({
	mainClass = "text-neutral-900 font-semibold text-2xl md:text-3xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100",
	className = "",
	title,
	price,
}) => {
	return (
		<>
			<h1 className={className + " " + mainClass} title={title}>
				{title}
			</h1>

			{price && (
				<>
					<h2 className="text-2xl font-semibold text-primary dark:text-white">{_f(price.price)}</h2>

					{price && price?.deposit_price && (
						<h2 className="text-1xl font-semibold text-primary dark:text-white">
							{_f(price.deposit_price)} {_suffix()}
						</h2>
					)}
				</>
			)}
		</>
	);
};

export default SingleTitle;
