import React, { useState, useEffect, useContext } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../../components/molekuls/Header';
import { BACK_BUTTON } from '../../../utils/backHandler';
import { color_background_abu_pekat, color_background_putih } from '../../../utils/colors';
import { toCurrency } from '../../../utils/currency';
import DocumentPicker from 'react-native-document-picker';
import { LoginContext } from '../../../contexts/LoginContext';
import { URL_PENGEMBALIAN_DANA } from '../../../utils/api';
import axios from 'axios';

const RefundForm = ({route, navigation}) => {
  const back = BACK_BUTTON("back");
  const { route_data } = route.params;
  const { tokenUser } = useContext(LoginContext);

  const [isLoading, setLoading] = useState(false);

  // Image Picker
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

  const toggleUpload = async () => {
    try {
      setLoading(true);

      let data = new FormData();
      data.append('id', route_data.id);
      data.append('bukti_transaksi', file);
        
      const promise = await axios({
        method: 'post',
        url: URL_PENGEMBALIAN_DANA,
        headers: {
          'Authorization': 'Bearer '+tokenUser,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      });

      setLoading(false);
      navigation.navigate('Detail');
      
    } catch (error) {
      
      setLoading(false);
      console.log(error);

    }
  }

  return (
    <View style={styles.background}>
      <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
      />
      <Header title="Pengembalian Dana"/>

      <ScrollView
        style={styles.Content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View>
            <Text style={{fontSize:wp(3.4)}}>
              Sisa dana dari SPT no {route_data.nomor_spt} sebesar {toCurrency(route_data.saldo)} perlu dikirimkan ke perusahaan
            </Text>
          </View>
        </View>

        <Pressable onPress={togglePicker}>
          <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
            Bukti Transaksi
          </Text>
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
                    Unggah
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
  )

}


const styles = StyleSheet.create({
  background: {
    backgroundColor:color_background_abu_pekat,
    flex:1,
    alignItems:'center',
  },
  card: {
    backgroundColor:color_background_putih,
    paddingHorizontal:wp(3),
    paddingVertical:wp(4),
    borderRadius:wp(2),
    elevation:8,
    marginTop:wp(2),
    marginBottom:wp(3),
    marginHorizontal:wp(2),
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

export default RefundForm;