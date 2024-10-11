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
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../pages/styles";

const { width } = Dimensions.get("window");

const DropDownMenu = (display, caller, navigation, onCancel) => {
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  let items = [];
  if (caller == "Walks Menu") {
    items = [
      { label: "A to Z", value: "SortOrder=AtoZ" },
      { label: "Z to A", value: "SortOrder=ZtoA" },
      { label: "Distance Descending", value: "SortOrder=DistDesc" },
      { label: "Distance Ascending", value: "SortOrder=DistAsc" },
    ];
  }
  if (caller == "People Menu") {
    items = [
      { label: "Surname A to Z", value: "SortOrder=SurnameAtoZ" },
      { label: "Surname Z to A", value: "SortOrder=SurnameZtoA" },
      { label: "Firstname A to Z", value: "SortOrder=FirstnameAtoZ" },
      { label: "Firstname Z to A", value: "SortOrder=FirstnameZtoA" },
    ];
  }
  if (caller == "Latest News" || caller == "View Thread") {
    items = [
      { label: "Posted by User Name A to Z", value: "SortOrder=SurnameAtoZ" },
      { label: "Posted by User Name Z to A", value: "SortOrder=SurnameZtoA" },
      { label: "Date Posted Ascending", value: "SortOrder=DateAsc" },
      { label: "Date Posted Descending", value: "SortOrder=DateDec" },
    ];
  }
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
              Pick Sort Order
            </Text>
            <View style={{ display: "flex", alignSelf: "center" }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                style={styles.dropdownpicker}
                dropDownContainerStyle={{ width: "80%" }}
                placeholder="Select an Order"
              />
            </View>
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
                  navigation.replace(caller, { filter: value, Thread : "" + thread, board : "" + board });
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
export default DropDownMenu;
