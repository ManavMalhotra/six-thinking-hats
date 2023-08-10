import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import TimerComponent from "./components/TimerComponent";
import HatSelector from "./components/HatSelector";
import Menu from "./components/Menu";
import HatColor from "./components/HatColor";

export default function App() {
  let [admin, setAdmin] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      {admin ? (
        <React.Fragment>
          <View style={styles.top_container}>
            <TimerComponent />
          </View>
          <View style={styles.middle_container}>
            <View style={styles.hatSelectorContainer}>
              <HatSelector />
            </View>
          </View>
          <View style={styles.bottom_container}>
            <Menu />
          </View>
        </React.Fragment>
      ) : (
        <>
          <View style={styles.top_container}>
            <TimerComponent />
          </View>
          <View style={styles.middle_container}>
            <HatColor />
          </View>
          <View style={styles.bottom_container}>
            <Menu />
          </View>
        </>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  top_container: {
    flex: 1,
    width: "100%",
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  middle_container: {
    flex: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  bottom_container: {
    flex: 1,
    width: "100%",
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
});
