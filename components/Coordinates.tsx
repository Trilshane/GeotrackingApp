import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useDispatch, useSelector } from "react-redux";
import {
  setLatitude,
  setLongitude,
  clearCoordinates,
} from "../store/coordinatesObjectSlice";
import {
  pushGeoDates,
  getDistance,
  clearDataCoordinatesArray,
  setDistanceData,
} from "../store/coordinatesArraySlice";
import type { RootState } from "../store/store";
import { AppDispatch, CoordinatesObjectType } from "../types/reduxTypes";

import store from "../store/store";

const Coordinates = () => {
  const [startGEOcoding, setStartGeocoding] = useState<boolean>(false);
  const [componentDistance, setComponentDistance] = useState<string>("");

  function getTodayDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  const latitude = useSelector(
    (state: RootState) => state.coordinatesObject.lat
  );
  const longitude = useSelector(
    (state: RootState) => state.coordinatesObject.lon
  );
  const geoDateArray = useSelector(
    (state: RootState) => state.coordinatesArray.coordinatesArray
  );
  const distance = useSelector(
    (state: RootState) => state.coordinatesArray.distance
  );
  const loadStatus = useSelector(
    (state: RootState) => state.coordinatesArray.loadedStatus
  );

  const dispatch = useDispatch<AppDispatch>();

  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
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
    function deg2rad(deg: number): number {
      return deg * (Math.PI / 180);
    }

    //возвращаем дистанцию в метрах
    return d * 1000;
  }

  useEffect(() => {
    if (startGEOcoding) {
      dispatch(clearCoordinates());
      dispatch(clearDataCoordinatesArray());
      setComponentDistance("");
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        Location.enableNetworkProviderAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        TaskManager.defineTask(
          "WATCH_BG_GEO",
          ({ data: { locations }, error }: any): any => {
            if (error) return;
            const currentStateCoordinatesArray =
              store.getState().coordinatesArray.coordinatesArray;

            const newCoords: CoordinatesObjectType = {
              lat: locations[0].coords.latitude,
              lon: locations[0].coords.longitude,
            };
            dispatch(setLatitude(newCoords.lat));
            dispatch(setLongitude(newCoords.lon));

            if (currentStateCoordinatesArray.length > 0) {
              if (currentStateCoordinatesArray.length < 2) {
                if (
                  getDistanceFromLatLonInKm(
                    +currentStateCoordinatesArray.at(-1).lat,
                    +currentStateCoordinatesArray.at(-1).lon,
                    +newCoords.lat,
                    +newCoords.lon
                  ) >= 100
                ) {
                  dispatch(clearDataCoordinatesArray());
                  console.warn(
                    "второе значение не записалось, дистанция больше 100м, массив очистился"
                  );
                  console.warn(
                    `дистанция при второй записи - ${getDistanceFromLatLonInKm(
                      +currentStateCoordinatesArray.at(-1).lat,
                      +currentStateCoordinatesArray.at(-1).lon,
                      +newCoords.lat,
                      +newCoords.lon
                    )} м
                  `
                  );
                } else {
                  dispatch(pushGeoDates(newCoords));
                  console.warn("второе значение записалось");
                }
              } else {
                if (
                  getDistanceFromLatLonInKm(
                    +currentStateCoordinatesArray.at(-1).lat,
                    +currentStateCoordinatesArray.at(-1).lon,
                    +newCoords.lat,
                    +newCoords.lon
                  ) <= 100
                ) {
                  console.warn("данные записались");
                  console.warn(
                    `дистанция при изменении ползунка - ${getDistanceFromLatLonInKm(
                      +currentStateCoordinatesArray.at(-1).lat,
                      +currentStateCoordinatesArray.at(-1).lon,
                      +newCoords.lat,
                      +newCoords.lon
                    ).toFixed(2)} м
                  `
                  );
                  dispatch(pushGeoDates(newCoords));
                } else {
                  console.warn(
                    "данные не записались, дистанция больше 100м, от предыдущего значения"
                  );
                  console.warn(
                    `дистанция при изменении ползунка - ${getDistanceFromLatLonInKm(
                      +currentStateCoordinatesArray.at(-1).lat,
                      +currentStateCoordinatesArray.at(-1).lon,
                      +newCoords.lat,
                      +newCoords.lon
                    ).toFixed(2)} м
                  `
                  );
                }
              }
            } else {
              console.warn("первое значение записалось");
              dispatch(pushGeoDates(newCoords));
            }
            dispatch(getDistance());
          }
        );
        // Handler for changing geolocation
        Location.startLocationUpdatesAsync("WATCH_BG_GEO", {
          accuracy: Location.Accuracy.BestForNavigation,
          showsBackgroundLocationIndicator: true,
          timeInterval: 2000,
          activityType: Location.ActivityType.AutomotiveNavigation,
          distanceInterval: 1,
          foregroundService: {
            notificationTitle: "GPS",
            notificationBody: "enabled",
          },
        });
      })();
    } else {
      Location.stopLocationUpdatesAsync("WATCH_BG_GEO");
      if (geoDateArray.length > 1) {
        setComponentDistance(distance);
        dispatch(
          setDistanceData({
            id: 1,
            route: geoDateArray,
            distance: distance,
            date: getTodayDate(),
          })
        );
      }
    }
  }, [startGEOcoding, dispatch]);

  return (
    <View>
      {latitude != 0 && <Text>Текущая широта:{latitude}</Text>}
      {longitude != 0 && <Text>Текущая долгота:{longitude}</Text>}
      {componentDistance && <Text>Дистанция {componentDistance} м</Text>}
      <Button
        title={!startGEOcoding ? "Начать" : "Закончить"}
        onPress={() => {
          setStartGeocoding(!startGEOcoding);
        }}
      />
      <>
        {loadStatus &&
          Alert.alert(
            "Маршрут сохранен",
            "Для просмотра маршрутов, перейдите во вкладку 'маршруты'",
            [
              {
                text: "OK",
                onPress: () => dispatch(clearDataCoordinatesArray()),
              },
            ]
          )}
      </>
    </View>
  );
};

export default Coordinates;
