import { Link } from "react-router-dom";
import { route } from "routers/route";

const SingleNotFound = ({ className = "" }) => {
	return (
		<div className={`nc-SingleNotFound ${className}`} data-nc-id="SingleNotFound">
			<div className="container py-20">
				<div className="w-full flex flex-col items-center space-y-8">
					<div className="max-w-md text-center">
						<h2 className="text-3xl font-semibold">Désolé ! Page introuvable</h2>
						<p className="mt-4 text-neutral-500 dark:text-neutral-400">
							La page que vous recherchez n'existe pas. Veuillez retourner à la page d'accueil.
						</p>
					</div>

					<div className="mt-12">
						<Link to={route("home")} className="bg-primary-700 text-white hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
							Retourner à la page d'accueil
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleNotFound;
