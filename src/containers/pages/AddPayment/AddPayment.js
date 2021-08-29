
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Image
} from 'react-native';
import { COLOR_WHITE, color_background_putih,  color_header_background_putih } from '../../../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LoginContext } from "../../../contexts/LoginContext";
import Header from '../../../components/molekuls/Header';
import {BACK_BUTTON} from '../../../utils/backHandler';
import {URL_SHOW, URL_DANA_OUT} from '../../../utils/api';
import Spinner from 'react-native-loading-spinner-overlay';
import InputDisabled from '../../../components/molekuls/Input/InputDisabled';
import axios from 'axios';
import InputText from '../../../components/molekuls/Input/InputText';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';

const AddPayment = ({route, navigation}) => {
  const back = BACK_BUTTON("back");
  const { id, nomor_spt } = route.params;
  const { dataUser, tokenUser } = useContext(LoginContext);

  const [isLoading, setLoading] = useState(false);
  const [nominal, setNominal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState();

  const [gambarTerisi, setGambarTerisi] = useState(false);
  const [uriGambar, setUriGambar] = useState();

  const togglePicker = async () => {
    console.log('pick');try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri
      );
      if(res.size < 2000000){
        setGambarTerisi(true)
        setFile(res);
        setUriGambar(res.uri)
      }else{
        console.log('kegedean');
        Toast.show('Ukuran file terlalu besar', Toast.LONG);
      }
    } catch (err) {
      setGambarTerisi(false)
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const toggleUpload = () => {
    if(nominal && deskripsi && gambarTerisi){
      console.log(id);
      let data = new FormData();
      data.append('id', id);
      data.append('nominal', nominal);
      data.append('keterangan', deskripsi);
      data.append('bukti', file);
      console.log(data);
      setLoading(true)
      axios({
        method: 'post',
        url: URL_DANA_OUT,
        headers: {
          'Authorization': 'Bearer '+tokenUser,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      })
      .then(function (response) {
        console.log(response);
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error.response.data);
      });
    }else{
      console.log('data belum lengkap')
      Toast.show('Data belum lengkap', Toast.LONG);
    }
    
  }

  return (
    <View style={styles.background}>
        <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
        <Header title="Add New Payment Slip"/>
        <ScrollView 
        style={styles.Content}
        showsVerticalScrollIndicator={false}
        >
            <InputDisabled
                label="No SPT"
                value={nomor_spt}
            />
            <InputText
                label="Nominal"
                value={nominal}
                onChange={setNominal}
                type="numeric"
                currency={true}
            />
            <InputText
                label="Deskripsi"
                value={deskripsi}
                onChange={setDeskripsi}
            />
            <Pressable onPress={togglePicker}>
              <View style={styles.upload}>
                {
                  gambarTerisi?
                  
                    <Image
                    style={styles.gambarSample}
                    source={{
                      uri:uriGambar
                    }}
                  />
                  :(
                    <>
                      <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/icons/image-gallery.png')}
                      />
                      <Text>
                        Pick Slip
                      </Text>
                    </>
                  )
                }
              </View>
            </Pressable>
            <Pressable onPress={toggleUpload}>
              <View style={styles.addButton}>
                <Text style={styles.buttonText}>
                  Add
                </Text>
              </View>
            </Pressable>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
        // backgroundColor:color_header_background_putih,
        backgroundColor:color_background_putih,
        flex:1,
        alignItems:'center',
    },
    Content: {
        backgroundColor:color_background_putih,
        // backgroundColor:'red',
        flex:1,
        width:wp(100),
        paddingHorizontal:wp(5),
    },
    upload: {
      width:wp(90),
      height:wp(90),
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:wp(5),
      borderRadius:wp(3),
    },
    addButton: {
      width:wp(90),
      height:wp(15),
      borderRadius:wp(3),
      justifyContent:'center',
      alignItems:'center',
      marginBottom:wp(5),
      backgroundColor:'green',
      elevation:3
    },
    tinyLogo: {
      width:wp(7),
      height:wp(7)
    },
    buttonText: {
      color:'white',
      fontWeight:'bold',
      fontSize:wp(4)
    },
    gambarSample: {
      width:wp(90),
      height:wp(90),
      borderRadius:wp(3),
    }
});

export default AddPayment;
