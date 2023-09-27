import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { horizontalScale, verticalScale, moderateScale } from "../../metric";

import { Image } from "expo-image";

import { Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

import Icon from "react-native-vector-icons/MaterialIcons";

const UserCard = ({ user, roomId, adminCard }) => {
  // {
  //   id: "6AxDMLtjF4UcvLLOAAAJ",
  //   name: "Manav Malhotra",
  //   role: "Developer",
  //   hatRole: "blue",
  //   isAdmin: true,
  // },

  const { id, name, role, hatRole, isAdmin } = user;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: roomId.toString(),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("shared with activity type of result.activityType");
        } else {
          // shared
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  console.log("user card: ", user);

  const handleCopy = async () => {
    try {
      await Clipboard.setString(roomId.toString());
      alert("Copied to Clipboard!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (user.isAdmin && adminCard) {
    return (
      <View style={styles.container} key={id}>
        <Image
          style={styles.profilePic}
          contentFit="cover"
          source={user.profilePic}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.designation}>| {role}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleShare}>
            <Icon name="share" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCopy}>
            <Icon name="content-copy" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} key={id}>
      <Image
        style={styles.profilePic}
        contentFit="cover"
        source={user.profilePic}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.designation}>| {role}</Text>
      <View
        style={[
          styles.hatColor,
          {
            backgroundColor: hatRole,
          },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: moderateScale(10),
    marginHorizontal: horizontalScale(20),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3.7125747203826904 },
    shadowOpacity: 0.11,
    shadowRadius: 46.40718460083008,
    elevation: 1,
    marginVertical: verticalScale(10),
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  name: {
    marginLeft: horizontalScale(10),
  },
  designation: {
    opacity: 0.5,
  },
  hatColor: {
    width: 20,
    height: 20,
    borderRadius: 100,
    position: "absolute",
    right: 0,
    top: 0,
    margin: 10,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 3.7125747203826904 },
    shadowOpacity: 0.7,
    shadowRadius: 46,
    elevation: 1,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default UserCard;
