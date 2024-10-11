import { Image } from "react-native";

const Footer = () => {
  return (
    <Image
      source={require("../images/caul.jpg")}
      style={{
        marginTop: -8,
        marginLeft: 13,
        width: 347,
        height: 140,
        resizeMode: "contain",
      }}
    />
  );
};
export default Footer;
