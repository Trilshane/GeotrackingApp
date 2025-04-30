import { View, StyleSheet } from "react-native";
const arr = [1, 2, 3, 4, 5, 6];

const RoutesLoader = () => {
  return (
    <View style={styles.container}>
      {arr.map((el) => {
        return <View style={styles.elem} key={el}></View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
  },
  elem: {
    width: "100%",
    height: 120,
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
});
export default RoutesLoader;
