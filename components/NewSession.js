import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSocketStore } from "../store";
import socketSingleton from "../SocketManager";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import { Input } from "@rneui/themed";

const NewSession = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [capacity, setCapacity] = useState("");
  const [duration, setDuration] = useState("");

  const [socket, setSocket] = useState(null);

  const roomId = useSocketStore((state) => state.roomId);
  const setAdmin = useSocketStore((state) => state.setAdmin);
  const setroomId = useSocketStore((state) => state.setroomId);
  const setMySession = useSocketStore((state) => state.setMySession);
  const setUserId = useSocketStore((state) => state.setUserId);

  useEffect(() => {
    console.log('socket initialize: ')
    socketSingleton.initSocket();
    setSocket(socketSingleton.getSocket(), console.log("socket: ", socket));

  }, []);

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  const createRoom = () => {
    console.log("socket: ", socket);
    setUserId(socket.id);
    console.log("Creating room...");
    const data = {
      title,
      description,
      selectedDuration,
      capacity,
    };

    socket.emit("createRoom", data);
    socket.on("roomCreated", (data) => {
      console.log("roomCreated: ", data.roomId);
      setroomId(data.roomId);
    });

    // console.log("Creating roomId.........: ", roomId);

    navigation.navigate("Participants");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Session</Text>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={[styles.input, styles.codeTextBox]}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.description, styles.codeTextBox]}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration</Text>
        <View style={styles.durationContainer}>
          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDuration === "20" && styles.selectedButton,
            ]}
            onPress={() => handleDurationSelection("20")}
          >
            <Text style={styles.durationText}>20 min</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDuration === "40" && styles.selectedButton,
            ]}
            onPress={() => handleDurationSelection("40")}
          >
            <Text style={styles.durationText}>40 min</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDuration === "60" && styles.selectedButton,
            ]}
            onPress={() => handleDurationSelection("60")}
          >
            <Text style={styles.durationText}>60 min</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Capacity</Text>
        <TextInput
          style={[styles.input, styles.codeTextBox]}
          onChangeText={(text) => setCapacity(text)}
          value={capacity}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.createButton} onPress={createRoom}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity> */}

      <Input
        label="Title"
        labelStyle={styles.label}
        onChangeText={(text) => setTitle(text)}
        value={title}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Description"
        labelStyle={styles.label}
        onChangeText={(text) => setDescription(text)}
        value={description}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Duration"
        labelStyle={styles.label}
        onChangeText={(text) => setDuration(text)}
        value={duration}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        label="Capacity"
        labelStyle={styles.label}
        onChangeText={(text) => setCapacity(text)}
        value={capacity}
        inputStyle={[styles.inputContainer]}
        inputContainerStyle={styles.inputBox}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => createRoom()}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonStyles = {
  backgroundColor: "black",
  borderRadius: 25,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: "100%",
    textAlign: "center",
    alignContent: "center",
    fontFamily: FontFamily.manropeSemiBold,
  },
  header: {
    fontFamily: FontFamily.manropeSemiBold,
    fontSize: FontSize.size_base,
    color: Color.black,
    fontWeight: "600",
    lineHeight: 20,
  },
  inputContainer: {
    textAlign: "left",
  },
  label: {
    opacity: 0.5,
    marginBottom: 3,
  },
  codeTextBox: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
    textAlignVertical: "top",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  description: {
    height: 100,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  durationButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  durationText: {
    color: "#000",
  },
  selectedButton: {
    borderColor: "green",
  },
  createButton: {
    ...buttonStyles,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});

export default NewSession;
