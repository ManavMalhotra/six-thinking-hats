import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import socketSingleton from "../../SocketManager";
import HatColor from "../ui/HatColor";
import TimerComponent from "../ui/TimerComponent";
import UserCard from "../ui/UserCard";
import { useUserStore, useSocketStore } from "../../store";
import { Text } from "react-native-paper";

import { Image } from "expo-image";

import { Share } from "react-native";

import { Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

import emptySession from "../../assets/emptypartcipants.png";
import { set } from "react-native-reanimated";

const ParticipantsScreen = ({ navigation }) => {
  const { socket, setSocket } = useSocketStore();

  const [participants, setParticipants] = useState([]);
  const [adminUser, setAdminUser] = useState({});

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

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: roomId.toString(),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("shared with activity type of result.activityType");
        } else {
          // shared
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    socket.on("roomJoined", (data) => {
      console.log("roomJoined event received: ", data);
      // data if admin is true then set the admin

      data.map((user) => {
        console.log("user: ", user);
        if (user.isAdmin) {
          setAdminUser(user);
        }
        else{
          participants.push(user);
        } 
      });


      setParticipants(data);
    });

    return () => {
      socket.off("roomJoined");
    };
  }, [participants, setParticipants]);

  let sampleParticipants = [
    {
      id: "6AxDMLtjF4UcvLLOAAAJ",
      name: "Manav Malhotra",
      role: "Developer",
      hatRole: "blue",
      isAdmin: true,
    },
    {
      id: "2", // Unique ID
      name: "Dummy User 2",
      role: "Dummy Role 2",
      hatRole: "red",
      isAdmin: false,
    },
    {
      id: "3", // Unique ID
      name: "Dummy User 3", // Adjust names to be unique as well if needed
      role: "Dummy Role 3", // Adjust roles to be unique as well if needed
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
          <Text>Admin ID: {userId.toString()}</Text>
          <Text>Room ID: {roomId.toString()}</Text>

          {participants.map((user, index) => {
            if(user.isAdmin){
              return null;
            }
            return <UserCard key={index} user={user} roomId={roomId} adminCard={false} />;
          })}
        </View>
      ) : (
        <View>
          <Text variant="headlineSmall" style={{ color: "black" }}>
            Name: {userName}
            
          </Text>
          <UserCard user={adminUser} roomId={roomId} adminCard={true} />
          {/* <HatColor hatColor={hatColor} /> */}
          <Image source={emptySession} style={{ width: 293, height: 84 }} />
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
