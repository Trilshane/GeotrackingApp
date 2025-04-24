import { FC, useState } from "react";
import { CoordinatesObjectType } from "../types/reduxTypes";
import { View, StyleSheet, Text, Button } from "react-native";
import RouteItemMap from "./RouteItemMap";

interface RouteItemPropsType {
  date: string;
  distance: string | number;
  route: CoordinatesObjectType[];
  routeNumber: number;
}

const RouteItem: FC<RouteItemPropsType> = ({
  date,
  distance,
  routeNumber,
  route,
}) => {
  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <View style={styles.routeItem}>
      <Text>Маршрут №{routeNumber}</Text>
      <Text>Дистанция: {distance}м</Text>
      <Text>Дата: {date}</Text>
      <View style={styles.buttonStyle}>
        <Button
          title={!showMap ? "Показать маршрут" : "Скрыть карту"}
          onPress={() => setShowMap(!showMap)}
        ></Button>
      </View>
      {showMap && <RouteItemMap routeMap={route} />}
    </View>
  );
};

const styles = StyleSheet.create({
  routeItem: {
    width: "100%",
    maxHeight: "100%",
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  buttonStyle: {
    width: "60%",
  },
});

export default RouteItem;
