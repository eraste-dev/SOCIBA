import { useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/product";
import { IPagination, IPaginationAllLinks } from "app/reducer/products/type";
import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

export interface PaginationProps {
	className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "" }) => {
	const pagination: IPagination | undefined = useAppSelector(PropertyAction.data)?.paginate;
	const history = useHistory();

	const FirstPageTsx = () => {
		if (!pagination?.links.first) {
			return <button className="cursor-not-allowed" disabled={true} dangerouslySetInnerHTML={{ __html: "&laquo;" }} />;
		}
		return <a className="mr-2" href={pagination?.links.first ?? "#"} dangerouslySetInnerHTML={{ __html: "&laquo;" }} />;
	};

	const PrevPageTsx = () => {
		if (!pagination?.links.prev) {
			return <button className="cursor-not-allowed" disabled={true} dangerouslySetInnerHTML={{ __html: "Précédent" }} />;
		}
		return <Link to={pagination?.links.prev ?? "#"} dangerouslySetInnerHTML={{ __html: "&lsaquo;" }} />;
	};

	const NextPageTsx = () => {
		if (!pagination?.links.next) {
			return <button className="cursor-not-allowed" disabled={true} dangerouslySetInnerHTML={{ __html: "suivant" }} />;
		}
		return <Link to={pagination?.links.next ?? "#"} dangerouslySetInnerHTML={{ __html: "suivant" }} />;
	};

	const LastPageTsx = () => {
		if (!pagination?.links.last) {
			return <button className="cursor-not-allowed" disabled={true} dangerouslySetInnerHTML={{ __html: "&raquo;" }} />;
		}
		return <Link to={pagination?.links.last ?? "#"} dangerouslySetInnerHTML={{ __html: "&raquo;" }} />;
	};

	const RenderItemTsx = () => {
		const className: string =
			"inline-flex w-11 h-11 items-center justify-center rounded-full bg-white border border-neutral-200 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 mx-2";

		const activeClasseName: string = "bg-primary-6000 text-white dark:bg-primary-500 hover:bg-secondary-500";

		const getActiveClasseName = (active: boolean) => (active ? activeClasseName : "text-neutral-6000 hover:bg-neutral-100");

		let start = 0;
		let end = pagination?.all_links.length ?? 0;

		// Calculate the start and end for slicing the page links to display only 10 pages max
		if (pagination) {
			const currentIndex = pagination.all_links.findIndex((link) => link.active);
			if (currentIndex > -1) {
				start = Math.max(currentIndex - 5, 0);
				end = Math.min(currentIndex + 5, pagination.all_links.length);
			}
		}

		const pageLinks = pagination?.all_links.slice(start, end);

		return (
			<div className="flex items-center  ">
				<FirstPageTsx />
				<PrevPageTsx />

				{pageLinks &&
					pageLinks
						.slice(1, pageLinks.length)
						.map((link, index) => (
							<a
								key={`index_${index}`}
								className={`${className} ${twFocusClass()} ${getActiveClasseName(link.active)} `}
								href={link.url ?? "#"}
								dangerouslySetInnerHTML={{ __html: link.label }}
							/>
						))}

				<NextPageTsx />
				<LastPageTsx />
			</div>
		);
	};

	return (
		<div className="nc-Pagination flex space-x-1">
			<nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}>
				<RenderItemTsx />
			</nav>
		</div>
	);
};

export default Pagination;
