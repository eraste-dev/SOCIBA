import { FC } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import ButtonDropdown from "components/ButtonDropdown/ButtonDropdown";
import { IProduct } from "app/reducer/products/product";

export type STATUS_LABEL =
	| "PUBLISH"
	| "DRAFT"
	| "DELETED"
	| "REJECTED"
	| "PENDING"
	| "BLOCKED"
	| null;

export const getStatuslabel = (name: STATUS_LABEL) => {
	switch (name) {
		case "PUBLISH":
			return "Publié";

		case "DRAFT":
			return "Brouillon";

		case "DELETED":
			return "Supprimé";

		case "REJECTED":
			return "Rejete";

		case "PENDING":
			return "En attente";

		case "BLOCKED":
			return "Bloqué";

		default:
			return "En attente";
	}
};

export const getStatusColor = (name: STATUS_LABEL) => {
	switch (name) {
		case "PUBLISH":
			return "bg-green-500 text-white  dark:text-white";

		case "DRAFT":
			return "bg-yellow-100 dark:bg-orange-800 dark:text-white";

		case "DELETED":
			return "bg-red-500 text-white  dark:text-white";

		case "REJECTED":
			return "bg-red-500 text-white  dark:text-white";

		case "PENDING":
			return "bg-blue-500 text-white  dark:text-white";

		case "BLOCKED":
			return "bg-red-500 text-white   dark:text-white";

		default:
			return "bg-blue-500 text-white  dark:text-white";
	}
};

export interface ChangeProductTypeProps {
	className?: string;
	lists: ListBoxItemType[];
	selectedIndex?: number;
	row: IProduct;
	handleChange: (row: IProduct, value: STATUS_LABEL) => void;
}

const ChangeProductType: FC<ChangeProductTypeProps> = ({
	className = "",
	lists,
	selectedIndex = 0,
	row,
	handleChange,
}) => {
	const [selected, setSelected] = useState(lists[selectedIndex]);

	return (
		<div className={`nc-ChangeProductType ${className}`} data-nc-id="ChangeProductType">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative md:min-w-[200px]">
					{selected && (
						<Listbox.Button as={"div"}>
							<ButtonDropdown>
								{getStatuslabel(selected.name as STATUS_LABEL)}
							</ButtonDropdown>
						</Listbox.Button>
					)}
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute right-0 w-52 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50">
							{lists.map((item: ListBoxItemType, index: number) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`${
											active
												? "dark:text-neutral-200 dark:bg-neutral-700 bg-primary-50 text-white"
												: ""
										} cursor-default select-none relative py-2 pl-10 pr-4`
									}
									value={item}
								>
									{({ selected }) => (
										<>
											<span
												onClick={() =>
													handleChange(row, item.name as STATUS_LABEL)
												}
												className={`${
													selected ? "font-medium" : "font-normal"
												} block truncate`}
											>
												{getStatuslabel(item.name as STATUS_LABEL)}
											</span>
											{selected ? (
												<span
													onClick={() =>
														handleChange(row, item.name as STATUS_LABEL)
													}
													className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200"
												>
													<CheckIcon
														className="w-5 h-5"
														aria-hidden="true"
													/>
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default ChangeProductType;
