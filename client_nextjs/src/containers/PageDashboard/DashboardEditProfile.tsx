import { AuthAction } from 'app/reducer/auth/auth';
import { updateUser } from 'app/axios/actions/api.action';
import { UpdateUserRequest } from 'app/axios/api.type';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { MetaAction } from 'app/reducer/meta/meta';
import { fetchMetaFunction } from 'app/axios/actions/api.meta.action';
import EditUserTab from './Users/form/EditUserTab';

const DashboardEditProfile = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const snackbar = useSnackbar();

    const user = useSelector(AuthAction.data)?.user;
    const expire = useSelector(AuthAction.data)?.expire;
    const error = useSelector(AuthAction.error);
    const errorArray = useSelector(AuthAction.errors);
    const success = useSelector(AuthAction.success);
    const loading = useSelector(AuthAction.loading);

    // const [initialize, setInitialize] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const functions = useSelector(MetaAction.data)?.functions;
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isLoading, isSubmitted },
    } = useForm<UpdateUserRequest>();

    useEffect(() => {
        if (!functions?.loading && !functions?.data && !functions?.error) {
            dispatch(fetchMetaFunction());
        }

        if (functions && functions.error) {
            snackbar.enqueueSnackbar(functions.error, {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    }, [dispatch, functions, fetchMetaFunction]);

    useEffect(() => {
        if (!loading && success && isSubmitted) {
            snackbar.enqueueSnackbar('Votre profile a bien éte mis à jour', {
                variant: 'success',
                autoHideDuration: 2000,
            });
        }
    }, [loading, success, snackbar, isSubmitted]);

    useEffect(() => {
        if (!loading && error && isSubmitted) {
            snackbar.enqueueSnackbar(error, { variant: 'error', autoHideDuration: 2000 });
        }
    }, [loading, error, snackbar]);

    return (
        <div className="flex justify-center">
            <EditUserTab />
        </div>
    );
};

export default DashboardEditProfile;
