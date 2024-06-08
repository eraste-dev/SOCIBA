import { FC, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IUser } from "app/auth/auth";
import { useForm } from "react-hook-form";
import { UpdateUserRequest } from "app/axios/api.type";

export interface UserTableActionProps {
	row: IUser;
	// openDelete: boolean;
	handleOpenDelete: () => void;
	handleOpenUpdate: () => void;
}

const UserTableAction: FC<UserTableActionProps> = ({ row, handleOpenDelete, handleOpenUpdate }) => {
	// const error = useSelector(AuthAction.error);
	// const errorArray = useSelector(AuthAction.errors);
	// const success = useSelector(AuthAction.success);
	// const loading = useSelector(AuthAction.loading);

	const [avatar, setAvatar] = useState<string | null>(null);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting, isLoading, isSubmitted },
	} = useForm<UpdateUserRequest>();

	return (
		<ul className="flex space-x-1">
			<li className="mr-2 ">
				<button onClick={handleOpenUpdate}>
					<FaEdit size={25} className="text-blue-500 dark:text-blue-300" />
				</button>
			</li>

			<li className="mr-2">
				<button onClick={handleOpenDelete}>
					<FaTrashAlt size={25} className="text-red-500" />
				</button>
			</li>
		</ul>
	);
};

export default UserTableAction;
