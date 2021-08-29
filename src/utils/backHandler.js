import React, { useState, useEffect } from 'react';
import {
  BackHandler,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BACK_BUTTON = (props) => {
    const navigation = useNavigation(); 

    
    var app = {
    backButtonDialog: props
    };

    useEffect(() => {
        const backAction = () => {
          if(app.backButtonDialog == "logout"){
            Alert.alert("Perjaldin", "Anda yakin ingin keluar akun?", [
              {
                text: "Batal",
                onPress: () => null,
                style: "cancel"
              },
              // { text: "Ok", onPress: () => BackHandler.exitApp() }
              { text: "Ok", onPress: () => navigation.navigate('Login') }
            ]);
            return true;
          }else if(app.backButtonDialog == "close app"){
            Alert.alert("Perjaldin", "Anda yakin ingin keluar aplikasi?", [
              {
                text: "Batal",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Ok", onPress: () => BackHandler.exitApp() }
              // { text: "Ok", onPress: () => navigation.closeApp() }
            ]);
            return true;
          }else if(app.backButtonDialog == "back to login"){
            Alert.alert("Bank Kaltimtara", "Anda yakin ingin keluar dari pendaftaran?", [
              {
                text: "Batal",
                onPress: () => null,
                style: "cancel"
              },
              // { text: "Ok", onPress: () => BackHandler.exitApp() }
              { text: "Ok", onPress: () => navigation.goBack() }
            ]);
            return true;
          }else{
            navigation.goBack();
            return true;
          }
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
} 