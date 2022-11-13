import axios, { AxiosInstance } from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_KEY = process.env.REACT_APP_API_KEY;

// const token = localStorage.getItem('@App:token');

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        // 'Content-type': 'application/json',
        // authorization: `${token}`
    }
});

export default api;
