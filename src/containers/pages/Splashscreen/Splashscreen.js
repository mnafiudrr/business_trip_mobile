
import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { LoginContext } from '../../../contexts/LoginContext';
import { COLOR_WHITE, color_background_putih } from '../../../utils/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_USER} from '../../../utils/api';
import axios from 'axios';

const SplashScreen = ({navigation}) => {

  const {tokenUser, setDataUser, setLoadingScreen, setTokenUser} = useContext(LoginContext);

  useEffect(() => {
      setTimeout(() => {
        ubahJudul();
        setTimeout(() => {
          getData();
        }, 2000);
      }, 2000);
    }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_user');
      const login = await AsyncStorage.getItem('@login');
      if(login !== null && login == 'SIGN_IN') {
        setTokenUser(value);
        axios({
          method: 'get',
          url: URL_USER,
          headers: {
            'Authorization': 'Bearer '+value,
          },
        })
        .then(function (response) {
          setDataUser(response.data.data);
          setLoadingScreen(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoadingScreen(false);
        });
      }else{
        setTokenUser(value);
        setLoadingScreen(false);
      }
    } catch(e) {
      console.log(e);
    }
  }

  const [title, setTitle] = useState('SELAMAT DATANG');

  const ubahJudul = () => {
    setTitle('PERJALDIN')
  }
  return (
    <View style={styles.background}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.background}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logos/logo-app.png')}/>
        <Text
          style={styles.title}
        >{title}</Text>
      </View>
      <Text
        style={styles.info}
      >Lawang Sewu Teknologi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor:color_background_putih,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    logo: {
      width:wp(40),
      height:wp(40),
      marginBottom:wp(0)
    },
    title: {
      fontSize:wp(7),
      fontWeight:'bold',
    },
    info: {
      padding:wp(3),
      fontSize: wp(3)
    }
});

export default SplashScreen;
