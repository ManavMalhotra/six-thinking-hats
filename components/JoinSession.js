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
import socketSingleton from "../SocketManager";
import { useSocketStore } from "../store";

const JoinSession = ({ navigation }) => {
  // const [socket, setSocket] = useState(null);
  // const [userId, setUserId] = useState("");
  const [roomId, setroomId] = useState("");
  const [socket, setSocket] = useState(null);
  const userId = useSocketStore((state) => state.userId);
  const setUserId = useSocketStore((state) => state.setUserId);
  const isAdmin = useSocketStore((state) => state.isAdmin);
  const setAdmin = useSocketStore((state) => state.setAdmin);
  const setMySession = useSocketStore((state) => state.setMySession);


  useEffect(() => {
    console.log("_______JoinSession.js_______")
    console.log("socket initialize: ");
    socketSingleton.initSocket();
    setSocket(socketSingleton.getSocket());
  }, []);
  const joinRoom = () => {
    console.log("Joining room...");
    const newUserId = socket.id;
    setUserId(newUserId);

    const data = { roomId, userId: newUserId };

    socket.emit("joinRoom", data);
    setAdmin(false);
    setMySession((prev) => prev.append(data));

    navigation.navigate("Participants", { roomId, userId, isAdmin: false });
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
