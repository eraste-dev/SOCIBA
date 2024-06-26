import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import sliderReducer from "./sliders/sliders";
import categoryReducer from "./products/propertiy-category";
import productReducer from "./products/product";
import usersReducer from "./users/users";
import authReducer from "./auth/auth";
import locationReducer from "./locations/locations";

const rootReducers = {
	bookmark: bookmarkReducer,
	postLike: postLikesReducer,
	darkmode: darkmodeReducer,
	commentLikes: commentLikesReducer,
	pages: pagesReducer,
	mediaRunning: mediaRunningReducer,
	sliders: sliderReducer,
	categories: categoryReducer,
	products: productReducer,
	auth: authReducer,
	locations: locationReducer,
	usersManagement: usersReducer,
};

export default rootReducers;
