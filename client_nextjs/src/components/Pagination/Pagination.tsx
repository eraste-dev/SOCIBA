import { useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/propertiy";
import { IPagination, IPaginationAllLinks } from "app/reducer/products/type";
import { CustomLink } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

export interface PaginationProps {
	className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "" }) => {
	const pagination: IPagination | undefined = useAppSelector(PropertyAction.data)?.paginate;

	const renderItem = (pag: IPaginationAllLinks, index: number) => {
		if (index === 0) {
			// RETURN ACTIVE PAGINATION
			return (
				<span key={index} className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}>
					{pag.label}
				</span>
			);
		}
		// RETURN UNACTIVE PAGINATION
		return (
			<Link
				key={index}
				className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
				to={pag.url ?? "#"}
			>
				{pag.label}
			</Link>
		);
	};

	return (
		<div className="nc-Pagination flex space-x-1">
			<nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}>{pagination && pagination.allLinks.map(renderItem)}</nav>
		</div>
	);
};

export default Pagination;
