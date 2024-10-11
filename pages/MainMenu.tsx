import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import styles from "../pages/styles";

const MainMenu = ({ navigation }) => {
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
      }}
    >
      <Header
        title="Main Menu"
        buttons="Login"
        caller="Main Menu"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <TouchableOpacity
        style={styles.mainmenubutton}
        onPress={() =>
          navigation.navigate("People Menu", {
            filter: "SortOrder=SurnameAtoZ",
          })
        }
      >
        <Text
          style={{
            color: "#A020F0",
            fontSize: 25,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Dumfries People
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainmenubutton}
        onPress={() =>
          navigation.navigate("Latest News", {
            board: "News",
            filter: "SortOrder=DateDesc",
          })
        }
      >
        <Text
          style={{
            color: "#A020F0",
            fontSize: 25,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Dumfries Latest
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainmenubutton}
        onPress={() => navigation.navigate("Board Index")}
      >
        <Text
          style={{
            color: "#A020F0",
            fontSize: 25,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Message Boards
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainmenubutton}
        onPress={() =>
          navigation.navigate("Walks Menu", { filter: "SortOrder=AtoZ" })
        }
      >
        <Text
          style={{
            color: "#A020F0",
            fontSize: 25,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Dumfries Walks
        </Text>
      </TouchableOpacity>
      {Footer()}
    </View>
  );
};

export default MainMenu;
