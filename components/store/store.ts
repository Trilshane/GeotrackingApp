import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import coordinatsObjectReducer from './coordinatsObjectSlice';
import coordinatsArrayReducer from './coordinatsArray';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    coordinatsObject: coordinatsObjectReducer,
    coordinatsArray: coordinatsArrayReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
