import React, { useMemo, useRef, useCallback } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { horizontalScale, moderateScale, verticalScale } from "../metric";
import { PanGestureHandler, State } from "react-native-gesture-handler"; // Import the necessary components

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import JoinSession from "./screens/JoinSession";

const SessionScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const bottomSheetRef = useRef(null);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),

    []
  );

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); // Open the bottom sheet to a snap point to change the height.
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close(); // Close the bottom sheet
  };

  return (
    <View style={styles.groupParent}>
      <View style={styles.groupWrapper}>
        <TouchableOpacity>
          <Text style={[styles.mySession]}>My Session</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.history]}>History</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={styles.noSession}
        contentFit="cover"
        source={require("../assets/no-session.svg")}
      />

      <Text style={styles.noSessionText}>You have no session yet!.</Text>

      <View style={styles.sessionBtn}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("CreateSession")}
        >
          <Text style={styles.buttonText}>+ Create new Session</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => openBottomSheet()}
        >
          <Text style={styles.buttonText}>Join Session</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        onBackdropPress={closeBottomSheet}
        backdropComponent={renderBackdrop}
        snapPoints={["50%", "55%", "80%"]}
        enablePanDownToClose={true}
        detached={false}
        style={styles.sheetContainer}
      >
        <View style={styles.contentContainer}>
          <JoinSession />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  groupParent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    textAlign: "center",
    alignContent: "center",
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  groupWrapper: {
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
    alignSelf: "center",
  },
  noSessionText: {
    textAlign: "center",
  },
  sessionBtn: {
    alignContent: "flex-end",
  },
  createButton: {
    borderRadius: 25,
    borderColor: "#000",
    borderWidth: moderateScale(1),
    backgroundColor: "white",
    height: horizontalScale(50),
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  buttonText: {
    textAlign: "center",
  },
  sheetContainer: {

  },
  contentContainer: {
    flex: 1,
    padding: 10
  },
});

