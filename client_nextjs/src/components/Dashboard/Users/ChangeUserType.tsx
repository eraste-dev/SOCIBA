import React, { FC } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import ButtonDropdown from "components/ButtonDropdown/ButtonDropdown";
import { IUser } from "app/reducer/auth/auth";

export interface ChangeUserTypeProps {
	className?: string;
	lists: ListBoxItemType[];
	selectedIndex?: number;
	row: IUser;
	handleChange: (row: IUser, value: string) => void;
}

const ChangeUserType: FC<ChangeUserTypeProps> = ({ className = "", lists, selectedIndex = 0, row, handleChange }) => {
	const [selected, setSelected] = useState(lists[selectedIndex]);

	return (
		<div className={`nc-ChangeUserType ${className}`} data-nc-id="ChangeUserType">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative md:min-w-[200px]">
					<Listbox.Button as={"div"}>
						<ButtonDropdown>{selected.name}</ButtonDropdown>
					</Listbox.Button>
					<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Listbox.Options className="absolute right-0 w-52 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50">
							{lists.map((item: ListBoxItemType, index: number) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`${
											active ? "text-primary-700 dark:text-neutral-200 bg-primary-50 dark:bg-neutral-700" : ""
										} cursor-default select-none relative py-2 pl-10 pr-4`
									}
									value={item}
								>
									{({ selected }) => (
										<>
											<span
												onClick={() => handleChange(row, item.name)}
												className={`${selected ? "font-medium" : "font-normal"} block truncate`}
											>
												{item.name}
											</span>
											{selected ? (
												<span
													onClick={() => handleChange(row, item.name)}
													className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200"
												>
													<CheckIcon className="w-5 h-5" aria-hidden="true" />
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

export default ChangeUserType;
