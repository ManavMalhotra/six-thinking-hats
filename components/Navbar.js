import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, moderateScale, verticalScale } from "../metric";

const Navbar = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image style={styles.icon} source={require("../assets/menu.svg")} />
        </TouchableOpacity>

        <Image
          style={styles.tinkLogo}
          source={require("../assets/tink-logo-1.png")}
        />
        <Image
          style={styles.menuIconLayout}
          source={require("../assets/ellipse-15.svg")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  icon: {
    width: 50,
    height: 50,
    color: "black",
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
