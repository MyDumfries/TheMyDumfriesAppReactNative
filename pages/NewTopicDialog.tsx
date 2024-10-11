import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  TextInput,
  Dimensions,
  Button,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import styles from "../pages/styles";

const { width } = Dimensions.get("window");

const NewTopicDialog = (display, caller, board, navigation, onCancel) => {
  if (display.onCancel) onCancel = display.onCancel;
  if (display.board) board = display.board;
  if (display.navigation) navigation = display.navigation;
  if (display.caller) caller = display.caller;
  if (display.display) display = display.display;
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const SubmitComment = () => {
    const author1 =
      global.loggedinfirstname +
      " " +
      global.loggedinsurname +
      " **" +
      global.loggedinid +
      "**";
    const content1 = text;
    const subject1 = subject;
    let uri = encodeURI(
      "http://www.qosfan.co.uk/MyDumfries/RemoteUpdate.php?username=" +
        author1 +
        "&message=" +
        content1 +
        "&subject=" +
        subject1 +
        "&topic=New Topic" +
        "&board=" +
        board
    );
    onCancel();
    Linking.openURL(uri);
    navigation.replace("Latest News", {
      board: board,
      filter: "SortOrder=DateDesc",
    });
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Modal
        animationType="slide"
        visible={display}
        transparent={true}
        presentationStyle="overFullScreen"
      >
        <View style={styles.viewWrapper}>
          <View style={styles.topicmodalView}>
            <Text
              style={{
                color: "#A020F0",
                fontSize: 25,
                display: "flex",
                alignSelf: "center",
              }}
            >
              {global.loggedinfirstname} {global.loggedinsurname}, Please enter
              your Topic.
            </Text>
            <TextInput
              placeholder="Your subject..."
              value={subject}
              style={styles.newtopictextInput}
              maxLength={100}
              onChangeText={(newSubject) => setSubject(newSubject)}
            />
            <TextInput
              placeholder="Your content..."
              value={text}
              style={styles.newtopictextInput}
              multiline
              numberOfLines={8}
              maxLength={400}
              onChangeText={(newText) => setText(newText)}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.button} onPress={onCancel}>
                <Text
                  style={{
                    color: "#A020F0",
                    fontSize: 25,
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onCancel;
                  SubmitComment();
                }}
              >
                <Text
                  style={{
                    color: "#A020F0",
                    fontSize: 25,
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default NewTopicDialog;
