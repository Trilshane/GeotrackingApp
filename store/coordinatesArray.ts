import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoordinatesObjectType {
  lat: number;
  lon: number;
}

interface CoordinatesArrayType {
  coordinatesArray: CoordinatesObjectType[];
  distance: string;
}

const initialState: CoordinatesArrayType = {
  coordinatesArray: [],
  distance: "",
};

function getDistanceFn(array: CoordinatesObjectType[]): string {
  let distance: number = 0;
  for (let i = 0; i < array.length - 1; i++) {
    distance += getDistanceFromLatLonInKm(
      array[i].lat,
      array[i].lon,
      array[i + 1].lat,
      array[i + 1].lon
    );
  }
  return distance.toFixed(2);
}

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km

  return d * 1000;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const coordinatesArraySlice = createSlice({
  name: "coordinatsArray",
  initialState,
  reducers: {
    pushGeoDates(state, action: PayloadAction<CoordinatesObjectType>) {
      state.coordinatesArray.push(action.payload);
    },
    getDistance: (state) => {
      state.distance = getDistanceFn(state.coordinatesArray);
    },
    clearCoordinatesArray: (state) => {
      state.coordinatesArray = [];
    },
    clearDistance: (state) => {
      state.distance = "";
    },
  },
});

export const {
  pushGeoDates,
  clearCoordinatesArray,
  getDistance,
  clearDistance,
} = coordinatesArraySlice.actions;

export default coordinatesArraySlice.reducer;
