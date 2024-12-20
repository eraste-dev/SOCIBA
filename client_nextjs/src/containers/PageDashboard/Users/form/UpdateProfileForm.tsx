import { AuthAction } from "app/reducer/auth/auth";
import { updateUser } from "app/axios/actions/api.action";
import { UpdateUserRequest } from "app/axios/api.type";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ErrorMessage from "components/Form/ErrorMessage";
import Input from "components/Form/Input/Input";
import Label from "components/Form/Label/Label";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { MetaAction } from "app/reducer/meta/meta";
import { fetchMetaFunction } from "app/axios/actions/api.meta.action";
import Select from "components/Form/Select/Select";
import AvatarUpload from "../updateUser/AvatarUpload";

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
        formState: { errors, isSubmitting, isLoading, isSubmitted },
    } = useForm<UpdateUserRequest>();

    const onSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
        console.log(">>> payload", user);

        if (!user) return;
        const payload: UpdateUserRequest = { ...data, id: user.id };
        const formData = new FormData();

        user && user.id && formData.append("id", String(user?.id));
        data.name && formData.append("name", data.name);
        data.last_name && formData.append("last_name", data.last_name);
        data.phone && formData.append("phone", data.phone);
        data.phone_whatsapp && formData.append("phone_whatsapp", data.phone_whatsapp);
        data.fonction && formData.append("fonction", data.fonction);
        // data.influence_zone_id && formData.append("influence_zone_id", data.influence_zone_id);

        if (avatarFile) formData.append("avatar", avatarFile);
        if (avatarFile) payload.avatar = avatarFile;
        console.log(">>> payload", payload);
        dispatch(updateUser(payload));
    };

    useEffect(() => {
        if (!functions?.loading && !functions?.data && !functions?.error) {
            dispatch(fetchMetaFunction());
        }

        if (functions && functions.error) {
            snackbar.enqueueSnackbar(functions.error, {
                variant: "error",
                autoHideDuration: 2000,
            });
        }
    }, [dispatch, functions, fetchMetaFunction]);

    useEffect(() => {
        if (!loading && success && isSubmitted) {
            snackbar.enqueueSnackbar("Votre profile a bien éte mis à jour", {
                variant: "success",
                autoHideDuration: 2000,
            });
        }
    }, [loading, success, snackbar, isSubmitted]);

    useEffect(() => {
        if (!loading && error && isSubmitted) {
            snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 2000 });
        }
    }, [loading, error, snackbar]);

    return (
        <form className="grid md:grid-cols-2 gap-6 " onSubmit={handleSubmit(onSubmit)}>
            <AvatarUpload
                defaultUrl={user?.avatar ?? ""}
                avatar={avatar ?? ""}
                setAvatar={setAvatar}
                setAvatarFile={setAvatarFile}
            />

            <label className="block">
                <Label>Prénoms</Label>
                <Input
                    placeholder="Votre prénoms"
                    type="text"
                    className="mt-1"
                    {...register("name")}
                    defaultValue={user?.name}
                />
                <ErrorMessage errors={errorArray} error="name" />
            </label>

            <label className="block">
                <Label>Nom</Label>
                <Input
                    placeholder="Votre nom"
                    type="text"
                    className="mt-1"
                    {...register("last_name")}
                    defaultValue={user?.last_name ?? ""}
                />
                <ErrorMessage errors={errorArray} error="name" />
            </label>

            <label className="block md:col-span-2">
                <Label> Email</Label>
                <Input
                    type="email"
                    className="mt-1 cursor-not-allowed"
                    defaultValue={user?.email}
                    disabled
                />
                <ErrorMessage errors={errorArray} error="email" />
            </label>

            <label className="block md:col-span-2">
                <span className="text-neutral-800 dark:text-neutral-200">
                    Vous êtres ? <span className="text-red-500">*</span>{" "}
                </span>
                <Select
                    className="mt-1"
                    {...register("fonction", { required: true })}
                    disabled={!functions?.data || functions?.data?.length === 0}
                    onChange={(e) => setValue("fonction", e.target.value)}
                >
                    <option value="" selected>
                        Aucun
                    </option>
                    {functions &&
                        functions.data &&
                        functions.data?.length > 0 &&
                        functions.data.map((func) => (
                            <option
                                key={func.id}
                                value={func.value}
                                selected={func.value === user?.fonction}
                                onClick={() => {
                                    setValue("fonction", func.value ?? "");
                                }}
                            >
                                {func.value}
                            </option>
                        ))}
                </Select>
                <ErrorMessage errors={errorArray} error="fonction" />
            </label>

            <label className="block">
                <Label> Téléphone</Label>
                <Input
                    type="text"
                    className="mt-1 "
                    {...register("phone")}
                    defaultValue={user?.phone}
                />
                <ErrorMessage errors={errorArray} error="phone" />
            </label>

            <label className="block">
                <Label> Numéro WhatsApp</Label>
                <Input
                    type="text"
                    className="mt-1 "
                    {...register("phone_whatsapp")}
                    defaultValue={user?.phone_whatsapp}
                />
                <ErrorMessage errors={errorArray} error="phone_whatsapp" />
            </label>

            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <ButtonPrimary className="md:col-span-2" type="submit">
                    Mise à jour du profil
                </ButtonPrimary>
            )}
        </form>
    );
};

export default UpdateProfileForm;
