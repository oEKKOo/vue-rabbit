// utils/request.js
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
});

export default request;