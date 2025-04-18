import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";
import Coordinates from "./components/Coordinates";
import { YaMap } from "react-native-yamap";
import Map from "./components/Map";

YaMap.init("7a9a8ca9-cbde-4935-92a3-de47499bbfcb");

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Coordinates />
        <Map />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
