import { View, StyleSheet } from "react-native";
const HatColor = () => {
  return (
    <>
      <View style={styles.hatColor}></View>
    </>
  );
};

const styles = StyleSheet.create({
  hatColor: {
    width: "60%",
    height: "80%",
    borderRadius: 10,
    backgroundColor: "red",
  },
});

export default HatColor;
