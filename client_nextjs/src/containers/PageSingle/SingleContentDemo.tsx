import React, { FC } from "react";

interface SingleContentDemoPropos {
	content: string;
}

const SingleContentDemo: FC<SingleContentDemoPropos> = ({ content }) => {
	return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default SingleContentDemo;
