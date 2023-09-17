import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { horizontalScale, moderateScale, verticalScale } from "../metric";

const TimerComponent = ({ duration }) => {
  const initialTime = duration * 60; // 10 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
        });
      }, 1000);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(initialTime);
    setRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return ` ${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds} `;
  };

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timeText}>
        <Text style={[styles.timerText, styles.opaque]}>Session Ends in</Text>
        <Text style={[styles.timerText, {color: "blue"}] }>{formatTime(time)}</Text>
        <Text style={[styles.timerText, styles.opaque]}>sec</Text>
      </View>

      <TouchableOpacity onPress={running ? stopTimer : startTimer}>
        <Image style={styles.icon} source={require("../assets/play.svg")} />
      </TouchableOpacity>

      <TouchableOpacity onPress={resetTimer}>
        <Image
          style={styles.resetIcon}
          source={require("../assets/reset.svg")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#000",
    padding: 10,
    fontFamily: FontFamily.manropeSemiBold,
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(20),
  },
  opaque: {
    opacity: 0.5,
  },
  timeText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.manropeSemiBold,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: horizontalScale(3),
  },
  resetIcon: {
    width: 25,
    height: 25,
  },
});

export default TimerComponent;
