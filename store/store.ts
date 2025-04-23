import { configureStore } from "@reduxjs/toolkit";
import coordinatesObjectReducer from "./coordinatesObjectSlice";
import coordinatesArrayReducer from "./coordinatesArraySlice";
import routeDataSliceReducer from "./routeDataSlice";

const store = configureStore({
  reducer: {
    coordinatesObject: coordinatesObjectReducer,
    coordinatesArray: coordinatesArrayReducer,
    routeData: routeDataSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
