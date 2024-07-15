import axios from "axios";
import {useDispatch} from "react-redux";
import {setConnected} from "../store/slice/userSlice.jsx";
import {createAsyncThunk} from "@reduxjs/toolkit";

const {VITE_LOCAL_STORAGE_TOKEN_KEY, VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY, VITE_API_URL} = import.meta.env

const useApi = () => {
  const dispatch = useDispatch()
  
  const api = axios.create({
    baseURL: VITE_API_URL
  })
  
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && error.config.url !== "/secure/refresh" && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem(VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        if (refreshToken && refreshToken !== "") {
          api.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
          await api.get("/secure/refresh").then(response => {
            originalRequest.headers["Authorization"] = `Bearer ${response.data.jwt}`
            setToken(response.data.token)
            localStorage.setItem(VITE_LOCAL_STORAGE_TOKEN_KEY, response.data.jwt)
            localStorage.setItem(VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY, response.data.refresh)
          })
          return api(originalRequest)
        }
      } else if (error.response.status === 401 && originalRequest._retry) {
        dispatch(setConnected(false))
      }
      return Promise.reject(error);
    }
  )
  
  // ajoute le token jwt à toutes les requetes s'il existe
  api.interceptors.request.use((req) => {
    const token = localStorage.getItem(VITE_LOCAL_STORAGE_TOKEN_KEY)
    if (req.url !== "/secure/refresh" && token !== null) {
      req.headers["Authorization"] = `Bearer ${token}`
    }
    return req
  })
  
  const setToken = (token) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
  
  
  
  return {
    api,
    setToken
  }
}

export default useApi