import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
} from "react-native";

const JoinSession = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Join Session</Text>
        <TextInput
          style={styles.codeTextBox}
          onChangeText={(text) => {
            setCode(text);
          }}
        />
      </View>

      <Button title="Join"></Button>
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

export default JoinSession;
