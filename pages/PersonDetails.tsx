import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";

const PersonDetails = ({ route, navigation }) => {
  const { PersonDetail } = route.params;
  var work = PersonDetail.work.replaceAll(";", "\n");
  var schools = PersonDetail.schools.replaceAll(";", "\n");
  var houses = PersonDetail.houses.replaceAll(";", "\n");
  const websites = PersonDetail.websites.split(";");
  const count = websites.length;
  const elements = [];
  let position = 0;
  const Displaywebsites = (props) => {
    while (position < count) {
      // Prepare text for specified length and increment position
      const text = websites[position];
      elements.push(
        <Text
           key={position}
          style={{ color: "red", fontSize: 20, paddingLeft: 20 }}
          onPress={() => Linking.openURL("https://" + text)}
        >
          {text}
        </Text>
      );
      position++;
    }
    return elements;
  };
  const OtherSocialMedia = (props) => {
    if (
      PersonDetail.othersocialmedia &&
      PersonDetail.othersocialmedia != "n/a"
    ) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() =>
            Linking.openURL("http://" + PersonDetail.othersocialmedia)
          }
        >
          <Text>Other</Text>
        </TouchableOpacity>
      );
    }
  };

  const Facebook = (props) => {
    if (
      PersonDetail.facebook &&
      PersonDetail.facebook != "n/a" &&
      PersonDetail.facebook != ""
    ) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() =>
            Linking.openURL("https://www.facebook.com/" + PersonDetail.facebook)
          }
        >
          <Image
            source={require("../images/FacebookLogo.png")}
            style={{ marginLeft: 15, width: 30, height: 30 }}
          />
        </TouchableOpacity>
      );
    }
  };

  const Twitter = (props) => {
    if (
      PersonDetail.twitter &&
      PersonDetail.twitter != "n/a" &&
      PersonDetail.twitter != ""
    ) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() =>
            Linking.openURL("https://twitter.com/" + PersonDetail.twitter)
          }
        >
          <Image
            source={require("../images/TwitterLogo.png")}
            style={{ marginLeft: 15, width: 30, height: 30 }}
          />
        </TouchableOpacity>
      );
    }
  };

  const YouTube = (props) => {
    if (
      PersonDetail.youtube &&
      PersonDetail.youtube != "n/a" &&
      PersonDetail.youtube != ""
    ) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() =>
            Linking.openURL("https://www.youtube.com/" + PersonDetail.youtube)
          }
        >
          <Image
            source={require("../images/youtube.png")}
            style={{ marginLeft: 10, width: 30, height: 30 }}
          />
        </TouchableOpacity>
      );
    }
  };

  const Instagram = (props) => {
    if (
      PersonDetail.instagram &&
      PersonDetail.instagram != "n/a" &&
      PersonDetail.instagram != ""
    ) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() =>
            Linking.openURL(
              "https://www.instagram.com/" + PersonDetail.instagram
            )
          }
        >
        <Image
          source={require("../images/Instagram_icon.png")}
          style={{ marginLeft: 15, width: 40, height: 40 }}
        />
        </TouchableOpacity>
      );
    }
  };

  const Blog = (props) => {
    if (
      PersonDetail.blog &&
      PersonDetail.blog != "n/a" &&
      PersonDetail.blog != ""
    ) {
      return (
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() => Linking.openURL("http://" + PersonDetail.blog)}
        >
          <Image
            source={require("../images/blog.png")}
            style={{ marginLeft: 15, width: 35, height: 35 }}
          />
        </TouchableOpacity>
      );
    }
  };

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
        flex: 1,
      }}
    >
      {Header(
        PersonDetail.firstname + " " + PersonDetail.surname,
        "Login,Help"
      )}
      <ScrollView keyboardShouldPersistTaps='handled' style="paddingBottom:15,">
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "purple",
              fontSize: 20,
              fontWeight: 600,
              paddingLeft: 10,
            }}
          >
            Contact {PersonDetail.firstname}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              display: "flex",
              alignSelf: "center",
            }}
            color="#FDFD96"
            onPress={() => Linking.openURL("mailto:" + PersonDetail.email)}
          >
            <Image
              source={require("../images/emailicon.jpg")}
              style={{ marginLeft: 10, width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <Facebook />
          <Twitter />
        </View>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text
            style={{
              color: "purple",
              fontSize: 20,
              fontWeight: 600,
              paddingLeft: 10,
            }}
          >
            Other Social Media
          </Text>
          <YouTube />
          <Instagram />
          <Blog />
          <OtherSocialMedia />
        </View>
        <Text
          style={{
            color: "purple",
            fontSize: 20,
            fontWeight: 600,
            paddingLeft: 10,
          }}
        >
          {PersonDetail.firstname} went to school at:
        </Text>
        <Text style={{ color: "red", fontSize: 20, paddingLeft: 20 }}>
          {schools}
        </Text>
        <Text
          style={{
            color: "purple",
            fontSize: 20,
            fontWeight: 600,
            paddingLeft: 10,
          }}
        >
          They've Lived at:
        </Text>
        <Text style={{ color: "red", fontSize: 20, paddingLeft: 20 }}>
          {houses}
        </Text>
        <Text
          style={{
            color: "purple",
            fontSize: 20,
            fontWeight: 600,
            paddingLeft: 10,
          }}
        >
          and Worked at:
        </Text>
        <Text style={{ color: "red", fontSize: 20, paddingLeft: 20 }}>
          {work}
        </Text>
        <Text
          style={{
            color: "purple",
            fontSize: 20,
            fontWeight: 600,
            paddingLeft: 10,
          }}
        >
          {PersonDetail.firstname}'s favourite websites are:
        </Text>
        <Displaywebsites />
        <Text style={{ paddingBottom: 15 }}></Text>
      </ScrollView>
      {Footer()}
    </View>
  );
};

export default PersonDetails;
