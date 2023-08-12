import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { io } from "socket.io-client";

const Main = () => {
  const url = "http://192.168.100.17:8000/";
  const [socket, setSocket] = useState();
  const [roomId, setRoomId] = useState("");
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState([]);

  const handleRoomJoined = (room) => {
    setRoomId(room.roomId);
    setUsersInRoom(Object.values(room.users)); // Convert object values to an array
    setJoined(true);
    setJoining(false);
  };

  const assignHatRoles = (users) => {
    const hatColors = ["blue", "red", "green", "yellow", "purple", "orange"];
    const assignedHatRoles = {};

    const currentUserIds = Object.keys(users);
    currentUserIds.forEach((userId, index) => {
      const hatRole =
        index === 0
          ? "blue"
          : hatColors[Math.floor(Math.random() * hatColors.length)];
      assignedHatRoles[userId] = { ...users[userId], hatRole };
    });

    return assignedHatRoles;
  };

  useEffect(() => {
    const s = io(url);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (joined) {
      socket.on("roomJoined", (data) => {
        handleRoomJoined(data.room);
      });
    }
  }, [joined]);

  useEffect(() => {
    if (joining) {
      socket.on("roomCreated", (data) => {
        console.log(data.roomId);
        setRoomId(data.roomId);
        setJoined(true); // Set joined to true when room is created
        setJoining(false);
      });
    }
  }, [joining]);

  const handleJoin = () => {
    socket.emit(
      "joinRoom",
      { roomId: roomId, userId: socket.id },
      (data) => {}
    );

    socket.on("roomJoined", (data) => {
      handleRoomJoined(data.room);
    });
  };

  const handleCreate = () => {
    setJoining(true);

    socket.emit("createRoom", { userId: socket.id }, (data) => {
      const usersWithHatRoles = assignHatRoles(data.room.users);
      const updatedRoom = { ...data.room, users: usersWithHatRoles };

      handleRoomJoined(updatedRoom);
    });
  };

  const handleRoomCreated = (room) => {
    setRoomId(room.roomId);
    setUsersInRoom(Object.values(room.users));
    setJoined(true);
    setJoining(false);
    console.log(usersInRoom)
  };

  return (
    <SafeAreaView style={styles.container}>
      {joining && !joined ? (
        <Text style={styles.joining}>Joining</Text>
      ) : joined ? (
        <View>
          <Text style={styles.roomIdText}>Room ID: {roomId}</Text>
          <Text style={styles.usersTitle}>Users in the room:</Text>
          <Text style={styles.usersList}>
            {usersInRoom.map((user) => (
              <Text key={user.id}>
                {user.id} - Hat: {user.hatRole}
              </Text>
            ))}
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.codePrompt}>
            <TextInput
              style={styles.codeTextBox}
              onChangeText={(text) => {
                setRoomId(text);
              }}
              placeholder="Enter Code"
            />
            <TouchableOpacity onPress={handleJoin}>
              <Text>Join</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.createSession}>
            <TouchableOpacity onPress={handleCreate}>
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  codePrompt: {
    flexDirection: "row",
    gap: 10,
    margin: 10,
  },
  codeTextBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
  createSession: {
    margin: 10,
  },
  joining: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  roomIdText: {
    fontSize: 16,
    marginBottom: 10,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  usersList: {
    marginLeft: 20,
  },
});

export default Main;
