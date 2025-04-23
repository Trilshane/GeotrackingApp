import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetRoteDataType } from "../types/reduxTypes";
import axios from "axios";

const initialState: GetRoteDataType = {
  data: [],
  statusLoaded: false,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const { data } = await axios.get("http://83.222.24.50/api/v1/report/");
  return data;
});

const routeDataSlice = createSlice({
  name: "routeData",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      if (action.payload.status === "ok") {
        state.statusLoaded = true;
      }
    });
  },
});

export const { setData } = routeDataSlice.actions;
export default routeDataSlice.reducer;
