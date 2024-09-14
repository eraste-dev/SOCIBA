import { IUser } from "app/reducer/auth/auth";
import Avatar from "components/Avatar/Avatar";
import { FC } from "react";
import SingleAuthorRating from "./SingleAuthorRating";

export interface SingleAuthorProps {
	author: IUser;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author }) => {
	return (
		<div className="nc-SingleAuthor w-full">
			{author && author.href && author.name && author.email && (
				<>
					<div className="grid grid-cols-3 gap-5">
						<div className="col-span-2">
							<div className="">
								{false && (
									<span className="text-xs text-neutral-400 uppercase tracking-wider">
										Publié(e) par
									</span>
								)}

								<h2 className="text-lg text-neutral-900 dark:text-neutral-200">
									<span>Annonceur :</span>{" "}
									<span className="font-semibold">
										{author.name} {author.last_name}
									</span>
									{/* <Link to={author.href}>{author.name}</Link> */}
								</h2>

								<p>{author.fonction}</p>

								{author && author.influence_zone && (
									<p>Zone : {author.influence_zone.name}</p>
								)}

								<span className="text-lg dark:text-neutral-300">
									{/* {author.email} */}
									<span className="font-semibold">{author.phone}</span>
									{/* <Link
										className="text-primary-6000 font-medium ml-1"
										to={author.href}
									>
										Voir plus
									</Link> */}
								</span>
							</div>
						</div>

						<div className="col-span-1">
							<div className="w-full flex justify-end">
								<Avatar
									imgUrl={author.avatar}
									userName={author.name}
									sizeClass="h-32 w-32 sm:h-24 sm:w-24 "
									radius="rounded-xl"
								/>
								{/* <Link to={author.href}></Link> */}
							</div>

							<div className="w-full flex justify-end">
								<SingleAuthorRating
									defaultValue={author.rating}
									onChange={() => {}}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SingleAuthor;
