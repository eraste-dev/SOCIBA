import { FC, useState } from "react";

interface TabProps {
	tabs: { title: string; content: JSX.Element }[];
}

const Tabs: FC<TabProps> = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="">
			<div className="flex ">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`py-2 px-4 bg-white dark:bg-neutral-900 hover:bg-gray-100 ${
							activeTab === index ? "bg-white dark:bg-neutral-900" : ""
						}`}
						onClick={() => setActiveTab(index)}
					>
						{tab.title}
					</button>
				))}
			</div>

			<div className="p-4 bg-white dark:bg-neutral-900">{tabs[activeTab].content}</div>
		</div>
	);
};

export default Tabs;
