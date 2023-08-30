import { View, Text, TouchableOpacity, StyleSheet } from "react-native-web";
import { horizontalScale, verticalScale, moderateScale } from "../metric";

import { Image } from "expo-image";
const UserCard = ({ user }) => {
  // {
  //   id: "6AxDMLtjF4UcvLLOAAAJ",
  //   name: "Manav Malhotra",
  //   role: "Developer",
  //   hatRole: "blue",
  //   isAdmin: true,
  // },

  const {id, name, role, hatRole} = user;

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
      backgroundColor: hatRole,
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
  });

  return (
    <View style={styles.container} key={id}>
      <Image
        style={styles.profilePic}
        contentFit="cover"
        source={user.profilePic}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.designation}>| {role}</Text>
      <View style={styles.hatColor} />
    </View>
  );
};

export default UserCard;
