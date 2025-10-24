import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import requestReducer from "./slices/requestSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestReducer,
  },
});

export default store;
