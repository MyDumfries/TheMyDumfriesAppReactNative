import React from "react";
import {
  View,
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

const WalksMenuHelp = ({ navigation }) => {
  return (
    <View
      backgroundColor={"#FDFD96"}
      style={{
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
      {Header("Walks Help", "")}
      <View style={{ paddingLeft: 13, paddingBottom: 5 }}>
        <Text style={{ fontSize: 18, color: "blue" }}>
          I've used the 'MapMyWalk' app to record some walks in and around
          Dumfries.{"\n"}
          {"\n"}
          Clicking on "View in 'MapMyWalk'" will open the walk in your browser,
          but for better results, I'd recommend downloading the App by clicking
          on the link below for an even better experience.{"\n"}
          {"\n"}
          In a future version of this app, I plan to bring the walks "in house"
          and provide a list of recommended walks based on your current location
          or available time
        </Text>
        <Text
          style={{
            color: "purple",
            fontSize: 20,
            fontWeight: 600,
            paddingLeft: 10,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Download MapMyWalk
        </Text>
        <View
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              display: "flex",
              alignSelf: "center",
            }}
            color="#FDFD96"
            onPress={() =>
              Linking.openURL(
                "https://itunes.apple.com/us/app/map-my-walk-gps-walking-step/id307861492?mt=8"
              )
            }
          >
            <Image
              source={require("../images/appstore.png")}
              style={{ width: 150, height: 70 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              display: "flex",
              alignSelf: "center",
            }}
            color="#FDFD96"
            onPress={() =>
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.mapmywalk.android2&hl=en"
              )
            }
          >
            <Image
              source={require("../images/googleplay.png")}
              style={{ width: 150, height: 70, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {Footer()}
    </View>
  );
};

export default WalksMenuHelp;
