const baseUrl = 'https://aplikasi-catatan-keseharian.herokuapp.com';

const myHeader = new Headers()
myHeader.append('Content-Type', 'application/json;charset=UTF-8');
myHeader.append('Accept', 'application/json;charset=UTF-8');

export { baseUrl, myHeader };