import React, { FC, useEffect, useRef } from "react";
import Tag from "components/Tag/Tag";
import { SinglePageType } from "./PageSingle";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
import { useLocation } from "react-router";
import { IProduct } from "app/reducer/products/product";
import { CommentType } from "components/CommentCard/CommentCard";

export interface SingleContentProps {
	data: IProduct;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
	const { author, commentCount } = data;
	const commentRef = useRef<HTMLDivElement>(null);
	const comments: CommentType[] = [];
	//
	const location = useLocation();

	useEffect(() => {
		//  SCROLL TO COMMENT AREA
		if (location.hash !== "#comment") {
			return;
		}

		//
		if (location.hash === "#comment") {
			setTimeout(() => {
				if (commentRef.current) {
					commentRef.current.scrollIntoView();
				}
			}, 500);
		}
	}, [location]);

	return (
		<div className="nc-SingleContent space-y-2">
			<p className="mt-4 text-base text-neutral-900 dark:text-neutral-100 font-semibold">
				Description
			</p>
			{/* ENTRY CONTENT */}
			<div id="single-entry-content" className="mx-0 dark:prose-invert">
				{/* THIS IS THE DEMP CONTENT */}
				<SingleContentDemo content={data.content} />
			</div>

			{/* TAGS */}
			{/* <div className="max-w-screen-md mx-auto flex flex-wrap">
				{tags.map((item) => (
					<Tag hideCount key={item.id} tag={item} className="mr-2 mb-2" />
				))}
			</div> */}

			{/* AUTHOR */}
			{/* <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div> */}

			{/* COMMENT FORM */}
			{false && (
				<>
					<div id="comment" ref={commentRef} className="max-w-screen-md mx-auto pt-5">
						<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
							Responses ({commentCount})
						</h3>
						<SingleCommentForm
							onClickSubmit={(id) => console.log(id)}
							onClickCancel={(id) => console.log(id)}
						/>
					</div>

					{/* COMMENTS LIST */}
					<div className="max-w-screen-md mx-auto">
						<SingleCommentLists comments={comments} />
					</div>
				</>
			)}
		</div>
	);
};

export default SingleContent;
