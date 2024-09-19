import { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { PostDataType } from "data/types";
import NextPrev from "components/NextPrev/NextPrev";
import Card11 from "components/Cards/Card11/Card11";
import ncNanoId from "utils/ncNanoId";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchFeatureProperties } from "app/axios/actions/api.action";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";

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
	perView = 6.2,
	uniqueSliderClass,
}) => {
	const UNIQUE_CLASS = "SectionSliderPosts_" + ncNanoId(uniqueSliderClass);

	const dispatch = useAppDispatch();
	const data = useAppSelector(PropertyAction.data)?.features?.get;
	const loading = useSelector(PropertyAction.data)?.features?.loading;
	const error = useSelector(PropertyAction.error);

	useEffect(() => {
		if (!data && !loading && !error) {
			dispatch(fetchFeatureProperties({ top: true, limit: 8 }));
		}
	}, [dispatch, fetchFeatureProperties, data, loading]);

	const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
		// @ts-ignore
		direction: document.querySelector("html")?.getAttribute("dir") === "rtl" ? "rtl" : "ltr",
		perView: perView,
		gap: 20,
		bound: true,
		breakpoints: {
			1600: { perView: perView },
			1280: { perView: 4.2 },
			1023: { perView: 3.2, gap: 8 },
			767: { perView: 2.2, gap: 8 },
		},
	});

	useEffect(() => {
		if (!MY_GLIDE && data) return;
		MY_GLIDE.mount();
	}, [MY_GLIDE]);

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

	const CardName = getPostComponent();

	return (
		<div className={`nc-SectionSliderPosts ${className}`}>
			<div className={`${UNIQUE_CLASS}`}>
				{renderHeading()}

				{loading && loading && <CardSkeleton arrayLength={4} />}

				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{data &&
							data.map((item, index) => (
								<li
									key={index}
									className={`glide__slide h-auto  ${
										sliderStype === "style2" ? "pb-12 xl:pb-16" : ""
									}`}
								>
									<CardName post={item} />
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

export default SectionSliderPosts;
