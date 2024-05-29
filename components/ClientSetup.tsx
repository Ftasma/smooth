"use client";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

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
