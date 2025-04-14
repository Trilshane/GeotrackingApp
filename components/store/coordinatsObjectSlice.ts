import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CoordinatsObjectType {
  latitude: number;
  longitude: number;
}

const initialState: CoordinatsObjectType = {
  latitude: 0,
  longitude: 0,
};

const coordinatsObjectSlice = createSlice({
  name: 'coordinatsObject',
  initialState,
  reducers: {
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
  },
});

export const {setLongitude, setLatitude} = coordinatsObjectSlice.actions;

export default coordinatsObjectSlice.reducer;
