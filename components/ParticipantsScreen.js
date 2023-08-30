import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { useSocketStore } from "../store";
import socketSingleton from "../SocketManager";
import HatColor from "./HatColor";
import TimerComponent from "./TimerComponent";
import UserCard from "./UserCard";
const { useUserStore } = require("../store");

const ParticipantsScreen = ({ navigation }) => {
  const { socket, setSocket } = useSocketStore();

  const [participants, setParticipants] = useState([]);

  const { userName, userOrganisation, userDesignation, userProfilePic } =
    useUserStore();

  const { userId, setUserId, roomId, hatColor, setHatColor, isAdmin } =
    useSocketStore();

  useEffect(() => {
    console.log("_______JoinSession.js_______");
    console.log("socket initialize: ");
    socketConnection();
  }, []);

  const socketConnection = async () => {
    const initializedSocket = await socketSingleton.initSocket();
    setSocket(initializedSocket);
    initializedSocket.on("connect", () => {
      console.log("socket connected: ", initializedSocket.id);
      let id = initializedSocket.id;
      setUserId(id);
      console.log("socket id: ", id);
    });
  };

  useEffect(() => {
    socket.on("roomJoined", (data) => {
      console.log("roomJoined event received: ", data);
      setParticipants(data);
    });

    return () => {
      socket.off("roomJoined");
    };
  }, []);

  let sampleParticipants = [
    {
      id: "6AxDMLtjF4UcvLLOAAAJ",
      name: "Manav Malhotra",
      role: "Developer",
      hatRole: "blue",
      isAdmin: true,
    },
    {
      id: "1",
      name: "Dummy User 2",
      role: "Dummy Role 2",
      hatRole: "red",
      isAdmin: false,
    },
    {
      id: "1",
      name: "Dummy User 2",
      role: "Dummy Role 2",
      hatRole: "white",
      isAdmin: false,
    },
  ];

  return (
    <SafeAreaView>
      {isAdmin ? (
        <View>
          <TimerComponent duration="10" />
          <Text>Participants in the room:</Text>
          <Text>Admin ID: {userId}</Text>
          <Text>Room ID: {roomId}</Text>
          {
            participants.map((user, index) => {
              return (

                  <UserCard key={index} user={user} />

              );
            })
          }
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
