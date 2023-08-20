import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Image } from "expo-image";
const Navbar = () => {
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <Image
          style={styles.icon}
          source={require("../assets/menu.svg")}
          contentFit="cover"
        />

        <Image
          style={styles.tinkLogo}
          source={require("../assets/tink-logo-1.png")}
        />
        <Image
          style={styles.menuIconLayout}
          contentFit="cover"
          source={require("../assets/ellipse-15.svg")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbar:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  icon: {
    width: 50,
    height: 50,
  },
  tinkLogo: {
    width: 106,
    height: 32,
  },
  menuIconLayout: {
    height: 24,
    width: 24,
  },
});
export default Navbar;
