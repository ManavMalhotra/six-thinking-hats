import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Share } from "react-native";
import socketSingleton from "../../SocketManager";
import HatColor from "../ui/HatColor";
import TimerComponent from "../ui/TimerComponent";
import UserCard from "../ui/UserCard";
import { useUserStore, useSocketStore } from "../../store";
import { Text } from "react-native-paper";
import Accordion from "../ui/Accordion";
import { IconButton } from "react-native-paper";

import { Image } from "expo-image";

import emptySession from "../../assets/emptyPartcipants.png";

const ParticipantsScreen = ({ navigation }) => {
  const { socket, setSocket } = useSocketStore();

  const [participants, setParticipants] = useState([]);
  const [adminUser, setAdminUser] = useState({});

  const { userName, userOrganisation, userDesignation, userProfilePic } =
    useUserStore();

  const { userId, setUserId, roomId, hatColor, setHatColor, isAdmin } =
    useSocketStore();

  useEffect(() => {}, []);

  useEffect(() => {
    socket.on("roomJoined", (data) => {
      console.log("roomJoined event received: ", data);

      data.forEach((user) => {
        console.log("Participants: ", user);
        if (user.isAdmin) {
          setAdminUser(user);
        } else if (!participants.some((p) => p.id === user.id)) {
          setParticipants((prevParticipants) => [...prevParticipants, user]);
        }
      });
    });

    return () => {
      socket.off("roomJoined");
    };
  }, [participants, setParticipants, setAdminUser]);
  console.log("Participants State: ", participants);
  console.log("!__________________________!");

  const changeEveryoneHatColor = (color) => {
    return () => {
      socket.emit("changeHatColor", {
        roomId,
        userId,
        hatColor: color,
      });
    };
  };

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
          <Accordion
            headerText="About Session"
            content={
              <>
                <TimerComponent duration={10} />
                <View style={styles.hatColors}>
                  <IconButton
                    style={styles.hatStyle}
                    icon="checkbox-blank-circle"
                    iconColor="black"
                    size={60}
                    onPress={changeEveryoneHatColor("black")}
                  />
                  <IconButton
                    style={styles.hatStyle}
                    icon="checkbox-blank-circle"
                    iconColor="white"
                    size={60}
                  />
                  <IconButton
                    style={styles.hatStyle}
                    icon="checkbox-blank-circle"
                    iconColor="yellow"
                    size={60}
                  />
                  <IconButton
                    style={styles.hatStyle}
                    icon="checkbox-blank-circle"
                    iconColor="green"
                    size={60}
                  />
                  <IconButton
                    style={styles.hatStyle}
                    icon="checkbox-blank-circle"
                    iconColor="red"
                    size={60}
                  />
                </View>
              </>
            }
          />

          <Accordion
            headerText="Participants"
            content={participants.map((user, index) => {
              if (user.isAdmin) {
                return null;
              }
              return (
                <UserCard
                  key={index}
                  user={user}
                  roomId={roomId}
                  adminCard={false}
                />
              );
            })}
          />
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
  hatColors: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    paddingHorizontal: 50,
  },
  hatStyle: {
    marginHorizontal: 0,
  },
});

export default ParticipantsScreen;
