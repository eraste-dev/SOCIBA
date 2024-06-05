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
	// const pageMap: IPaginationAllLinks[] | undefined = pagination && pagination.all_links.slice(1, pagination.all_links.length - 1);

	const FirstPageTsx = () => {
		if (pagination?.links.first === null) {
			return <span className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}>1</span>;
		}
		return <Link to={pagination?.links.first ?? "#"} dangerouslySetInnerHTML={{ __html: pagination?.all_links[0].label ?? "<<" }} />;
	};

	const PrevPageTsx = () => {
		if (!pagination?.links.prev) {
			return <></>;
		}

		return <Link to={pagination?.links.prev ?? "#"} dangerouslySetInnerHTML={{ __html: pagination?.all_links[1].label ?? "" }} />;
	};

	const NextPageTsx = () => {
		if (!pagination?.links.next) {
			return <></>;
		}

		return <Link to={pagination?.links.next ?? "#"} dangerouslySetInnerHTML={{ __html: pagination?.all_links[-2].label ?? "" }} />;
	};

	const LastPageTsx = () => {
		if (!pagination?.links.last) {
			return <></>;
		}

		return <Link to={pagination?.links.last ?? "#"} dangerouslySetInnerHTML={{ __html: pagination?.all_links[pagination.all_links.length].label ?? "" }} />;
	};

	const RenderItemTsx = () => {
		const className: string =
			"inline-flex w-11 h-11 items-center justify-center rounded-full bg-white  border border-neutral-200  dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 mx-2";

		const activeClasseName: string = "bg-primary-6000 text-white dark:bg-primary-500 hover:bg-secondary-500";

		const getActiveClasseName = (active: boolean) => (active ? activeClasseName : "text-neutral-6000 hover:bg-neutral-100");
		// FIRST PAGE
		// PREV PAGE

		// ALL PAGE NUMBER

		// NEXT PAGE
		// LAST PAGE

		// RETURN UNACTIVE PAGINATION
		return (
			<div className="flex">
				{/* {pagination && pagination.links && pagination.links.first && <FirstPageTsx />} */}

				{/* {pagination && pagination.links && pagination.links.prev && <PrevPageTsx />} */}

				{pagination &&
					pagination.all_links.map((link, index) => (
						<>
							<a
								key={`index_${index}`}
								className={`${className} ${twFocusClass()} ${getActiveClasseName(link.active)} `}
								href={link.url ?? "#"}
								dangerouslySetInnerHTML={{ __html: link.label }}
							/>
						</>
					))}

				{/* {pagination && pagination.links && pagination.links.next && <NextPageTsx />} */}

				{/* {pagination && pagination.links && pagination.links.last && <LastPageTsx />} */}
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
