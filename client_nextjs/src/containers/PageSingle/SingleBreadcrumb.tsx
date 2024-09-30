import { IProduct } from "app/reducer/products/product";
import React, { FC } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { route } from "routers/route";

interface SingleBreadcrumbProps {
	meta: IProduct;
}

const SingleBreadcrumb: FC<SingleBreadcrumbProps> = ({ meta }) => {
	const { category } = meta;

	return (
		<div className="nc-SingleBreadcrumb container">
			<nav className=" p-2 rounded-md">
				<ol className="list-none flex">
					<li className="text-primary-500 dark:text-white mr-2">
						<Link to={route("home")}>Acceuil</Link>{" "}
					</li>
					<li className="text-primary-500 dark:text-white mr-2">
						<span className="flex justify-center items-center">
							<FaAngleRight className="text-primary-200 dark:text-white" />
							{category && category.name}
							<FaAngleRight className="text-primary-100 dark:text-white" />
						</span>
					</li>
					<li className="text-primary-500 dark:text-white mr-2">
						<span className="flex justify-center items-center underline">
							{meta.home_type}
						</span>
					</li>
				</ol>
			</nav>
		</div>
	);
};

export default SingleBreadcrumb;
