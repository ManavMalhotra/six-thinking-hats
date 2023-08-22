import React from "react";
import { View, StyleSheet } from "react-native";

const HatColor = ({ hatColor }) => {
  const styles = StyleSheet.create({
    block: {
      width: "50%",
      height: "50%",
      borderRadius: 10,
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    color: {
      backgroundColor: hatColor, 
    },
  });

  return (
    <View style={[styles.block, styles.color]}></View>
  );
};

export default HatColor;
