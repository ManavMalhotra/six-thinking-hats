import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { useSocketStore } from "../store";
import socketSingleton from "../SocketManager";
import HatColor from "./HatColor";
import TimerComponent from "./TimerComponent";
import UserCard from "./UserCard";

const ParticipantsScreen = ({ navigation }) => {
  // data which come from store
  // userId: null,
  // isAdmin: null,
  // hatColor: null,
  // roomId: null,
  // mySession: [],

  const userId = useSocketStore((state) => state.userId);
  const isAdmin = useSocketStore((state) => state.isAdmin);
  const hatColor = useSocketStore((state) => state.hatColor);
  const setHatColor = useSocketStore((state) => state.setHatColor);
  const roomId = useSocketStore((state) => state.roomId);
  const mySession = useSocketStore((state) => state.mySession);

  const [participants, setParticipants] = useState([]);

  const socket = socketSingleton.getSocket();

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      console.log("Event roomData received");
      console.log(users);

      const updatedUsers = users.map((user) => ({
        ...user,
        name: user.name || "Anonymous",
      }));

      setParticipants(updatedUsers);
      console.log("Participants updated", participants);

      const currentUser = users.find((user) => user.id === userId);
      if (currentUser) {
        console.log("currentUser", currentUser);
        let color = currentUser.hatRole;
        setHatColor(color);
      }
    });
  }, [userId, ]);

  const userInfo = {
    name: "Anonymous",
    designation: "Developer",
    profilePic: require("../assets/userProfilePic.png"),
  };

  return (
    <SafeAreaView>
      {isAdmin ? (
        <View>
          <TimerComponent duration="10" />
          <Text>Participants in the room:</Text>
          <Text>Admin ID: {userId}</Text>
          <Text>Room ID: {roomId}</Text>
          {participants.map((participant) => (
            <Text style={styles.participant} key={participant.id}>
              {participant.id} : {participant.hatRole}
            </Text>
          ))}
          <UserCard user={userInfo} />
        </View>
      ) : (
        <View style={styles.participant}>
          <Text>User ID: {userId}</Text>
          <Text>Room ID: {roomId}</Text>

          <HatColor hatColor={hatColor} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  participant: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ParticipantsScreen;
