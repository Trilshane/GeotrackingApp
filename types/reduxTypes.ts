export interface CoordinatesObjectType {
  lat: number;
  lon: number;
}

export interface CoordinatesArrayType {
  coordinatesArray: CoordinatesObjectType[];
  distance: string;
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
