import { View, StyleSheet } from "react-native";
import YaMap, { Polyline } from "react-native-yamap";
import { CoordinatesObjectType } from "../types/reduxTypes";
import { FC } from "react";

interface RouteItemMapType {
  routeMap: CoordinatesObjectType[];
}

const RouteItemMap: FC<RouteItemMapType> = ({ routeMap }) => {
  return (
    <View style={styles.container}>
      <YaMap
        showUserPosition={false}
        rotateGesturesEnabled={false}
        nightMode={true}
        initialRegion={{
          lat: routeMap[0].lat,
          lon: routeMap[0].lon,
          zoom: 16,
          azimuth: 0,
        }}
        style={styles.map}
      >
        <Polyline
          points={routeMap}
          strokeColor="#ff5500"
          strokeWidth={4}
          zIndex={4}
        />
      </YaMap>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default RouteItemMap;
