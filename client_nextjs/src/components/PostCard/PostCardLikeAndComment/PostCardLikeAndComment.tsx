import React, { FC } from "react";
import PostCardCommentBtn from "components/PostCard/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "containers/PostCardLikeContainer/PostCardLikeContainer";
import { PostDataType } from "data/types";
import { IProduct } from "app/reducer/products/product";

export interface PostCardLikeAndCommentProps {
	className?: string;
	itemClass?: string;
	postData: Pick<IProduct, "isLiked" | "id" | "href" | "commentCount">;
	hiddenCommentOnMobile?: boolean;
	onClickLike?: (id: PostDataType["id"]) => void;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
	className = "",
	itemClass = "px-3 h-8 text-xs",
	hiddenCommentOnMobile = true,
	postData,
	onClickLike = () => {},
}) => {
	return (
		<div className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`} data-nc-id="PostCardLikeAndComment">
			<PostCardLikeContainer className={itemClass} like={postData.isLiked} onClickLike={onClickLike} postId={postData.id} />
			<PostCardCommentBtn
				href={postData.href}
				commentCount={postData.commentCount}
				className={`${hiddenCommentOnMobile ? "hidden sm:flex" : "flex"}  ${itemClass}`}
			/>
		</div>
	);
};

export default PostCardLikeAndComment;
