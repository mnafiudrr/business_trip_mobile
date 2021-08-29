
import React, { useEffect } from 'react';
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

const Header = (props) => {
  return (
    <View style={styles.component}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.background}>
        <Text
          style={styles.title}
        >{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    component:{
        // marginTop: StatusBar.currentHeight,
    },
    background: {
        justifyContent:'center',
        alignItems:'center',
        marginTop: StatusBar.currentHeight+10,
        marginBottom: StatusBar.currentHeight,
        width:wp(80)
    },
    title: {
      fontSize:wp(6.5),
      fontWeight:'bold',
    },
});

export default Header;
