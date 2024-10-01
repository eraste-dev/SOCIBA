import React, { FC } from "react";

interface SingleContentDemoPropos {
	content: string;
}

const SingleContentDemo: FC<SingleContentDemoPropos> = ({ content }) => {
	return (
		<div className="mx-auto prose lg:prose-xl w-full" dangerouslySetInnerHTML={{ __html: content }} />
	);
};

export default SingleContentDemo;
