import { fetchLocation } from "app/axios/actions/api.others.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { LocationAction } from "app/reducer/locations/locations";
import CardCities1 from "components/Card/CardCities1/CardCities1";
import Heading from "components/Heading/Heading";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { TaxonomyType } from "data/types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export interface SectionGridCitiesBoxProps {
	categories?: TaxonomyType[];
	headingCenter?: boolean;
	categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
	className?: string;
}

const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

const SectionGridCitiesBox: React.FC<SectionGridCitiesBoxProps> = ({ categories = DATA, categoryCardType = "card2", headingCenter = true, className = "" }) => {
	const dispatch = useAppDispatch();
	const cities = useAppSelector(LocationAction.data);
	const loading = useSelector(LocationAction.loading);
	const error = useSelector(LocationAction.error);
	const success = useSelector(LocationAction.success);

	useEffect(() => {
		if (!cities && !loading) {
			dispatch(fetchLocation());
		}
	}, [dispatch, fetchLocation, cities, loading]);

	let CardComponentName = CardCities1;

	switch (categoryCardType) {
		case "card2":
			CardComponentName = CardCities1;
			break;

		default:
			CardComponentName = CardCities1;
	}

	return (
		<div className={`nc-SectionGridCitiesBox relative ${className}`}>
			<Heading desc="Vous recherchez une annonce dans quelle ville ?" isCenter={headingCenter}>
				{" "}
			</Heading>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
				{cities && cities.map((item, i) => <CardComponentName index={i < 3 ? `#${i + 1}` : undefined} key={item.id} city={item} />)}
			</div>
		</div>
	);
};

export default SectionGridCitiesBox;
