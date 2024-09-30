import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import { IProduct } from "app/reducer/products/product";

export interface PostMeta2Props {
	className?: string;
	meta: Pick<IProduct, "updated_at" | "author" | "category" | "total_click">;
	hiddenCategories?: boolean;
	size?: "large" | "normal";
	avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
	className = "leading-none",
	meta,
	hiddenCategories = false,
	size = "normal",
	avatarRounded,
}) => {
	const { updated_at, author, category, total_click } = meta;

	if (!author) {
		return <> {""} </>;
	}

	return (
		<div
			className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
				size === "normal" ? "text-xs" : "text-sm"
			} ${className}`}
			data-nc-id="PostMeta2"
		>
			<Link to={author.href} className="flex items-center space-x-2">
				<Avatar
					radius={avatarRounded}
					sizeClass={
						size === "normal" ? "h-6 w-6 text-sm" : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
					}
					imgUrl={author.avatar}
					userName={author.name}
				/>
			</Link>
			<div className="ml-3">
				<div className="flex items-center">
					<Link to={author.href} className="block font-semibold">
						{author.name}
					</Link>

					{!hiddenCategories && (
						<>
							<span className="mx-2 font-semibold">·</span>
							<div className="ml-0">
								<span className="text-xs">🏷 </span>
								{category && (
									<Link to={category.href} className="font-semibold">
										{category.name}
									</Link>
								)}
							</div>
						</>
					)}
				</div>
				<div className="text-xs mt-[6px]">
					<span className="text-neutral-700 dark:text-neutral-300">{updated_at}</span>
					<span className="mx-2 font-semibold">·</span>
					{false && (
						<span className="text-neutral-700 dark:text-neutral-300">
							{total_click} vue(s)
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostMeta2;
