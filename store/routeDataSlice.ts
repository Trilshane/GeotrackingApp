import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetRoteDataType, RouteDataTypes } from "../types/reduxTypes";
import axios from "axios";

const initialState: GetRoteDataType = {
  data: [],
  statusLoaded: "loading",
};

export const fetchData = createAsyncThunk(
  "routeData/fetchRoutes",
  async (): Promise<RouteDataTypes[]> => {
    const { data } = await axios.get("http://83.222.24.50/api/v1/report/");
    return data;
  }
);

const routeDataSlice = createSlice({
  name: "routeData",
  initialState,
  reducers: {
    clearData(state) {
      state.data = [];
      state.statusLoaded = "loading";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.statusLoaded = "loading";
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<RouteDataTypes[]>) => {
          state.statusLoaded = "loaded";
          state.data = action.payload;
        }
      );
  },
});

export const { clearData } = routeDataSlice.actions;
export default routeDataSlice.reducer;
