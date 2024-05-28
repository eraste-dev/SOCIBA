import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { SINGLE_GALLERY } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import SingleHeader from "containers/PageSingle/SingleHeader";
import ModalPhotos from "./ModalPhotos";
import { PropertyAction } from "app/reducer/products/propertiy";
import { fetchSingleProperties } from "app/axios/api.action";
import { useParams } from "react-router-dom";
import SingleBreadcrumb from "containers/PageSingle/SingleBreadcrumb";
import SingleNotFound from "./SingleNotFound";

export interface SingleProps {
	className?: string;
}

export interface SinglePageType extends PostDataType {
	tags: TaxonomyType[];
	content: string | ReactNode;
	comments: CommentType[];
}

const Single: FC<SingleProps> = ({ className = "" }) => {
	const dispatch = useAppDispatch();
	const { slug } = useParams<{ slug: string }>();

	const post = useAppSelector(PropertyAction.data);
	const [isOpen, setIsOpen] = useState(false);
	const [openFocusIndex, setOpenFocusIndex] = useState(0);
	const [requestAttempted, setRequestAttempted] = useState(false);

	// UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
	useEffect(() => {
		dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE_GALLERY }));
		return () => {
			dispatch(changeCurrentPage({ type: "/", data: {} }));
		};
	}, []);

	useEffect(() => {
		if (!requestAttempted && post && !post.single && slug) {
			dispatch(fetchSingleProperties({ slug: slug }));
			setRequestAttempted(true);
		}
	}, [post, slug, dispatch, fetchSingleProperties, requestAttempted]);

	const handleOpenModal = (index: number) => {
		setIsOpen(true);
		setOpenFocusIndex(index);
	};
	const handleCloseModal = () => setIsOpen(false);

	const PHOTOS = SINGLE_GALLERY.galleryImgs || [];

	const galleryGrid = () => {
		const imgs = post?.single?.images || [];
		const firstImage = imgs.length > 0 && imgs[0].image;
		const othersImages = imgs.length > 5 && imgs.slice(1, 5).map((img) => img.image);
		const others = imgs.length > 5 && imgs.map((img) => img.image);

		return (
			<div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2 my-10">
				{firstImage && (
					<div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer" onClick={() => handleOpenModal(0)}>
						<NcImage containerClassName="absolute inset-0" className="object-cover w-full h-full rounded-xl" src={firstImage} />
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
					</div>
				)}

				{othersImages &&
					othersImages.map((item, index) => (
						<div key={index} className={`relative rounded-xl overflow-hidden ${index >= 2 ? "hidden sm:block" : ""}`}>
							<NcImage containerClassName="aspect-w-6 aspect-h-5" className="object-cover w-full h-full rounded-xl " src={item || ""} />

							{/* OVERLAY */}
							<div
								className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
								onClick={() => handleOpenModal(index + 1)}
							/>
						</div>
					))}

				<div
					className="absolute hidden md:flex md:items-center md:justify-center right-3 bottom-3 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
					onClick={() => handleOpenModal(0)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
					<span className="ml-2 text-neutral-800 text-sm font-medium">Show all photos</span>
				</div>
			</div>
		);
	};

	return (
		<>
			{post && !post.single ? (
				<SingleNotFound />
			) : (
				<>
					<div className="bg-gray-100 dark:bg-neutral-800">{post && post.single && <SingleBreadcrumb meta={post.single} />}</div>

					<div className={`nc-Single pt-8 lg:pt-16 ${className}`} data-nc-id="Single">
						{/* SINGLE HEADER */}
						<header className="container rounded-xl">
							{/* <SingleHeader metaActionStyle="style2" hiddenDesc pageData={post?.single} /> */}

							{galleryGrid()}
						</header>

						{/* MODAL PHOTOS */}
						<ModalPhotos
							imgs={post?.single?.images.map((item) => item.image) || []}
							isOpen={isOpen}
							onClose={handleCloseModal}
							initFocus={openFocusIndex}
						/>

						{/* FEATURED IMAGE */}
						<div className=""></div>
						{/* SINGLE MAIN CONTENT */}

						{post && post.single && (
							<div className="container">
								<SingleContent data={post?.single} />
							</div>
						)}

						{/* RELATED POSTS */}
						<SingleRelatedPosts />
					</div>
				</>
			)}
		</>
	);
};

export default Single;
