import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import useSocketStore from "../store";

const NewSession = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");

  const socket = useSocketStore((state) => state.socket);
  const userId = useSocketStore((state) => state.userId);
  const setuserId = useSocketStore((state) => state.setuserId);
  const isAdmin = useSocketStore((state) => state.isAdmin);
  const setAdmin = useSocketStore((state) => state.setAdmin);
  const setMySession = useSocketStore((state) => state.setMySession);

  useEffect(() => {
    useSocketStore.getState().connect();
    return () => {
      useSocketStore.getState().disconnect();
    };
  }, []);

  const createRoom = () => {
    console.log("Creating room...");
    const newUserId = socket.id;
    setuserId(newUserId);

    console.log("socket id: ", newUserId);

    setAdmin(true);

    const data = { userId: newUserId, title, description, duration, capacity };

    socket.emit("createRoom", data);

    socket.on("roomCreated", (data) => {
      console.log("roomCreated: ", data);
      setMySession((prev) => prev.append(data));
    });

    navigation.navigate("Participants", { data });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Title</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <Text>Duration</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setDuration(text);
          }}
        />
        <Text>Capacity</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setCapacity(text);
          }}
        />
        <Button title="Create Room" onPress={createRoom} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeTextBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
});

export default NewSession;
