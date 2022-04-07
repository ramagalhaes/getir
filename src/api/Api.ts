import axios from 'axios';

let baseURL = 'https://6239ffd028bcd99f0278782b.mockapi.io/api/v1/';

if(process.env.NODE_ENV === 'development'){
  baseURL = 'http://localhost:3004';
}

console.log(baseURL);
const Api = axios.create({
  baseURL

});

export default Api;
