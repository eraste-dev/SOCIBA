import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "app/axios/actions/api.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedo } from "react-icons/fa";
import { useAppSelector } from "app/hooks";
import TestimonialtableData from "./TestimonialtableData";
import { ITestimonial, TestimonalAction } from "app/reducer/testimonials/testimonial";
import { fetchAllTestimonal, fetchTestimonal } from "app/axios/actions/api.testimony";

export type VIEW_ADMIN_POST_CATEGORY = "LIST" | "EDIT";

const DashboardTestimonial = () => {
    const dispatch = useDispatch();
    const data = useAppSelector(TestimonalAction.data);
    const loading = useAppSelector(TestimonalAction.loading);
    const error = useAppSelector(TestimonalAction.error);
    const errorArray = useAppSelector(TestimonalAction.errors);
    const success = useAppSelector(TestimonalAction.success);
    const [selected, setSelected] = useState<ITestimonial | null>(null);

    useEffect(() => {
        if (!loading && !data) {
            dispatch(fetchAllTestimonal());
        }
    }, [dispatch, fetchCategories, loading, data]);

    const handleRefresh = () => {
        return dispatch(fetchAllTestimonal());
    };

    const handleAdd = () => { };

    return (
        <div className="flex flex-col space-y-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
                            Témoignages
                        </h3>
                        <div className="flex">
                            <ButtonPrimary onClick={handleRefresh}>
                                <FaRedo className="mr-2" />
                                Actualiser
                            </ButtonPrimary>
                        </div>
                    </div>

                    <div className="my-2">
                        {data?.length}
                        <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                            {data && <TestimonialtableData rows={data} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTestimonial;
