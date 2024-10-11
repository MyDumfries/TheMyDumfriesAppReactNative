import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import styles from "../pages/styles";

const IntroScreenHelp = ({ navigation }) => {
return (
    <View
      backgroundColor={"#FDFD96"}
      style={{
        flex: 1,
        margin: 2,
        paddingTop: 10,
        paddingRight: 20,
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      {Header("People Help", "")}
      <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingLeft: 13, paddingBottom: 15 }}>
        <Text style={styles.title}>Welcome to The All New{"\n"}MyDumfries App</Text>
                <Text style={{ fontSize: 18, color: "blue" }}>
                  Hopefully, the intro screen itself is pretty self explanatory.  You can contact me by email, Facebook or X, and the panel at the bottom will scroll through the 5 latest news stories from the site.  That's about all there is to it.{"\n"}
                  {"\n"}On The App itself, I gave up my MyDumfries website as the hosting had become too expensive and the old MyDumfries App went with it.
                  {"\n"}{"\n"}I've re-written the app to now run grabbing it's data from my (limited) free storage.  As a bonus, the App will now run on Android and IOs devices!
                  {"\n"}{"\n"}The app is still very much in Beta Stages.  To get a bit technical, I don't have much database space on my free server, so I use JSON files to store the data.
                  {"\n"}I don't know how quick this will be though ONCE THE APP STARTS TO GET POPULAR and I can't really test it until it does get popular!  So start posting away on the Message Boards, tell your friends about this great new app you've discovered, and let's see how it goes!
                </Text>
      </ScrollView>
      {Footer()}
    </View>
  );
};

export default IntroScreenHelp;
