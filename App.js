import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from "./components/Navbar";
import SessionScreen from "./components/SessionScreen";
import NewSession from "./components/NewSession";
import JoinSession from "./components/JoinSession";
import ParticipantsScreen from "./components/ParticipantsScreen";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, error] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
  });
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: Navbar,
        }}
      >
        <Stack.Screen name="Home" component={SessionScreen} />
        <Stack.Screen name="NewSession" component={NewSession} />
        <Stack.Screen name="JoinSession" component={JoinSession} />
        <Stack.Screen name="Participants" component={ParticipantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
