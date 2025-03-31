import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./slices/authSlice";
import feedReducer from "./slices/feedSlice";
import messagesReducer from "./slices/messagesSlice";
import likesReducer from "./slices/likesSlice";
import savedPostsReducer from "./slices/savedPostsSlice";
import exploreReducer from "./slices/exploreSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    feed: feedReducer,
    messages: messagesReducer,
    likes: likesReducer,
    savedPosts: savedPostsReducer,
    explore: exploreReducer,
  },
});

export default store;
