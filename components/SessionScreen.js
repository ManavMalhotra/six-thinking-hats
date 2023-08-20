import { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollViewBase,
} from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { io } from "socket.io-client";

const SessionScreen = () => {
  const [active, setActive] = useState("mySessions");

  const url = "http://192.168.100.17:8000/";
  const [name, setName] = useState();
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

  useEffect(() => {
    const s = io(url);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const handleJoin = () => {
    socket.emit(
      "joinRoom",
      { roomId: roomId, userId: socket.id },
      (data) => {}
    );
  };

  const handleCreate = () => {
    setJoining(true);

    socket.emit(
      "createRoom",
      { name: name, id: socket.id, hatRole: "blue" },
      (data) => {
        const usersWithHatRoles = assignHatRoles(data.room.users);
        const updatedRoom = { ...data.room, users: usersWithHatRoles };

        handleRoomJoined(updatedRoom);
      }
    );
  };

  const handleRoomCreated = (room) => {
    setRoomId(room.roomId);
    setUsersInRoom(Object.values(room.users));
    setJoined(true);
    setJoining(false);
    console.log(usersInRoom);
  };
  if ((name && socket) !== undefined) {
    console.log("Name: ", name);
    console.log("Room ID: ", roomId);
    console.log("Socket Id: ", socket.id);
  }

  return (
    <View style={[styles.x520, styles.x520Layout]}>
      <Image style={styles.menuIcon} source={require("../assets/menu.svg")} />
      <Image
        style={styles.x520Child}
        contentFit="cover"
        source={require("../assets/ellipse-15.svg")}
      />
      <View style={styles.groupParent}>
        <View style={styles.groupWrapper}>
          <View style={[styles.mySessionsWrapper, styles.wrapperPosition]}>
            <Text style={styles.mySessions}>My Sessions</Text>
          </View>
        </View>
        <View style={styles.groupContainer}>
          <View style={[styles.historyWrapper, styles.wrapperPosition]}>
            <Text style={[styles.history, styles.historyFlexBox]}>History</Text>
          </View>
        </View>
      </View>
      <View style={[styles.parent, styles.wrapperFlexBox]}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/no-session.svg")}
        />
        <Text
          style={[styles.youHaveNo, styles.historyFlexBox]}
        >{`You have no sessions yet ! `}</Text>
        <View style={[styles.arrowLoopWrapper, styles.wrapperFlexBox]}>
          <View style={styles.arrowLoop}>
            <View style={[styles.arrowLoopChild, styles.x520Layout]} />
            <Image style={styles.icon1} contentFit="cover" source={`->_4`} />
          </View>
        </View>
      </View>
      <Pressable
        style={[styles.createNewSessionWrapper, styles.wrapperFlexBox]}
        onPress={handleCreate}
      >
        <Text style={[styles.createNewSession, styles.historyFlexBox]}>
          + Create new Session
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  x520Layout: {
    width: "100%",
    backgroundColor: Color.white,
  },
  wrapperPosition: {
    left: 0,
    top: 0,
    height: 19,
    position: "absolute",
  },
  historyFlexBox: {
    textAlign: "center",
    color: Color.black,
  },
  wrapperFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  menuIcon: {
    top: 53,
    left: 41,
    width: 24,
    height: 24,
    position: "absolute",
  },
  x520Child: {
    top: 49,
    right: 39,
    width: 42,
    height: 42,
    position: "absolute",
  },
  mySessions: {
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.manropeSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    left: 0,
    top: 0,
    width: 89,
    position: "absolute",
  },
  mySessionsWrapper: {
    width: 89,
  },
  groupWrapper: {
    height: 19,
    width: 89,
  },
  history: {
    opacity: 0.5,
    width: 94,
    fontFamily: FontFamily.manropeSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    textAlign: "center",
    left: 0,
    top: 0,
    position: "absolute",
  },
  historyWrapper: {
    width: 94,
  },
  groupContainer: {
    marginLeft: 7.41,
    width: 94,
    height: 19,
  },
  groupParent: {
    top: 120,
    left: 44,
    flexDirection: "row",
    position: "absolute",
  },
  icon: {
    width: 189,
    height: 189,
    zIndex: 0,
    overflow: "hidden",
  },
  youHaveNo: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: FontFamily.manropeMedium,
    width: 146,
    height: 12,
    zIndex: 1,
    marginTop: 0.26,
  },
  arrowLoopChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
  },
  icon1: {
    height: "32.2%",
    width: "33.39%",
    top: "18.52%",
    right: "31.32%",
    bottom: "49.28%",
    left: "35.29%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  arrowLoop: {
    width: 15,
    height: 23,
  },
  arrowLoopWrapper: {
    top: 229,
    left: 91,
    zIndex: 2,
    flexDirection: "row",
  },
  parent: {
    marginLeft: -94.5,
    top: 174,
    left: "50%",
    alignItems: "center",
  },
  createNewSession: {
    fontSize: 12,
    fontFamily: FontFamily.rubikRegular,
    width: 152,
  },
  createNewSessionWrapper: {
    marginLeft: -139.29,
    bottom: 21,
    borderRadius: 74,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 0.7,
    height: 46,
    paddingHorizontal: 59,
    paddingVertical: 0,
    justifyContent: "center",
    left: "50%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  x520: {
    flex: 1,
    height: 520,
    overflow: "hidden",
  },
});

export default SessionScreen;
