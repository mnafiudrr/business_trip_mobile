
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
import CheckBox from '@react-native-community/checkbox';
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
  nama:'MoeToel',
  no_kamar: 'H1',
  nominal: null,
  malam: 1,
  ket: 'Keterangan Penginapan',
  total: null,
  karyawan: [],
}

const AddPayment = ({route, navigation}) => {
  const back = BACK_BUTTON("back");

  // Custom Hooks
  
  // Data Utama
  const { id, nomor_spt, delegasi } = route.params;
  const { dataUser, tokenUser } = useContext(LoginContext);
  const { transaksiLainnya, transaksiPenginapan, transportList, transaksiTransportasi, transaksiUangSaku } = useAddPayment(URL_TRANSACTION_OUT, id, tokenUser);
  const [daftarDelegasi, setDaftarDelegasi] = useState([]);
  const [dataTransaksi, setDataTransaksi] = useState({
    spt_id : id,
    nominal : '200000',
    keterangan : 'Test Kendaraan',
    bukti : null,
    jenis_pengeluaran_id: 4,
    tipe_pengeluaran_transport_id: 1,
    user_id: null,
  });

  // Data Penginapan
  const [penginapan, setPenginapan] = useState(basePenginapan);

  // Data Transportasi
  const [daftarTransport, setDaftarTransport] = useState([]);

  // Init Delegasi & Daftar Transport 
  useEffect(() => {

    let temp_delegasi = [];
    delegasi.map((item, index) => {
      temp_delegasi.push({
        label: item.pegawai,
        value: item.id,
        selected: true
      });
    });
    setDaftarDelegasi(temp_delegasi);

    getTransportList();

  },[]);

  useEffect(() => {
    setPenginapan({
      ...penginapan,
      nominal: dataTransaksi.nominal,
      total: dataTransaksi.nominal,
    });
  },[dataTransaksi.nominal]);

  useEffect(() => {
    let karyawan = [];
    daftarDelegasi.map((item) => {
      if ( item.selected ) karyawan.push(item.value);
    });
    setPenginapan({...penginapan, karyawan});
  },[daftarDelegasi]);

  // Loading
  const [isLoading, setLoading] = useState(false);

  // Get Jenis Pengeluaran Transport
  const getTransportList = async () => {
    const response = await transportList();
    let temp_transport = [];
    if(response.data && response.data.data){
      response.data.data.map((item) => temp_transport.push({
        ...item,
        value: item.id,
        label: item.nama,
      }));
    }
    setDaftarTransport(temp_transport);
  }

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
    setLoading(true);
    if(dataTransaksi.nominal && dataTransaksi.keterangan && gambarTerisi){
      if(dataTransaksi.jenis_pengeluaran_id == 4){

        const response = await transaksiLainnya(dataTransaksi, file);
        setLoading(false);
        if(!response){
          Toast.show('Unggah Gagal', Toast.LONG);
        }else{
          Toast.show('Unggah Berhasil', Toast.LONG);
          navigation.navigate('Detail');
        }

      } else if (dataTransaksi.jenis_pengeluaran_id == 1) {

        const response = await transaksiPenginapan(dataTransaksi, file, penginapan);
        setLoading(false);
        if(!response){
          Toast.show('Unggah Gagal', Toast.LONG);
        }else{
          Toast.show('Unggah Berhasil', Toast.LONG);
          navigation.navigate('Detail');
        }
        
      } else if (dataTransaksi.jenis_pengeluaran_id == 2) {
        
        const response = await transaksiTransportasi(dataTransaksi, file);
        setLoading(false);
        if(!response){
          Toast.show('Unggah Gagal', Toast.LONG);
        }else{
          Toast.show('Unggah Berhasil', Toast.LONG);
          navigation.navigate('Detail');
        }

      } else if (dataTransaksi.jenis_pengeluaran_id == 3) {
        
        const response = await transaksiUangSaku(dataTransaksi, file);
        setLoading(false);
        if(!response){
          Toast.show('Unggah Gagal', Toast.LONG);
        }else{
          Toast.show('Unggah Berhasil', Toast.LONG);
          navigation.navigate('Detail');
        }

      }


    }else{
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
                    label="Nama Penginapan"
                    value={penginapan.nama}
                    onChange={(value) => setPenginapan({...penginapan, nama: value})}
                  />
                  <InputText
                    label="Nomor Kamar"
                    value={penginapan.no_kamar}
                    onChange={(value) => setPenginapan({...penginapan, no_kamar: value})}
                  />
                  <InputText
                    label="Jumlah Malam"
                    value={String(penginapan.malam)}
                    onChange={(value) => setPenginapan({...penginapan, malam: value.replace(/\D/g,'')})}
                    type="numeric"
                  />
                  <InputText
                    label="Keterangan"
                    value={penginapan.ket}
                    onChange={(value) => setPenginapan({...penginapan, ket: value})}
                  />
                  <View>
                    <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                      Peserta
                    </Text>
                    {
                      daftarDelegasi.map((item, index) => {
                        return (
                          <View style={{flexDirection:'row'}} key={index}>
                              <CheckBox
                                disabled={false}
                                value={item.selected}
                                onValueChange={(newValue) => setDaftarDelegasi([...daftarDelegasi].map(object => {
                                  if(object.value === item.value) {
                                    return {
                                      ...object,
                                      selected: newValue
                                    }
                                  }
                                  else return object;
                                  }))
                                }
                              />
                              <Text style={{fontSize:wp(4.5), paddingTop: wp(0.6)}}>
                                {item.label}
                              </Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </>
              ) : null
            }
            {
              dataTransaksi.jenis_pengeluaran_id == 2 ?
              (
                <SelectModal 
                  value={dataTransaksi.tipe_pengeluaran_transport_id}
                  onSelect={(value) => setDataTransaksi({...dataTransaksi, tipe_pengeluaran_transport_id: value})}
                  label={'Tipe Pengeluaran'}
                  lists={daftarTransport}
                />
              ) : null
            }
            {
              dataTransaksi.jenis_pengeluaran_id == 3 ?
              (
                <SelectModal 
                  value={dataTransaksi.user_id}
                  onSelect={(value) => setDataTransaksi({...dataTransaksi, user_id: value})}
                  label={'Penerima'}
                  lists={daftarDelegasi}
                />
              ) : null
            }
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
