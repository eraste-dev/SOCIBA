import { FC, useRef } from "react";
import NcImage from "components/NcImage/NcImage";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { IProduct } from "app/reducer/products/product";
import MediaVideoTwo from "./MediaVideoTwo";
import GallerySliderTwo from "./GallerySliderTwo";

export interface PostFeaturedMediaTwoProps {
	className?: string;
	post?: IProduct;
	isHover?: boolean;
	single?: boolean;
}

// CHECK FOR VIDEO CARD ON VIEW
let PREV_RATIO = 0.0;

const PostFeaturedMediaTwo: FC<PostFeaturedMediaTwoProps> = ({
	className = " w-full h-full ",
	post,
	isHover = false,
	single = false,
}) => {
	const { featured_image, video_link, images, id } = post || {};

	const videoRef = useRef(null);

	let IS_MOBILE = false;
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	) {
		IS_MOBILE = true;
	}
	const cardIntersectionObserver = useIntersectionObserver(videoRef, {
		freezeOnceVisible: false,
		threshold: 0.999,
		rootMargin: "20px",
	});
	const IN_VIEW = (cardIntersectionObserver?.intersectionRatio || -1) > PREV_RATIO;
	PREV_RATIO = cardIntersectionObserver?.intersectionRatio || 0;

	const renderGallerySlider = () => {
		if (!images || images.length === 0) return null;

		const arrayImgs: string[] = images.map((item) => item.image);
		return (
			<GallerySliderTwo
				single={single}
				galleryImgs={arrayImgs}
				uniqueClass={`PostFeaturedGallery_${id}`}
			/>
		);
	};

	const renderContent = () => {
		// GALLERY
		if (images && images.length > 4) {
			return renderGallerySlider();
		}

		// VIDEO
		if (video_link && (!IS_MOBILE ? isHover : !!IN_VIEW)) {
			return <MediaVideo isHover videoUrl={video_link} />;
		}

		return renderGallerySlider();
	};

	return (
		<div
			className={`nc-PostFeaturedMediaTwo relative ${className}`}
			data-nc-id="PostFeaturedMediaTwo"
			ref={videoRef}
		>
			<NcImage containerClassName="absolute inset-0" src={featured_image} />
			{renderContent()}
		</div>
	);
};

export default PostFeaturedMediaTwo;
