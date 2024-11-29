import { updateUserPassword } from 'app/axios/actions/api.action';
import { AuthAction } from 'app/reducer/auth/auth';
import { MetaAction } from 'app/reducer/meta/meta';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import Checkbox from 'components/Form/Checkbox/Checkbox';
import ErrorMessage from 'components/Form/ErrorMessage';
import Input from 'components/Form/Input/Input';
import Label from 'components/Form/Label/Label';
import { LoadingSpinner } from 'components/UI/Loading/LoadingSpinner';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export interface UpdatePasswordRequest {
    user_id: number,
    password: string,
    password_confirmation: string
}

function UpdatePassword() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const snackbar = useSnackbar();

    const [showPassword, setShowPassword] = useState(false)

    const user = useSelector(AuthAction.data)?.user;
    const error = useSelector(AuthAction.error);
    const errorArray = useSelector(AuthAction.errors);
    const success = useSelector(AuthAction.success);
    const loading = useSelector(AuthAction.loading);

    // const [initialize, setInitialize] = useState(false);
    const functions = useSelector(MetaAction.data)?.functions;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isLoading, isSubmitted, isValid },
    } = useForm<UpdatePasswordRequest>();


    const onSubmit: SubmitHandler<UpdatePasswordRequest> = (data) => {
        const payload: UpdatePasswordRequest = data
        console.log("UpdatePassword", data);

        if (!user) return;

        if (user && user.id) {
            payload.user_id = user.id;
        }

        console.log(">>> payload", payload);
        dispatch(updateUserPassword(payload));
    };


    const machtPassword = () => {
        const password = watch("password");
        const password_confirmation = watch("password_confirmation");
        if (password === password_confirmation) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <form className="grid grid-cols-2 gap-2 " onSubmit={handleSubmit(onSubmit)}>
                <label className="col-span-1 block">
                    <Label>Mot de passe</Label>
                    <Input
                        placeholder="mot de passe"
                        type={showPassword ? "text" : "password"}
                        className="mt-1"
                        {...register("password", { required: true })}
                    />
                    <ErrorMessage errors={errorArray} error="password" />
                </label>

                <label className="col-span-1 block">
                    <Label>Mot de passe de confirmation</Label>
                    <Input
                        placeholder="mot de passe"
                        type={showPassword ? "text" : "password"}
                        className="mt-1"
                        {...register("password_confirmation", { required: true })}
                    />

                    {!machtPassword() ? (
                        <div className="col-span-2">
                            <p className="text-red-600">Mot de passe non identique</p>
                        </div>
                    ) : null}
                    <ErrorMessage errors={errorArray} error="password_confirmation" />
                </label>



                <label className="col-span-1 my-2 block">
                    <input type="checkbox" className='mr-2' onChange={() => setShowPassword(!showPassword)} />
                    Afficher le mot de passe en clair
                </label>


                {(loading || isSubmitting) ? (
                    <div className="flex justify-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <ButtonPrimary disabled={!isValid || !machtPassword()} className="md:col-span-2" type="submit">
                        Modifiler le mot de passe
                    </ButtonPrimary>
                )}
            </form>
        </div>
    )
}

export default UpdatePassword