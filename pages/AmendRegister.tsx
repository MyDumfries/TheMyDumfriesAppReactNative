import { useEffect, useState, React } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Modal,
  Dimensions,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Footer from "../pages/Footer";
import Header from "../pages/Header";
import styles from "../pages/styles";
import { sha256 } from "react-native-sha256";

const { width } = Dimensions.get("window");

const AmendRegister = ({ route, navigation }) => {
  const { PersonDetail } = route.params;
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [isDeletionModalVisible, setDeletionModalVisible] = useState(false);
  const [uri, seturi] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);
  const [firstnametext, setfirstnameText] = useState(PersonDetail.firstname);
  const [surnametext, setsurnameText] = useState(PersonDetail.surname);
  const [passwordtext, setpasswordText] = useState(PersonDetail.password);
  const [confirmpasswordtext, setconfirmpasswordText] = useState(
    PersonDetail.password
  );
  const originalpassword = PersonDetail.password;
  const [dobtext, setdobText] = useState(PersonDetail.dateofbirth);
  const [detailstext, setdetailsText] = useState(PersonDetail.comments);
  const [facebooktext, setfacebookText] = useState(PersonDetail.facebook);
  const [twittertext, settwitterText] = useState(PersonDetail.twitter);
  const [youtubetext, setyoutubeText] = useState(PersonDetail.youtube);
  const [instagramtext, setinstagramText] = useState(PersonDetail.instagram);
  const [blogtext, setblogText] = useState(PersonDetail.blog);
  const [othersocialmediatext, setothersocialmediaText] = useState(
    PersonDetail.othersocialmedia
  );
  const [schoolstext, setschoolsText] = useState(PersonDetail.schools);
  const [addresstext, setaddressText] = useState(PersonDetail.houses);
  const [worktext, setworkText] = useState(PersonDetail.work);
  const [webtext, setwebText] = useState(PersonDetail.websites);
  const [footertext, setfootertext] = useState("");
  const fileUrl = "http://www.qosfan.co.uk/MyDumfries/people.json";

  const handleregistration = () => {
    if (passwordtext != confirmpasswordtext) {
      Alert.alert("Password Failed", "The Passwords do not match.");
    } else if (passwordtext != "") {
      sha256(passwordtext).then((hash) => {
        if (passwordtext == originalpassword) hash = originalpassword;
        if (firstnametext == "") {
          Alert.alert("Firstname Missing", "Please enter your firstname.");
        } else if (surnametext == "") {
          Alert.alert("Surname Missing", "Please enter your surname.");
        } else {
          let eMailMessage = `[\n  {\n    \"surname\": \"`;
          eMailMessage = eMailMessage + `${surnametext}\",\n    `;
          eMailMessage =
            eMailMessage + `\"firstname\": \"${firstnametext}\",\n    `;
          eMailMessage =
            eMailMessage + `\"email\": \"${PersonDetail.email}\",\n    `;
          eMailMessage =
            eMailMessage +
            `\"dateofbirth\": \"` +
            dobtext +
            `\",\n    ` +
            `\"comments\": \"` +
            detailstext +
            `\",\n    ` +
            `\"id\": ${PersonDetail.id},\n    ` +
            `\"confirm\": 1,\n    ` +
            `\"twitter\": \"` +
            twittertext +
            `\",\n    ` +
            `\"facebook\": \"` +
            facebooktext +
            `\",\n    ` +
            `\"instagram\": \"` +
            instagramtext +
            `\",\n    ` +
            `\"youtube\": \"` +
            youtubetext +
            `\",\n    ` +
            `\"blog\": \"` +
            blogtext +
            `\",\n    ` +
            `\"othersocialmedia\": \"` +
            othersocialmediatext +
            `\",\n    ` +
            `\"othersocialmediaintro\": \"\",\n    ` +
            `\"schools\": \"` +
            schoolstext +
            `\",\n    ` +
            `\"websites\": \"` +
            webtext +
            `\",\n    ` +
            `\"work\": \"` +
            worktext +
            `\",\n    ` +
            `\"houses\": \"` +
            addresstext +
            `\",\n    ` +
            `\"password\": \"` +
            hash +
            `\",\n    ` +
            `\"favourites\": \"\",\n    ` +
            `\"messageboardid\": 0\n  ` +
            `}\n]`;
          seturi(
            encodeURI(
              "http://www.qosfan.co.uk/MyDumfries/peopleamendregister.php?person=" +
                eMailMessage + "&id=" + PersonDetail.id
            )
          );
          setConfirmationModalVisible(true);
        }
      });
    } else if (passwordtext == "") {
      Alert.alert("Password Missing", "Please enter a password.");
    }
  };

  const ConfirmationDialog = () => {
    return (
      <SafeAreaView style={styles.screen}>
        <Modal
          animationType="slide"
          visible={isConfirmationModalVisible}
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
                Your details will now be updateded on my server.
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setConfirmationModalVisible(false)}
                >
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
                    setConfirmationModalVisible(false);
                    navigation.goBack();
                    Linking.openURL(uri);
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

  const handledeletion = () => {
    setDeletionModalVisible(true);
    seturi(
      encodeURI(
        "http://www.qosfan.co.uk/MyDumfries/peopledelete.php?id=" +
          PersonDetail.id
      )
    );
  };

  const ConfirmDeletionDialog = () => {
    return (
      <SafeAreaView style={styles.screen}>
        <Modal
          animationType="slide"
          visible={isDeletionModalVisible}
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
                Are you sure you want your details to be deleted?.
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setDeletionModalVisible(false)}
                >
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
                    setDeletionModalVisible(false);
                    navigation.navigate("Main Menu");
                    global.loggedinfirstname = "";
                    global.loggedinsurname = "";
                    global.loggedinid = "";
                    Linking.openURL(uri);
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
        title="Amend Details"
        buttons="Help"
        caller="AmendRegister"
        navigation={navigation}
        onShow={() => setModalVisible(true)}
        onShowDropDown={() => setDropDownVisible(true)}
      />
      <ConfirmationDialog />
      <ConfirmDeletionDialog />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        style={{ backgroundColor: "#FDFD96" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text
          style={{
            fontSize: 17,
            color: "purple",
            display: "flex",
            alignSelf: "center",
          }}
        >
          Please enter your Firstname, Surname, eMail and Password as a minimum.
        </Text>
        <TextInput
          placeholder="Firstname..."
          onFocus={() => setfootertext("Enter your Firstname (Required)")}
          value={firstnametext}
          style={styles.textInput}
          onChangeText={(newText) => setfirstnameText(newText)}
        />
        <TextInput
          placeholder="Surname..."
          onFocus={() => setfootertext("Enter your Surname (Required)")}
          value={surnametext}
          style={styles.textInput}
          onChangeText={(newText) => setsurnameText(newText)}
        />
        <Text style={{ paddingLeft: 15, paddingRight: 35 }}>
          {PersonDetail.email} cannot be changed. Please delete this profile and
          set up a new one to change your eMail.
        </Text>
        <TextInput
          placeholder="password..."
          onFocus={() =>
            setfootertext(
              "Enter your Password (Required). I DO NOT have a Secure Server, so please DO NOT USE A PASSWORD YOU USE ON OTHER SITES!!!"
            )
          }
          value={passwordtext}
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(newText) => setpasswordText(newText)}
        />
        <TextInput
          placeholder="confirm password..."
          onFocus={() =>
            setfootertext(
              "Confirm your Password (Required). I DO NOT have a Secure Server, so please DO NOT USE A PASSWORD YOU USE ON OTHER SITES!!!"
            )
          }
          value={confirmpasswordtext}
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(newText) => setconfirmpasswordText(newText)}
        />
        <Text style={{ fontSize: 15, color: "purple", paddingLeft: 10 }}>
          Some Optional, But Useful, Details.
        </Text>
        <TextInput
          placeholder="Date of Birth (yyyy-mm-dd)"
          onFocus={() =>
            setfootertext("Enter your Date of Birth in the format yyyy-mm-dd")
          }
          value={dobtext}
          style={styles.textInput}
          onChangeText={(newText) => setdobText(newText)}
        />
        <TextInput
          placeholder="Tell us a bit about yourself..."
          multiline
          numberOfLines={4}
          maxLength={400}
          onFocus={() =>
            setfootertext(
              "Anything you like that you think will help people to find you."
            )
          }
          value={detailstext}
          style={styles.textInput}
          onChangeText={(newText) => setdetailsText(newText)}
        />
        <Text style={{ fontSize: 15, color: "purple", paddingLeft: 10 }}>
          Social Media Links
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Facebook id, e.g. firstname.surname.1"
            onFocus={() =>
              setfootertext(
                "In the Facebook App, click your avatar next to (Whats On Your Mind). Click on (...) then (Your Profile Link). Paste that link into here."
              )
            }
            value={facebooktext}
            style={styles.textInput}
            onChangeText={(newText) => setfacebookText(newText)}
          />
          <Image
            source={require("../images/FacebookLogo.png")}
            style={{ marginLeft: 15, width: 40, height: 40 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="x, just the bit after @"
            onFocus={() => setfootertext("Just the bit after @")}
            value={twittertext}
            style={styles.textInput}
            onChangeText={(newText) => settwitterText(newText)}
          />
          <Image
            source={require("../images/TwitterLogo.png")}
            style={{ marginLeft: 15, width: 40, height: 40 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="YouTube Link, don't include 'https://'"
            onFocus={() =>
              setfootertext(
                "In YouTube App, click avatar in top right. Type the @ address under your name into here."
              )
            }
            value={youtubetext}
            style={styles.textInput}
            onChangeText={(newText) => setyoutubeText(newText)}
          />
          <Image
            source={require("../images/youtube.png")}
            style={{ marginLeft: 10, width: 40, height: 40 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Instagram"
            onFocus={() =>
              setfootertext(
                "In Instagram App, Click avatar in bottom right. Enter the name at the top of the screen in here."
              )
            }
            value={instagramtext}
            style={styles.textInput}
            onChangeText={(newText) => setinstagramText(newText)}
          />
          <Image
            source={require("../images/Instagram_icon.png")}
            style={{ marginLeft: 15, width: 40, height: 40 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Link to Your Blog, don't include 'http:'"
            onFocus={() =>
              setfootertext(
                'If you have a Blog, put a link to it here (do not include "http://", "https://", etc)'
              )
            }
            value={blogtext}
            style={styles.textInput}
            onChangeText={(newText) => setblogText(newText)}
          />
          <Image
            source={require("../images/blog.png")}
            style={{ marginLeft: 15, width: 40, height: 40 }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Links to any other Social Media, don't include 'http://'"
            value={othersocialmediatext}
            style={styles.textInput}
            onFocus={() =>
              setfootertext(
                'Put a link to any other Social Media Site here. The app will attempt to open it in a browser (do not include "http://", "https://", etc)'
              )
            }
            onChangeText={(newText) => setothersocialmediaText(newText)}
          />
        </View>
        <Text style={{ paddingLeft: 10, fontSize: 15, color: "purple" }}>
          A few things to help people find you.
        </Text>
        <TextInput
          placeholder="What Schools Did You Attend? (Sperate with a ';')"
          multiline
          numberOfLines={4}
          maxLength={400}
          onFocus={() =>
            setfootertext(
              'Any schools you attended, seperating them using ";". If you use "Name of First School" as a security question, consider if you want to include it here?'
            )
          }
          value={schoolstext}
          style={styles.textInput}
          onChangeText={(newText) => setschoolsText(newText)}
        />
        <TextInput
          placeholder="Where Have You Lived? (Sperate with a ';')"
          multiline
          numberOfLines={4}
          maxLength={400}
          onFocus={() =>
            setfootertext(
              'Anywhere you have lived, seperating them using ";". If you use "Place you Where Born" as a security question, consider if you want to include it here?'
            )
          }
          value={addresstext}
          style={styles.textInput}
          onChangeText={(newText) => setaddressText(newText)}
        />
        <TextInput
          placeholder="Where Have You Worked? (Sperate with a ';')"
          multiline
          numberOfLines={4}
          maxLength={400}
          onFocus={() =>
            setfootertext(
              'Anywhere you have worked, seperating them using ";".'
            )
          }
          value={worktext}
          style={styles.textInput}
          onChangeText={(newText) => setworkText(newText)}
        />
        <TextInput
          placeholder="Finally, Share Some of Your Favourite Web Sites? (Sperate with a ';', don't include 'http://')"
          multiline
          numberOfLines={4}
          maxLength={400}
          onFocus={() =>
            setfootertext(
              'To learn more about your interests, list some of your favourite websites (Max 5), seperating them using ";"  (do not include "http://", "https://", etc). Anything inappropriate will be removed.'
            )
          }
          value={webtext}
          style={styles.textInput}
          onChangeText={(newText) => setwebText(newText)}
        />
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
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
            onPress={() => handledeletion()}
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleregistration()}
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
      </ScrollView>
      <View
        backgroundColor={"#70F020"}
        style={{ flexGrow: 1, marginBottom: 10, marginLeft: 10 }}
      >
        <Text style={{ paddingLeft: 10, color: "#A020F0", fontSize: 16 }}>
          {footertext}
        </Text>
      </View>
    </View>
  );
};
export default AmendRegister;
