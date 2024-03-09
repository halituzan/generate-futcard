import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import imageSlice from "./features/image/imageSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    image: imageSlice,
  },
});

export default store;
