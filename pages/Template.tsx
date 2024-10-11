import React, { useState } from "react";
import {
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from '../pages/Footer';
import Header from '../pages/Header';
import styles from '../pages/styles';

const ** = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropDownVisible, setDropDownVisible] = useState(false);
  return (
    <View backgroundColor={'#FDFD96'} style={{margin : 2, paddingTop : 10,paddingRight : 20, borderWidth: 5,borderTopLeftRadius: 20,borderTopRightRadius: 20,borderBottomLeftRadius: 20,borderBottomRightRadius: 20,}}>
        <Header
           title = "**"
           buttons = ""
           caller = '**'
           navigation = {navigation}
           onShow={() => setModalVisible(true)}
           onShowDropDown={() => setDropDownVisible(true)}
        />

        {Footer()}
    </View>
  );
};

export default **;