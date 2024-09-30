import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import { PostDataType } from "data/types";
import Card11 from "components/Cards/Card11/Card11";
import Card9 from "components/Cards/Card9/Card9";
import { DEMO_POSTS } from "data/posts";
import { IProduct } from "app/reducer/products/product";

export interface SingleRelatedPostsProps {
	relatedPosts?: PostDataType[];
	moreFromAuthorPosts?: PostDataType[];
	related?: IProduct[];
}

// DEMO DATA
const demoRelated: PostDataType[] = DEMO_POSTS.filter((_, i) => i >= 10 && i < 14);
const demoMoreFromAuthor: PostDataType[] = DEMO_POSTS.filter((_, i) => i >= 14 && i < 18);

const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({ relatedPosts = demoRelated, moreFromAuthorPosts = demoMoreFromAuthor, related }) => {
	return (
		<div className="relative bg-neutral-100 dark:bg-neutral-800 py-4 mt-5 lg:mt-6">
			{/* RELATED  */}
			{related && (
				<div className="container">
					<div>
						<Heading className="mb-2 text-neutral-900 dark:text-neutral-50" desc="">
							Annonces similaires
						</Heading>
						<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
							{related.map((post) => (
								<Card11 key={post.id} post={post} />
							))}
						</div>
					</div>

					{/* MORE FROM AUTHOR */}
					{false && (
						<div className="mt-20">
							<Heading className="mb-10 text-neutral-900 dark:text-neutral-50" desc="">
								More from author
							</Heading>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
								{moreFromAuthorPosts.map((post) => (
									<Card9 key={post.id} post={post} />
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SingleRelatedPosts;
