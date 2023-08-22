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
// import { SocketManager } from "../SocketManager";
import useSocketStore from "../store";

const JoinSession = ({ navigation }) => {
  // const [socket, setSocket] = useState(null);
  // const [userId, setUserId] = useState("");
  const [roomId, setroomId] = useState("");
  const socket = useSocketStore((state) => state.socket);
  const userId = useSocketStore((state) => state.userId);
  const setuserId = useSocketStore((state) => state.setuserId);
  const isAdmin = useSocketStore((state) => state.isAdmin);
  const setAdmin = useSocketStore((state) => state.setAdmin);

  const setMySession = useSocketStore((state) => state.setMySession);

  useEffect(() => {
    if (!socket) {
      useSocketStore.getState().connect();
    }
  }, []);

  const joinRoom = () => {
    console.log("Joining room...");
    console.log("socket id: ", userId);
    console.log("socket: ", useSocketStore(
      (state) => state.userId
    ) )
;

    const data = { roomId, userId };

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
