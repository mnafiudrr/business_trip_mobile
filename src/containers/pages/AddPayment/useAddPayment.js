import React from "react";
import axios from "axios";

const useAddPayment = (url, spt_id, tokenUser) => {

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
    let data = new FormData();
    data.append('spt_id', spt_id);
    data.append('nominal', dataTransaksi.nominal);
    data.append('keterangan', dataTransaksi.keterangan);
    data.append('jenis_pengeluaran_id', 1);
    data.append('bukti_transaksi', image);
    data.append('penginapan', penginapan);
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
    transaksiLainnya,
    transaksiPenginapan,
  }

}

export default useAddPayment;