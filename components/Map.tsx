import { Polygon, Polyline, YaMap } from "react-native-yamap";
import { StyleSheet } from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

const Map = () => {
  const geoDateArray = useSelector(
    (state: RootState) => state.coordinatesArray.coordinatesArray
  );
  const distance = useSelector(
    (state: RootState) => state.coordinatesArray.distance
  );

  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState(null);
  useEffect(() => {
    if (geoDateArray.length > 1) {
      setLoading(true);
      setArr(geoDateArray);
    } else {
      setLoading(false);
    }
  }, [geoDateArray]);

  return (
    <>
      {loading && (
        <YaMap
          showUserPosition={false}
          rotateGesturesEnabled={false}
          nightMode={true}
          mapType={"vector"}
          initialRegion={{
            lat: 30,
            lon: 30,
            zoom: 7,
            azimuth: 0,
          }}
          style={styles.mapStyle}
        >
          <Polyline
            points={arr}
            fillColor="#5789d9"
            strokeColor="#154ca3"
            strokeWidth={4}
            zIndex={4}
          />
        </YaMap>
      )}
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  mapStyle: {
    width: vw(100),
    height: vh(70),
  },
});
