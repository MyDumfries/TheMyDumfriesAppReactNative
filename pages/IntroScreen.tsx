import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  useColorScheme,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RenderHtml from "react-native-render-html";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import styles from "../pages/styles";

const IntroScreen = ({ navigation }) => {
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/MessagesAsJSON.php?board=FrontPage";
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { width } = useWindowDimensions();
  const getData = async () => {
    const resp = await fetch(fileUrl, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    });
    const data = await resp.json();
    let dataToDisplay = [];
    dataToDisplay = data.filter((data) => data.Board.includes("News"));
    setData(dataToDisplay);
    setLoading(false);
  };

  //refresh data every time page gets focus data.
    useFocusEffect(
      React.useCallback(() => {
        getData();
      }, [data])
    );

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      if (count == 4) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    }, 20000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  const TopicStarted = (start) => {
    const mth = start.substring(5, 7);
    let day = start.substring(8, 10);
    let year = start.substring(0, 4);
    let hourmin = start.substring(11, 16);
    const mthint = parseInt(mth);
    let startm = "";
    if (day == "00") {
      day = "";
    }
    if (year == "0000") {
      year = "";
    }
    if (mthint == 0) {
      startm = "";
    } else {
      startm = months[mthint - 1];
    }
    return (
      <View>
        <Text style={{ color: "red" }}>
          {" "}
          {day} {startm} {year} at {hourmin}
        </Text>
      </View>
    );
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const Latest = () => {
    if (data) {
      if (data[count].Html.includes("twitter-tweet")) {
        return (
          <View
            style={{
              borderWidth: 2,
              marginBottom: 1,
              marginLeft: 13,
              paddingLeft: 13,
              paddingRight: 3,
              paddingBottom: 5,
              backgroundColor: "#FFE740",
              width: 350,
              height: 250,
            }}
          >
            <Text style={{ fontSize: 16, color: "red" }}>
              {" "}
              {data[count].Title}{" "}
            </Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: data[count].Html }}
            />
          </View>
        );
      } else {
        let ThisContent = data[count].Content;
        if (ThisContent.length > 610) {
          ThisContent = ThisContent.substring(0, 610);
        }
        return (
          <View>
            <View
              style={{
                borderWidth: 2,
                marginBottom: 1,
                marginLeft: 13,
                paddingLeft: 13,
                paddingRight: 3,
                paddingBottom: 5,
                backgroundColor: "#FFE740",
                width: 350,
                height: 250,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {TopicStarted(data[count].Time)}
              </View>
              <Text style={{ fontSize: 16, color: "red" }}>
                {" "}
                {data[count].Title}{" "}
              </Text>
              <Text style={{ fontSize: 14, color: "blue" }}>
                {" "}
                {ThisContent}{" "}
              </Text>
            </View>
          </View>
        );
      }
    }
  };

  const link = (link) => {
    if (link != "") {
      return (
        <TouchableOpacity
          style={styles.mainmenubutton}
          onPress={() => Linking.openURL(link)}
        >
          <Text
            style={{
              color: "#A020F0",
              fontSize: 15,
              display: "flex",
              alignSelf: "center",
            }}
          >
            {" "}
            Link{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView>
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
        <Header
          title="Welcome"
          buttons="Help"
          caller="Intro Screen"
          navigation={navigation}
          onShow={() => setModalVisible(true)}
          onShowDropDown={() => setDropDownVisible(true)}
        />
        <TouchableOpacity
          style={{ flexDirection: "row", display: "flex", alignSelf: "center" }}
          color="#FDFD96"
          onPress={() => Linking.openURL("mailto:mydumfries@qosfan.co.uk")}
        >
          <Image
            source={require("../images/emailicon.jpg")}
            style={{ width: 25, height: 25 }}
          />
          <Text
            style={{
              color: "purple",
              fontSize: 19,
              fontWeight: 600,
              paddingLeft: 10,
            }}
          >
            mydumfries@qosfan.co.uk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            display: "flex",
            alignSelf: "center",
            paddingTop: 8,
          }}
          color="#FDFD96"
          onPress={() =>
            Linking.openURL("https://www.facebook.com/mydumfries/")
          }
        >
          <Image
            source={require("../images/FacebookLogo.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text
            style={{
              color: "purple",
              fontSize: 19,
              fontWeight: 600,
              paddingLeft: 10,
            }}
          >
            @mydumfries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            display: "flex",
            alignSelf: "center",
            paddingTop: 8,
          }}
          color="#FDFD96"
          onPress={() => Linking.openURL("https://twitter.com/MyDumfries")}
        >
          <Image
            source={require("../images/TwitterLogo.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text
            style={{
              color: "purple",
              fontSize: 19,
              fontWeight: 600,
              paddingLeft: 10,
            }}
          >
            @mydumfries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Main Menu")}
        >
          <Text
            style={{
              color: "#A020F0",
              fontSize: 25,
              display: "flex",
              alignSelf: "center",
            }}
          >
            Start
          </Text>
        </TouchableOpacity>
        {!isLoading ? Latest() : null}
        {Footer()}
      </View>
    </SafeAreaView>
  );
};
export default IntroScreen;
