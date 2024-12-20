import { FC } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { Navigation, Pagination } from "swiper";

export interface GallerySliderThreeProps {
	galleryImgs: string[];
	uniqueClass: string;
	single?: boolean;
}

const GallerySliderThree: FC<GallerySliderThreeProps> = ({
	galleryImgs,
	uniqueClass,
	single = false,
}) => {
	const handleDragStart = (e: any) => e.preventDefault();

	return (
		<AliceCarousel
			mouseTracking
			items={galleryImgs.map((image, index) => (
				<>
					<div
						className="h-full w-full "
						style={{
							backgroundImage: `url(${image})`,
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
						}}
					></div>
				</>
			))}
			responsive={{
				0: { items: 1 },
				1024: { items: 1 },
			}}
			autoPlay={false}
			autoPlayInterval={5000}
			disableButtonsControls={false}
			disableDotsControls={false}
			infinite
		/>
	);
};

export default GallerySliderThree;
