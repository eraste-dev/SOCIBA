import React from "react";

const FooterLoggedIn: React.FC = () => {
	return (
		<div className="nc-Footer relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
			<div className="text-center dark:text-neutral-200">copyright © {new Date().getFullYear()}. Tous droits réservés.</div>
		</div>
	);
};

export default FooterLoggedIn;
