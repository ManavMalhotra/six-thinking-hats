import { View, Text, TouchableOpacity, StyleSheet } from "react-native-web";
import { horizontalScale, verticalScale, moderateScale } from "../metric";

import { Image } from "expo-image";
const UserCard = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePic}
        contentFit="cover"
        source={user.profilePic}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.designation}>| {user.designation}</Text>
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
});

export default UserCard;
