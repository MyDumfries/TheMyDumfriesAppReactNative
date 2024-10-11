/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './pages/IntroScreen';
import MainMenu from './pages/MainMenu';
import WalksMenu from './pages/WalksMenu';
import PeopleMenu from './pages/PeopleMenu';
import PersonDetails from './pages/PersonDetails'
import WalksMenuHelp from './pages/WalksMenuHelp'
import IntroScreenHelp from './pages/IntroScreenHelp'
import PeopleMenuHelp from './pages/PeopleMenuHelp'
import LatestNewsHelp from './pages/LatestNewsHelp'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import RegisterHelp from './pages/RegisterHelp'
import AmendRegister from './pages/AmendRegister'
import LatestNews from './pages/LatestNews'
import ViewThread from './pages/ViewThread'
import BoardIndex from './pages/BoardIndex'

const Stack = createNativeStackNavigator();
global.loggedinfirstname = "";
global.loggedinsurname = "";
global.loggedinid = -1;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen">
        <Stack.Screen name="Welcome to MyDumfries" component={IntroScreen} />
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Walks Menu" component={WalksMenu} />
        <Stack.Screen name="People Menu" component={PeopleMenu}  />
        <Stack.Screen name="Person Details" component={PersonDetails} />
        <Stack.Screen name="Intro Screen Help" component={IntroScreenHelp} />
        <Stack.Screen name="Walks Menu Help" component={WalksMenuHelp} />
        <Stack.Screen name="People Menu Help" component={PeopleMenuHelp} />
        <Stack.Screen name="Latest News Help" component={LatestNewsHelp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Register Help" component={RegisterHelp} />
        <Stack.Screen name="Amend Details" component={AmendRegister} />
        <Stack.Screen name="Latest News" component={LatestNews} />
        <Stack.Screen name="View Thread" component={ViewThread} />
        <Stack.Screen name="Board Index" component={BoardIndex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;