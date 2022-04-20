
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';

const InputText = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.label}</Text>
            <View style={styles.inputBox}>
                {
                    props.currency?
                    (
                        <NumberFormat 
                            value={props.value} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'Rp '} 
                            renderText={
                                formattedValue => 
                                <TextInput 
                                    style={styles.inputText}
                                    value={formattedValue}
                                    onChangeText={value => props.onChange(value.replace(/Rp |,/g,''))}
                                    keyboardType={props.type}
                                />
                            }
                        />
                    )
                    :
                    (
                        <TextInput 
                            style={[styles.inputText, props.multiline ? null : {height:wp(11)}]}
                            value={props.value}
                            onChangeText={value => props.onChange(value)}
                            keyboardType={props.type}
                            editable={!props.readonly}
                            multiline={props.multiline}
                            numberOfLines={props.numberOfLines ?? 1}
                        />
                    )
                
                }
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
    },
    inputText: {
        borderWidth:1,
        paddingHorizontal:wp(3),
        borderRadius:wp(2),
        fontSize:wp(4),
        color: 'black',
    }
});

export default InputText;
