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

const PeopleMenuHelp = ({ navigation }) => {
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
        <Text style={{ fontSize: 18, color: "blue" }}>
          The People Menu is a sort of Phone Book for eMails!{"\n"}
          {"\n"}
          To add your name to the list, click on "Login", then select
          "Register".{"\n"}
          {"\n"}
          The minimum information needed is your firstname, surname, eMail and
          password. Obviously, anything else you add will help people to find
          you.{"\n"}
          {"\n"}
          Please bear in mind, I DO NOT HAVE A SECURE SERVER{"\n"}
          {"\n"}
          So PLEASE DO NOT USE A PASSWORD YOU USE ELSEWHERE!!!!!!{"\n"}
          {"\n"}
          Also, if you use "Name of First School you attended" or "Street You
          Were Born In" as security questions on other sites, you may wish
          wether you wish to disclose tha information here!
          {"\n"}{"\n"}Registering will allow you to post on the Message Boards.
        </Text>
      </ScrollView>
      {Footer()}
    </View>
  );
};

export default PeopleMenuHelp;
