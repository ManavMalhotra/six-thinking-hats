import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState, useRef } from "react";

const HatSelector = () => {
  return (
    <View style={styles.hatSelectorContainer}>
      <View style={styles.hat1 }>{/* Add content for the first hat */}</View>
      <View style={styles.hat2}>{/* Add content for the second hat */}</View>
      <View style={styles.hat3}>{/* Add content for the third hat */}</View>
      <View style={styles.hat4}>{/* Add content for the fourth hat */}</View>
      <View style={styles.hat5}>{/* Add content for the fifth hat */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  hatSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "gold",
  },
  hat1: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: "black",
    margin: 10,
  },
  hat2: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: "white",
    margin: 10,
  },
  hat3: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: "yellow",
    margin: 10,
  },
  hat4: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: "green",
    margin: 10,
  },
  hat5: {
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: "red",
    margin: 10,
  }
});

export default HatSelector;
