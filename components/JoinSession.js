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
import { useSocketStore, useUserStore } from "../store";

const JoinSession = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [roomId, setroomId] = useState("");
  const { socket, setSocket, userId, setUserId, setHatColor } =
    useSocketStore();
  const { userName, userRole } = useUserStore();

  useEffect(() => {
    console.log("_______JoinSession.js_______");
    console.log("socket initialize: ");
    socketConnection();
  }, []);

  const socketConnection = async () => {
    const initializedSocket = await socketSingleton.initSocket();
    setSocket(initializedSocket);
    initializedSocket.on("connect", () => {
      let id = initializedSocket.id;
      setUserId(id);
      setLoading(false);
    });
  };

  const joinRoom = () => {
    setLoading(true);
    let data = {
      roomId,
      userId,
      userName,
      userRole,
    };

    socket.emit("joinRoom", data);

    socket.on("userInfo", (data) => {
      setHatColor(data.hatRole);
    });

    socket.on("roomJoined", (data) => {
      console.log("roomJoined event received: ", data);
      setroomId(roomId)
      navigation.navigate("Participants");
      setLoading(false);
    });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Join Session</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <TextInput
            style={styles.codeTextBox}
            onChangeText={(text) => {
              setroomId(text);
            }}
          />
        )}
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
