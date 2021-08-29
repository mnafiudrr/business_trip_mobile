
import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import { LoginContext } from "../../../contexts/LoginContext";
import { COLOR_WHITE, color_background_putih, color_header_background_putih,color_background_abu_pekat } from '../../../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Header from '../../../components/molekuls/Header'
import Card from '../../../components/molekuls/Card'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_LIST, IP_ADDRESS} from '../../../utils/api';

const History = ({navigation}) => {

  const {tokenUser, dataUser, setDataUser,} = useContext(LoginContext);
    
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getList();
    
    const unsubscribe = navigation.addListener('focus', () => {
      getList();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };

  }, [navigation]);

  const getList = () => {
    axios({
      method: 'get',
      url: URL_LIST,
      headers: {
        'Authorization': 'Bearer '+tokenUser,
      },
    })
    .then(function (response) {
      setData(response.data.data);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
  }

    return (
    <View style={styles.background}>
      <Header title="History"/>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.Content}>
          {
              data.map((item,index) => {
                  return(
                  <Card
                    id={item.id}
                    key={index}
                    title={item.keperluan}
                    date={item.tgl_berangkat+" "+item.tgl_kembali}
                    dep={item.tgl_berangkat}
                    arr={item.tgl_kembali}
                    avatar={item.delegasi}
                    currency={item.jumlah_anggaran}
                    status={item.is_active}
                  />
                  )}
          )}
        </View>
      </ScrollView>
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
    alignItems:'center',
    width:wp(100),
    borderTopLeftRadius:wp(10),
    borderTopRightRadius:wp(10),
    paddingTop:wp(2)
  },
  spinnerTextStyle: {
    color:'white'
  }
});

export default History;
