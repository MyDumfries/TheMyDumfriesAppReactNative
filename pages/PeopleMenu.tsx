import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  useFocusEffect,
  NavigationContainer,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import SearchDialog from "../pages/SearchDialog";
import DropDownMenu from "../pages/DropDownMenu";
import styles from "../pages/styles";

const PeopleMenu = ({ navigation }) => {
  const route = useRoute();
  const filter = route.params?.filter;
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/PeopleAsJSON.php";
  const [data, setData] = useState(null);
  const getData = async () => {
    const resp = await fetch(fileUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    });
    let data2 = [];
    data2 = await resp.json();
    let searchterm = null;
    let dataToDisplay = [];
    if (filter.includes("SearchTerm=")) {
      searchterm = filter.substring(filter.indexOf("SearchTerm=") + 11);
      dataToDisplay = data2.filter(
        (data2) =>
          data2.firstname.toLowerCase().includes(searchterm.toLowerCase()) ||
          data2.surname.toLowerCase().includes(searchterm.toLowerCase()) ||
          data2.email.toLowerCase().includes(searchterm.toLowerCase()) ||
          data2.comments.toLowerCase().includes(searchterm.toLowerCase()) ||
          data2.houses.toLowerCase().includes(searchterm.toLowerCase()) ||
          data2.schools.toLowerCase().includes(searchterm.toLowerCase()) ||
          data2.work.toLowerCase().includes(searchterm.toLowerCase())
      );
    }
    if (filter.includes("SortOrder=")) {
      if (filter.includes("SurnameAtoZ")) {
        data2.sort((a, b) => a.surname.localeCompare(b.surname));
      }
      if (filter.includes("SurnameZtoA")) {
        data2.sort((a, b) => b.surname.localeCompare(a.surname));
      }
      if (filter.includes("FirstnameAtoZ")) {
        data2.sort((a, b) => a.firstname.localeCompare(b.firstname));
      }
      if (filter.includes("FirstnameZtoA")) {
        data2.sort((a, b) => b.firstname.localeCompare(a.firstname));
      }
      dataToDisplay = data2;
    }
    dataToDisplay = dataToDisplay.filter(
      (dataToDisplay) => dataToDisplay.confirm > 0
    );
    setData(dataToDisplay);
  };

  //refresh data every time page gets focus data.
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const checkifloggedin = (person) => {
    if (person.id != global.loggedinid) {
      return (
        <TouchableOpacity
          style={styles.mainmenubutton}
          onPress={() =>
            navigation.navigate("Person Details", { PersonDetail: person })
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
            View {person.firstname}'s Details
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.mainmenubutton}
          onPress={() =>
            navigation.navigate("Amend Details", { PersonDetail: person })
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
            Edit Your Details
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const FormatDoB = (dob) => {
    const mth = dob.substring(5, 7);
    let day = dob.substring(8, 10);
    let year = dob.substring(0, 4);
    const mthint = parseInt(mth);
    let dobm = "";
    if (day == "00") {
      day = "";
    }
    if (year == "0000") {
      year = "";
    }
    if (mthint == 0) {
      dobm = "";
    } else {
      dobm = months[mthint - 1];
    }
    return (
      <View>
        <Text style={{ color: "red" }}>
          {" "}
          Date of Birth: {day} {dobm} {year}
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

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);

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
        title="People"
        buttons="Sort,Search,Help"
        caller="People Menu"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <SearchDialog
        display={isModalVisible}
        caller="People Menu"
        navigation={navigation}
        onCancel={() => setModalVisible(false)}
      />
      <DropDownMenu
        display={isDropDownVisible}
        caller="People Menu"
        navigation={navigation}
        onCancel={() => setDropDownVisible(false)}
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ backgroundColor: "#FDFD96" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {data &&
          data.map((person) => {
            return (
              <View key={person.id} style={{ paddingLeft: 13, paddingBottom: 5, flex: 1 }}>
                <Text style={styles.title}>
                  {person.firstname} {person.surname}
                </Text>
                {FormatDoB(person.dateofbirth)}
                <Text style={{ color: "blue" }}> {person.comments} </Text>
                {checkifloggedin(person)}
              </View>
            );
          })}
      </ScrollView>
      <View>{Footer()}</View>
    </View>
  );
};

export default PeopleMenu;