
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
import {URL_DANA_OUT, URL_TRANSACTION_OUT} from '../../../utils/api';
import Spinner from 'react-native-loading-spinner-overlay';
import InputDisabled from '../../../components/molekuls/Input/InputDisabled';
import axios from 'axios';
import InputText from '../../../components/molekuls/Input/InputText';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import SelectModal from '../../../components/molekuls/Modals/SelectModal';
import useAddPayment from './useAddPayment';

const jenis_pengeluaran = [
  {
    label: 'Penginapan',
    value: 1,
  },
  {
    label: 'Transportasi',
    value: 2,
  },
  {
    label: 'Uang Saku',
    value: 3,
  },
  {
    label: 'Lainnya',
    value: 4,
  }
]

const basePenginapan = {
  nama:'',
  no_kamar: '',
  nominal: null,
  malam: 1,
  ket: '',
  total: null,
  karyawan: [],
}

const AddPayment = ({route, navigation}) => {
  const back = BACK_BUTTON("back");

  // Custom Hooks
  
  // Data Utama
  const { id, nomor_spt } = route.params;
  const { dataUser, tokenUser } = useContext(LoginContext);
  const { transaksiLainnya } = useAddPayment(URL_TRANSACTION_OUT, id, tokenUser);
  const [dataTransaksi, setDataTransaksi] = useState({
    spt_id : id,
    nominal : '',
    keterangan : '',
    bukti : null,
    jenis_pengeluaran_id: 4,
    jumlah_penginapan: 1,
  });

  // Data Penginapan
  const [penginapan, setPenginapan] = useState([basePenginapan]);
  useEffect(() => {

    let jml = dataTransaksi.jumlah_penginapan;
    if(!jml || jml < 1){
      setDataTransaksi(1);
      jml = 1;
    }
    let penginapan_temp = [];
    for(let i = 0; i < dataTransaksi.jumlah_penginapan; i++){
      penginapan_temp.push(basePenginapan);
    }
    setPenginapan(penginapan_temp);
    console.log(dataTransaksi.jumlah_penginapan);
  }, [dataTransaksi.jumlah_penginapan]);

  // Loading
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

  const toggleUpload = async() => {
    if(dataTransaksi.nominal && dataTransaksi.keterangan && gambarTerisi){
      if(dataTransaksi.jenis_pengeluaran_id == 4){
        const response = await transaksiLainnya(dataTransaksi, file);
        setLoading(false)
        if(!response){
          console.log(error.response.data);
          Toast.show('Unggah Gagal', Toast.LONG);
        }else{
          Toast.show('Unggah Berhasil', Toast.LONG);
          navigation.navigate('Detail');
        }
      }
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
        <Header title="Tambah Transaksi Keluar"/>
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
                value={dataTransaksi.nominal}
                onChange={(value) => setDataTransaksi({...dataTransaksi, nominal: value})}
                type="numeric"
                currency={true}
            />
            <InputText
                label="Deskripsi"
                value={dataTransaksi.keterangan}
                onChange={(value) => setDataTransaksi({...dataTransaksi, keterangan: value})}
            />
            <SelectModal 
              value={dataTransaksi.jenis_pengeluaran_id}
              onSelect={(value) => setDataTransaksi({...dataTransaksi, jenis_pengeluaran_id: value})}
              label={'Jenis Pengeluaran'}
              lists={jenis_pengeluaran}
            />
            {
              dataTransaksi.jenis_pengeluaran_id == 1 ? 
              (
                <>
                  <InputText
                      label="Jumlah penginapan"
                      value={dataTransaksi.jumlah_penginapan.toString()}
                      onChange={(value) => {
                        setDataTransaksi({...dataTransaksi, jumlah_penginapan: value ? parseInt(value) : 1})
                      }}
                      type="numeric"
                  />
                  {
                    penginapan.map((item, index) => {
                      return (
                        <InputText
                            key={index}
                            label="Test"
                            value={dataTransaksi.jumlah_penginapan}
                            onChange={(value) => setDataTransaksi({...dataTransaksi, jumlah_penginapan: value})}
                            type="numeric"
                        />
                      )
                    })
                  }
                </>
              ) : null
            }
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
