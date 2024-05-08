import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import sliderReducer from "./sliders/sliders";
import propertyCategoryReducer from "./properties/propertiy-category";
import propertyReducer from "./properties/propertiy";
import authReducer from "./auth/auth";

const rootReducers = {
	bookmark: bookmarkReducer,
	postLike: postLikesReducer,
	darkmode: darkmodeReducer,
	commentLikes: commentLikesReducer,
	pages: pagesReducer,
	mediaRunning: mediaRunningReducer,
	// ADDONS
	sliders: sliderReducer,
	propertyCategories: propertyCategoryReducer,
	properties: propertyReducer,
	auth: authReducer,
};

export default rootReducers;
