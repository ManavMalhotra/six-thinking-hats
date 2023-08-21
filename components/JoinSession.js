import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import { SocketManager } from "../SocketManager";

const JoinSession = ({ navigation }) => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("");
  const [roomId, setroomId] = useState("");
  useEffect(() => {
    const socket = SocketManager.getSocket();
    setSocket(socket);
    setUserId(socket.id);
  }, []);

  // const createRoom = () => {
  //   console.log("Creating room...");
  //   console.log("socket id: ", userId);
  //   const data = { userId, title, description, duration, capacity };

  //   socket.emit("createRoom", data);
  //   navigation.navigate("Home");
  // };

  const joinRoom = () => {
    console.log("Joining room...");
    console.log("socket id: ", userId);
    const data = { roomId, userId };

    socket.emit("joinRoom", data);

    navigation.navigate("Participants");
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Join Session</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setroomId(text);
          }}
        />
      </View>

      <Button title="Join" onPress={joinRoom} />
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

export default JoinSession;
