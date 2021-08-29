
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

const Avatar = (props) => {

  const [image, setImage] = useState({uri: props.url});

  const error = () => {
    setImage(require('../../assets/images/avatar.jpg'))
  }

  return (
      <View style={styles.container}>
          <Image 
            source={image}
            style={styles.avatar}
            onError={error}
          />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
    },
    avatar: {
      backgroundColor:'#25aef0',
        width:wp(16),
        height:wp(16) ,
        borderRadius:wp(16)
    },
});

export default Avatar;
