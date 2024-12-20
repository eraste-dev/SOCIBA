import { IAuth } from "app/reducer/auth/auth";

export const isLogged = (user: IAuth | undefined) => {
	return user && user.user && user.user.id;
};
