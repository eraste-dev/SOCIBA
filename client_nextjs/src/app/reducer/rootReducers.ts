import bookmarkReducer from "./reducer/bookmarks/bookmarksSlice";
import postLikesReducer from "./reducer/postLikes/postLikes";
import commentLikesReducer from "./reducer/commentLikes/commentLikes";
import darkmodeReducer from "./reducer/darkmode/darkmode";
import pagesReducer from "./reducer/pages/pages";
import mediaRunningReducer from "./reducer/mediaRunning/mediaRunning";
import sliderReducer from "./reducer/sliders/sliders";
import categoryReducer from "./reducer/products/propertiy-category";
import productReducer from "./reducer/products/product";
import usersReducer from "./reducer/users/users";
import authReducer from "./reducer/auth/auth";
import locationReducer from "./reducer/locations/locations";

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
