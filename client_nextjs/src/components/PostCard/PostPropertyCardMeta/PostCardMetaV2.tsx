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

const PostPropertyCardMetaV2: FC<PostPropertyCardMetaV2Props> = ({
	className = "leading-none",
	meta,
	hiddenAvatar = false,
	size = "normal",
}) => {
	const { author } = meta;

	if (!author) return null;

	return (
		<>
			<hr className="border-b border-neutral-200 dark:border-neutral-700 my-4" />

			<div
				className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
					size === "normal" ? "text-xs" : "text-sm"
				} ${className}`}
				data-nc-id="PostCardMetaV2"
			>
				{/* author.href */}
				<Link to={""} className="relative flex items-center space-x-2">
					{/* ! DEAD CODE **************************************************** */}
					{!hiddenAvatar && false && (
						<Avatar
							radius="rounded-full"
							sizeClass={
								size === "normal" ? "h-9 w-9 text-base" : "h-10 w-10 text-xl"
							}
							imgUrl={author.avatar}
							userName={author.name}
						/>
					)}
					{/* ! DEAD CODE **************************************************** */}

					<div className="lg:flex flex-col text-xs md:text-md">
						<div className="lg:flex block items-center align-middle text-xs md:text-md">
							{"Annonceur : "}
							<strong className="ml-1">
								<span className="line-clamp-1 text-xs md:text-md">{` ${author.name} ${author.last_name}`}</span>{" "}
							</strong>
						</div>

						{author.fonction && <span className="line-clamp-1">{author.fonction}</span>}
					</div>
				</Link>
			</div>
		</>
	);
};

export default PostPropertyCardMetaV2;
