import { useEffect, useState, React } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import SearchDialog from "../pages/SearchDialog";
import DropDownMenu from "../pages/DropDownMenu";
import styles from "../pages/styles";

const WalksMenu = ({ navigation }) => {
  const route = useRoute();
  const filter = route.params?.filter;
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/WalksAsJSON.php";
  const [data, setData] = useState(null);

  const getData = async () => {
    const resp = await fetch(fileUrl, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    }).catch(function (error) {
          // handle error
          console.log(error)
           });
           const debug = resp;
    const data = await resp.json().catch(function (rejectionReason) {
                                            console.log('Error parsing JSON from response:', rejectionReason, debug); // 4
                                                                                             debug.text() // 5
                                                                                             .then(function (bodyText) {
                                                                                                 console.log('Received the following instead of valid JSON:', bodyText); // 6
                                                                                             });
                                             });
    let searchterm = null;
    let dataToDisplay = [];
    if (filter.includes("SearchTerm=")) {
      searchterm = filter.substring(filter.indexOf("SearchTerm=") + 11);
      dataToDisplay = data.filter(
        (data) =>
          data.name.toLowerCase().includes(searchterm.toLowerCase()) ||
          data.description.toLowerCase().includes(searchterm.toLowerCase())
      );
    }
    if (filter.includes("SortOrder=")) {
      if (filter.includes("AtoZ")) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (filter.includes("ZtoA")) {
        data.sort((a, b) => b.name.localeCompare(a.name));
      }
      if (filter.includes("DistAsc")) {
        data.sort((a, b) => a.length - b.length);
      }
      if (filter.includes("DistDesc")) {
        data.sort((a, b) => b.length - a.length);
      }
      dataToDisplay = data;
    }
    setData(dataToDisplay);
  };

  //on first mount, fetch data.
  useEffect(() => {
    getData();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);

  const buttons = "Sort,Search,Help";

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
        title="Walks"
        buttons={buttons}
        caller="Walks Menu"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <SearchDialog
        display={isModalVisible}
        caller="Walks Menu"
        navigation={navigation}
        onCancel={() => setModalVisible(false)}
      />
      <DropDownMenu
        display={isDropDownVisible}
        caller="Walks Menu"
        navigation={navigation}
        onCancel={() => setDropDownVisible(false)}
      />
      <ScrollView keyboardShouldPersistTaps='handled'>
        {data &&
          data.map((walk) => {
            return (
              <View key={walk.index} style={{ paddingLeft: 13, paddingBottom: 5 }}>
                <Text style={styles.title}>{walk.name}</Text>
                <Text style={{ color: "blue" }}> {walk.description} </Text>
                <Text style={{ color: "red" }}> {walk.length}km </Text>
                <TouchableOpacity
                  style={styles.mainmenubutton}
                  onPress={() => Linking.openURL(walk.link)}
                >
                  <Text
                    style={{
                      color: "#A020F0",
                      fontSize: 25,
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    {" "}
                    View in 'MapMyWalk'
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
      {Footer()}
    </View>
  );
};

export default WalksMenu;
