import { IUser } from "app/reducer/auth/auth";
import Avatar from "components/Avatar/Avatar";
import { FC } from "react";
import SingleAuthorRating from "./SingleAuthorRating";

export const AuthorLine = ({
	value,
	label,
	classNameValue,
}: {
	value: string;
	label: string;
	classNameValue?: string;
}) => {
	return (
		<div className="grid grid-cols-8 sm:grid-cols-5 md:grid-cols-8">
			<div className="col-span-3 sm:col-span-2 md:col-span-1">
				<div className="w-full flex justify-between">
					<span>{label}</span>
					<span className="mr-2">:</span>
				</div>
			</div>

			<div className="">
				<span className={classNameValue ? classNameValue : "font-semibold"}>{value}</span>
			</div>
		</div>
	);
};

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

								<AuthorLine
									label="Annonceur"
									value={`${author.name} ${author.last_name}`}
								/>

								<AuthorLine label="Statut" value={`${author.fonction}`} />

								<AuthorLine
									label="Commune"
									value={`${author.influence_zone?.name}`}
								/>

								<AuthorLine label="Contact" value={`${author.phone}`} />
							</div>
						</div>

						<div className="col-span-1">
							<div className="w-full flex justify-end">
								<Avatar
									imgUrl={author.avatar}
									userName={author.name}
									sizeClass="h-16 w-16 sm:h-32 sm:w-32"
									radius="rounded-xl"
								/>
								{/* <Link to={author.href}></Link> */}
							</div>

							<div className="w-full flex justify-end">
								<div className="mr-4">
									<SingleAuthorRating
										defaultValue={author.rating}
										onChange={() => {}}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SingleAuthor;
