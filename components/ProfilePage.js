import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { CheckBox } from "react-native-elements";
import { Input } from "@rneui/themed";

import { horizontalScale, verticalScale, moderateScale } from "../metric";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = (navigation) => {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [role, setRole] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [image, setImage] = useState(null);

  const createProfile = () => {
    if (!name || !organisation || !role) {
      alert("Please fill all fields");
      return;
    } else if (!checked) {
      alert("Please agree to the terms and conditions");
      return;
    } else {
      console.log("Creating profile...");
      const data = { name, organisation, role };
      console.log("data: ", data);
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

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUpload}>
        {image ? (
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
            source={{ uri: image }}
          />
        ) : (
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
            source={require("../assets/imageUpload.svg")}
          />
        )}
      </TouchableOpacity>

      <Input
        label="Full Name"
        labelStyle={styles.label}
        onChangeText={(text) => setName(text)}
        value={name}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Organisation"
        labelStyle={styles.label}
        onChangeText={(text) => setOrganisation(text)}
        value={organisation}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Role"
        labelStyle={styles.label}
        onChangeText={(text) => setRole(text)}
        value={role}
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

// import * as React from "react";
// import { CheckBox } from "@rneui/base";

// export default () => {
//   const [checked, setChecked] = React.useState(false);
//   return (
//     <CheckBox
//       checked={checked}
//       checkedColor="#0F0"
//       checkedTitle="Great!"
//       containerStyle={{ width: "75%" }}
//       onIconPress={() => setChecked(!checked)}
//       onLongIconPress={() =>
//         console.log("onLongIconPress()")
//       }
//       onLongPress={() => console.log("onLongPress()")}
//       onPress={() => console.log("onPress()")}
//       size={30}
//       textStyle={{}}
//       title="Check for Awesomeness"
//       titleProps={{}}
//       uncheckedColor="#F00"
//     />
//   );
// }
