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
  TouchableOpacity,
} from "react-native";
import styles from "../pages/styles";

const { width } = Dimensions.get("window");

const SearchDialog = (display, caller, navigation, onCancel) => {
  if (display.onCancel) onCancel = display.onCancel;
  if (display.navigation) navigation = display.navigation;
  if (display.caller) caller = display.caller;
  let board = '';
  let thread = '';
  if (caller.includes("Board=")) {
    let firstthread=caller.indexOf("Thread=");
    if (firstthread < 0)
    {
      firstthread = caller.length;
    }
    board = caller.substring(caller.indexOf("Board=")+6,firstthread);
    thread = caller.substring(firstthread + 7);
    caller = caller.substring(0,caller.indexOf("Board=") - 1);
  }
  if (display.display) display = display.display;
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.screen}>
      <Modal
        animationType="slide"
        visible={display}
        transparent={true}
        presentationStyle="overFullScreen"
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: "#A020F0",
                fontSize: 25,
                display: "flex",
                alignSelf: "center",
              }}
            >
              Enter Search Term
            </Text>
            <TextInput
              placeholder="Search for..."
              value={text}
              style={styles.textInput}
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
                  navigation.replace(caller, { filter: "SearchTerm=" + text, Thread : "" + thread, board : "" + board });
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

export default SearchDialog;
