import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import useSocketStore from "../store";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const NewSession = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [capacity, setCapacity] = useState("");
  // const [roomId, setroomId] = useState("");

  const socket = useSocketStore((state) => state.socket);
  const userId = useSocketStore((state) => state.userId);
  const setuserId = useSocketStore((state) => state.setuserId);
  const isAdmin = useSocketStore((state) => state.isAdmin);
  const setAdmin = useSocketStore((state) => state.setAdmin);
  const roomId = useSocketStore((state) => state.roomId);
  const setroomId = useSocketStore((state) => state.setroomId);
  const setMySession = useSocketStore((state) => state.setMySession);

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  useEffect(() => {
    useSocketStore.getState().connect();
    return () => {
      useSocketStore.getState().disconnect();
    };
  }, []);

  const createRoom = () => {
    console.log("Creating room...");
    const newUserId = socket.id;
    setuserId(newUserId);
    setAdmin(true);
    const data = { userId: newUserId, title, description, duration, capacity };

    socket.emit("createRoom", data);

    socket.on("roomCreated", (data) => {
      console.log("roomCreated: ", data.roomId);

      if (data.roomId != null) {
        setroomId(data.roomId);
      }

      setMySession((prev) => prev.concat(data));
    });

    console.log("Creating roomId.........: ", roomId);

    navigation.navigate("Participants", { roomId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Session</Text>

      <View style={styles.inputContainer}>
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
      </TouchableOpacity>
    </View>
  );
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
    opacity: 0.7,
  },
  codeTextBox: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
    textAlignVertical: "top",
    paddingVertical: 5,
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
    backgroundColor: "black",
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});

export default NewSession;
