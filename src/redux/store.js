import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import requestReducer from "./slices/requestSlice";
import postReducer from "./slices/postSlice";
import feedReducer from "./slices/feedSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestReducer,
    posts: postReducer,
    feed: feedReducer,
  },
});

export default store;
