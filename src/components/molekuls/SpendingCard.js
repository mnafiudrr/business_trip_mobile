
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { color_card_background_biru, color_card_title_biru, color_card_background_merah, color_card_title_merah, color_text_secondary_title } from '../../utils/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

const SpendingCard = (props) => {
    let color = {
        title : color_card_title_biru,
        background : color_card_background_biru
    }

    if(props.tipe == 'Debit'){
        color.title = color_card_title_merah,
        color.background = color_card_background_merah
    }

  return (
        <View style={[styles.container, {backgroundColor:color.title}]}>
            <View style={[styles.content, {backgroundColor:color.background}]}>
                <View style={styles.left}>
                    <Text style={styles.date}>
                        <Moment format="DD MMM YYYY" element={Text}>
                                {props.date}
                        </Moment>
                    </Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.value}>
                        <NumberFormat 
                            value={props.value} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp '} 
                            renderText={formattedValue => <Text>{formattedValue}</Text>}
                        />
                    </Text>
                    <Text style={styles.description}>{props.description}</Text>
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:wp(90),
        marginBottom:wp(2),
        // backgroundColor:color_card_title_biru,
        borderRadius:wp(3),
        elevation:2,
        marginLeft:wp(-3)
    },
    content: {
        marginRight:wp(2),
        backgroundColor:'red',
        // backgroundColor:color_card_background_biru,
        flexDirection:'row',
        alignItems:'center',
        borderTopLeftRadius:wp(3),
        borderBottomLeftRadius:wp(3),
        padding:wp(1.5)
    },
    left:{
        width:wp(30),
        paddingLeft:wp(3)
    },
    date: {
        fontSize:wp(4)
    },
    value: {
        fontSize:wp(5),
        fontWeight:'bold'
    },
    description: {
        fontSize:wp(3.5),
        paddingBottom:wp(1),
        color:color_text_secondary_title
    }

});

export default SpendingCard;
