import Glide from "@glidejs/glide";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import CardCategory3 from "components/Cards/CardCategory3/CardCategory3";
import CardCategory4 from "components/Cards/CardCategory4/CardCategory4";
import CardCategory5 from "components/Cards/CardCategory5/CardCategory5";
import CardCategoryCities5 from "components/Cards/CardCategory5Cities/CardCategory5";
import CardCities1 from "components/Cards/CardCities1/CardCities1";
import Heading from "components/Heading/Heading";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { TaxonomyType } from "data/types";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ncNanoId from "utils/ncNanoId";

export interface SectionGridCitiesBoxTwoProps {
	headingCenter?: boolean;
	categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
	itemPerRow?: 4 | 5;
	className?: string;
	uniqueSliderClass: string;
}

const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

const SectionGridCitiesBoxTwo: React.FC<SectionGridCitiesBoxTwoProps> = ({
	categoryCardType = "card5",
	headingCenter = true,
	className = "",
	itemPerRow = 5,
	uniqueSliderClass = "",
}) => {
	const dispatch = useAppDispatch();
	const cities = useAppSelector(LocationAction.data);
	const loading = useSelector(LocationAction.loading);
	const error = useSelector(LocationAction.error);
	const success = useSelector(LocationAction.success);

	const UNIQUE_CLASS = `SectionSliderNewCategories_${ncNanoId(uniqueSliderClass)}`;

	const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
		// @ts-ignore
		direction: "ltr",
		perView: itemPerRow,
		gap: 32,
		bound: true,
		breakpoints: {
			1280: {
				perView: itemPerRow - 1,
			},
			1024: {
				gap: 24,
				perView: itemPerRow - 2,
			},
			768: {
				gap: 20,
				perView: itemPerRow - 2,
			},
			640: {
				gap: 20,
				perView: itemPerRow - 3,
			},
			500: {
				gap: 20,
				perView: 1.3,
			},
		},
	});

	useEffect(() => {
		if (!MY_GLIDE) return;
		MY_GLIDE.mount();
	}, [MY_GLIDE]);

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

	const renderCard = (item: ILocation, index: number) => {
		const topIndex = index < 3 ? `#${index + 1}` : undefined;
		switch (categoryCardType) {
			case "card5":
				return <CardCategoryCities5 taxonomy={item} />;
			default:
				return null;
		}
	};

	return (
		<div className={`nc-SectionGridCitiesBox relative ${className}`}>
			<Heading
				desc="Vous recherchez une annonce dans quelle ville ?"
				isCenter={headingCenter}
			>
				{" "}
			</Heading>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
				{cities &&
					cities.map((item, i) => (
						<CardComponentName
							index={i < 3 ? `#${i + 1}` : undefined}
							key={item.id}
							city={item}
						/>
					))}
			</div>
		</div>
	);
};

export default SectionGridCitiesBoxTwo;
