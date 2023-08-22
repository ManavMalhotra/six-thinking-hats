import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import useSocketStore from "../store";
import HatColor from "./HatColor";

const ParticipantsScreen = ({ navigation, route }) => {
  // const [userId, setUserId] = useState("");
  const [participants, setParticipants] = useState([]);
  // const { userId, isAdmin, hatColor } = useSocketStore();

  const socket = useSocketStore((state) => state.socket);
  const userId = useSocketStore((state) => state.userId);
  const isAdmin = useSocketStore((state) => state.isAdmin);
  const hatColor = useSocketStore((state) => state.hatColor);
  const roomId = useSocketStore((state) => state.roomId);
  const setHatColor = useSocketStore((state) => state.setHatColor);
  const setAdmin = useSocketStore((state) => state.setAdmin);


  console.log("roomId Participants: ", roomId);
  useEffect(() => {
    if (!socket) {
      navigation.navigate("Home");
    }
    // Listen for the roomJoined event
    socket.on("roomData", ({ users }) => {
      // Update participants state with the received data
      for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        users[i].name = users[i].name || "Anonymous";
        if(users[i].id === userId) {
          setHatColor(users[i].hatRole);
        }
      }
      setParticipants(users);
    });
  }, []);
  console.log("userId: ", userId);
  console.log("isAdmin: ", isAdmin);
  console.log("hatColor: ", hatColor);

  return (
    <SafeAreaView>
      {isAdmin ? (
        <View>
          <Text>Participants in the room:</Text>
          <Text>Admin ID: {userId}</Text>
          <Text>Room ID: {roomId}</Text>
          {participants.map((participant) => (
            <Text style={styles.participant} key={participant.id}>
              {participant.id} : {participant.hatRole}
            </Text>
          ))}
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
