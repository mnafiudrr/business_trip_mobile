import React from "react";
import axios from "axios";
import Toast from 'react-native-simple-toast';
import { URL_TRANSACTION_TRANSPORT_LIST } from "../../../utils/api";

const useAddPayment = (url, spt_id, tokenUser) => {

  const transportList = async () => {
    try {
      const promise = await axios({
        method: 'get',
        url: URL_TRANSACTION_TRANSPORT_LIST,
      })

      return promise;
    } catch (error) {
      
      console.log(error);
      return false;

    }
  }

  const transaksiLainnya = async (dataTransaksi, image) => {
    let data = new FormData();
    data.append('spt_id', spt_id);
    data.append('nominal', dataTransaksi.nominal);
    data.append('keterangan', dataTransaksi.keterangan);
    data.append('jenis_pengeluaran_id', 4);
    data.append('bukti_transaksi', image);
    try {
      
      const promise = await axios({
        method: 'post',
        url,
        headers: {
          'Authorization': 'Bearer '+tokenUser,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      });

      return promise;

    } catch (error) {
      
      console.log(error);
      return false;

    }

  }

  const transaksiPenginapan = async (dataTransaksi, image, penginapan) => {

    if( dataTransaksi && image && penginapan ) {
      console.log('checked');
      try {
        let data = new FormData();
        console.log('form created');
        data.append('spt_id', spt_id);
        data.append('nominal', dataTransaksi.nominal);
        data.append('keterangan', dataTransaksi.keterangan);
        data.append('jenis_pengeluaran_id', 1);
        data.append('bukti_transaksi', image);
        data.append('penginapan[0][nama]', penginapan.nama);
        data.append('penginapan[0][nominal]', penginapan.nominal);
        data.append('penginapan[0][no_kamar]', penginapan.no_kamar);
        data.append('penginapan[0][malam]', penginapan.malam);
        data.append('penginapan[0][ket]', penginapan.ket);
        data.append('penginapan[0][total]', penginapan.total);

        penginapan.karyawan.map((item, index) => data.append('penginapan[0][karyawan]['+index+']', item));
        
        console.log('data created');

        const promise = await axios({
          method: 'post',
          url,
          headers: {
            'Authorization': 'Bearer '+tokenUser,
            'Content-Type': 'multipart/form-data',
          },
          data: data,
        });

        console.log(url, tokenUser);
        console.log(data);
        return 'test'
        // return promise;
  
      } catch (error) {
        
        // Toast.show(error, Toast.LONG);
        console.log(error.response.data);
        return false;
  
      }

    } else {

      Toast.show('Belum lengkap', Toast.LONG);
      return false;
    }

  }

  const transaksiTransportasi = async (dataTransaksi, image) => {
    let data = new FormData();
    data.append('spt_id', spt_id);
    data.append('nominal', dataTransaksi.nominal);
    data.append('keterangan', dataTransaksi.keterangan);
    data.append('tipe_pengeluaran_transport_id', dataTransaksi.tipe_pengeluaran_transport_id);
    data.append('jenis_pengeluaran_id', 2);
    data.append('bukti_transaksi', image);
    try {
      
      const promise = await axios({
        method: 'post',
        url,
        headers: {
          'Authorization': 'Bearer '+tokenUser,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      });

      return promise;

    } catch (error) {
      
      console.log(error);
      return false;

    }

  }

  return {
    transportList,
    transaksiLainnya,
    transaksiPenginapan,
    transaksiTransportasi,
  }

}

export default useAddPayment;