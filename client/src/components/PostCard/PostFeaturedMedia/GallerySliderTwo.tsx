import { FC } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { Navigation, Pagination } from "swiper";

export interface GallerySliderTwoProps {
	galleryImgs: string[];
	uniqueClass: string;
	single?: boolean;
}

const GallerySliderTwo: FC<GallerySliderTwoProps> = ({
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
					{false && (
						<img
							key={index}
							src={image}
							alt={`Product Image ${index + 1}`}
							onDragStart={handleDragStart}
							className="w-auto h-[100%] object-cover mx-auto"
						/>
					)}

					<div
						className="h-[300px] sm:h-[500px] w-full "
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

export default GallerySliderTwo;
