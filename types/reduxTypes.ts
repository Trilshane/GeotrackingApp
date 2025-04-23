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
  data: CoordinatesObjectType[];
  statusLoaded: boolean;
}
