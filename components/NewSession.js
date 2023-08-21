import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import { useState } from "react";

const NewSession = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [capacity, setCapacity] = useState("");
  return (
    <SafeAreaView>
      <View>
        <Text>Title</Text>
        <TextInput style={styles.codeTextBox} onChangeText={(text) => {
              setTitle(text);
            }} />
        <Text>Description</Text>
        <TextInput style={styles.codeTextBox} onChangeText={(text) => {
              setDescription(text);
            }} />
        <Text>Duration</Text>
        <TextInput style={styles.codeTextBox} onChangeText={(text) => {
              setDuration(text);
            }} />
        <Text>Capacity</Text>
        <TextInput style={styles.codeTextBox} onChangeText={(text) => {
              setCapacity(text);
            }} />
        <Button title="Create" />
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
