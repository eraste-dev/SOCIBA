const SingleNotFound = ({ className = "" }) => {
	return (
		<div className={`nc-SingleNotFound ${className}`} data-nc-id="SingleNotFound">
			<div className="container">
				<div className="w-full flex flex-col items-center space-y-8">
					<div className="max-w-md text-center">
						<h2 className="text-3xl font-semibold">Désolé ! Page introuvable</h2>
						<p className="mt-4 text-neutral-500 dark:text-neutral-400">
							La page que vous recherchez n'existe pas. Veuillez retourner à la page d'accueil.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleNotFound;
