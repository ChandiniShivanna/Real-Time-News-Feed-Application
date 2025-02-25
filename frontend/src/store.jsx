import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    user: userReducer,
  },
});

export default store;
