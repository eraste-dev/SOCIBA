import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import Heading2 from "components/Heading/Heading2";
import React, { FC } from "react";

export interface UserLayoutProps {
	className?: string;
	heading: string;
	headingEmoji?: string;
	subHeading?: string;
}

const UserLayout: FC<UserLayoutProps> = ({ className = "", heading, subHeading, headingEmoji, children }) => {
	return (
		<div className={`nc-UserLayout relative ${className}`} data-nc-id="UserLayout">
			{/* <HeadBackgroundCommon /> */}
			{/* container relative pt-10 pb-16 lg:pt-20 lg:pb-28 */}
			<div className="relative ">
				{/* HEADER */}
				{false && (
					<header className="text-center max-w-2xl mx-auto">
						<Heading2 emoji={headingEmoji}>{heading}</Heading2>
						{subHeading && <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">{subHeading}</span>}
					</header>
				)}

				{/* CONTENT */}
				{/* rounded-[40px] */}
				<div className="p-5 md:px-5 mx-auto bg-white shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">{children}</div>
			</div>
		</div>
	);
};

export default UserLayout;
