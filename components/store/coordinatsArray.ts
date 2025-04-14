import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CoordinatsObjectType {
  latitude: number;
  longitude: number;
}

interface CoordintasArrayType {
  coordinatsArray: CoordinatsObjectType[];
}

const initialState: CoordintasArrayType = {
  coordinatsArray: [],
};

const coordinatsArraySlice = createSlice({
  name: 'coordinatsArray',
  initialState,
  reducers: {
    pushGeoDates(state, action: PayloadAction<CoordinatsObjectType>) {
      state.coordinatsArray.push(action.payload);
    },
  },
});

export const {pushGeoDates} = coordinatsArraySlice.actions;

export default coordinatsArraySlice.reducer;
