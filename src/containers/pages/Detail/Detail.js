
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { LoginContext } from "../../../contexts/LoginContext";
import { COLOR_WHITE, color_background_putih,  color_background_abu_pekat } from '../../../utils/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../../components/molekuls/Header';
import DetailInfo from '../../../components/molekuls/DetailInfo';
import DelegationList from '../../../components/molekuls/DelegationList';
import SpendingList from '../../../components/molekuls/SpendingList';
import {BACK_BUTTON} from '../../../utils/backHandler';
import {URL_SHOW} from '../../../utils/api';
import axios from 'axios';
import Loading from '../../templates/Detail/Loading';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import ModalPengajuanDana from '../../organizms/spt/ModalPengajuanDana';
import { useIsFocused } from '@react-navigation/native';
import ModalSelesaiDinas from '../../organizms/spt/ModalSelesaiDinas';


const Detail = ({route, navigation}) => {
  const back = BACK_BUTTON("back");
  const { spkId } = route.params;
  const isFocused = useIsFocused();

  const [detail, setDetail] = useState();
  const [isKoor, setKoor] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const { dataUser, tokenUser } = useContext(LoginContext);
  const [warning, setWarning] = useState(false);
  const [modalAjukanDana, setModalAjukanDana] = useState(false);
  const [modalSelesaiDinas, setModalSelesaiDinas] = useState(false);

  useEffect(() => {
    if(isFocused){
      getSpk();
    }
  }, [isFocused]);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setDetail(undefined);
    getSpk();
  }, []);

  const storeKoor = (value) => {
    for (let user of value) {
      if(user.username == dataUser.username){
        setKoor(user.koordinator);
      }
    }
  }

  const getSpk = () => {
    axios({
      method: 'post',
      url: URL_SHOW,
      headers: {
        'Authorization': 'Bearer '+tokenUser,
        'Content-Type': 'application/json'
      },
      data: {
        id: spkId
      },
    })
    .then(function (response) {
      storeKoor(response.data.data.delegasi);
      setDetail(response.data.data);
      setRefreshing(false);
    })
    .catch(function (error) {
      console.log(error.response.data);
      setRefreshing(false);
    });
  }

  const ajukanDana = () => {
    if(detail.saldo > detail.batas_pengajuan){
      setWarning(true);
    }else{
      setModalAjukanDana(true)
    }
  }

  const closeAjukanDana = () => {
    setModalAjukanDana(false);
    onRefresh();
  }

  const closeSelesaiDinas = () => {
    setModalSelesaiDinas(false);
    onRefresh();
  }

  return (
    <View style={styles.background}>
      {detail?(
        <>
          {/* <View style={{marginHorizontal:wp(5)}}>
            <Loading/>
          </View> */}
          <Header title={detail.nomor_spt}/>
          <ScrollView 
          style={styles.Content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          >
            <View style={styles.card}>
              <DetailInfo 
                title={detail.keperluan}
                date={detail.tgl_berangkat+" - "+detail.tgl_kembali}
                dep={detail.tgl_berangkat}
                arr={detail.tgl_kembali}
                currency={detail.saldo}
                status={detail.is_active?"Aktif":"Selesai"}
                total={detail.jumlah_anggaran}
                status_tambahan_dana={detail.status_tambahan_dana}
              />
            </View>
            {
              detail.is_active? 
              (
                <View style={[styles.card,{flexDirection:'row', justifyContent:'space-evenly'}]}>
                  {
                    detail.status_tambahan_dana != 1 ? (
                      <TouchableOpacity style={styles.button} onPress={ajukanDana}>
                        <Text style={styles.buttonText}>AJUKAN DANA</Text>
                      </TouchableOpacity>
                    ) : null
                  }
                  <TouchableOpacity 
                    style={[styles.button,{backgroundColor:'orange'}]}
                    onPress={() => setModalSelesaiDinas(true)}>
                    <Text style={styles.buttonText}>SELESAI DINAS</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.card,{flexDirection:'row', justifyContent:'space-evenly'}]}>
                  
                  {
                    detail.pengembalian_dana_status == 0 ||
                    detail.pengembalian_dana_status == 3 ?
                    (
                      <TouchableOpacity 
                        style={[styles.button, {width:wp(80)}]}
                        onPress={() => navigation.navigate(
                            'RefundForm',
                            { 
                              route_data : {
                                id: detail.id,
                                saldo: detail.saldo,
                                nomor_spt: detail.nomor_spt,
                              }
                            }
                          )}>
                        <Text style={styles.buttonText}>Kembalikan Sisa Dana</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={[styles.buttonText, {color: 'black'}]}>{detail.pengembalian_dana_status == 1 ? 'Menunggu Validasi':'' } Pengembalian Sisa Dana {detail.pengembalian_dana_status == 2 ? 'Telah Divalidasi':'' }</Text>
                    )
                  }
                </View>
              )
            }
            <View style={styles.card}>
              <DelegationList 
                list={detail.delegasi}
              />
            </View>
            <View style={[styles.card, {backgroundColor:color_background_abu_pekat, elevation:0, paddingVertical:wp(2)}]}>
              <SpendingList
                delegasi={detail.delegasi}
                list={detail.pengeluaran}
                id={detail.id}
                nomor_spt={detail.nomor_spt}
                is_koor={isKoor}
                is_active={detail.is_active}
              />
            </View>
          </ScrollView>

          <Modal 
            isVisible={warning}
            onBackButtonPress={() => setWarning(false)}
            onBackdropPress={() => setWarning(false)}
            >
            <View style={styles.warningModal}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Saldo lebih dari batas syarat pengajuan dana tambahan.</Text>
              </View>
            </View>
          </Modal>
          <Modal isVisible={modalAjukanDana}
            onBackButtonPress={() => setModalAjukanDana(false)}
            onBackdropPress={() => setModalAjukanDana(false)}
          >
            <ModalPengajuanDana
              id={detail.id}
              closeModal={closeAjukanDana}
            />
          </Modal>
          <Modal isVisible={modalSelesaiDinas}
            onBackButtonPress={() => setModalSelesaiDinas(false)}
            onBackdropPress={() => setModalSelesaiDinas(false)}
          >
            <ModalSelesaiDinas
              id={detail.id}
              closeModal={closeSelesaiDinas}
            />
          </Modal>
        </>
      ):
      <View style={{marginHorizontal:wp(5)}}>
        <Loading/>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
      backgroundColor:color_background_abu_pekat,
      flex:1,
      alignItems:'center',
    },
    Content: {
      backgroundColor:color_background_abu_pekat,
      flex:1,
      width:wp(94),
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
    button: {
      backgroundColor:'#25aef0',
      width:wp(35),
      height:wp(10),
      justifyContent:'center',
      alignItems:'center',
      borderRadius:wp(3.5)
    },
    buttonText: {
      fontSize:wp(4.2),
      color:'white',
      fontWeight:'bold'
    },
    warningModal:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
    modalView: {
      width:wp(80),
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:wp(3),
    },
    modalText: {
      paddingHorizontal:wp(5),
      paddingBottom:wp(5),
      paddingTop:wp(5),
      fontSize:wp(3.4)
    }

});

export default Detail;
