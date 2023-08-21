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

import { SocketManager } from "../SocketManager";

const NewSession = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");
  const [socket, setSocket] = useState();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const socket = SocketManager.getSocket();
    setSocket(socket);
    setUserId(socket.id);
  }, []);
  const createRoom = () => {
    console.log("Creating room...");
    console.log("socket id: ", userId);
    const data = { userId, title, description, duration, capacity };

    socket.emit("createRoom", data);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Title</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <Text>Duration</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setDuration(text);
          }}
        />
        <Text>Capacity</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setCapacity(text);
          }}
        />
        <Button title="Create Room" onPress={createRoom} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeTextBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
});

export default NewSession;
