import React from "react";

interface CardSkeletonProps {
	arrayLength: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ arrayLength = 4 }) => {
	const Skeleton = () => {
		return (
			<div className="animate-pulse flex flex-col p-4 border rounded-lg shadow-md bg-white dark:bg-neutral-800 ">
				<div className="flex items-center mb-4">
					<div className="bg-gray-300 h-4 w-16 rounded mr-2 dark:bg-neutral-500"></div>
					<div className="bg-gray-300 h-4 w-24 rounded dark:bg-neutral-500"></div>
				</div>
				<div className="bg-gray-300 h-40 w-full rounded mb-4 dark:bg-neutral-500"></div>
				<div className="bg-gray-300 h-6 w-32 rounded mb-2 dark:bg-neutral-500"></div>
				<div className="bg-gray-300 h-4 w-48 rounded mb-4 dark:bg-neutral-500"></div>
				<div className="flex items-center mb-4 dark:bg-neutral-500">
					<div className="bg-gray-300 h-4 w-6 rounded-full mr-2 dark:bg-neutral-500"></div>
					<div className="bg-gray-300 h-4 w-24 rounded dark:bg-neutral-500"></div>
				</div>
				<div className="bg-gray-300 h-4 w-24 rounded mb-2 dark:bg-neutral-500"></div>
				<div className="flex items-center">
					<div className="bg-gray-300 h-8 w-8 rounded-full mr-2 dark:bg-neutral-500"></div>
					<div className="bg-gray-300 h-4 w-16 rounded dark:bg-neutral-500"></div>
				</div>
			</div>
		);
	};
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{Array(arrayLength)
				.fill(0)
				.map((_, index) => (
					<Skeleton key={index} />
				))}
		</div>
	);
};

export default CardSkeleton;
