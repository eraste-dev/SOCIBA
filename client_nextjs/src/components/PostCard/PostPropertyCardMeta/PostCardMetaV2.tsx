import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import { IProduct } from "app/reducer/products/product";

export interface PostPropertyCardMetaV2Props {
	className?: string;
	meta: IProduct;
	hiddenAvatar?: boolean;
	size?: "large" | "normal";
}

const PostPropertyCardMetaV2: FC<PostPropertyCardMetaV2Props> = ({ className = "leading-none", meta, hiddenAvatar = false, size = "normal" }) => {
	const { updated_at, updated_by, title, author } = meta;
	return (
		<div className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${size === "normal" ? "text-xs" : "text-sm"} ${className}`} data-nc-id="PostCardMetaV2">
			<Link to={author.href} className="relative flex items-center space-x-2">
				{!hiddenAvatar && <Avatar radius="rounded-full" sizeClass={size === "normal" ? "h-9 w-9 text-base" : "h-10 w-10 text-xl"} imgUrl={author.avatar} userName={author.name} />}
				<div>
					<h6 className={`block font-normal ${size === "normal" ? "text-sm" : "text-xl"}`}>
						<span className="line-clamp-1">{author.name}</span>
					</h6>
				</div>
			</Link>
		</div>
	);
};

export default PostPropertyCardMetaV2;
