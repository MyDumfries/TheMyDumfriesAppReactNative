import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  Linking,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  useFocusEffect,
  NavigationContainer,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RenderHtml from "react-native-render-html";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import SearchDialog from "../pages/SearchDialog";
import DropDownMenu from "../pages/DropDownMenu";
import NewTopicDialog from "../pages/NewTopicDialog";
import styles from "../pages/styles";

const LatestNews = ({ navigation }) => {
  const route = useRoute();
  const filter = route.params?.filter;
  const board = route.params?.board;
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/MessagesAsJSON.php?board=" + board;
  const [data, setData] = useState(null);
  const [isNewTopicVisible, setNewTopicVisible] = useState(false);
  let authorid = "";
  let fabvisible = true;
  if (board == "News") {
    fabvisible = false;
  }
  const getData = async () => {
    const resp = await fetch(fileUrl, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    });
    const data2 = await resp.json();
    let searchterm = null;
    let dataToDisplay = [];
    dataToDisplay = data2.filter(
      (data2) =>
        data2.Board.includes(board) && data2.Topic==data2.Time
    );
    if (filter.includes("SearchTerm=")) {
      searchterm = filter.substring(filter.indexOf("SearchTerm=") + 11);
      dataToDisplay = dataToDisplay.filter(
        (dataToDisplay) =>
          dataToDisplay.Author.toLowerCase().includes(searchterm.toLowerCase()) ||
          dataToDisplay.Title.toLowerCase().includes(searchterm.toLowerCase()) ||
          dataToDisplay.Content.toLowerCase().includes(searchterm.toLowerCase()) ||
          dataToDisplay.Html.toLowerCase().includes(searchterm.toLowerCase())
      );
    }
    if (filter.includes("SortOrder=")) {
      if (filter.includes("SurnameAtoZ")) {
        dataToDisplay.sort((a, b) => a.Author.localeCompare(b.Author));
      }
      if (filter.includes("SurnameZtoA")) {
        dataToDisplay.sort((a, b) => b.Author.localeCompare(a.Author));
      }
      if (filter.includes("DateAsc")) {
        dataToDisplay.sort((a, b) => new Date(a.Time) - new Date(b.Time));
      }
      if (filter.includes("DateDesc")) {
        dataToDisplay.sort((a, b) => new Date(b.Time) - new Date(a.Time));
      }
    }
    setData(dataToDisplay);
  };

  useFocusEffect(
      React.useCallback(() => {
        getData();
      }, [data])
    );

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);

  const link = (link) => {
    if (link && link != "") {
      return (
        <TouchableOpacity
          style={styles.messageboardbutton}
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

  const replies = (replys) => {
      if (replys > 0) {
        return (
            <Text
              style={{
                color: "#A020F0",
                fontSize: 15,
                display: "flex",
                alignSelf: "center",
              }}
            >
              {" "}
              {replys} Replies{" "}
            </Text>
        );
      }
    };

  const editbutton = () => {
    if (global.loggedinid == authorid || global.loggedinid == "133") {
      return (
        <TouchableOpacity
          style={styles.messageboardbutton}
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
            Edit{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const deletebutton = () => {
    if (global.loggedinid == authorid || global.loggedinid == "133") {
      return (
        <TouchableOpacity
          style={styles.messageboardbutton}
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
            Delete{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const NewTopicButtonPressed = () => {
    if (global.loggedinid > 0) {
      setNewTopicVisible(true);
    } else {
      Alert.alert(
        "Please Log In",
        "You have to be Logged In to Post a New Topic"
      );
    }
  };

  const newtopic = () => {
    if (board != "News") {
      return (
        <TouchableOpacity
          style={styles.newtopicbutton}
          onPress={() => NewTopicButtonPressed()}
        >
          <Text
            style={{
              color: "#A020F0",
              fontSize: 17,
              display: "flex",
              alignSelf: "center",
            }}
          >
            {" "}
            New Topic{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

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
          on {day} {startm} {year} at {hourmin}
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

  let x = 0;
  const getStyle = () => {
    x++;
    if (x == 3) x = 1;
    if (x === 1) {
      return {
        marginLeft: 13,
        borderWidth: 1,
        paddingLeft: 13,
        paddingRight: 2,
        paddingBottom: 7,
        backgroundColor: "#FFE740",
      };
    } else {
      return {
        marginLeft: 13,
        borderWidth: 1,
        paddingLeft: 13,
        paddingRight: 2,
        paddingBottom: 7,
        backgroundColor: "#FFEF80",
      };
    }
  };

  const prepareauthor = (author) => {
    const firstbracket = author.indexOf("**");
    const secondbracket = author.indexOf("**");
    if (firstbracket > 0) {
      authorid = author.substring(firstbracket + 1, secondbracket);
      author = author.substring(0, firstbracket - 1);
    }
    return <Text style={styles.title}>by {author}</Text>;
  };

  const buttons = "Sort,Search,Help";
  const { width } = useWindowDimensions();

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
        title={board}
        buttons={buttons}
        caller="Latest News"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <SearchDialog
        display={isModalVisible}
        caller={"Latest News Board=" + board}
        navigation={navigation}
        onCancel={() => setModalVisible(false)}
      />
      <DropDownMenu
        display={isDropDownVisible}
        caller={"Latest News Board=" + board}
        navigation={navigation}
        onCancel={() => setDropDownVisible(false)}
      />
      <NewTopicDialog
        display={isNewTopicVisible}
        caller="Latest News"
        board={board}
        navigation={navigation}
        onCancel={() => setNewTopicVisible(false)}
      />
      {newtopic()}
      <ScrollView keyboardShouldPersistTaps="handled">
        {data &&
          data.map((article) => {
            if (article.Html.includes("twitter-tweet")) {
              return (
                <View key={article.Time} style={getStyle()}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Topic Started</Text>
                    {TopicStarted(article.Time)}
                  </View>
                  {prepareauthor(article.Author)}
                  <Text style={{ fontSize: 16, color: "red" }}>
                    {" "}
                    {article.Title}{" "}
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: article.Html }}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.messageboardbutton}
                      onPress={() =>
                        navigation.navigate("View Thread", {
                          Thread: article.Time,
                          board: board,
                          filter: "SortOrder=DateAsc",
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
                    {link(article.Link)}
                    {replies(article.Replys)}
                  </View>
                </View>
              );
            } else {
              return (
                <View key={article.Time} style={getStyle()}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Topic Started</Text>
                    {TopicStarted(article.Time)}
                  </View>
                  {prepareauthor(article.Author)}
                  <Text style={{ fontSize: 16, color: "red" }}>
                    {" "}
                    {article.Title}{" "}
                  </Text>
                  <Text style={{ fontSize: 14, color: "blue" }}>
                    {" "}
                    {article.Content}{" "}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.messageboardbutton}
                      onPress={() =>
                        navigation.navigate("View Thread", {
                          Thread: article.Time,
                          board: board,
                          filter: "SortOrder=DateAsc",
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
                    {link(article.Link)}
                    {replies(article.Replys)}
                  </View>
                </View>
              );
            }
          })}
      </ScrollView>
      {Footer()}
    </View>
  );
};

export default LatestNews;
