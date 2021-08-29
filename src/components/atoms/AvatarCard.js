
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

const AvatarCard = (props) => {

  const [image, setImage] = useState({uri: props.url});

  const error = () => {
    setImage(require('../../assets/images/avatar.jpg'))
  }

  return (
    <Image 
        style={styles.avatar} 
        source={image}
        onError={error}
        /> 
  );
};

const styles = StyleSheet.create({
    container: {
    },
    avatar: {
        backgroundColor:'#25aef0',
        width:wp(10),
        height:wp(10),
        borderRadius:wp(10),
        marginLeft:wp(-3),
    },
});

export default AvatarCard;
