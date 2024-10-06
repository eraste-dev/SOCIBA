import { updateUserScore } from "app/axios/actions/api.others.action";
import { AuthAction, IUser } from "app/reducer/auth/auth";
import { PropertyAction } from "app/reducer/products/product";
import Avatar from "components/Avatar/Avatar";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import NcModal from "components/NcModal/NcModal";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export interface ISetUserScore {
	score: number;
	userId: number;
}

export interface SingleAuthorRatingProps {
	author: IUser;
}

const SingleAuthorRating: FC<SingleAuthorRatingProps> = ({ author }) => {
	const dispatch = useDispatch();
	const [openConfirm, setOpenConfirm] = useState(false);

	const score$ = useSelector(PropertyAction.data)?.updateScore;
	// const loading = useSelector(PropertyAction.loading);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [rating, setRating] = useState(author.rating ?? 0);

	const onSubmit = async (data: ISetUserScore) => {
		closeSnackbar();
		setRating(data.score);
		dispatch(updateUserScore(data));
	};

	const handleClick = (value: number) => {
		setRating(value);
		setOpenConfirm(true);
	};

	useEffect(() => {
		closeSnackbar();
		if (score$?.success && !score$?.error && !score$.loading) {
			enqueueSnackbar("Votre note a bien été enregistrée", { variant: "success" });
		}
		if (score$?.error && !score$.loading) {
			enqueueSnackbar("Une erreur est survenue", { variant: "error" });
		}
	}, [score$, enqueueSnackbar]);

	const renderModalContent = () => {
		return (
			<div className="space-y-5 p-4 mx-auto">
				<p className="text-neutral-700 dark:text-neutral-300 text-center text-base">
					Voulez-vous confirmer la note de {rating} / 5 ?
				</p>
				<div className="flex items-center justify-end">
					<ButtonSecondary onClick={() => setOpenConfirm(false)}>Annuler</ButtonSecondary>

					<ButtonPrimary
						className="ml-2.5"
						onClick={() => {
							onSubmit({ score: rating, userId: 1 });
							setOpenConfirm(false);
						}}
					>
						Confirmer
					</ButtonPrimary>
				</div>
			</div>
		);
	};

	return (
		<div className="flex items-center">
			<NcModal
				isOpenProp={openConfirm}
				renderTrigger={() => (
					<div className="flex">
						{[1, 2, 3, 4, 5].map((value) => (
							<FaStar
								key={value}
								className={`h-3 w-3 cursor-pointer ${
									value <= rating
										? "text-orange-800 drk:text-yellow-400"
										: "text-gray-300"
								}`}
								onClick={() => handleClick(value)}
							/>
						))}
					</div>
				)}
				triggerText={null}
				modalTitle="Confirmer votre note"
				renderContent={renderModalContent}
			/>
		</div>
	);
};

export default SingleAuthorRating;
