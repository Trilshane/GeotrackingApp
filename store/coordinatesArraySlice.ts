import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CoordinatesArrayType,
  CoordinatesObjectType,
} from "../types/reduxTypes";

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
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  //возвращаем дистанцию в метрах
  return d * 1000;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function setArrayDataInBackend(
  array: CoordinatesObjectType[],
  distance: string
) {
  const dataObj = {
    id: 1,
    route: array,
    distance: distance,
    date: getTodayDate(),
  };

  const data = JSON.stringify(dataObj);

  axios
    .post("http://83.222.24.50/api/v1/report/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => console.log("response ALL", response.data))
    .catch((error) => console.error(error));
}

const coordinatesArraySlice = createSlice({
  name: "coordinatesArray",
  initialState,
  reducers: {
    pushGeoDates(state, action: PayloadAction<CoordinatesObjectType>) {
      state.coordinatesArray.push(action.payload);
    },
    getDistance: (state) => {
      state.distance = getDistanceFn(state.coordinatesArray);
    },
    clearDataCoordinatesArray: (state) => {
      state.coordinatesArray = [];
      state.distance = "";
    },
    setDataInBackend: (state) => {
      setArrayDataInBackend(state.coordinatesArray, state.distance);
    },
  },
});

export const {
  pushGeoDates,
  clearDataCoordinatesArray,
  getDistance,
  setDataInBackend,
} = coordinatesArraySlice.actions;

export default coordinatesArraySlice.reducer;
