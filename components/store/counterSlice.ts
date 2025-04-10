import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
  count: number;
  myCount: number;
}

const initialState: CounterState = {
  count: 0,
  myCount: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    upCount: state => {
      state.count += 1;
    },
    clearCount: state => {
      state.count = 0;
    },
    upMyCount: state => {
      state.myCount += 2;
    },
    clearMyCount: state => {
      state.myCount = 0;
    },
  },
});

export const {upCount, clearCount, upMyCount, clearMyCount} =
  counterSlice.actions;

export default counterSlice.reducer;
