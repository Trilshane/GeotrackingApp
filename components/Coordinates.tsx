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
import { AppDispatch } from "../types/reduxTypes";

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
            const newCoords = {
              lat: locations[0].coords.latitude,
              lon: locations[0].coords.longitude,
            };
            dispatch(setLatitude(newCoords.lat));
            dispatch(setLongitude(newCoords.lon));
            dispatch(pushGeoDates(newCoords));
            dispatch(getDistance());
          }
        );
        // Handler for changing geolocation
        Location.startLocationUpdatesAsync("WATCH_BG_GEO", {
          accuracy: Location.Accuracy.BestForNavigation,
          showsBackgroundLocationIndicator: true,
          timeInterval: 15000,
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
  }, [startGEOcoding]);

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
