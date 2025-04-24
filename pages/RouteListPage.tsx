import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { fetchData, clearData } from "../store/routeDataSlice";
import { RouteDataTypes } from "../types/reduxTypes";
import RouteItem from "../components/RouteItem";
import RoutesLoader from "../components/RoutesLoader";

const RouteListPage = () => {
  const backendData = useSelector((state: RootState) => state.routeData.data);
  const statusLoadingBackendData = useSelector(
    (state: RootState) => state.routeData.statusLoaded
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    return () => {
      dispatch(clearData());
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {statusLoadingBackendData == "loading" ? (
          <RoutesLoader />
        ) : (
          backendData.map((dataElem, i) => {
            return (
              <RouteItem
                routeNumber={i + 1}
                distance={dataElem.distance}
                date={dataElem.date}
                route={dataElem.route}
                key={dataElem.id}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
};
export default RouteListPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
  },
});
