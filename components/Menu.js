import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MenuItems = () => {
  let menu = ["Timer", "Reshuffle", "Notifications", "Profile"];

  return (
    <View style={styles.menu_container}>
      {menu.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.button}
            key={index}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  menu_container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    margin: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
  },
});

export default MenuItems;
