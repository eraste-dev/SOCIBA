import React, { FC } from "react";

interface SingleContentDemoPropos {
	content: string;
}

const SingleContentDemo: FC<SingleContentDemoPropos> = ({ content }) => {
	return (
		// mx-auto prose lg:prose-xl w-full
		<div className="mx-auto prose-sm w-full" dangerouslySetInnerHTML={{ __html: content }} />
	);
};

export default SingleContentDemo;
