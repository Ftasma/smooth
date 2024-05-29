"use client"
import axios from "axios";
import {cookies} from "next/headers";
import { useCookies } from "react-cookie";


export const agent = axios.create({
    
    baseURL: 'https://sbxapi.smoothballot.com',
});
const [ cookie, setCookie ] = useCookies();
agent.interceptors.request.use(config => {
    const token = cookie.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});