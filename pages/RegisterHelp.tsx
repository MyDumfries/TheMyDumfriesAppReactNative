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

const RegisterHelp = ({ navigation }) => {
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
      {Header("Register Help", "")}
      <View style={{ paddingLeft: 13, paddingBottom: 5 }}>
        <Text style={{ fontSize: 18, color: "blue" }}>
          Complete at least the 1st four fields. The green box at the bottom of
          the page will give you help when you click in each box.{"\n"}
          {"\n"}The password field can be left blank.  Everything you put in your profile is publicly viewable, so the password is not protecting your information as such.
          The main reason for the password is so that you can amend your details and make posts on The Message Boards.{"\n"}{"\n"}
          Your details will then be added on my server.{"\n"}
          {"\n"}To cut back on spam, I will then validate your details and eMail you back when it
          has been done.{"\n"}
        </Text>
      </View>
      {Footer()}
    </View>
  );
};

export default RegisterHelp;
