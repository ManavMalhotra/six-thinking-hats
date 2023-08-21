import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { SocketManager } from "../SocketManager";

const ParticipantsScreen = ({ navigation }) => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("");
  const [participants, setParticipants] = useState([]);

  if (socket) {
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }

  useEffect(() => {
    const socket = SocketManager.getSocket();
    setSocket(socket);
    setUserId(socket.id);

    // Listen for the roomJoined event
    socket.on("roomData", ({users}) => {
      // Update participants state with the received data
      for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        users[i].name = users[i].name || "Anonymous";
      }
        setParticipants(users);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("roomJoined");
    };
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Participants in the room:</Text>
        {participants.map((participant) => (
          <Text style={styles.participant} key={participant.id}>{participant.id} : {participant.hatRole}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    participant: {
        fontSize: 20,
        fontWeight: "bold",
    },
})

export default ParticipantsScreen;
