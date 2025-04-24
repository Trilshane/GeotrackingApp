import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import Coordinates from "../components/Coordinates";
import Map from "../components/Map";

const HeadPage = ({ navigation }) => {
  const loadScene = () => {
    navigation.navigate("RouteList");
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Coordinates />
        <Map />
        <Button title="Маршруты" onPress={loadScene} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 15,
  },
});

export default HeadPage;
