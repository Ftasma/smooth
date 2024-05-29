import axios from "axios";
import {cookies} from "next/headers";
import { useCookies } from "react-cookie";


const [ cookie, setCookie ] = useCookies();
export const agent = axios.create({

    baseURL: 'https://sbxapi.smoothballot.com',
});
agent.interceptors.request.use(config => {
    const token = cookie.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});