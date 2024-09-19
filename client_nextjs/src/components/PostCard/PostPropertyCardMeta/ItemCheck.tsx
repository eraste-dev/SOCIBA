import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";

interface ItemCheckedProps {
	condition: boolean;
	name: string;
	icon?: JSX.Element;
	className?: string;
	isSingle?: boolean;
}

const ItemChecked: React.FC<ItemCheckedProps> = ({
	condition,
	name,
	icon,
	className,
	isSingle,
}) => {
	const iconSize = 24; // Assurez-vous de définir la taille de l'icône

	const Icon = icon || (
		<CheckCircleIcon
			className="mr-0 sm:mr-1"
			width={iconSize}
			height={iconSize}
			color="green"
		/>
	);

	return (
		<div
			className={`flex overflow-hidden text-sm sm:text-base text-ellipsis ${className}`}
		>
			<div className="flex justify-center">{condition && Icon}</div>
			<span>{name}</span>
		</div>
	);
};

export default ItemChecked;
