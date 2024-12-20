import { Button } from '@mui/material';
import { saveTestimonial } from 'app/axios/actions/api.testimony';
import { useAppSelector } from 'app/hooks';
import { AuthAction } from 'app/reducer/auth/auth';
import { ITestimonial, TestimonalAction } from 'app/reducer/testimonials/testimonial';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import EditorText from 'components/Form/EditorText';
import { LoadingSpinner } from 'components/UI/Loading/LoadingSpinner';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function TestimonalForm() {
    const dispatch = useDispatch();

    const auth = useAppSelector(AuthAction.data);

    const data = useAppSelector(TestimonalAction.data);
    const loading = useAppSelector(TestimonalAction.loading);
    const error = useAppSelector(TestimonalAction.error);
    const errorArray = useAppSelector(TestimonalAction.errors);
    const success = useAppSelector(TestimonalAction.success);
    const [selected, setSelected] = useState<ITestimonial | null>(null);
    const [successPost, setSuccessPost] = useState(false)

    const snackbar = useSnackbar();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting, isLoading, isSubmitted, isValid },
    } = useForm<ITestimonial>();

    const onSubmit = (data: ITestimonial) => {
        console.log(data.message);

        if (!data || data.message == "") {
            snackbar.enqueueSnackbar('Le message est obligatoire', {
                variant: 'error',
            })
        }
        const payload: ITestimonial = { ...data, user_id: auth?.user?.id ?? 0 };
        dispatch(saveTestimonial(payload));
    }

    useEffect(() => {
        if (success && !loading) {
            snackbar.enqueueSnackbar('Témoignage ajouter avec success', {
                variant: 'success',
            });
            reset();
            setValue('message', '');
            setSuccessPost(true)
        }
    }, [success, loading, snackbar])

    useEffect(() => {
        if (error && !loading) {
            snackbar.enqueueSnackbar('Une erreur s\'est produite', {
                variant: 'error',
            });
        }
    }, [error, snackbar, loading])

    if (!auth || !auth.user?.id) return null

    if (successPost) {
        return (
            <div >
                <div className='flex justify-center' >
                    <div className='alert alert-success' >
                        <h3 className="text-2xl font-semibold text-green-900 dark:text-green-50 mb-2">
                            Témoignage ajouter avec success
                        </h3>
                    </div>
                </div>

                <div className='flex justify-center' >
                    <ButtonPrimary onClick={() => setSuccessPost(false)}>Ajouter à nouveau</ButtonPrimary>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div>
                <p>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        Ajouter un témoignage
                    </h3>
                    <p className="text-sm text-gray-600">
                        Veuillez remplir le formulaire pour ajouter un témoignage.
                    </p>

                </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div className="block mt-4">
                    <div className="mt-1">
                        <EditorText
                            onEditorChange={(content: string) =>
                                setValue("message", content)
                            }
                        // initialValue={defaultValue?.content}
                        />
                    </div>
                    {errors.message && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.message.message}
                        </p>
                    )}
                </div>

            </div>

            <div className="block">
                {/* {loading || isSubmitting ? (
                    <LoadingSpinner />
                ) : <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Publier
                </button>} */}

                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Publier
                </button>

            </div>
        </form>
    )
}

export default TestimonalForm