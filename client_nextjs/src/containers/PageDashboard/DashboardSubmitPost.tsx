import React, { useEffect, useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "app/auth/auth";
import propertiyCategory, { CategoryAction, IPropertyCategory } from "app/properties/propertiy-category";
import SelectProductType from "components/Products/add/SelectProductTypeProps";
import { useAppSelector } from "app/hooks";
import { fetchCategories } from "app/axios/api.action";

type Inputs = {
	title: string;
	category_id: number;
};

const DashboardSubmitPost = () => {
	const dispatch = useDispatch();
	const user = useSelector(AuthAction.data)?.user;

	const categories = useSelector(CategoryAction.data);
	const categoriesLoading = useAppSelector(CategoryAction.loading);
	const [initialize, setInitialize] = useState(false);
	const [categoryParent, setCategoryParent] = useState(null as IPropertyCategory | null);
	const [categorySelected, setCategorySelected] = useState(null as IPropertyCategory | null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const handleSelectedCategory = (cat: IPropertyCategory | null) => {
		setCategorySelected(cat);
	};

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
	};

	useEffect(() => {
		if (!categories && !categoriesLoading) {
			dispatch(fetchCategories());
		}
	}, [dispatch, fetchCategories, categories, categoriesLoading]);

	return (
		<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
			<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-200">Rédigez votre annonce</h3>
			<form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
				{/* TITLE */}
				<label className="block md:col-span-2">
					<Label>
						Titre <span className="text-red-500">*</span>
					</Label>
					<Input type="text" className="mt-1" {...register("title", { required: true })} />
				</label>

				{/* TYPE */}
				<label className="block ">
					<div className="flex max-w-full">
						<Label>
							Type de bien <span className="text-red-500">*</span>
						</Label>
					</div>
					<br />
					<div className="flex">
						<div className="mr-2 border-slate-100 ">
							<label className="flex items-center p-2 cursor-pointer ">Catégorie</label>
							<Select className="mt-1">
								<option onChange={() => setCategoryParent(null)}>– select –</option>
								{categories &&
									categories
										.filter((category) => category.parent_id === null)
										.map((category) => (
											<option
												key={category.id}
												value={category.id}
												onChange={() => {
													setCategoryParent(category);
													console.log({ category }, "SelectProductType");
												}}
											>
												{category.name}{" "}
											</option>
										))}
							</Select>
						</div>

						{categoryParent && categories && (
							<SelectProductType
								options={categories.filter((category) => category.parent_id === categoryParent.id)}
								onChangeOption={handleSelectedCategory}
								selected={(categorySelected && categorySelected.id) ?? null}
							/>
						)}
					</div>
				</label>

				<label className="block md:col-span-2">
					<Label>Post Excerpt</Label>

					<Textarea className="mt-1" rows={4} />
					<p className="mt-1 text-sm text-neutral-500">Brief description for your article. URLs are hyperlinked.</p>
				</label>

				<label className="block">
					<Label>Category</Label>

					<Select className="mt-1">
						<option value="-1">– select –</option>
						<option value="ha'apai">Category 1</option>
						<option value="tongatapu">Category 2</option>
						<option value="vava'u">Category 3</option>
					</Select>
				</label>

				<label className="block">
					<Label>Tags</Label>

					<Input type="text" className="mt-1" />
				</label>

				<div className="block md:col-span-2">
					<Label>Featured Image</Label>

					<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
						<div className="space-y-1 text-center">
							<svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>
							</svg>
							<div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
								<label
									htmlFor="file-upload"
									className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
								>
									<span>Upload a file</span>
									<input id="file-upload" name="file-upload" type="file" className="sr-only" />
								</label>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
						</div>
					</div>
				</div>
				<label className="block md:col-span-2">
					<Label> Post Content</Label>

					<Textarea className="mt-1" rows={16} />
				</label>

				<ButtonPrimary className="md:col-span-2" type="submit">
					Submit post
				</ButtonPrimary>
			</form>
		</div>
	);
};

export default DashboardSubmitPost;
