
import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const InputDisabled = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.label}</Text>
            <View style={styles.inputBox}>
                <Text style={styles.inputText}>{props.value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom:wp(3)
    }, 
    title: {
        fontSize:wp(4.5),
        fontWeight:'bold',
        paddingBottom:wp(1)
    },
    inputBox: {
        borderWidth:1,
        height:wp(11),
        paddingHorizontal:wp(3),
        borderRadius:wp(2),
        backgroundColor:'#e3e3e3',
        justifyContent:'center'
    },
    inputText: {
        fontSize:wp(3.8),
    }
});

export default InputDisabled;
