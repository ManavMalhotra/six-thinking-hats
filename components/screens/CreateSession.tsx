import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSocketStore, useUserStore } from "../../store";
import socketSingleton from "../../SocketManager";
import { FontFamily, FontSize, Color } from "../../GlobalStyles";
import { Input } from "@rneui/themed";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const CreateSession = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [capacity, setCapacity] = useState("");
  const [duration, setDuration] = useState("");

  const { userName, userOrganisation, userRole, userProfilePic } =
    useUserStore();
  const { userId, setUserId, setroomId, socket, setSocket, setAdmin } =
    useSocketStore();

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  useEffect(() => {
    const socketConnection = async () => {
      let temp1 = await socketSingleton.initSocket();
      let temp2 = await socketSingleton.getSocket();
      setSocket(temp2);
    };
    socketConnection();
  }, []);

  const createRoom = () => {
    console.log("SOCKET: ", socket);
    console.log("Creating room...");

    // backend expects:
    // const {
    //   title,
    //   description,
    //   duration,
    //   capacity,
    //   userId,
    //   userName,
    //   userRole,
    // } = data;

    const data = {
      title,
      description,
      duration: selectedDuration,
      capacity,
      userId,
      userName,
      userRole,
    };

    socket.emit("createRoom", data);

    socket.on("roomCreated", (data) => {
      console.log("roomCreated: ", data.roomId);
      setroomId(data.roomId);
    });

    setAdmin(true);
    navigation.navigate("Participants");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Session</Text>

      <Input
        label="Title"
        labelStyle={styles.label}
        onChangeText={(text) => setTitle(text)}
        value={title}
        inputStyle={[styles.inputContainer]}
      />
      <Input
        label="Description"
        labelStyle={styles.label}
        onChangeText={(text) => setDescription(text)}
        value={description}
        inputStyle={[styles.inputContainer]}
      />
      <Input
        label="Duration"
        labelStyle={styles.label}
        onChangeText={(text) => setDuration(text)}
        value={duration}
        inputStyle={[styles.inputContainer]}
        keyboardType="numeric"
      />
      <Input
        label="Capacity"
        labelStyle={styles.label}
        onChangeText={(text) => setCapacity(text)}
        value={capacity}
        inputStyle={[styles.inputContainer]}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.createButton} onPress={createRoom}>
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
    textAlign: "left",
    alignContent: "center",
    fontFamily: FontFamily.manropeSemiBold,
  },
  header: {
    fontFamily: FontFamily.manropeSemiBold,
    fontSize: FontSize.size_base,
    color: Color.black,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
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

export default CreateSession;
