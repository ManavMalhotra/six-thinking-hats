import { enableExperimentalWebImplementation } from "react-native-gesture-handler";
enableExperimentalWebImplementation(true);

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Navbar from "./components/ui/Navbar";
import SessionScreen from "./components/screens/SessionScreen";
import CreateSession from "./components/screens/CreateSession";
import JoinSession from "./components/screens/JoinSession";
import ParticipantsScreen from "./components/screens/ParticipantsScreen";
import ProfilePage from "./components/screens/ProfilePage";
import LoginPage from "./components/screens/LoginPage";

import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const Home = () => {
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
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        <Stack.Screen name="CreateSession" component={CreateSession} />
        <Stack.Screen name="JoinSession" component={JoinSession} />
        <Stack.Screen name="Participants" component={ParticipantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Home />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
