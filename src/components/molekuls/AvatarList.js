
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
import Avatar from '../atoms/Avatar';

const AvatarList = (props) => {
  return (
        <View style={styles.container}>
            <Avatar url={props.avatar}/>
            <View>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.koordinator}>{props.koordinator?'Koordinator':''}</Text>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        paddingLeft:wp(3),
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:wp(2)
    },
    name: {
        fontSize:wp(4.5),
        paddingLeft:wp(3),
        fontWeight:'bold'
    },
    koordinator: {
        fontSize:wp(3),
        paddingLeft:wp(3),
    },
});

export default AvatarList;
