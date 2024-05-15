import React from "react";
import MyRouter from "routers/index";
import { SnackbarProvider } from "notistack";

function App() {
	return (
		<div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
			<SnackbarProvider maxSnack={3}>
				<MyRouter />
			</SnackbarProvider>
		</div>
	);
}

export default App;
