import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  useWindowDimensions,
  TouchableOpacity,
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
import ReplyDialog from "../pages/ReplyDialog";
import EditDialog from "../pages/EditDialog";
import DeleteDialog from "../pages/DeleteDialog";
import styles from "../pages/styles";

const ViewThread = ({ route, navigation }) => {
  const Thread = route.params?.Thread;
  const filter = route.params?.filter;
  const board = route.params?.board;
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/MessagesAsJSON.php?thread='" + Thread + "'";
  const [data, setData] = useState(null);
  const [EditModalContent, setEditModalContent] = useState("");
  const [EditModalid, setEditModalid] = useState("");
  let authorid = "";

  const getData = async () => {
    const resp = await fetch(fileUrl, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    });
    const data = await resp.json();
    let searchterm = null;
    let dataToDisplay = [];
    let mainTopic = [];
    mainTopic = data.filter(
      (data) => data.Time.includes(Thread)
    );
    let threadItems = [];
    threadItems = data.filter((data) => data.Topic.includes(Thread) && !data.Time.includes(Thread));
    threadItems.sort((a, b) => a.Time.localeCompare(b.Time));
    dataToDisplay = [...mainTopic, ...threadItems];
    if (filter.includes("SearchTerm=")) {
      searchterm = filter.substring(filter.indexOf("SearchTerm=") + 11);
      dataToDisplay = dataToDisplay.filter(
        (dataToDisplay) =>
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
  const [isReplyVisible, setReplyVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [thisArticle, setThisArticle] = useState("");

  const link = (link, topic) => {
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

  const ReplyButtonPressed = (article) => {
    if (global.loggedinid > 0) {
      setThisArticle({ article });
      setReplyVisible(true);
    } else {
      Alert.alert("Please Log In", "You have to be Logged In to Reply");
    }
  };

  const DeleteButtonPressed = (article) => {
    if (global.loggedinid > 0) {
      setThisArticle({ article });
      setDeleteVisible(true);
    }
  };

  const TopicStarted = (start, topic) => {
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
    if (start == topic) {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text>Topic Started</Text>
          <Text style={{ color: "red" }}>
            {" "}
            on {day} {startm} {year} at {hourmin}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text>Reply</Text>
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

  const ReplyButton = (article) => {
    if (article.Topic == article.Time) {
      return (
        <TouchableOpacity
          style={styles.messageboardbutton}
          onPress={() => ReplyButtonPressed(article)}
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
            Reply{" "}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const editbutton = (article) => {
    if (global.loggedinid == authorid || global.loggedinid == "133") {
      return (
        <TouchableOpacity
          style={styles.messageboardbutton}
          onPress={() => {
            setEditModalContent(article.Content);
            setEditModalid(article.Time);
            setEditVisible(true);
            setThisArticle({ article });
          }}
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

  const deletebutton = (article) => {
    if (global.loggedinid == authorid || global.loggedinid == "133") {
      return (
        <TouchableOpacity
          style={styles.messageboardbutton}
          onPress={() => {
            setEditModalContent(article.Content);
            setEditModalid(article.Time);
            setDeleteVisible(true);
          }}
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

  const showDeleteDialog = (article) => {
    if (isDeleteVisible) {
      return (
        <DeleteDialog
          display={isDeleteVisible}
          caller={"View Thread"}
          article={data[0]}
          content={EditModalContent}
          id={EditModalid}
          navigation={navigation}
          onCancel={() => setDeleteVisible(false)}
        />
      );
    }
  };

  const showEditDialog = (article) => {
    if (isEditVisible) {
      return (
        <EditDialog
          display={isEditVisible}
          caller={"View Thread"}
          article={data[0]}
          content={EditModalContent}
          id={EditModalid}
          navigation={navigation}
          onCancel={() => setEditVisible(false)}
        />
      );
    }
  };

  const buttons = "Sort,Search";
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
        title="View Thread"
        buttons={buttons}
        caller="View Thread"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <SearchDialog
        display={isModalVisible}
        caller={"View Thread Board=" + board + "Thread=" + Thread}
        navigation={navigation}
        onCancel={() => setModalVisible(false)}
      />
      <ReplyDialog
        display={isReplyVisible}
        caller={"View Thread"}
        article={thisArticle}
        navigation={navigation}
        onCancel={() => setReplyVisible(false)}
      />
      <DropDownMenu
        display={isDropDownVisible}
        caller={"View Thread Board=" + board + "Thread=" + Thread}
        navigation={navigation}
        onCancel={() => setDropDownVisible(false)}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        {data &&
          data.map((article) => {
            if (article.Html.includes("twitter-tweet")) {
              return (
                <View key={article.Time} style={getStyle()}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Topic Started</Text>
                    {TopicStarted(article.Time, article.Topic)}
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
                    {ReplyButton(article)}
                    {editbutton(article)}
                    {deletebutton(article)}
                    {link(article.Link, article.Topic)}
                  </View>
                </View>
              );
            } else {
              return (
                <View key={article.Time} style={getStyle()}>
                  {showEditDialog(article)}
                  {showDeleteDialog(article)}
                  {TopicStarted(article.Time, article.Topic)}
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
                    {ReplyButton(article)}
                    {editbutton(article)}
                    {deletebutton(article)}
                    {link(article.Link, article.Topic)}
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

export default ViewThread;
