
import React, { useEffect } from 'react';
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
import { 
    color_card_background_biru, 
    color_card_title_biru, 
    color_card_description_biru,
    color_card_background_merah,
    color_card_title_merah,
    color_card_description_merah,
 } from '../../utils/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import {IP_ADDRESS} from '../../utils/api';
import Moment from 'react-moment';
import AvatarCard from '../atoms/AvatarCard';

const Card = (props) => {
    const navigation = useNavigation();

    const colorCustom = {
        title:color_card_title_merah,
        background:color_card_background_merah,
        description:color_card_description_merah,
        status:'Selesai'
    };

    if(props.status == 1){
        colorCustom.title=color_card_title_biru,
        colorCustom.background=color_card_background_biru,
        colorCustom.description=color_card_description_biru,
        colorCustom.status='Aktif'
    }

    const togglePress = () => {
        navigation.navigate('Detail', {
            spkId: props.id,
          });
    }

    const onLongPress = () => {
        console.log('long press')
    }

    return (
        <Pressable onPress={togglePress} onLongPress={onLongPress}>

            <View style={[styles.background, {backgroundColor:colorCustom.background}]}>
                <View style={styles.Box}>
                    <View style={styles.topLeft}>
                        <Text
                        style={[styles.title, {color:colorCustom.title}]}
                        >{props.title}</Text>
                        <Text
                        style={[styles.date, {color:colorCustom.description}]}
                        >
                        <Moment format="DD MMM 'YY" element={Text}>
                            {props.arr}
                        </Moment> - <Moment format="DD MMM 'YY" element={Text}>
                            {props.arr}
                        </Moment>  
                        </Text>
                    </View>
                    <View style={styles.botLeft}>
                        {props.avatar.map((item,index) => {
                            return(
                                <AvatarCard
                                    key={index} 
                                    url={IP_ADDRESS+item.image}
                                />
                            )
                        }
                        )}
                    </View>
                </View>
                <View style={styles.right}>
                    <View style={styles.topRight}>
                        <Text
                        style={[styles.status, {color:colorCustom.description}]}
                        >{colorCustom.status}</Text>
                    </View>
                    <View style={styles.botRight}>
                        <Text
                        style={[styles.currency, {color:colorCustom.description}]}
                        >Rp {props.currency}</Text>
                    </View>
                </View>
            </View>
        
        </Pressable>
    );
};

const styles = StyleSheet.create({
    background: {
        justifyContent:'center',
        alignItems:'center',
        width:wp(90),
        height:wp(40),
        backgroundColor:color_card_background_biru,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:wp(5),
        marginBottom:wp(5),
        elevation:8
    },
    Box: {
        height:wp(40),
        flexDirection:'column',
        justifyContent:'space-between',
        paddingVertical:wp(3),
        paddingHorizontal:wp(3)
    },
    right: {
        height:wp(40),
        flexDirection:'column',
        justifyContent:'space-between',
        paddingVertical:wp(3),
        paddingHorizontal:wp(3),
        alignItems:'flex-end'
    },
    botLeft: {
        flexDirection:'row',
        marginLeft:wp(3)
    },
    title: {
      fontSize:wp(5),
      fontWeight:'bold',
      color: color_card_title_biru
    },
    oval: {
        backgroundColor:'#25aef0',
        width:wp(10),
        height:wp(10),
        borderRadius:wp(10),
        marginLeft:wp(-3),
    },
    date: {
        color: color_card_description_biru,
        fontSize:wp(3.8)
    },
    status: {
        color: color_card_description_biru,
        fontSize:wp(3.8)
    },
    currency: {
        color: color_card_description_biru,
        fontSize:wp(3.8),
        marginBottom:wp(2.5)
    },
});

export default Card;
