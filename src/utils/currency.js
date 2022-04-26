export const toCurrency = (value, hasDecimal) => {
  let resul = '';

  const data = value ? value.toString() : '';
  if (value) {
    var decimal = '';
    var temp = data.replace(/[.]/g, '').replace('Rp ', '');

    if (hasDecimal) {
      if (data.substring(data.length - 3, data.length - 2) == '.' || data.substring(data.length - 3, data.length - 2) == ',') {
        var decimal = `,${data.substring(data.length - 2, data.length)}`;
        var temp = temp.substring(0, data.length - 3);
      } else if (data.substring(data.length - 2, data.length - 1) == '.' || data.substring(data.length - 2, data.length - 1) == ',') {
        var decimal = `,${data.substring(data.length - 1, data.length)}`;
        var temp = temp.substring(0, data.length - 2);
      } else {
        var decimal = ',00';
      }
    } else if (data.substring(data.length - 3, data.length - 2) == '.' || data.substring(data.length - 3, data.length - 2) == ',') {
      var temp = temp.substring(0, data.length - 3);
    }

    if (temp > 0) {
      temp = parseInt(temp);
      resul = `Rp ${temp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}${decimal}`;
    } else {
      resul = '';
    }
  } else {
    resul = '';
  }
  return resul;
};

export const fromCurrency = (value) => {
  let result = '';
  if (value) {

    const amount = String(value);
    var temp = amount.replace(/[.]/g, '').replace(/[,]/g, '').replace('Rp ', '');

    if (amount.substring(amount.length - 3, amount.length - 2) == '.' || amount.substring(amount.length - 3, amount.length - 2) == ',') {

      // Ditemukan 2 Digit Terakhir ada titik atau koma
      var decimal = `.${amount.substring(amount.length - 2, amount.length)}`;
      temp = temp.substring(0, amount.length - 3);
      result = temp + '' + decimal;

    } else if (amount.substring(amount.length - 2, amount.length - 1) == '.' || amount.substring(amount.length - 2, amount.length - 1) == ',') {

      // Cek 1 Digit Terakhir ada titik atau koma
      var decimal = `.${amount.substring(amount.length - 1, value.length)}`;
      temp = temp.substring(0, amount.length - 2);
      result = temp + '' + decimal;

    } else {

      // Saat Tidak Ditemukan Pecahan
      result = temp;

    }

  }
  return result;
};

export const toAmount = (value) => {
  let resul = '';

  const data = value ? value.toString() : '';
  if (value) {
    var temp = data.replace(/[.]/g, '').replace('Rp ', '');

    if (temp > 0) {
      temp = parseInt(temp);
      resul = `${temp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
    } else {
      resul = '';
    }
  } else {
    resul = '';
  }
  return resul;
};
