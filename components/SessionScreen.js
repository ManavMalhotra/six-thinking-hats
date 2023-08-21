import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { Image } from "expo-image";

const SessionScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.groupParentFlexBox}>
        <View style={styles.groupWrapper}>
          <Text style={styles.mySession}>My Sessions</Text>
          <Text style={[styles.history]}>History</Text>
        </View>
        <Image
          style={styles.noSession}
          contentFit="cover"
          source={require("../assets/no-session.svg")}
        />
        <Button
          title="+ Create a new Session"
          onPress={() => navigation.navigate("NewSession")}
        />
        <Button
          title=" Join Session"
          styles={styles.joinSessionBtn}
          onPress={() => navigation.navigate("JoinSession")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  groupParent: {
    width: "100%",
    height: "50",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    marginTop: 40,
  },
  groupWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  mySession: {
    fontWeight: "bold",
  },
  noSession: {
    width: 220,
    height: 220,
  },
  joinSessionBtn: {
    marginTop: 20,
  },
});

export default SessionScreen;
