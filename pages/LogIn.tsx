import { useEffect, useState, React } from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import styles from "../pages/styles";
import { sha256 } from "react-native-sha256";

const LogIn = ({ navigation }) => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [
    isForgottenPasswordModalVisible,
    setForgottenPasswordModalVisible,
  ] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);
  const [emailtext, setemailText] = useState("");
  const [passwordtext, setpasswordText] = useState("");
  const [uri, seturi] = useState("");
  const [data, setData] = useState(null);

  const ConfirmLogIn = () => {
    return (
      <SafeAreaView style={styles.screen}>
        <Modal
          animationType="slide"
          visible={isLoginModalVisible}
          transparent={true}
          presentationStyle="overFullScreen"
        >
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <Text
                style={{
                  color: "#A020F0",
                  fontSize: 20,
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                Welcome back to MyDumfries, {global.loggedinfirstname}{" "}
                {global.loggedinsurname}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setLoginModalVisible(false);
                    navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      color: "#A020F0",
                      fontSize: 20,
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  };

  const handlelogin = () => {
    const fileUrl = "http://www.qosfan.co.uk/MyDumfries/LogIn.php?username=" + emailtext + "&password=" + passwordtext;
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

      if (data.length > 0) {
          global.loggedinfirstname = data[0].firstname;
          global.loggedinsurname = data[0].surname;
          global.loggedinid = data[0].id;
          setLoginModalVisible(true);
        } else {
          Alert.alert(
            "Log In Failed",
            "Sorry, those log in details are incorrect"
          );
        }
        };
        getData();
  };

  const ForgottenPassword = () => {
    return (
      <SafeAreaView style={styles.screen}>
        <Modal
          animationType="slide"
          visible={isForgottenPasswordModalVisible}
          transparent={true}
          presentationStyle="overFullScreen"
        >
          <View style={styles.viewWrapper}>
            <View style={styles.topicmodalView}>
              <Text
                style={{
                  color: "#A020F0",
                  fontSize: 16,
                  display: "flex",
                  alignSelf: "center",
                  paddingRight: 5,
                  paddingLeft: 5,
                  paddingTop: 5,
                }}
              >
                A random password will be generated for {emailtext}. Unfortunately, my Free Web Server does not allow the automatic sending of emails, so please click Continue to send me an email requesting your new password.
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setForgottenPasswordModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      color: "#A020F0",
                      fontSize: 20,
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
                    setForgottenPasswordModalVisible(false);
                    sendchangedpassword();
                  }}
                >
                  <Text
                    style={{
                      color: "#A020F0",
                      fontSize: 20,
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  };

  const handleforgottenpassword = () => {
    const i = data.findIndex((e) => e.email === emailtext);
    if (i < 0 && emailtext != "") {
      Alert.alert(
        "eMail Not Found",
        "That eMail has not been found. Please check."
      );
    } else if (emailtext == "") {
      Alert.alert(
        "Please Input Your eMail",
        "Please type your eMail address into the eMail box."
      );
    } else {
      setForgottenPasswordModalVisible(true);
    }
  };

  const sendchangedpassword = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    const i = data.findIndex((e) => e.email === emailtext);
    const id = data[i].id;
    const uri2 = encodeURI(
      "http://www.qosfan.co.uk/MyDumfries/peoplechangepassword.php?id=" +
        id +
        "&email=" +
        emailtext +
        "&password=" +
        result
    );
    Linking.openURL(uri2);
    Linking.openURL("mailto:mydumfries@qosfan.co.uk?cc=&subject=MyDumfries App Forgotten Password &body=I have reset my password for " + emailtext + ".  Please send me my new password.");
    setForgottenPasswordModalVisible(false);
  };

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
        title="Log In"
        buttons="Login,Help"
        caller="LogIn"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <ConfirmLogIn />
      <ForgottenPassword />
      <Text
        style={{
          fontSize: 20,
          color: "purple",
          display: "flex",
          alignSelf: "center",
        }}
      >
        Thank You For Being Part of {"\n"}The MyDumfries Community.
      </Text>
      <TextInput
        placeholder="eMail Address..."
        value={emailtext}
        style={styles.textInput}
        keyboardType="email-address"
        textContentType={"emailAddress"}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(newText) => setemailText(newText)}
      />
      <TextInput
        placeholder="password..."
        value={passwordtext}
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(newText) => setpasswordText(newText)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handlelogin()}>
        <Text
          style={{
            color: "#A020F0",
            fontSize: 25,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleforgottenpassword()}>
        <Text
          style={{
            color: "#A020F0",
            fontSize: 15,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Forgotten Password?
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 25,
          color: "purple",
          display: "flex",
          alignSelf: "center",
        }}
      >
        OR
      </Text>
      <TouchableOpacity
        style={styles.registerbutton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text
          style={{
            color: "#A020F0",
            fontSize: 25,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
      {Footer()}
    </View>
  );
};
export default LogIn;
