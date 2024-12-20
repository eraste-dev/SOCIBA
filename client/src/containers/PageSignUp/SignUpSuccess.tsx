import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { route } from "routers/route";

interface SignUpSuccessProps {
	className?: string;
}

const SignUpSuccess: FC<SignUpSuccessProps> = ({ className = "" }) => {
	return (
		<div className="nc-SignUpSuccess bg-slate-100">
			<div className="container">
				<div className="flex pt-28 justify-center">
					<h2 className="text-3xl font-semibold">Merci de vous être inscrit</h2>
					<FaCheckCircle className="text-3xl text-green-500 rounded ml-2" />
				</div>

				<div className="mt-5 flex justify-center items-center pb-28 ">
					<Link
						to={route("login")}
						className="bg-primary-6000 text-white rounded-full p-2 hover:bg-secondary-6000"
					>
						Connectez-vous
					</Link>
				</div>

				{false && (
					<div className="mt-5 flex justify-center items-center pb-28 ">
						<Link
							to={route("dashboard")}
							className="mr-5 rounded-full p-2 hover:underline"
						>
							Aller dans votre profil
						</Link>
						<Link
							to={route("add_post")}
							className="bg-primary-6000 text-white rounded-full p-2 hover:bg-secondary-6000"
						>
							Publier une annonce
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default SignUpSuccess;
