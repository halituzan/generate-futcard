import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id?: string;
    email?: string;
  };
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (
      state,
      action: PayloadAction<{ state: string; data: any }>
    ) => {
      const { state: key, data } = action.payload;
      state.user = data;
    },
  },
});

export const { changeUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
