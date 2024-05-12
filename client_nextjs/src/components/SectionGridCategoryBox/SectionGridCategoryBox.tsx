import { fetchCategories } from "app/axios/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CategoryAction } from "app/reducer/products/propertiy-category";
import CardCategory1 from "components/Card/CardCategory1/CardCategory1";
import CardCategory2 from "components/Card/CardCategory2/CardCategory2";
import CardCategory3 from "components/Card/CardCategory3/CardCategory3";
import CardCategory4 from "components/Card/CardCategory4/CardCategory4";
import CardCategory5 from "components/Card/CardCategory5/CardCategory5";
import Heading from "components/Heading/Heading";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { TaxonomyType } from "data/types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export interface SectionGridCategoryBoxProps {
	categories?: TaxonomyType[];
	headingCenter?: boolean;
	categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
	className?: string;
}

const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
	categories = DATA,
	categoryCardType = "card2",
	headingCenter = true,
	className = "",
}) => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(CategoryAction.data);
	const loading = useSelector(CategoryAction.loading);
	const error = useSelector(CategoryAction.error);
	const success = useSelector(CategoryAction.success);

	useEffect(() => {
		if (!data && !loading) {
			dispatch(fetchCategories());
		}
	}, [dispatch, fetchCategories, data, loading]);

	let CardComponentName = CardCategory2;

	switch (categoryCardType) {
		// case "card1":
		// 	CardComponentName = CardCategory1;
		// 	break;
		case "card2":
			CardComponentName = CardCategory2;
			break;
		// case "card3":
		// 	CardComponentName = CardCategory3;
		// 	break;
		// case "card4":
		// 	CardComponentName = CardCategory4;
		// 	break;
		// case "card5":
		// 	CardComponentName = CardCategory5;
		// 	break;

		default:
			CardComponentName = CardCategory2;
	}

	return (
		<div className={`nc-SectionGridCategoryBox relative ${className}`}>
			<Heading desc="Catégories" isCenter={headingCenter}>
				{" "}
			</Heading>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
				{data && data.slice(0, 8).map((item, i) => <CardComponentName index={i < 3 ? `#${i + 1}` : undefined} key={item.id} category={item} />)}
			</div>
		</div>
	);
};

export default SectionGridCategoryBox;
