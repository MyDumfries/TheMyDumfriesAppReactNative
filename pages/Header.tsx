import { Image, View, Text, TouchableOpacity } from "react-native";
import Buttons from "../pages/Buttons";

const Header = (title, buttons, caller, onShow, navigation) => {
  if (title.buttons) buttons = title.buttons;
  if (title.caller) caller = title.caller;
  if (title.navigation) navigation = title.navigation;
  if (title.onShow) onShow = title.onShow;
  if (title.onShowDropDown) onShowDropDown = title.onShowDropDown;
  if (title.title) title = title.title;
  const titlelength = title.length;
  let titleFontSize = 35;
  if (titlelength > 12) titleFontSize = 32;
  if (titlelength > 14) titleFontSize = 25;
  let login = false;
  let sort = false;
  let search = false;
  let help = false;
  if (global.loggedinid == -1) {
    login = true;
  }
  if (buttons.includes("Login")) {
    login = false;
  }
  if (buttons.includes("Sort")) {
    sort = true;
  }
  if (buttons.includes("Search")) {
    search = true;
  }
  if (buttons.includes("Help")) {
    help = true;
  }
  return (
    <View style={{ flexDirection: "row", backgroundColor: "#FDFD96" }}>
      <Image
        source={require("../images/burnsstatue.png")}
        style={{ height: 120, resizeMode: "contain" }}
      />
      <View>
        <View style={{ flexDirection: "row", backgroundColor: "#FDFD96" }}>
          {login ? (
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
              <Image
                source={require("../images/login.jpg")}
                style={{ marginLeft: 1, height: 30, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ) : (
            <Text>{global.loggedinfirstname}</Text>
          )}
          {sort ? (
            <TouchableOpacity onPress={onShowDropDown}>
              <Image
                source={require("../images/sort.png")}
                style={{ marginLeft: 10, height: 30, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ) : (
            <Text> </Text>
          )}
          {search ? (
            <TouchableOpacity onPress={onShow}>
              <Image
                source={require("../images/search.png")}
                style={{ marginLeft: 10, height: 30, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ) : (
            <Text> </Text>
          )}
          {help ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(caller + " Help")}
            >
              <Image
                source={require("../images/help.png")}
                style={{ marginLeft: 10, height: 30, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ) : (
            <Text> </Text>
          )}
        </View>
        <Text
          style={{
            color: "#A020F0",
            fontSize: 38,
            display: "flex",
            alignSelf: "center",
          }}
        >
          MyDumfries
        </Text>
        <Text
          style={{
            color: "#70F020",
            fontSize: titleFontSize,
            display: "flex",
            alignSelf: "center",
          }}
        >
          {title}
        </Text>
      </View>
      <Image
        source={require("../images/midsteeple.png")}
        style={{ paddingRight: 20, height: 120, resizeMode: "contain" }}
      />
    </View>
  );
};

export default Header;
