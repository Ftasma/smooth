"use client";
import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const fileUploadInstance = (url: string, fileType: string ) =>  axios.create({
  baseURL: url,
  headers: {
    'Content-Type': fileType
  }
})

const ClientSetup: React.FC = () => {
    const [ cookie, setCookie ] = useCookies();
    axios.interceptors.request.use(config => {
      const token = cookie.token;
      if (token) {
        console.log(token);
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  }, error => {
      return Promise.reject(error);
});
    return <></>;
};



export default ClientSetup;
