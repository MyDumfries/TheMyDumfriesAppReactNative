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
      {Header("Latest News Help", "")}
      <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingLeft: 13, paddingBottom: 15 }}>
                <Text style={{ fontSize: 18, color: "blue" }}>
                  The Latest News page is actually used to display both the Latest News Message Board and all the other Message Boards.{"\n"}
                  {"\n"}You cannot start new topics on the Latest News Board, but you can reply to any topics that I have posted (by clicking on "View" then "Reply" in the Thread View).
                    Clicking on "Link" (if visible) will take you to where the Story was originally posted (usually X).
                  {"\n"}{"\n"}On the other Boards, you can start a new topic and click on "View" to "Reply" to an existing topic.
                  {"\n"}{"\n"}The maximum length of a message is 400 characters.
                  {"\n"}{"\n"}I hope the rest is pretty self explanatory.
                  {"\n"}{"\n"}My plan at the moment is to retain the last 1,000 posts, anything posted longer ago than that being deleted.  I'll review this as more posts are made to see how it is affecting speed and storage space and may revise this number up or down.
                </Text>
      </ScrollView>
      {Footer()}
    </View>
  );
};

export default IntroScreenHelp;
