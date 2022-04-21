
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Pressable
} from 'react-native';
import { COLOR_WHITE, color_background_putih, } from '../../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import AvatarList from './AvatarList';
import SpendingCard from './SpendingCard';
import { useNavigation } from '@react-navigation/native';


const SpendingList = (props) => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.Label}>Pengeluaran</Text>
                {
                    props.is_koor && props.is_active?
                    (
                    <Pressable onPress={() => navigation.navigate('AddPayment',{ id:props.id, nomor_spt:props.nomor_spt, delegasi: props.delegasi })}>
                        <Text style={styles.button}>+ Tambah</Text>
                    </Pressable>
                    ):null
                }
            </View>
            <View style={styles.spend}>
            {
                props.list.map((item,index) => {
                    return(
                        <SpendingCard
                            key={index}
                            tipe={item.tipe}
                            date={item.date}
                            value={item.nominal}
                            description={item.keterangan}
                        />
                    )
                })
            }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        // marginHorizontal:wp(5),
        // paddingTop:wp(5),
    },
    top: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    Label: {
        fontSize:wp(4.5),
        paddingBottom:wp(3),
        fontWeight:'bold',
    },
    spend: {
        flexDirection:'column-reverse',
        // marginTop:wp(2)
    },
    button: {
        fontSize:wp(3.8),
        paddingVertical:wp(1),
        paddingHorizontal:wp(3),
        marginBottom:wp(3),
        marginRight:wp(3),
        borderRadius:wp(3),
        fontWeight:'bold',
        backgroundColor:'#25aef0',
        color:'white',
        elevation:3,
    }
});

export default SpendingList;
