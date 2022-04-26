export const IP_ADDRESS = 'http://54.169.76.31:10001/';

// Login + Data
export const URL_LOGIN = IP_ADDRESS + 'api/login';
export const URL_LOGOUT = IP_ADDRESS + 'api/logout';
export const URL_USER = IP_ADDRESS + 'api/user';

// SPT
export const URL_LIST = IP_ADDRESS + 'api/spt/list';
export const URL_SHOW = IP_ADDRESS + 'api/spt/show';
export const URL_LIST_ACTIVE = IP_ADDRESS + 'api/spt/list/active';
export const URL_DANA_OUT = IP_ADDRESS + 'api/spt/dana/keluar';

// Transaction
export const URL_TRANSACTION_OUT = `${IP_ADDRESS}api/transaksi/keluar`;
export const URL_TRANSACTION_TRANSPORT_LIST = `${IP_ADDRESS}api/transaksi/transport-list`;

// Request Dana
export const URL_REQUEST_DANA = `${IP_ADDRESS}api/spt/request`;

// Selesai SPT
export const URL_SPT_SELESAI = `${IP_ADDRESS}api/spt/selesai`;

// Selesai SPT
export const URL_PENGEMBALIAN_DANA = `${IP_ADDRESS}api/spt/pengembalian-dana`;