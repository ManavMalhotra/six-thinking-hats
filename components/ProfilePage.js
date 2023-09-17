import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox, Input } from "react-native-elements";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "../store";
import { horizontalScale, verticalScale } from "../metric";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const ProfilePage = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);

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
        navigation.navigate("Home");
      }
    };

    fetchProfileData();
  }, []);

  const createProfile = async () => {
    if (!userName || !userOrganisation || !userRole) {
      alert("Please fill all fields");
      return;
    } else if (!checked) {
      alert("Please agree to the terms and conditions");
      return;
    } else {
      console.log("Creating profile...");

      const data = { userName, userOrganisation, userRole, userProfilePic };

      console.log("data: ", data);

      try {
        // Save profile data to local storage
        await AsyncStorage.setItem("profileData", JSON.stringify(data));
      } catch (error) {
        console.error("Error saving profile data:", error);
      }

      navigation.navigate("SessionScreen");
    }
  };

  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("✅ Iamge Uploaded Successfully!!!");

    if (!result.canceled) {
      setUserProfilePic(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUpload}>
        <Image
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
          }}
          source={
            userProfilePic
              ? userProfilePic
              : require("../assets/imageUpload.svg")
          }
        />
      </TouchableOpacity>

      <Input
        label="Full Name"
        labelStyle={styles.label}
        onChangeText={(text) => setUserName(text)}
        value={userName}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Organisation"
        labelStyle={styles.label}
        onChangeText={(text) => setUserOrganisation(text)}
        value={userOrganisation}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Role"
        labelStyle={styles.label}
        onChangeText={(text) => setUserRole(text)}
        value={userRole}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />

      <CheckBox
        checked={checked}
        containerStyle={styles.checkBoxContainer}
        checkedColor={{ color: "#000000", opacity: 0.5 }}
        uncheckedColor={{ color: "#000000", opacity: 0.5 }}
        onIconPress={() => setChecked(!checked)}
        size={30}
        textStyle={{ fontFamily: FontFamily.manropeRegular, fontWeight: "400" }}
        title="I agree to receive updates and newsletter from this application"
      />

      <TouchableOpacity style={styles.createProfile} onPress={createProfile}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingVertical: verticalScale(20),
    paddingHorizontal: verticalScale(20),
    height: "100%",
    textAlign: "center",
    alignContent: "center",
    fontFamily: FontFamily.manropeSemiBold,
    flex: 1,
  },
  label: {
    opacity: 0.5,
    fontFamily: FontFamily.manropeSemiBold,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "left",
  },

  inputContainer: {
    fontFamily: FontFamily.manropeSemiBold,
    fontSize: FontSize.size_base,
    // color: Color.black,
    paddingHorizontal: horizontalScale(10),
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    marginVertical: verticalScale(5),
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  createProfile: {
    backgroundColor: "transparent",
    borderRadius: 100,
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontFamily: FontFamily.manropeSemiBold,
    fontSize: FontSize.size_base,
    fontWeight: "600",
  },
});

export default ProfilePage;
