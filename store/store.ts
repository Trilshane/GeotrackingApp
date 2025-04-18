import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import coordinatesObjectReducer from "./coordinatesObjectSlice";
import coordinatesArrayReducer from "./coordinatesArray";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    coordinatesObject: coordinatesObjectReducer,
    coordinatesArray: coordinatesArrayReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
