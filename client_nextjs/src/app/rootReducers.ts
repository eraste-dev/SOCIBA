import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import sliderReducer from "./sliders/sliders";

const rootReducers = {
	bookmark: bookmarkReducer,
	postLike: postLikesReducer,
	darkmode: darkmodeReducer,
	commentLikes: commentLikesReducer,
	pages: pagesReducer,
	mediaRunning: mediaRunningReducer,
	// ADDONS
	sliders: sliderReducer,
};

export default rootReducers;
