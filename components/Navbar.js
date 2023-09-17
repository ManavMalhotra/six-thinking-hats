import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, verticalScale } from "../metric";
import { useUserStore } from "../store";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = ({ navigation }) => {
  const {
    userName,
    userOrganisation,
    userRole,
    userProfilePic,
    setUserName,
    setUserOrganisation,
    setUserRole,
    setUserProfilePic,
  } = useUserStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data from local storage
        const storedData = await AsyncStorage.getItem("profileData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserName(parsedData.userName);
          setUserOrganisation(parsedData.userOrganisation);
          setUserRole(parsedData.userRole);
          setUserProfilePic(parsedData.userProfilePic);
          navigation.navigate("SessionScreen");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    // fetchProfileData();
  }, []);

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
          source={userProfilePic ? { uri: userProfilePic } : defaultProfilePicSource}
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
