
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { color_header_background_putih, color_background_putih, color_logo_ungu } from '../../../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {BACK_BUTTON} from '../../../utils/backHandler'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import { LoginContext } from "../../../contexts/LoginContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_LOGIN} from '../../../utils/api';


const Login = ({navigation}) => {

  const {setTokenUser, setDataUser} = useContext(LoginContext);
  const back = BACK_BUTTON("close app");

  const [titleText, setTitleText] = useState('PERJALDIN');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setLoading] = useState(false);

  const ref_password = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token_user')
      if(value !== null) {
        console.log(value)
      }else{
        console.log('kosong')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@token_user', value)
      await AsyncStorage.setItem('@login', 'SIGN_IN')
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@username', value)
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  }

  const toggleLogin = () => {
    setLoading(true);
    if (username === "") {
      Toast.show('Username belum di isi!', Toast.LONG);
    } else if (password === "") {
      Toast.show('Password belum di isi!', Toast.LONG);
    } else {
      axios({
        method: 'post',
        url: URL_LOGIN,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: username,
          password: password
        }
      })
      .then(function (response) {
        console.log(response.data.meta.token);
        console.log(response.data.data);
        setLoading(false);
        storeToken(response.data.meta.token);
        setTokenUser(response.data.meta.token);
        storeData(response.data.data.username);
        setDataUser(response.data.data);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainView' }],
        });
        // navigation.navigate('MainView');
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        Toast.show('Username atau Password Anda salah!', Toast.LONG);
      });
    }
  }
  
  return (
    <View style={styles.background}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.backgroundCenter}>
      
        <View style={styles.contentArea}>
          <View style={styles.logoBackground}>
            <Image
              style={styles.logo}
              source={require('../../../assets/logos/logo-blue.png')}/>
          </View>
          <Text
            style={styles.title}
          >{titleText}</Text>

        <View style={styles.inputArea}>
          <View style={styles.inputComponent}>
            <Text style={styles.labelInput}>Email</Text>
            <View
                style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                placeholder="User ID"
                value={username}
                onChangeText={(value) => setUsername(value)}
                returnKeyType="next"
                onSubmitEditing={() => ref_password.current.focus()}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.inputComponent}>
            <Text style={styles.labelInput}>Password</Text>
            <View
                style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                ref={ref_password}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onSubmitEditing={toggleLogin}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={toggleLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
      backgroundColor:color_background_putih,
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#25aef0',
  },
  backgroundCenter: {
      backgroundColor:color_background_putih,
      // backgroundColor:'#25aef0',
      flex:1,
      width:wp(100),
      borderTopLeftRadius:wp(10),
      borderTopRightRadius:wp(10),
      marginTop:wp(25)
  },
  contentArea: {
    alignItems:'center',
    marginTop:wp(-12),
    flex:1
  },
  logoBackground:{
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:color_header_background_putih,
    backgroundColor:color_background_putih,
    width:wp(30),
    height:wp(30),
    borderRadius:wp(30),
    elevation: 3,
  },
  logo: {
    width:wp(20),
    height:wp(20),
    marginBottom:wp(0)
  },
  title: {
    fontSize:wp(6),
    fontWeight:'bold',
  },
  info: {
    padding:wp(3),
    fontSize: wp(3)
  },
  inputArea: {
    // backgroundColor:'red',
    flex:1,
    marginTop:wp(10)
    // justifyContent:'center'

  },
  inputComponent: {
    alignItems:'flex-start',
    marginTop:wp(5)
  },
  labelInput: {
    fontSize:wp(4),
    marginBottom:wp(1)
  },
  textInputView: {
    width:wp(70),
    fontSize:wp(4.5),
    borderRadius:wp(3),
    backgroundColor:color_background_putih,
    elevation:3,
  },
  textInput: {
    width:wp(70),
    fontSize:wp(4.5),
    paddingHorizontal:wp(3),
    borderRadius:wp(3),
  },
  button: {
    backgroundColor:"#25aef0",
    height:wp(12),
    width:wp(70),
    borderRadius:wp(3),
    justifyContent:'center',
    alignItems:'center',
    marginTop:wp(12),
    elevation:3,
  },
  buttonText: {
    color:color_background_putih,
  },
  spinnerTextStyle: {
    color:'white'
  }
});

export default Login;
