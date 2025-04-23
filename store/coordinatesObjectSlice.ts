import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoordinatesObjectType } from "../types/reduxTypes";

const initialState: CoordinatesObjectType = {
  lat: 0,
  lon: 0,
};

const coordinatesObjectSlice = createSlice({
  name: "coordinatesObject",
  initialState,
  reducers: {
    setLatitude(state, action: PayloadAction<number>) {
      state.lat = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.lon = action.payload;
    },
  },
});

export const { setLongitude, setLatitude } = coordinatesObjectSlice.actions;

export default coordinatesObjectSlice.reducer;
