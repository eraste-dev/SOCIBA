import React from "react";
import { CSSTransition } from "react-transition-group";

function NoDataMessage() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<CSSTransition in={true} appear={true} timeout={500} classNames="fade">
				<p className="text-gray-500 text-lg">Aucune annonce trouvée</p>
			</CSSTransition>
		</div>
	);
}

export default NoDataMessage;
