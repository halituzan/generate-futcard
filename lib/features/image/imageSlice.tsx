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
  flag: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAtMzAwMDAgOTAwMDAgNjAwMDAiPjxwYXRoIGZpbGw9IiNlMzBhMTciIGQ9Ik0wLTMwMDAwaDkwMDAwdjYwMDAwSDB6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTQxNzUwIDAgMTM1NjgtNDQwOC04Mzg2IDExNTQxVi03MTMzbDgzODYgMTE1NDF6bTkyNSA4MDIxYTE1MDAwIDE1MDAwIDAgMSAxIDAtMTYwNDIgMTIwMDAgMTIwMDAgMCAxIDAgMCAxNjA0MnoiLz48L3N2Zz4=",
  team: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAtMzAwMDAgOTAwMDAgNjAwMDAiPjxwYXRoIGZpbGw9IiNlMzBhMTciIGQ9Ik0wLTMwMDAwaDkwMDAwdjYwMDAwSDB6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTQxNzUwIDAgMTM1NjgtNDQwOC04Mzg2IDExNTQxVi03MTMzbDgzODYgMTE1NDF6bTkyNSA4MDIxYTE1MDAwIDE1MDAwIDAgMSAxIDAtMTYwNDIgMTIwMDAgMTIwMDAgMCAxIDAgMCAxNjA0MnoiLz48L3N2Zz4=",
  totalPoint: "99",
  name: "Halit",
  position: "CMF",
  pac: "99",
  sho: "99",
  pas: "99",
  dri: "99",
  def: "99",
  phy: "99",
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
