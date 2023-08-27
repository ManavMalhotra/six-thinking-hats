import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, verticalScale } from "../metric";
import { useUserStore } from "../store";
import { Image } from "expo-image";

const Navbar = ({ navigation }) => {
  const profilePic = useUserStore((state) => state.userProfilePic);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const tinkLogoSource = require("../assets/tink-logo-1.png");
  const defaultProfilePicSource = require("../assets/ellipse-15.svg");

  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image style={styles.icon} source={require("../assets/menu.svg")} />
        </TouchableOpacity>

        <Image style={styles.tinkLogo} source={tinkLogoSource} />

        <Image
          style={styles.icon}
          source={profilePic ? { uri: profilePic } : defaultProfilePicSource}
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
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  icon: {
    width: 50,
    height: 50,
  },
  tinkLogo: {
    width: 106,
    height: 32,
  },
});

export default Navbar;
