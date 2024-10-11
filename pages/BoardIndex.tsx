import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, useRoute,useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import SearchDialog from "../pages/SearchDialog";
import DropDownMenu from "../pages/DropDownMenu";
import styles from "../pages/styles";

const BoardIndex = ({ navigation }) => {
  const route = useRoute();
  const filter = route.params?.filter;
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/boards.json";
  const [data, setData] = useState(null);

  const getData = async () => {
    const resp = await fetch(fileUrl, {
       headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
       },
    });
    const data = await resp.json();
    setData(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [data])
  );

  const TopicStarted = (start) => {
  if (start != null && start.length > 0)
  {
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
          on {day} {startm} {year} at {hourmin}
        </Text>
      </View>
    );
    }
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

  let x = 0;
  const getStyle = () => {
    x++;
    if (x == 3) x = 1;
    if (x === 1) {
      return {
        marginLeft: 13,
        borderWidth: 1,
        paddingLeft: 13,
        paddingBottom: 7,
        backgroundColor: "#FFE740",
      };
    } else {
      return {
        marginLeft: 13,
        borderWidth: 1,
        paddingLeft: 13,
        paddingBottom: 7,
        backgroundColor: "#FFEF80",
      };
    }
  };

  const buttons = "Help";

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
      <Header
        title="Boards Index"
        buttons={buttons}
        caller="BoardIndex"
        navigation={navigation}
      />
      <ScrollView keyboardShouldPersistTaps='handled'>
        {data &&
          data.map((board) => {
            return (
              <View key={board.Title} style={getStyle()}>
                <Text style={styles.title}> {board.Title} </Text>
                <Text style={{ fontSize: 14, color: "blue" }}>
                  {" "}
                  {board.Description}{" "}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.messageboardbutton}
                    onPress={() =>
                      navigation.navigate("Latest News", {
                        board: board.Title,
                        filter: "SortOrder=DateDesc",
                      })
                    }
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
                      View{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text>Last Post</Text>
                  {TopicStarted(board.LastPost)}
                </View>
              </View>
            );
          })}
      </ScrollView>
      {Footer()}
    </View>
  );
};
export default BoardIndex;
