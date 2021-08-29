
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
import AvatarList from './AvatarList';
import {IP_ADDRESS} from '../../utils/api';


const DelegationList = (props) => {
  return (
      <View style={styles.container}>
        <View>
            <Text style={styles.Label}>Delegations</Text>
        </View>
        {
            props.list.map((item,index) => {
                return(
                    <AvatarList 
                        key={index}
                        avatar={IP_ADDRESS+""+item.image}
                        name={item.pegawai} 
                        koordinator={item.koordinator}
                    />
                )
            })
        }
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        // marginHorizontal:wp(5),
        // paddingTop:wp(5)
    },
    Label: {
        fontSize:wp(4.5),
        paddingBottom:wp(3),
        fontWeight:'bold'
    }
});

export default DelegationList;
