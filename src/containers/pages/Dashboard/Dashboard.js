

import React, { useState, useEffect, useContext } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import { LoginContext } from "../../../contexts/LoginContext";
import { COLOR_WHITE, color_background_putih, color_header_background_putih, color_background_abu_pekat } from '../../../utils/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../../../components/molekuls/Header';
import Card from '../../../components/molekuls/Card';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_LIST_ACTIVE, IP_ADDRESS} from '../../../utils/api';

const Dashboard = ({navigation}) => {


  const {tokenUser, dataUser, setDataUser} = useContext(LoginContext);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: 'get',
      url: URL_LIST_ACTIVE,
      headers: {
        'Authorization': 'Bearer '+tokenUser,
      },
    })
    .then(function (response) {
      setData(response.data.data);
      setLoading(false);
      setRefreshing(false);
    })
    .catch(function (error) {
      console.log("=== error ===");
      console.log(error);
      console.log("=== +++++ ===");
      setLoading(false);
      setRefreshing(false);
    });
  }

  return (
    <View style={styles.background}>
      <Header title="Active"/>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
        // backgroundColor:color_header_background_putih,
        // backgroundColor:color_background_putih,
        backgroundColor:color_background_abu_pekat,
        flex:1,
        alignItems:'center',
    },
    Content: {
        // backgroundColor:color_background_putih,
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

export default Dashboard;
