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
				className={`nc-PostCardMetaV2 w-full text-neutral-800 dark:text-neutral-200 ${
					size === "normal" ? "text-xs" : "text-sm"
				} ${className}`}
				data-nc-id="PostCardMetaV2"
			>
				{/* sm:grid-cols-1 */}
				{/* *grid md:grid-cols-8 grid-cols-3 */}
				<div className=" flex mb-3 ml-2">
					<div className="md:col-span-2 sm:col-span-1 ">
						<div className="sm:flex sm:justify-start flex justify-center">
							{!hiddenAvatar && (
								<Avatar
									radius="rounded-full"
									// sizeClass={"h-10 w-10 aspect-w-1 aspect-h-1"}
									imgUrl={author.avatar}
									userName={author.name}
								/>
							)}
						</div>
					</div>

					<div className="md:col-span-6 col-span-2 ">
						<div className="flex items-center align-middle text-xs md:text-md">
							<span className="hidden sm:flex sm:justify-center mr-1">
								{"Annonceur : "}
							</span>
							<strong className="">
								<span className="line-clamp-1 text-xs md:text-md">{` ${author.name} ${author.last_name}`}</span>{" "}
							</strong>
						</div>

						{author.fonction && <span className="line-clamp-1">{author.fonction}</span>}
					</div>
				</div>
				{/* author.href */}
				{false && (
					<Link to={""} className="relative flex items-center space-x-2">
						{/* ! DEAD CODE **************************************************** */}

						{/* ! DEAD CODE **************************************************** */}

						<div className="lg:flex flex-col text-xs md:text-md">
							<div className="flex items-center align-middle text-xs md:text-md my-2">
								{/* {"Annonceur : "} */}
								<strong className="ml-1">
									<span className="line-clamp-1 text-xs md:text-md">{` ${author.name} ${author.last_name}`}</span>{" "}
								</strong>
							</div>

							{author.fonction && (
								<span className="line-clamp-1">{author.fonction}</span>
							)}
						</div>
					</Link>
				)}
			</div>
		</>
	);
};

export default PostPropertyCardMetaV2;
