import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import sliderReducer from "./sliders/sliders";
import categoryReducer from "./reducer/products/propertiy-category";
import productReducer from "./reducer/products/propertiy";
import authReducer from "./auth/auth";
import locationReducer from "./reducer/locations/locations";

const rootReducers = {
	bookmark: bookmarkReducer,
	postLike: postLikesReducer,
	darkmode: darkmodeReducer,
	commentLikes: commentLikesReducer,
	pages: pagesReducer,
	mediaRunning: mediaRunningReducer,
	// ADDONS
	sliders: sliderReducer,
	categories: categoryReducer,
	products: productReducer,
	auth: authReducer,
	locations: locationReducer,
	// snackbars: snackbarReducer,
};

export default rootReducers;
