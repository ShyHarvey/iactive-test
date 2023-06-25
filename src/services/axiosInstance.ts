import axios from "axios";

export const API_URL = 'http://a0830433.xsph.ru/' //желательно использовать .env 

export const apiInstance = axios.create({
    baseURL: API_URL
})