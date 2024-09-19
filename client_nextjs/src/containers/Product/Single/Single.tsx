import { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import { SINGLE_GALLERY } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import SingleHeader from "containers/PageSingle/SingleHeader";
import ModalPhotos from "./ModalPhotos";
import { PropertyAction } from "app/reducer/products/product";
import { fetchSimilars, fetchSingleProperties } from "app/axios/actions/api.action";
import { useLocation, useParams } from "react-router-dom";
import SingleBreadcrumb from "containers/PageSingle/SingleBreadcrumb";
import SingleNotFound from "./SingleNotFound";
import SingleImage from "containers/PageSingle/SingleImage";
import { _f, _suffix } from "utils/money-format";
import Loading from "components/UI/Loading";
import ContactSeller from "containers/PageSingle/sellerData";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import CategoryPropertyBadgeTwo from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeTwo";
import Card11Price from "components/Cards/Card11/Card11Price";
import PostFeaturedMedia from "components/PostCard/PostFeaturedMedia/PostFeaturedMedia";
import PostCardDetailMeta from "components/PostCard/PostPropertyCardMeta/PostCardDetailMeta";
import { AuthorLine } from "containers/PageSingle/SingleAuthor";

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

	const single = useAppSelector(PropertyAction.data)?.single;
	const related = useAppSelector(PropertyAction.data)?.similars;
	// const [fetchRelated, setFetchRelated] = useState(false);
	const loading = useAppSelector(PropertyAction.loading);
	const [isOpen, setIsOpen] = useState(false);
	const [openFocusIndex, setOpenFocusIndex] = useState(0);
	const [isHover, setIsHover] = useState(false);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const idParam = searchParams.get("id");

	const className_text = "text-base font-semibold text-green-900 dark:text-neutral-400";

	useEffect(() => {
		if (!loading && !single && slug) {
			if (idParam) {
				dispatch(fetchSingleProperties({ id: idParam }));
			} else {
				dispatch(fetchSingleProperties({ slug: slug }));
			}
		}
	}, [single, slug, dispatch, fetchSingleProperties, loading]);

	useEffect(() => {
		const condition1 = single && (single.category.id || single?.location.id);
		const condition2 = !related && !loading;
		if (condition1 && condition2) {
			const payload: IGetSearchPropertiesParams = {};
			if (single?.category.id) {
				payload.category = single?.category.id;
			}

			if (single?.location.id) {
				// payload.location = single?.location.id;
			}
			dispatch(fetchSimilars({ ...payload, limit: 12 }));
		}
	}, [related, single, dispatch, fetchSimilars, loading]);

	const handleOpenModal = (index: number) => {
		setIsOpen(true);
		setOpenFocusIndex(index);
	};
	const handleCloseModal = () => setIsOpen(false);

	const PHOTOS = SINGLE_GALLERY.galleryImgs || [];

	if (loading) {
		return <Loading />;
	}

	if (!loading && !single) {
		<SingleNotFound />;
	}

	return (
		<>
			<div className="bg-gray-100 dark:bg-neutral-800">
				{single && <SingleBreadcrumb meta={single} />}
			</div>

			<div className={`nc-Single pt-8 lg:pt-16 ${className}`} data-nc-id="Single">
				{/* SINGLE HEADER */}
				<div className="container">
					<header className="rounded-xl">
						{single ? (
							<SingleHeader metaActionStyle="style2" hiddenDesc pageData={single} />
						) : null}
					</header>

					<div className="mt-5 h-3/4">
						<div
							className={`nc-Card11 relative flex flex-col group h-full w-auto `}
							data-nc-id="Card11"
							onMouseEnter={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
						>
							{single ? (
								<PostFeaturedMedia post={single} isHover={isHover} single={true} />
							) : null}
						</div>
					</div>

					{single ? (
						<SingleImage meta={single} handleOpenModal={handleOpenModal} />
					) : null}

					<div className="grid grid-cols-6 mb-4">
						<div className="col-span-4">
							<div className="w-full">
								{/* <CategoryPropertyBadgeTwo className="text-lg" item={single} /> */}
								{single && single.home_type ? (
									<AuthorLine
										label={"Détail"}
										value={`${single?.home_type}`}
										classNameValue={className_text}
									/>
								) : null}

								{single?.location && single.location.name ? (
									<AuthorLine
										label={single.location.unlisted ? "Ville" : "Commune"}
										value={`${single?.location.name}`}
										classNameValue={className_text}
									/>
								) : null}

								{single?.location_description ? (
									<AuthorLine
										label={"Quartier"}
										value={single.location_description}
										classNameValue={className_text}
									/>
								) : null}
							</div>
						</div>

						<div className="col-span-2">
							<div className="w-full flex justify-end ">
								{single && (
									<Card11Price
										item={single}
										className="text-primary-6000 dark:text-neutral-500 font-semibold sm:text-2xl text-lg flex flex-col justify-end text-right "
									/>
								)}
							</div>
						</div>
					</div>

					{/* MODAL PHOTOS */}
					{single && (
						<ModalPhotos
							imgs={single.images.map((item) => item.image) || []}
							isOpen={isOpen}
							onClose={handleCloseModal}
							initFocus={openFocusIndex}
						/>
					)}

					{/* SINGLE MAIN CONTENT */}

					{single && <PostCardDetailMeta meta={single} isSingle={true} />}

					{single && (
						<div className="">
							<SingleContent data={single} />
						</div>
					)}

					<ContactSeller
						productLink={single?.href}
						phone={single!.author!.phone ? single!.author!.phone : undefined}
						whatsapp={
							single!.author!.phone_whatsapp
								? single!.author!.phone_whatsapp
								: undefined
						}
						sms={single!.author!.phone ? single!.author!.phone : undefined}
					/>
				</div>

				{/* RELATED POSTS */}
				{related && <SingleRelatedPosts related={related} />}
			</div>
		</>
	);
};

export default Single;
