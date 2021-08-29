
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import InputText from '../../../components/molekuls/Input/InputText';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import SuccessModal from '../../../components/molekuls/Modals/SuccessModal';

const ModalPengajuanDana = (props) => {

    const [nominal, setNominal] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onConfirm = () => {
        // setLoading(true);
        setSuccess(true);
    }
    
    const closeSuccess = () => {
        props.closeModal();
        setSuccess(false);
    }

  return (
      <>
        <View style={styles.warningModal}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Pengajuan Dana</Text>
            <InputText
                label="Nominal"
                value={nominal}
                onChange={setNominal}
                type="numeric"
                currency={true}
            />
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
                <Text style={styles.buttonText}>Ajukan</Text>
            </TouchableOpacity>
            </View>
            
        </View>
        <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        />
        <SuccessModal
            visible={success}
            close={closeSuccess}
        />
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor:'white',
        flex:1
    },
    warningModal:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
    modalView: {
      width:wp(90),
      backgroundColor:'white',
      justifyContent:'center',
      borderRadius:wp(3),
      padding:wp(5)
    },
    modalText:{
        textAlign:'center',
        fontSize:wp(6),
        fontWeight:'bold',
        marginBottom:wp(8)
    },
    button:{
        backgroundColor:'#25aef0',
        height:wp(11),
        paddingHorizontal:wp(3),
        borderRadius:wp(2),
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp(5)
    },
    buttonText: {
        color:'white',
        fontSize:wp(4.6),
        fontWeight:'bold',
    },
    spinnerTextStyle: {
        color:'#fff'
    },
    success: {
        justifyContent:'center',
        alignItems:'center'
    },
});

export default ModalPengajuanDana;
