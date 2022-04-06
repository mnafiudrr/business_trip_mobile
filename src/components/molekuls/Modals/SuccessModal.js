import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SuccessModal = (props) => {
    return (
        <Modal isVisible={props.visible}
          onBackButtonPress={props.close}
          onBackdropPress={props.close}
        >
            <Pressable style={styles.success} onPress={props.close}>
                <Image source={require('../../../assets/icons/checked.png')} style={styles.icon} />
                <Text style={styles.Text}>Berhasil</Text>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    success: {
        justifyContent:'center',
        alignItems:'center'
    },
    icon: {
        width:wp(50),
        height:wp(50)
    },
    Text: {
        fontSize:wp(10),
        fontWeight:'bold',
        color:'#00bde4'
    }
});

export default SuccessModal;