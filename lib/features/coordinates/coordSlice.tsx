import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoordState {
  x?: number;
  y?: number;
}

const initialState: CoordState = {
  x: 0,
  y: 0,
};

const coordSlice = createSlice({
  name: "coord",
  initialState,
  reducers: {
    changeCoords: (
      state: any,
      action: { payload: { x: number; y: number } }
    ) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { changeCoords } = coordSlice.actions;

export const selectCoord = (state: { coord: CoordState }) => state;

export default coordSlice.reducer;
