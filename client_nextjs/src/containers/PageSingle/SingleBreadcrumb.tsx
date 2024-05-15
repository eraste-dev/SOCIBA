import { IProperty } from "app/reducer/products/propertiy";
import React, { FC } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { route } from "routers/route";

interface SingleBreadcrumbProps {
	meta: IProperty;
}

const SingleBreadcrumb: FC<SingleBreadcrumbProps> = ({ meta }) => {
	const { category } = meta;

	return (
		<div className="nc-SingleBreadcrumb container">
			<nav className="bg-gray-200- p-4 rounded-md">
				<ol className="list-none flex">
					<li className="text-primary-500 mr-2">
						<Link to={route("home")}>Acceuil</Link>{" "}
					</li>
					<li className="text-primary-500 mr-2">
						<Link to={meta.href} className="flex justify-center items-center">
							<FaAngleRight className="text-primary-200" />
							{category.name}
							<FaAngleRight className="text-primary-100" />
						</Link>
					</li>
					<li className="text-primary-500 mr-2">
						<Link to={meta.href} className="flex justify-center items-center underline">
							{meta.title}
						</Link>
					</li>
				</ol>
			</nav>
		</div>
	);
};

export default SingleBreadcrumb;
