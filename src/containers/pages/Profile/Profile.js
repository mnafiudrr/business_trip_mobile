
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  Pressable
} from 'react-native';
import { LoginContext } from "../../../contexts/LoginContext";
import { COLOR_WHITE, color_background_putih,  color_header_background_putih } from '../../../utils/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../../components/molekuls/Header';
import Card from '../../../components/molekuls/Card';
import TopProfile from '../../../components/molekuls/TopProfile';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_USER, URL_LOGOUT, IP_ADDRESS} from '../../../utils/api';
import { useIsFocused } from '@react-navigation/native';

const Profile = ({navigation}) => {

  const {tokenUser, dataUser, setDataUser,} = useContext(LoginContext);

  const isFocused = useIsFocused();

  const [token, setToken] = useState();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(isFocused){
      setLoading(true);
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_user')
      if(value !== null) {
        setToken(value);
        userRequest(value);
      }else{
        console.log('kosong');
      }
    } catch(e) {
      console.log(e);
    }
  }

  const userRequest = (value) => {
    axios({
      method: 'get',
      url: URL_USER,
      headers: {
        'Authorization': 'Bearer '+value,
      },
    })
    .then(function (response) {
      setData(response.data.data);
      setDataUser(response.data.data);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
  }

  const toggleLogout = () => {
    Alert.alert("Perjaldin", "Anda yakin ingin keluar akun?", [
      {
        text: "Batal",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Ok", onPress: () => logoutRequest() }
      // { text: "Ok", onPress: () => navigation.closeApp() }
    ]);
  }

  const logoutRequest = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: URL_LOGOUT,
      headers: {
        'Authorization': 'Bearer '+token,
      },
    })
    .then(function (response) {
      setLoading(false)
      removeToken().then(() => setDataUser(undefined));
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      setDataUser(undefined);
    });
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.setItem('@login', 'SIGN_OUT')
    } catch (e) {
      console.log(e)
    }
  }

    return (
    <View style={styles.background}>
      <Header title="Profile"/>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.Content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <TopProfile 
              image={IP_ADDRESS+''+data.image} 
              name={data.nama}
              email={data.email}
              />
            <View style={styles.border}/>
            <View style={styles.setting}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Setting</Text>
              </View>
              {/* <View style={styles.settingMenu}>
                <Image 
                  source={require('../../../assets/icons/synchronize.png')}
                  style={styles.icon}
                />
                <Text style={styles.settingLabel}>Change Password</Text>
              </View> */}
              <Pressable style={styles.settingMenu} onPress={toggleLogout}>
                <Image 
                  source={require('../../../assets/icons/exit.png')}
                  style={styles.icon}
                />
                <Text style={styles.settingLabel}>Logout</Text>
              </Pressable>
            </View>
          </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
        // backgroundColor:color_header_background_putih,
        backgroundColor:color_background_putih,
        flex:1,
        alignItems:'center',
    },
    Content: {
        backgroundColor:color_background_putih,
        flex:1,
        width:wp(100),
        borderTopLeftRadius:wp(10),
        borderTopRightRadius:wp(10),
    },
    border: {
      width:wp(100),
      borderBottomWidth:1,
      borderBottomColor:'#c4c4c4',
      marginVertical:wp(3.5)
    },
    setting: {
      width:wp(100),
      paddingHorizontal:wp(2),
    },
    header: {
    },
    headerText: {
      fontSize:wp(6),
      fontWeight:'bold'
    },
    settingMenu: {
      flexDirection:'row',
      alignItems:'center',
      paddingVertical:wp(3)
    },
    icon: {
      width:wp(7),
      height:wp(7),
      marginHorizontal:wp(3)
    },
    settingLabel: {
      fontSize:wp(4),
      fontWeight:'bold'
    }
});

export default Profile;
