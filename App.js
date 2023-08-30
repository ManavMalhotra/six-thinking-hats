import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Navbar from "./components/Navbar";
import SessionScreen from "./components/SessionScreen";
import CreateSession from "./components/CreateSession";
import JoinSession from "./components/JoinSession";
import ParticipantsScreen from "./components/ParticipantsScreen";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderHeader = (props) => <Navbar {...props} />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: renderHeader,
        }}
      >
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        <Stack.Screen name="CreateSession" component={CreateSession} />
        <Stack.Screen name="JoinSession" component={JoinSession} />
        <Stack.Screen name="Participants" component={ParticipantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
