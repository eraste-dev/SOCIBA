import { AuthAction } from 'app/reducer/auth/auth';
import { updateUser } from 'app/axios/actions/api.action';
import { UpdateUserRequest } from 'app/axios/api.type';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import ErrorMessage from 'components/Form/ErrorMessage';
import Input from 'components/Form/Input/Input';
import Label from 'components/Form/Label/Label';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner } from 'components/UI/Loading/LoadingSpinner';
import { MetaAction } from 'app/reducer/meta/meta';
import { fetchMetaFunction } from 'app/axios/actions/api.meta.action';
import Select from 'components/Form/Select/Select';
import AvatarUpload from '../updateUser/AvatarUpload';

const UpdateProfileForm = () => {
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
        formState: { errors, isValid, isSubmitting, isLoading, isSubmitted },
    } = useForm<UpdateUserRequest>();

    const onSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
        console.log('>>> payload', user);

        if (!user || !user.id) {
            snackbar.enqueueSnackbar('Erreur : utilisateur non connecté', { 
                variant: 'error', 
                autoHideDuration: 2000 
            });
            return;
        }

        const payload: UpdateUserRequest = { ...data, id: user.id };
        const formData = new FormData();

        // ID obligatoire
        formData.append('id', String(user.id));
        
        // Autres champs optionnels
        if (data.name) formData.append('name', data.name);
        if (data.last_name) formData.append('last_name', data.last_name);
        if (data.phone) formData.append('phone', data.phone);
        if (data.phone_whatsapp) formData.append('phone_whatsapp', data.phone_whatsapp);
        if (data.fonction) formData.append('fonction', data.fonction);

        if (avatarFile) formData.append('avatar', avatarFile);
        
        console.log('>>> FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // Vérifier que l'ID est bien présent
        console.log('Sending FormData with user ID:', user.id);
        console.log('FormData has ID:', formData.has('id'));
        console.log('FormData ID value:', formData.get('id'));
        
        dispatch(updateUser(formData));
    };

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

    // Initialiser les valeurs du formulaire avec les données utilisateur
    useEffect(() => {
        if (user) {
            setValue('name', user.name || '');
            setValue('last_name', user.last_name || '');
            setValue('phone', user.phone || '');
            setValue('phone_whatsapp', user.phone_whatsapp || '');
            setValue('fonction', user.fonction || '');
        }
    }, [user, setValue]);

    useEffect(() => {
        if (!loading && success && isSubmitted) {
            console.log('>>> success', errors);
            snackbar.enqueueSnackbar('Votre profile a bien éte mis à jour', {
                variant: 'success',
                autoHideDuration: 2000,
            });
            
            // Mettre à jour les valeurs du formulaire avec les nouvelles données
            if (user) {
                setValue('name', user.name);
                setValue('last_name', user.last_name);
                setValue('phone', user.phone);
                setValue('phone_whatsapp', user.phone_whatsapp);
                setValue('fonction', user.fonction);
                
                // Mettre à jour l'avatar si il a changé
                if (user.avatar) {
                    setAvatar(user.avatar);
                }
            }
        }
    }, [loading, success, snackbar, isSubmitted, user, setValue]);

    useEffect(() => {
        if (!loading && error && isSubmitted) {
            snackbar.enqueueSnackbar(error, { variant: 'error', autoHideDuration: 2000 });
        }
    }, [loading, error, snackbar]);

    return (
        <form className="grid md:grid-cols-2 gap-6 " onSubmit={handleSubmit(onSubmit)}>
            <AvatarUpload defaultUrl={user?.avatar ?? ''} avatar={avatar ?? ''} setAvatar={setAvatar} setAvatarFile={setAvatarFile} />

            <label className="block">
                <Label>Prénoms</Label>
                <Input placeholder="Votre prénoms" type="text" className="mt-1" {...register('name')} />
                <ErrorMessage errors={errorArray} error="name" />
            </label>

            <label className="block">
                <Label>Nom</Label>
                <Input placeholder="Votre nom" type="text" className="mt-1" {...register('last_name')} />
                <ErrorMessage errors={errorArray} error="name" />
            </label>

            <label className="block md:col-span-2">
                <Label> Email</Label>
                <Input type="email" className="mt-1 cursor-not-allowed" defaultValue={user?.email} disabled />
                <ErrorMessage errors={errorArray} error="email" />
            </label>

            <label className="block md:col-span-2">
                <Label>
                    Vous êtes ?
                </Label>
                <Select className="mt-1" {...register('fonction')} disabled={!functions?.data || functions?.data?.length === 0} onChange={(e) => setValue('fonction', e.target.value)}>
                    <option value="">
                        Choisissez votre fonction
                    </option>
                    {functions &&
                        functions.data &&
                        functions.data?.length > 0 &&
                        functions.data.map((func) => (
                            <option
                                key={func.id}
                                value={func.value}
                            >
                                {func.value}
                            </option>
                        ))}
                </Select>
                <ErrorMessage errors={errorArray} error="fonction" />
            </label>

            <label className="block">
                <Label> Téléphone</Label>
                <Input type="text" className="mt-1 " {...register('phone')} />
                <ErrorMessage errors={errorArray} error="phone" />
            </label>

            <label className="block">
                <Label> Numéro WhatsApp</Label>
                <Input type="text" className="mt-1 " {...register('phone_whatsapp')} />
                <ErrorMessage errors={errorArray} error="phone_whatsapp" />
            </label>

            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <ButtonPrimary disabled={loading || !isValid} className="md:col-span-2" type="submit">
                    Mise à jour du profil
                </ButtonPrimary>
            )}
        </form>
    );
};

export default UpdateProfileForm;
