import { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import ncNanoId from "utils/ncNanoId";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import CardCities1 from "components/Cards/CardCities1/CardCities1";
import { buildLocationItem } from "utils/utils";
import Slider from "react-slick";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export type breackPoint = "sm" | "md" | "lg";

export interface SectionSliderCitiesTwoProps {
	className?: string;
	heading: string;
	subHeading?: string;
	categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
	sliderStype?: "style1" | "style2";
}

const SectionSliderCitiesTwo: FC<SectionSliderCitiesTwoProps> = ({
	heading,
	subHeading,
	className = "",
	categoryCardType = "card2",
	sliderStype = "style1",
}) => {
	const dispatch = useAppDispatch();
	const cities = useAppSelector(LocationAction.data);
	const loading = useSelector(LocationAction.loading);
	const error = useSelector(LocationAction.error);
	const success = useSelector(LocationAction.success);
	useEffect(() => {
		if (!cities && !loading && !error) {
			dispatch(fetchLocation());
		}
	}, [dispatch, fetchLocation, cities, loading]);

	const get_cities = (): ILocation[] => {
		let data: ILocation[] = [];

		if (cities && cities.length > 0) {
			for (const c of cities) {
				data.push(c);
			}
		}

		data.push(buildLocationItem("Autres Villes")); // push

		console.log("get_cities", data);

		return data;
	};

	const settingsCommon = {
		slidesToShow: 6,
		dots: false,
		infinite: true,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		speed: 500,
		autoplaySpeed: 2000,
		rtl: false,
	};

	const setting_sm = {
		...settingsCommon,
		slidesToShow: 4,
	};

	const setting_md = {
		...settingsCommon,
		slidesToShow: 6,
	};

	const setting_2md = {
		...settingsCommon,
		slidesToShow: 8,
	};

	const settings = {
		...settingsCommon,
		slidesToShow: 8,
	};

	const setting_1xl = {
		...settingsCommon,
		slidesToShow: 9,
	};

	const setting_2xl = {
		...settingsCommon,
		slidesToShow: 12,
	};

	const responsive = [
		{
			breakpoint: 600,
			settings: setting_sm,
		},
		{
			breakpoint: 900,
			settings: setting_md,
		},
		{
			breakpoint: 1000,
			settings: setting_2md,
		},
		{
			breakpoint: 1200,
			settings: settings,
		},
		{
			breakpoint: 1440,
			settings: setting_1xl,
		},
		{
			breakpoint: 1500,
			settings: setting_2xl,
		},
	];

	const handleDragStart = (e: any) => e.preventDefault();

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
		<div className={`nc-SectionHero relative ${className}`} data-nc-id="SectionHero">
			{loading ? (
				<div className="text-center">
					<LoadingSpinner />
				</div>
			) : (
				<>
					<Heading desc="Ou souhaitez-vous trouver votre logement ?" className="mb-2">
						{" "}
					</Heading>

					<AliceCarousel
						mouseTracking
						items={get_cities().map((item, index) => (
							<CardComponentName
								index={index < 3 ? `#${index + 1}` : undefined}
								key={item.id}
								city={item}
							/>
						))}
						responsive={{
							0: { items: 4 },
							1024: { items: 8 },
						}}
						controlsStrategy="alternate"
						autoPlay
						autoPlayInterval={5000}
						disableButtonsControls={true}
						disableDotsControls={true}
						infinite
					/>

					{/* <Slider {...settings} responsive={responsive}>
						{get_cities().map((item, index) => (
							<div
								key={index}
								className={`glide__slide h-auto ${
									sliderStype === "style2" ? "pb-6 xl:pb-8" : ""
								}`}
							>
								<CardComponentName
									index={index < 3 ? `#${index + 1}` : undefined}
									key={item.id}
									city={item}
								/>
							</div>
						))}
					</Slider> */}
				</>
			)}
		</div>
	);
};

export default SectionSliderCitiesTwo;
