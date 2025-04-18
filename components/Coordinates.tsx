import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useDispatch, useSelector } from "react-redux";
import { setLatitude, setLongitude } from "../store/coordinatesObjectSlice";
import {
  upCount,
  upMyCount,
  clearCount,
  clearMyCount,
} from "../store/counterSlice";
import {
  pushGeoDates,
  clearCoordinatesArray,
  getDistance,
  clearDistance,
} from "../store/coordinatesArray";
import type { RootState } from "../store/store";

const Coordinates = () => {
  const [startGEOcoding, setStartGeocoding] = useState<boolean>(false);
  const [componentDistance, setComponentDistance] = useState<string>("");

  const count = useSelector((state: RootState) => state.counter.count);
  const myCount = useSelector((state: RootState) => state.counter.myCount);
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (startGEOcoding) {
      dispatch(clearCoordinatesArray());
      dispatch(setLatitude(0));
      dispatch(setLongitude(0));
      dispatch(clearDistance());
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
          ({ data: { locations }, error }) => {
            if (error) return;
            const newCoords = {
              lat: locations[0].coords.latitude,
              lon: locations[0].coords.longitude,
            };
            dispatch(setLatitude(newCoords.lat));
            dispatch(setLongitude(newCoords.lon));
            dispatch(pushGeoDates(newCoords));
            dispatch(getDistance());
            console.log(newCoords);
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
            notificationBody: " enabled",
          },
        });
      })();
    } else {
      Location.stopLocationUpdatesAsync("WATCH_BG_GEO");
      if (geoDateArray.length > 1) {
        console.log("geoDateArray", geoDateArray);
        console.log("distance", distance);
        setComponentDistance(distance);
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
        onPress={() => setStartGeocoding(!startGEOcoding)}
      />
      {/* {geoDateArray.map(
        (el: { latitude: number; longitude: number }, id: number) => {
          return (
            <View key={id}>
              <Text>{el.latitude}</Text>
              <Text>{el.longitude}</Text>
            </View>
          );
        }
      )} */}
    </View>
  );
};

export default Coordinates;
