import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import sliderReducer from "./sliders/sliders";
import userRequestsReducer from "./userRequest/userRequest";
import notificationsReducer from "./notifications/notifications";
import categoryReducer from "./products/propertiy-category";
import subCategoryReducer from "./products/sub-propertiy-category";
import productReducer from "./products/product";
import usersReducer from "./users/users";
import metaReducer from "./meta/meta";
import authReducer from "./auth/auth";
import locationReducer from "./locations/locations";

const rootReducers = {
	bookmark: bookmarkReducer,
	postLike: postLikesReducer,
	darkmode: darkmodeReducer,
	commentLikes: commentLikesReducer,
	pages: pagesReducer,
	mediaRunning: mediaRunningReducer,
	meta: metaReducer,
	// CUSTOM
	auth: authReducer,
	sliders: sliderReducer,
	categories: categoryReducer,
	subCategories: subCategoryReducer,
	products: productReducer,
	locations: locationReducer,
	usersManagement: usersReducer,
	userRequests: userRequestsReducer,
	notifications: notificationsReducer,
};

export default rootReducers;
