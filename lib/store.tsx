import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import imageSlice from "./features/image/imageSlice";
import coordSlice from "./features/coordinates/coordSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    image: imageSlice,
    coord: coordSlice,
  },
});

export default store;
