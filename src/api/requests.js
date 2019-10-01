import { request } from "./request.js";
import axios from 'axios'
export const url = 'http://localhost:9000/';

export const reqUrl = url;
export const login = (payload) => { return request(url + 'login/', { body: JSON.stringify(payload) }) };
export const register = (payload) => { return request(url + 'register/', { body: JSON.stringify(payload) }) };
export const update = (payload) => { return request(url + 'update/', { body: JSON.stringify(payload) }) };
export const getProducts = () => { return request(url + 'getProducts/', { method: 'GET' }) };
export const getUsers = () => { return request(url + 'getUsers/', { method: 'GET' }) };
export const getUser = (payload) => { return request(url + 'getUser/', { body: JSON.stringify(payload) }) };
export const addProduct = (payload) => { return request(url + 'addProduct/', { body: JSON.stringify(payload) }) };
export const getProduct = (payload) => { return request(url + 'getProduct/', { body: JSON.stringify(payload) }) };
export const getOrders = () => { return request(url + 'getOrders/', { method: 'GET' }) };
export const addOrder = (payload) => { return request(url + 'addOrder/', { body: JSON.stringify(payload) }) };
export const email = (payload) => { return request(url + 'email/', { body: JSON.stringify(payload) }) };
export const getOrderItems = (payload) => { return request(url + 'getOrderItems/', { body: JSON.stringify(payload) }) };
export const addDiscount = (payload) => { return request(url + 'addDiscount/', { body: JSON.stringify(payload) }) };
export const getDiscounts = () => { return request(url + 'getDiscounts/', { method: 'GET' }) };
export const getDiscount = (payload) => { return request(url + 'getDiscount/', { body: JSON.stringify(payload) }) };
export const updateProduct = (payload) => { return request(url + 'updateProduct/', { body: JSON.stringify(payload) }) };
export const deleteProduct = (payload) => { return request(url + 'deleteProduct/', { body: JSON.stringify(payload),method: 'DELETE' }) };
export const checkPermision = (payload) => { return request(url + 'checkPermision/', { body: JSON.stringify(payload),method: 'GET' }) };


export const downloadPdf = (payload) => {
  return axios({
    method: 'GET',
    responseType: 'blob',
    url: url + 'download?filename='+payload.filename,
    headers: {
     // token: sessionStorage.getItem('authToken')
    }
  });
};

export const uploadImage = (payload) => {
  return axios({
    method: 'POST',
    url: url + 'uploadImage',
    headers: {
      "content-type": "multipart/form-data"
    }
  });
};
export const uploadPdf = (payload) => {
  return axios({
    method: 'POST',
    url: url + 'uploadPdf',
    headers: {
      "content-type": "multipart/form-data"
    }
  });
};
