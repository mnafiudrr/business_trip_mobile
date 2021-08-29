
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { COLOR_WHITE, color_background_putih, } from '../../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const TopProfile = (props) => {

  const [image, setImage] = useState({uri: props.image});

  const error = () => {
    setImage(require('../../assets/images/avatar.jpg'))
  }

  return (
    <View style={styles.info}>
      <Image 
        source={image}
        style={styles.avatar}
        onError={error}
      />
      <View style={styles.text}>
        <Text style={styles.name}>
          {props.name}
        </Text>
        <Text style={styles.email}>
          {props.email}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    info: {
      flexDirection:'row',
      alignItems:'center',
    },
    avatar: {
      width: wp(25),
      height: wp(25),
      borderRadius: wp(5),
      marginHorizontal:wp(3),
    },
    text: {
      marginHorizontal:wp(2),
    },
    name: {
      fontSize:wp(5),
      fontWeight:'bold',
    },
    email: {
      fontSize: wp(3.7),
      color:'grey'
    }
});

export default TopProfile;
