import React, { useEffect, useState } from "react";
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

const DeleteDialog = (display, caller, article, content, id, navigation, onCancel) => {
  if (display.onCancel) onCancel = display.onCancel;
  if (display.article) article = display.article;
  if (display.content) content = display.content;
  if (display.id) id = display.id;
  if (display.navigation) navigation = display.navigation;
  if (display.caller) caller = display.caller;
  if (display.display) display = display.display;
  const SubmitComment = () => {
    let uri = encodeURI(
      "http://www.qosfan.co.uk/MyDumfries/DeletePost.php?id=" + id
    );
    navigation.replace("View Thread", {
      Thread: article.Time,
      board: article.Board,
      filter: "SortOrder=DateAsc",
    });
    Linking.openURL(uri);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Modal
        animationType="slide"
        isOpen={display}
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
              Are You Sure You want to delete "{content}".
            </Text>
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
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DeleteDialog;
