import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  image: string;
}

const initialState: UserState = {
  image: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    uploadImage: (
      state,
      action: PayloadAction<{ state: string; data: any }>
    ) => {
      const { state: key, data } = action.payload;
      state.image = data;
    },
  },
});

export const { uploadImage } = imageSlice.actions;

export const selectImage = (state: { image: UserState }) => state.image;

export default imageSlice.reducer;
