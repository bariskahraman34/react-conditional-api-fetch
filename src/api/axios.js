import axios from "axios"

const BASEURL_HACKERRANK_URL = 'https://jsonmock.hackerrank.com/api/'
const BASEURL_DUMMYJSON_URL = 'https://dummyjson.com/'

export const hackerrankAPI = axios.create({
  baseURL: BASEURL_HACKERRANK_URL
});

hackerrankAPI.interceptors.response.use(function(response){
  return response.data.data;
})

export const dummyJSONAPI = axios.create({
  baseURL: BASEURL_DUMMYJSON_URL
})

dummyJSONAPI.interceptors.response.use(function(response){
  return response.data;
})