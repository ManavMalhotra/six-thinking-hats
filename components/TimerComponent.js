import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState, useRef } from "react";

const TimerComponent = () => {
  const initialTime = 10 * 60; // 10 minutes in seconds
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
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <Button
        style={styles.button}
        title={running ? "Stop" : "Start"}
        onPress={running ? stopTimer : startTimer}
      />
      <Button style={styles.button} title="Reset" onPress={resetTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  timerText: {
    fontSize: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  button: {
    margin: 100,
  },
});

export default TimerComponent;
