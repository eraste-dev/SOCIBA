import { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Card11 from "components/Cards/Card11/Card11";
import ncNanoId from "utils/ncNanoId";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchFeatureProperties } from "app/axios/actions/api.action";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export interface SectionSliderPostsProps {
	className?: string;
	heading: string;
	subHeading?: string;
	postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11";
	sliderStype?: "style1" | "style2";
	perView?: 2 | 3 | 4 | 6 | 6.2 | 8;
	uniqueSliderClass: string;
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
	heading,
	subHeading,
	className = "",
	postCardName = "card4",
	sliderStype = "style1",
	perView = 5.2,
	uniqueSliderClass,
}) => {
	const UNIQUE_CLASS = "SectionSliderPosts_" + ncNanoId(uniqueSliderClass);

	const dispatch = useAppDispatch();
	const data = useAppSelector(PropertyAction.data)?.features?.get;
	const loading = useSelector(PropertyAction.data)?.features?.loading;
	const error = useSelector(PropertyAction.data)?.features?.error;

	useEffect(() => {
		if (!data && !loading && !error) {
			dispatch(fetchFeatureProperties({ top: true, limit: 8 }));
		}
	}, [dispatch, fetchFeatureProperties, data, loading]);

	const getPostComponent = () => {
		switch (postCardName) {
			// case "card4":
			// 	return Card4;
			// case "card7":
			// 	return Card7;
			// case "card9":
			// 	return Card9;
			// case "card10":
			// 	return Card10;
			// case "card10V2":
			// 	return Card10V2;
			// case "card11":
			// 	return Card11;

			default:
				// return Card4;
				return Card11;
		}
	};

	const renderHeading = () => {
		if (sliderStype === "style1") {
			return (
				<>
					<Heading desc={subHeading} hasNextPrev className="my-2">
						{heading}
					</Heading>
				</>
			);
		} else {
			return (
				<Heading desc={subHeading} isCenter>
					{heading}
				</Heading>
			);
		}
	};

	const handleDragStart = (e: any) => e.preventDefault();

	const CardName = getPostComponent();

	return (
		<div className={`nc-SectionSliderPosts ${className}`}>
			<div className={`${UNIQUE_CLASS}`}>
				{renderHeading()}

				{loading && loading && <CardSkeleton arrayLength={4} />}
				<AliceCarousel
					mouseTracking
					items={
						data &&
						data.map((item, index) => (
							<li
								key={index}
								className={`list-none h-auto px-1  ${
									sliderStype === "style2" ? "pb-12 xl:pb-16" : ""
								}`}
							>
								<CardName post={item} />
							</li>
						))
					}
					responsive={{
						0: { items: 2 },
						1024: { items: 5 },
					}}
					controlsStrategy="alternate"
					autoPlay={false}
					autoPlayInterval={3000}
					disableButtonsControls={true}
					disableDotsControls={true}
					infinite

				/>
			</div>
		</div>
	);
};

export default SectionSliderPosts;
