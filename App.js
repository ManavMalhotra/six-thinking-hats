import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Main from "./components/Main";
import TimerComponent from "./components/TimerComponent";
import HatSelector from "./components/HatSelector";
import Menu from "./components/Menu";
import HatColor from "./components/HatColor";
import SessionScreen from "./components/SessionScreen";

export default function App() {
  let [admin, setAdmin] = useState(false);
  return <SessionScreen />;
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
