
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LoginContext } from '../../contexts/LoginContext';
import {
  SplashScreen,
  Login,
  Dashboard,
  History,
  Detail,
  Profile,
  AddPayment,
} from '../../containers/pages/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const Dummy = () => {
  return (
    <Text>Anyeong</Text>
  )
}

const IconBottom = (props) => {
  const { color, focused } = props.data
  let colorSelected = focused ? color : 'grey'
  return (
      <View>
          <Image source={props.image} 
          style={{  
            tintColor: colorSelected, 
            width: wp(7),
            height: wp(7), 
            marginBottom: wp(-2)}} />
      </View>
  )
}

const MainTab = createBottomTabNavigator();

const MainView = () => {
  return(
    <MainTab.Navigator
    initialRouteName="Homescreen"
    tabBarPosition="bottom"
    swipeEnabled={true}
    tabBarOptions={{
      activeTintColor: '#25aef0',
      inactiveTintColor: 'grey',
      activeBackgroundColor: '#ffffff',
      inactiveBackgroundColor: '#ffffff',
      showLabel: false,
      style:{
        height: wp(13),
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:wp(2),
        // backgroundColor:'red'
      },
    }}
    >
      <MainTab.Screen name="Homescreen" component={Dashboard} 
        options={{
          tabBarIcon: (props) => (
              <IconBottom data={props} 
              image={require('../../assets/icons/home2.png')}
              text="Homescreen"
               />
          ),
          tabBarLabel: 'Home'
      }}/>
      <MainTab.Screen name="History" component={History} 
        options={{
          tabBarIcon: (props) => (
              <IconBottom data={props} 
              image={require('../../assets/icons/list2.png')}
              text="Homescreen"
               />
          ),
      }}/>
      <MainTab.Screen name="User" component={Profile} 
        options={{
          tabBarIcon: (props) => (
              <IconBottom data={props} 
              image={require('../../assets/icons/user.png')}
              text="Homescreen"
               />
          ),
      }}/>
    </MainTab.Navigator>
  )
}


const Utama = createStackNavigator();

const Router = () => {

  const [tokenUser, setTokenUser] = useState();
  const [dataUser, setDataUser] = useState();
  const [loadingScreen, setLoadingScreen] = useState(true);

  return (
    <LoginContext.Provider value={{ tokenUser, setTokenUser, dataUser, setDataUser, setLoadingScreen }}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        <Utama.Navigator      
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false
          }}>
          {
            loadingScreen?(
              <Utama.Screen name="SplashScreen" component={SplashScreen} />
            ):(
             dataUser?(
              <>
               <Utama.Screen name="MainView" component={MainView} />
               <Utama.Screen name="Detail" component={Detail} />
               <Utama.Screen name="AddPayment" component={AddPayment} />
              </>
              ):(
               <Utama.Screen name="Login" component={Login} />
              )
            )
          }
        </Utama.Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  );
};

export default Router;
