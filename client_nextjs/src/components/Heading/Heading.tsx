import NextPrev from "components/NextPrev/NextPrev";
import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	fontClass?: string;
	desc?: ReactNode;
	descHtml?: ReactNode;
	hasNextPrev?: boolean;
	isCenter?: boolean;
	btnTopClassNme?: string;
}

const Heading: React.FC<HeadingProps> = ({
	children,
	desc = "",
	descHtml = "",
	className = "mb-8 md:mb-9 text-neutral-900 dark:text-neutral-50",
	btnTopClassNme = "absolute top-32", // absolute top-56
	isCenter = false,
	hasNextPrev = false,
	...args
}) => {
	return (
		<>
			<div
				className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between`}
			>
				<div className={isCenter ? "text-center w-full max-w-full mx-auto " : "max-w-full"}>
					<h2
						className={`text-base sm:text-base md:text-lg font-medium sm:font-semibold mb-2`}
						{...args}
					>
						{children || `Section Heading`}
					</h2>
					{desc && (
						<span className="mt-2 md:mt-3 mb-2 font-normal block text-base sm:text-sm text-neutral-500 dark:text-neutral-400 text-justify">
							{desc}
						</span>
					)}
					{descHtml && (
						<div
							className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400 text-justify"
							dangerouslySetInnerHTML={{ __html: descHtml }}
						/>
					)}
				</div>
			</div>

			{hasNextPrev && !isCenter && false && (
				<div className="bg-yellow-200 w-full h-full mt-4 flex justify-start sm:ml-2 sm:mt-0 flex-shrink-0">
					<NextPrev
						btnTopClassName={btnTopClassNme}
						onClickNext={() => {}}
						onClickPrev={() => {}}
					/>
				</div>
			)}
		</>
	);
};

export default Heading;
