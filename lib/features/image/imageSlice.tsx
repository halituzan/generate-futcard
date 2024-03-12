import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

interface ValueProps {
  defaultImgSrc: string;
  image: string;
  totalPoint: string;
  name: string;
  position: string;
  flag: any;
  team: React.ReactNode;
  pac: string;
  sho: string;
  pas: string;
  dri: string;
  def: string;
  phy: string;
  angle: number;
  color: string;
  columnColor: string;
}

const initialState: ValueProps = {
  image: "",
  flag: null,
  team: null,
  totalPoint: "",
  name: "",
  position: "",
  pac: "",
  sho: "",
  pas: "",
  dri: "",
  def: "",
  phy: "",
  angle: 90,
  defaultImgSrc: "1",
  color: "#fbffb2",
  columnColor: "#101f3d",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    uploadImage: (state: any, action: PayloadAction<{ payload: string }>) => {
      state.image = action.payload;
    },
    uploadFlag: (state: any, action: { payload: any }) => {
      state.flag = action.payload;
    },
    uploadTeam: (state: any, action: { payload: any }) => {
      state.team = action.payload;
    },
    uploadValues: (state: any, action: { payload: any }) => {
      const { key, data }: any = action.payload;
      state[key] = data;
    },
    clearState: (state: any) => {
      state.image = "";
      state.flag = null;
      state.team = null;
      state.totalPoint = "";
      state.name = "";
      state.position = "";
      state.pac = "";
      state.sho = "";
      state.pas = "";
      state.dri = "";
      state.def = "";
      state.phy = "";
      state.defaultImgSrc = "1";
      state.color = "#fbffb2";
      state.columnColor = "#101f3d";
    },
  },
});

export const { uploadImage, uploadFlag, uploadTeam, uploadValues, clearState } =
  imageSlice.actions;

export const selectImage = (state: { image: ValueProps }) => state.image;

export default imageSlice.reducer;
