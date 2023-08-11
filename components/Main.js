import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { io } from "socket.io-client";

const Main = () => {
  let url = "http://localhost:8000/";
  const [socket, setSocket] = useState();
  const [code, setCode] = useState("");

  useEffect(() => {
    const s = io(url);
    setSocket(s);

    s.on("connection", () => {
      console.log("connected");
    });
    return () => {
      s.disconnect();
    };
  }, []);

  const handleJoin = () => {};

  const handleCreate = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.codePrompt}>
        <Text style={styles.codeText}>Enter code to join chat</Text>
        <View style={styles.codeInput}>
          {Array(6)
            .fill()
            .map((_, i) => (
              <TextInput
                key={i}
                style={styles.codeDigit}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setCode(code + text);
                }}
              />
            ))}
        </View>
        <TouchableOpacity style={styles.inviteButton} onPress={handleJoin}>
          <Text style={styles.inviteText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333333",
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingHorizontal: 20,
  },
  historyButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#666666",
  },
  historyText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    borderRadius: 10,
    backgroundColor: "#333333",
    marginVertical: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
    backgroundColor: "#666666",
  },
  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },
  chatName: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  chatMessage: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  codePrompt: {
    height: 80,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  codeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  codeInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  codeDigit: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#666666",
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  inviteButton: {
    width: 80,
    height: 40,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#666666",
  },
  inviteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  createButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#666666",
  },

  createText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Main;
