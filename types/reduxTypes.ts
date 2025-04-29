import store from "../store/store";

export type AppDispatch = typeof store.dispatch;

export interface CoordinatesObjectType {
  lat: number;
  lon: number;
}

export interface CoordinatesArrayType {
  coordinatesArray: CoordinatesObjectType[];
  distance: string;
  loadedStatus: boolean;
}

export interface CounterState {
  count: number;
  myCount: number;
}

export interface GetRoteDataType {
  data: RouteDataTypes[];
  statusLoaded: string;
}

export interface RouteDataTypes {
  id: number;
  date: string;
  distance: string | number;
  route: CoordinatesObjectType[];
}
