import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://6239ffd028bcd99f0278782b.mockapi.io/api/v1/'
  // baseURL: 'http://localhost:3004'

});

export default Api;
