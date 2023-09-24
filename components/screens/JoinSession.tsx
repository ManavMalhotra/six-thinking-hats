import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import socketSingleton from "../../SocketManager";
import { useSocketStore, useUserStore } from "../../store";

import { Text, TextInput } from "react-native-paper";
import { FontFamily, FontSize, Color } from "../../GlobalStyles";

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

  const joinRoom = async () => {
    setLoading(true);
    try {
      let data = {
        roomId,
        userId,
        userName,
        userRole,
      };

      await socket.emit("joinRoom", data);

      await socket.on("userInfo", (data) => {
        setHatColor(data.hatRole);
      });

      await socket.on("roomJoined", (data) => {
        console.log("roomJoined event received: ", data);
        setroomId(roomId);
        navigation.navigate("Participants");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          variant="headlineMedium"
          style={{
            color: "black",
            marginVertical: 20,
          }}
        >
          Join Session
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <TextInput
            value={roomId}
            label="Enter Room Code"
            onChangeText={(text) => {
              setroomId(text);
            }}
          />
        )}
        <TouchableOpacity style={styles.createButton} onPress={joinRoom}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>

      {/* <Button title="Join" onPress={joinRoom} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start", 
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: "100%",
    textAlign: "left",
    alignContent: "center",
    fontFamily: FontFamily.manropeSemiBold,
  },

  createButton: {
    backgroundColor: "black",
    borderRadius: 25,
    marginVertical: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },

  codeTextBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
});

export default JoinSession;
