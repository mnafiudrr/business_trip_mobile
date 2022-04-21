
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import SuccessModal from '../../../components/molekuls/Modals/SuccessModal';
import axios from 'axios';
import { LoginContext } from '../../../contexts/LoginContext';
import { URL_REQUEST_DANA, URL_SPT_SELESAI } from '../../../utils/api';

const ModalSelesaiDinas = (props) => {

    const { tokenUser } = useContext(LoginContext);
    const [data, setData] = useState({
        id: props.id,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onConfirm = async () => {
        setLoading(true);
        try {
            
            const promise = await axios({
                method: 'post',
                url: URL_SPT_SELESAI,
                headers: {
                'Authorization': 'Bearer '+tokenUser,
                },
                data,
            });

            setLoading(false);
            setSuccess(true);
            
          } catch (error) {
          setLoading(false);
          console.log('======== ERROR =======');
          console.log(error.response.data);
          console.log(data);
        }
    }
    
    const closeSuccess = () => {
        props.closeModal();
        setSuccess(false);
    }

  return (
      <>
        <View style={styles.warningModal}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Yakin untuk menyelesaikan dinas?</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <TouchableOpacity style={styles.buttonCancel} onPress={onConfirm}>
                  <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onConfirm}>
                  <Text style={styles.buttonText}>Selesai</Text>
              </TouchableOpacity>
            </View>
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
        width:wp(38),
        paddingHorizontal:wp(3),
        borderRadius:wp(2),
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp(5),
    },
    buttonCancel:{
        backgroundColor:'#c4c4c4',
        height:wp(11),
        width:wp(38),
        paddingHorizontal:wp(3),
        borderRadius:wp(2),
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp(5),
    },
    buttonText: {
        color:'white',
        fontSize:wp(4.6),
        fontWeight:'bold',
    },
    buttonTextCancel: {
        color:'black',
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

export default ModalSelesaiDinas;
