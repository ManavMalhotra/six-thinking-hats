import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './components/Navbar'; // Import your custom Navbar component
import SessionScreen from './components/SessionScreen';
import NewSession from './components/NewSession';
import JoinSession from './components/JoinSession';
import ParticipantsScreen from './components/ParticipantsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: Navbar, // Set your custom Navbar component as the header
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
