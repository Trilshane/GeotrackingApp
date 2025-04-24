import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { YaMap } from "react-native-yamap";
import Navigate from "./Navigate";

YaMap.init("7a9a8ca9-cbde-4935-92a3-de47499bbfcb");

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
}
