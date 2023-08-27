import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Navbar from "./components/Navbar";
import SessionScreen from "./components/SessionScreen";
import NewSession from "./components/NewSession";
import JoinSession from "./components/JoinSession";
import ParticipantsScreen from "./components/ParticipantsScreen";
import ProfilePage from "./components/ProfilePage";

const Stack = createNativeStackNavigator();

const MainApp = () => {
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
        <Stack.Screen name="Home" component={ProfilePage} />
        <Stack.Screen name="Session" component={SessionScreen} />
        <Stack.Screen name="NewSession" component={NewSession} />
        <Stack.Screen name="JoinSession" component={JoinSession} />
        <Stack.Screen name="Participants" component={ParticipantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
