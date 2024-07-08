import { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import NextPrev from "components/NextPrev/NextPrev";
import ncNanoId from "utils/ncNanoId";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import { LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import CardCities1 from "components/Cards/CardCities1/CardCities1";

export interface SectionSliderCitiesProps {
	className?: string;
	heading: string;
	subHeading?: string;
	categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
	sliderStype?: "style1" | "style2";
	perView?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	uniqueSliderClass: string;
}

const SectionSliderCities: FC<SectionSliderCitiesProps> = ({
	heading,
	subHeading,
	className = "",
	categoryCardType = "card2",
	sliderStype = "style1",
	perView = 6,
	uniqueSliderClass,
}) => {
	const UNIQUE_CLASS = "SectionSliderCities_" + ncNanoId(uniqueSliderClass);

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

	const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
		// @ts-ignore
		direction: document.querySelector("html")?.getAttribute("dir") === "rtl" ? "rtl" : "ltr",
		perView: perView,
		gap: 32,
		bound: true,
		breakpoints: {
			1280: { perView: perView - 1 },
			1023: { perView: perView - 2 || 1.2, gap: 20 },
		},
	});

	useEffect(() => {
		if (!MY_GLIDE && cities) return;
		MY_GLIDE.mount();
	}, [MY_GLIDE]);

	const renderHeading = () => {
		if (sliderStype === "style1") {
			return (
				<Heading desc={subHeading} hasNextPrev>
					{heading}
				</Heading>
			);
		} else {
			return (
				<Heading desc={subHeading} isCenter>
					{heading}
				</Heading>
			);
		}
	};

	let CardComponentName = CardCities1;

	switch (categoryCardType) {
		case "card2":
			CardComponentName = CardCities1;
			break;

		default:
			CardComponentName = CardCities1;
	}

	return (
		<div className={`nc-SectionSliderCities ${className}`}>
			<div className={`${UNIQUE_CLASS}`}>
				{renderHeading()}

				{loading && loading && <CardSkeleton arrayLength={4} />}

				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{cities &&
							cities.map((item, index) => (
								<li
									key={index}
									className={`glide__slide h-auto  ${
										sliderStype === "style2" ? "pb-12 xl:pb-16" : ""
									}`}
								>
									<CardComponentName
										index={index < 3 ? `#${index + 1}` : undefined}
										key={item.id}
										city={item}
									/>
								</li>
							))}
					</ul>
				</div>
				{sliderStype === "style2" && (
					<NextPrev btnClassName="w-12 h-12" containerClassName="justify-center" />
				)}
			</div>
		</div>
	);
};

export default SectionSliderCities;
